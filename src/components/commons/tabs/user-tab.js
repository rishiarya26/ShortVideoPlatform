import React from 'react';
import { withRouter } from 'next/router';

const UserTab = ({
  items = [], selected, onTabChange, onLikedVideosTab
}) =>
//   const selected = router.asPath;

  (
    <div className="flex items-center w-full text-gray-400 justify-center font-semibold">
      { items.map((data, id) => (

        <div
          key={id}
          onClick={() => onTabChange(data?.type)}
          className={data?.type === selected
            ? 'text-black border-b-2 border-black w-1/2 flex justify-center align-center py-2 cursor-pointer'
            : ' py-2 w-1/2 flex justify-center align-center cursor-pointer'}
        >
          <span className={data?.type === selected ? 'text-black ' : ''}>{data?.icon}</span>

        </div>
      )) }
    </div>
  );
export default withRouter(UserTab);
