import { Back } from '../svgicons/back';

export const BackButton = ({ back }) => {
  const handleBackClick = () => {
    back();
  };
  return (
    <span onClick={handleBackClick}>
      <Back />
    </span>
  );
};

