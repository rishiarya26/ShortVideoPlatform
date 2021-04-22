
import { withBasePath } from '../../config';

function Contact() {
  return (
    <div className="h-screen  w-screen">
      <div className="w-full h-20 bg-hipidblue flex items-center justify-center lg:justify-start lg:px-10 absolute top-0">
        <img src={withBasePath('images/zee5_logo_v01.png')} alt="hipi logo" />
      </div>
      <div className="bg-purple-900 flex flex-col justify-center items-center h-full  text-white">
        <h1 className="text-2xl font-semibold">CONTACT US</h1>
        <p className="font-medium mb-4">Questions not answered yet? We are here to help!</p>
        <p>anup.nair@zee.com</p>
        <p>deepak.singh@zee.com</p>
      </div>
    </div>
  );
}

export default Contact;

