import { SubmitButton } from '../../commons/button/submit-button';

export default function CountryCode() {
  // eslint-disable-next-line no-unused-vars

  return (
    <div className="flex flex-col w-full">
      <div className="flex w-full border-b-2 border-gray-300 relative justify-center p-4">
        <div className="absolute left-4">X</div>
        <div className="font-bold">Select country/region</div>
      </div>
      <div className="flex px-2 py-4">
        <div className="flex w-9/12">
          <input
            id="Search"
            className=" w-full bg-gray-100 px-4 py-2 mx-2"
            type="text"
            name="country code"
            placeholder="Search countries and regions"
          />
        </div>
        <div className="flex w-3/12">
          <SubmitButton text="Search" />
        </div>
      </div>
      <div className="flex flex-col p-2">
        <div className="flex px-2 justify-between font-medium">
          <div>India</div>
          <div>+91</div>
        </div>
      </div>
      <div className="flex flex-col p-2">
        <div className="flex px-2 justify-between font-medium">
          <div>India</div>
          <div>+91</div>
        </div>
      </div>
      <div className="flex flex-col p-2">
        <div className="flex px-2 justify-between font-medium">
          <div>India</div>
          <div>++91</div>
        </div>
      </div>
    </div>
  );
}
