import { withRouter } from 'next/router';
import Tabs from '../commons/tabs';
import MobileLogin from '../access/mobile-login/'
import EmailLogin from '../access/email-login/'
import ResetPassword from '../access/reset-password'

const Login = () => {
  const tabs = [{ display: 'Phone', path: '/login/phone' }, { display: 'Email', path: '/login/email' }];
  return (
    <>
      <div>
        <div className="w-full flex h-16  bg-white items-center">
          <div className="p-4 h-full flex items-center justify-center">
            <svg height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
            </svg>
          </div>
          <div className="font-bold flex justify-center align-center w-9/12">Log in</div>
        </div>
      </div>
      {/* </div> */}
      <div className="flex z-10 w-full ">
        <Tabs items={tabs} width="w-32 flex justify-center align-center " font="text-black" />
      </div>
{/* <MobileLogin />
<EmailLogin /> */}
<ResetPassword />
    </>
  );
};

export default withRouter(Login);
