import { withRouter } from 'next/router';
import Auth from '../../src/components/auth';
// import Signup from '../../src/components/signup';

const Hipi = () => (
  <Auth authType="signup" />
);

export default withRouter(Hipi);
