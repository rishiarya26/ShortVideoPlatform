import { withRouter } from 'next/router';
import Auth from '../../src/components/auth';
import useSnackbar from '../../src/hooks/use-snackbar';
// import Login from '../../src/components/login';

const Hipi = () => {
  const {showSnackbar} = useSnackbar();
  return(
  <Auth authType="login" showMessage={showSnackbar} />
)};

export default withRouter(Hipi);
