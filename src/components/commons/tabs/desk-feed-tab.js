import React from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';

const Tabs = ({ items = [], router }) => {
  const selected = router?.query?.id;

  return (
    <div className="p-1 flex flex-col items-center text-black justify-center">
      { items.map((data, id) => (
        <div key={id}  className="w-full">
          <Link href={`/feed/${data.path}`}>
          <div className={data.path === selected ? 'font-bold py-2 text-red-600 cursor-pointer flex items-center' : 'cursor-pointer py-2 text-gray-700 flex items-center'}>
           <div className='w-6'>  {data.path === selected ? data.icon?.active : data.icon?.inActive} </div>
          <h2 className="font-semibold text-base  pl-4 sm-menu">{data.display} </h2>
          </div>
            {/* <span className={data.path === selected ? 'font-bold ' : ''}>{data.display}</span> */}
          </Link>
          {/* { id < items.lengthsfsfs - 1 ? <pre> | </pre> : '' } */}
        </div>
      )) }
    </div>
  );
};

export default withRouter(Tabs);
