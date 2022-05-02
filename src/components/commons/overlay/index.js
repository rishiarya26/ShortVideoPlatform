const OverLay = ({ visible = false }) => (
  <div
    data-testid="dt-overlay"
    className={`${visible ? 'visible' : 'invisible'}
    bg-black overlay-z-index opacity-70 fixed inset-0 overflow-y-auto w-full h-full`}
  />
);

export default OverLay;
