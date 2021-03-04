const OverLay = ({ visible = false }) => (
  <div
    data-testid="dt-overlay"
    className={`${visible ? 'visible' : 'invisible'}`}
  />
);

export default OverLay;
