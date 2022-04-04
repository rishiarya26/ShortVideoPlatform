import DeskAuth from '../desk-auth';

const DeskSignup = ({backToOptions, showMessage}) => (
  <DeskAuth authType="signup" backToOptions={backToOptions} showMessage={showMessage}/>
);

export default DeskSignup;