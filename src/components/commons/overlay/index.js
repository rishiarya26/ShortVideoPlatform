const OverLay = ({ visible = false, compClose }) => (

  <div
    data-testid="dt-overlay"
    className={`${visible ? 'visible' : 'invisible'}
    bg-black overlay-z-index opacity-70 fixed inset-0 overflow-y-auto w-full h-full`}
    {...(compClose && {onClick: compClose})}
  />
);

export default OverLay;
