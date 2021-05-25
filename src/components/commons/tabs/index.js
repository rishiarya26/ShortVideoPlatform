import React from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';

const Tabs = ({ items = [], router }) => {
  const selected = router.asPath;

  return (
    <div className="h-2 p-1 flex items-center text-gray-400 justify-center">
      { items.map((data, id) => (
        <div key={id} className="w-32 flex justify-center align-center">
          <Link href={`${data.path}`}>
            <span className={data.path === selected ? 'text-black border-b-2 border-black' : ''}>{data.display}</span>
          </Link>
        </div>
      )) }
    </div>
  );
};

export default withRouter(Tabs);
