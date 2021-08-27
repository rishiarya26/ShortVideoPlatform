import { withRouter } from 'next/router';
import Auth from '../../src/components/auth';
// import Login from '../../src/components/login';

const Hipi = () => (
  <Auth authType="login" />
);

export default withRouter(Hipi);
