import React from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';

const Tabs = ({ items = [], router }) => {
  const selected = router.asPath;

  return (
    <div className="flex items-center w-full text-gray-400 justify-center font-semibold">
      { items.map((data, id) => (
<<<<<<< HEAD
        <div
          key={id}
          className={data.path === selected
            ? 'text-black border-b-2 border-black w-1/2 flex justify-center align-center py-2'
            : ' py-2 w-1/2 flex justify-center align-center'}
        >
          <Link href={`${data.path}`}>
=======
        <Link href={`${data.path}`}>
        <div key={id} className={data.path === selected ?
         'text-black border-b-2 border-black w-1/2 flex justify-center align-center py-2' :
          ' py-2 w-1/2 flex justify-center align-center'}>
          
>>>>>>> 8bc03b5e3ac903da084dca9f6bc52ed1d8184a93
            <span className={data.path === selected ? 'text-black ' : ''}>{data.display}</span>
     
        </div>
        </Link>
      )) }
    </div>
  );
};

export default withRouter(Tabs);
