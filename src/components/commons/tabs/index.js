import React from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';

const Tabs = ({ items = [], router }) => {
  const selected = router.query.id;

  return (
    <div className="h-2 p-1 flex items-center text-white justify-center">
      { items.map((data, id) => (
        <>
          <Link href={`/feed/${data.path}`}>
            <span className={data.path === selected ? 'font-bold ' : ''}>{data.display}</span>
          </Link>
          { id < items.length - 1 ? <pre> | </pre> : '' }
        </>
      )) }
    </div>
  );
};

export default withRouter(Tabs);
