import Close from '../svgicons/close-black';

const Dialog = ({
  children, title, close, visible, type = 'big'
  
}) => {
  const height = {
    extraSmall:{
      height: 'h-1/3 drawer-height',
      width:'w-1/3',
      class:'login_pop'
    },
    small: {
      height: 'h-2/5',
      width:'w-1/3',
      class:'login_pop'
    },
    medium: {
      height: 'h-3/5',
      width:'w-1/3'
    },
    big: {
      height: 'h-80p',
      width:'w-1/3',
      class:'login_pop'
    },
    broad: {
      height: 'h-3/5',
      width:'w-2/4'
    }
  };
  return(
  <div
    data-testid="dialog-container"
    className={`
    ${height?.[type]?.width}
    ${height?.[type]?.class}
      ${children && visible ? 'block' : 'hidden'} 
      z-30 fixed rounded-lg p-4 bg-white 
      overflow-y-auto width-mob
      transition-all duration-300
      top-2/4 left-2/4
      transform-gpu origin-bottom -translate-y-2/4 -translate-x-2/4
      motion-reduce:transition-none motion-reduce:transform-none
      ${height[type].height}
    `}
  >
    {children && (
      <>
        {' '}
        <div data-testid="dialog-header flex w-full justify-between relative">
          <div className=" flex justify-center text-xl font-semibold" data-testid="dialog-title">{title}</div>
          <div
            data-testid="dialog-close"
            role="presentation"
            onClick={() => (close())}
            className="w-6 h-6 absolute right-3 top-3 cursor-pointer z-20"
          >
            <Close />
          </div>

        </div>
        <div data-testid="dialog-content w-full">
          {children}
        </div>
      </>
    )}
  </div>
);
    }
export default Dialog;
