import React from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';

const Tabs = ({ items, router }) => {
  const selected = router.pathname.slice(6);
  return (
    <div className="h-2 p-1 flex items-center text-white justify-center">
      { items?.length && items.map((data, id) => (
        <>
          <Link classname="font-bold " href={`/feed/${data.path}`}>
            <button className={data.path === selected ? 'font-bold ' : ''}>{data.display}</button>
          </Link>
          { id < items.length - 1 ? <span>&nbsp; | &nbsp;</span> : '' }
        </>
      )) }
    </div>
  );
};

export default withRouter(Tabs);
