import { memo } from 'react';

const CircularProgress = () => (
  // <div data-testid="circular-loader" className="ease-linear rounded-full border-8 border-t-8 border-gray-200 h-10 w-10" />
<div className="Circle_loader_search animate-spin"></div>
);

export default memo(CircularProgress);
