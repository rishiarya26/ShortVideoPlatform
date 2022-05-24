import React from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';

const FeedTabs = ({ items = [], router }) => {
  const selected = router?.query?.id;

  // console.log(items[0].path)
  return (
    <div className="h-2 p-1 flex items-center text-white justify-center">
      { items.map((data, id) => (
        <React.Fragment key={id}>
          <Link href={`/feed/${data.path}`}>
            <h2 className={data.path === selected ? 'font-bold ' : ''}>{data.display}</h2>
          </Link>
          { id < items.length - 1 ? <pre> | </pre> : '' }
        </React.Fragment>
      )) }
    </div>
  );
};

export default withRouter(FeedTabs);
