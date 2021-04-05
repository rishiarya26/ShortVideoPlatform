import Close from '../svgicons/close';

const ColorTypeMap = {
  warn: 'red',
  error: 'red',
  info: 'red',
  success: 'red'
};

const getStyleForType = type => ColorTypeMap[type] || ColorTypeMap.info;

function SnackBar(
  {
    text = 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum', autoClose = true,
    appearFrom = 'bottom', type = 'info'
  }
) {
  return (
    <div
      className={`
      w-80
      h-auto
      bg-red-300
      border border-red-400
      text-red-700 
      pl-2 pr-4 py-2
      rounded 
      absolute
      bottom-20
      z-20
      `}
      role="alert"
    >
      <span className="block sm:inline">{text}</span>
      <span className="absolute pin-t pin-b pin-r pr-2 py-3">
        {/* <svg
          className="h-6 w-6 text-red"
          role="button"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <title>Close</title>
          <path
            d={`M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10
            11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1
            1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z`}
          />
        </svg> */}
        <Close />
      </span>
    </div>
  );
}

export default SnackBar;

