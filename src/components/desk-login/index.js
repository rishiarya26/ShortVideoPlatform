import DeskAuth from '../desk-auth';

const DeskLogin = ({backToOptions}) => (
  <DeskAuth authType="login" backToOptions={backToOptions}/>
);

export default DeskLogin;