import DeskAuth from '../desk-auth';

const DeskSignup = ({backToOptions}) => (
  <DeskAuth authType="signup" backToOptions={backToOptions} />
);

export default DeskSignup;