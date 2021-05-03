export default function detectOperatingSystemModal({ handleOperatingsystem }) {
  return (
    <>
      <div className="m-20">{handleOperatingsystem()}</div>
    </>
  );
}
