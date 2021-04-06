import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const ErrorIcon = dynamic(
  () => import('../svgicons/snackbar/error'),
  {
    loading: () => <div />,
    ssr: false
  }
);

const SuccessIcon = dynamic(
  () => import('../svgicons/snackbar/success'),
  {
    loading: () => <div />,
    ssr: false
  }
);

const InfoIcon = dynamic(
  () => import('../svgicons/snackbar/info'),
  {
    loading: () => <div />,
    ssr: false
  }
);

const WarnIcon = dynamic(
  () => import('../svgicons/snackbar/warn'),
  {
    loading: () => <div />,
    ssr: false
  }
);

const SnackType = {
  error: 'bg-red-400',
  info: 'bg-blue-300',
  success: 'bg-green-400',
  warn: 'bg-yellow-400'
};

const IconType = {
  error: ErrorIcon,
  info: InfoIcon,
  success: SuccessIcon,
  warn: WarnIcon
};

// TODO add close button and call hide function
function SnackBar(
  {
    message = '', visibility, type = 'info'
  }
) {
  const [visible, setVisible] = useState(visibility);

  useEffect(() => {
    setTimeout(() => setVisible(false), 3000);
  }, []);

  const Icon = (IconType[type] || IconType.info);

  if (!message) {
    return (<div />);
  }

  console.log(` visible - ${visible}`);

  return (
    <div className={`
      ${visible ? 'bottom-20 visible' : 'bottom-0 invisible'}
      transition-all duration-500
      motion-reduce:transition-none motion-reduce:transform-none
      flex items-center 
      absolute
      z-20
      text-white max-w-sm w-auto
      ${SnackType[type] || SnackType.info}
      shadow-md
      rounded-lg
      overflow-hidden
      mx-auto
    `}
    >
      <div className="w-10 border-r px-2">
        <Icon />
      </div>

      <div className="flex items-center py-3">
        <div className="mx-3">
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
}

export default SnackBar;
