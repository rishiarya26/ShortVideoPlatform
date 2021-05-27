import { withRouter } from 'next/router';
import { Back } from '../commons/svgicons/back';
import Tabs from '../commons/tabs';
import MobileLogin from '../access/mobile-login/'
import EmailLogin from '../access/email-login/'
import ResetPassword from '../access/reset-password'

const Login = ({ router }) => {
  const type = router.query.id;
  const tabs = [{ display: 'Phone', path: '/login/phone' }, { display: 'Email', path: '/login/email' }];
  return (
    <>
      <div>
        <div className="w-full flex h-16  bg-white items-center">
          <div className="p-4 h-full flex items-center justify-center">
            <Back />
          </div>
          <div className="font-bold flex justify-center align-center w-9/12">Log in</div>
        </div>
      </div>
      <div className="fixed mt-10 z-10 w-full">
        <Tabs items={tabs} />
      </div>
      <div className="mt-20">
        {type === 'phone' && <MobileLogin />}
        {type === 'email' && <EmailLogin />}
      </div>

    </>
  );
};

export default withRouter(Login);
