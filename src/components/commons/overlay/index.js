const OverLay = ({ visible }) => (
  <div
    data-testid="dt-overlay"
    className={`${visible ? 'visible' : 'invisible'}`}
  />
);

export default OverLay;
