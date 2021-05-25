import { withRouter } from 'next/router';
import Tabs from '../../src/components/commons/tabs';

const Login = () => {
  const tabs = [{ display: 'Phone', path: '/login/phone' }, { display: 'Email', path: '/login/email' }];
  return (
    <div className="fixed mt-10 z-10 w-full ">
      <Tabs items={tabs} width="w-32 flex justify-center align-center" font="text-black" />
    </div>
  );
};

export default withRouter(Login);
