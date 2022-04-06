import React from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';

const Tabs = ({ items = [], router }) => {
  const selected = router?.query?.id;

  return (
    <div className="h-2 p-1 flex flex-col items-center text-black justify-center">
      { items.map((data, id) => (
        <div key={id}  className="w-full">
          <Link href={`/feed/${data.path}`}>
          <div className={data.path === selected ? 'font-bold flex items-center' : 'flex items-center'}>
             {data.path === selected ? data.icon?.active : data.icon?.inActive} 
          <p className="font-semibold text-lg py-2 pl-4">{data.display} </p>
          </div>
            {/* <span className={data.path === selected ? 'font-bold ' : ''}>{data.display}</span> */}
          </Link>
          {/* { id < items.length - 1 ? <pre> | </pre> : '' } */}
        </div>
      )) }
    </div>
  );
};

export default withRouter(Tabs);
