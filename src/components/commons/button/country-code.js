/*eslint-disable  react/display-name*/
import dynamic from 'next/dynamic';
import { countryCodes } from '../../../../public/countryCode.json';
import useDrawer from '../../../hooks/use-drawer';

export const CountryCode = ({ onValueChange, text }) => {
  const { show } = useDrawer();
  const detectDeviceModal = dynamic(
    () => import('../list-with-search'),
    {
      loading: () => <div />,
      ssr: false
    }
  );

  return (
    <>
      <button
        onClick={() => show('', detectDeviceModal, 'big', { data: countryCodes && countryCodes, onValueChange, type: 'countryCode' })}
        className="cursor-pointer bg-white px-2 py-2 text-gray-600 border-b-2 border-grey-300 flex items-center"
      >
        {' '}
        +
        {text}
        <p className="text-xs pl-1">{' ▼'}</p>
      </button>
    </>
  );
};
