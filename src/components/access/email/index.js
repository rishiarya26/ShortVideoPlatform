/*eslint-disable react/no-unescaped-entities*/
import { useRouter } from 'next/router';
import { useState } from 'react';
import { track } from '../../../analytics';
import { commonEvents, toTrackMixpanel } from '../../../analytics/mixpanel/events';
// import useSnackbar from '../../../hooks/use-snackbar';
import useTranslation from '../../../hooks/use-translation';
import { userLogin } from '../../../sources/auth';
import { verifyUserOnly } from '../../../sources/auth/verify-user';
import CircularProgress from '../../commons/circular-loader-small';
import * as fbq from '../../../analytics/fb-pixel'
import { getItem } from '../../../utils/cookie';
import useDrawer from '../../../hooks/use-drawer';

export default function Email({
  data, processEmailData, type, toggleShowForgotPassComp, toggleRegistration, showMessage
}) {
  const [pending, setPending] = useState(false);
  const { t } = useTranslation();
  // const { showMessage } = useSnackbar();
  const router = useRouter();
  const device = getItem('device-type');
  const {close} = useDrawer();

  const mixpanel = (type) =>{
    const mixpanelEvents = commonEvents();
    mixpanelEvents['Method'] = 'Email';
    track(`${type} Result`,mixpanelEvents );
  }

  const submit = {
    login: async e => {
      e.preventDefault();
      setPending(true);
      try {
        toTrackMixpanel('loginInitiated',{method:'email', pageName:'login'})
        const finalData = { ...data };
        finalData.type = 'email';
        const response = await userLogin(finalData);
        if (response.status === 'success') {
           /* Mixpanel */
           try{
            toTrackMixpanel('loginSuccess',{method:'email', pageName:'login'})
            fbq.defEvent('CompleteRegistration');
        }catch(e){
          console.log('error in fb or mixpanel event')
        }
        showMessage({ message: t('SUCCESS_LOGIN') });
        setPending(false);
        
           /* Mixpanel */        
         if(device === 'mobile'){
             router && router?.push({
            pathname: '/feed/for-you'
          });
          }
          if(device === 'desktop'){
            close();
            try{
              router?.asPath && (window.location.href = router?.asPath)
            }catch(e){
              console.error('error in redirection',e)
            }
          }

        }
      } catch (e) {
        showMessage({ message: t('FAIL_EMAIL_LOGIN') });
        setPending(false);
        toTrackMixpanel('loginFailure',{method:'email',pageName:'login'})
      }
    },
    signup: async e => {
      e.preventDefault();
      setPending(true);
      let resp;
   try{  
      resp = await verifyUserOnly({email: data?.email, type:'email'});
      if (resp.status === 'success') {
      showMessage({message : 'User already registered. Please Sign In'})
      setPending(false);

    }
    }catch(e){
     if(device === 'mobile'){  router && router?.push({
        pathname: '/registration',
        query: { email: data?.email }
      });
    }else if(device === 'desktop'){
      toggleRegistration({show: true, toRegType : 'email', toRegValue:data?.email});
    }
      setTimeout(() => { setPending(false); }, 2000);
    }}
  };

  const submitText = {
    login: t('LOGIN'),
    signup: t('NEXT')
  };

  const info = {
    login:
  <>
    <div className="mt-4">
      <input
        id="password"
        value={data.password}
        onChange={processEmailData}
        className=" w-full border-b-2 border-grey-300 px-4 py-2"
        type="password"
        name="phone"
        placeholder="Password"
        autoComplete="off"
        required
      />
    </div>
    <div onClick={
      device === 'desktop' ? ()=>toggleShowForgotPassComp({show : true, type : 'email'})
      :
      ()=>router && router.push(
      {pathname: '/forgot-password',
       query : {type : 'email'}
    }
    )} className="flex justify-start text-sm font-semibold mt-2 px-2 cursor-pointer">
      {/* TO-DO  forgot password */}
      <p>Forgot password?</p>
    </div>
  </>,
    signup:
  <div className="flex justify-end text-sm font-semibold mt-2 px-2">
    <p className="text-gray-400 text-xs">
        <p className="text-xs">
          By continuing, you agree to Hipi's
          <span onClick={()=>router && router.push('/terms-conditions.html')} className="font-semibold cursor-pointer"> Term of Use </span>
          and confirm that you have read Hipi's
          <span onClick={()=>router && router.push('/privacy-policy.html')} className="font-semibold cursor-pointer"> Privacy Policy </span>
          .if you sign up with SMS, SMS fee may apply.
        </p>
    </p>
  </div>
  };

  return (
    <div className="flex flex-col px-4 pt-10">
      <form onSubmit={submit[type]}>
        <div className="mt-4">
          <input
            id="email"
            value={data.email}
            onChange={processEmailData}
            className=" w-full border-b-2 border-grey-300 px-4 py-2"
            type="email"
            name="phone"
            placeholder="Email address"
            autoComplete="off"
            required
          />
        </div>
        { info[type] }
        <div className="mt-10">
          <button
            type="submit"
            disabled={pending}
            className="bg-hipired w-full px-4 py-2 text-white font-semibold relative"
          >
            {' '}
            {submitText[type]}
            {!pending ? '' : <CircularProgress />}
          </button>
        </div>
      </form>
    </div>
  );
}
