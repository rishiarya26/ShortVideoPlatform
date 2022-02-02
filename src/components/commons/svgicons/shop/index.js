/* eslint-disable max-len */

const Shop = ({ text, saved }) => (
  <div className="flex items-center pl-3 py-2 bg-black rounded-l-lg bg-opacity-30 mb-4">
    { (saved !== true)  ? (
      <svg className="w-8 h-8" width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.31017 3.1433C1.34111 5.11237 1.34111 8.30485 3.31017 10.2739L10.9475 17.9113L11 17.8588L11.0526 17.9113L18.69 10.274C20.659 8.30491 20.659 5.11243 18.69 3.14337C16.7209 1.1743 13.5284 1.1743 11.5594 3.14337L11.3537 3.34907C11.1584 3.54433 10.8418 3.54433 10.6465 3.34907L10.4408 3.1433C8.47172 1.17424 5.27923 1.17424 3.31017 3.1433Z" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
      : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="20"
          fill="#ff0000"
          viewBox="0 0 22 20"
        >
          <path
            stroke="#ff0000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3.31 3.143a5.042 5.042 0 000 7.13l7.637 7.638.053-.052.053.052 7.637-7.637a5.042 5.042 0 10-7.13-7.13l-.207.205a.5.5 0 01-.707 0l-.205-.206a5.042 5.042 0 00-7.131 0z"
          />
        </svg>
      )}
    <p className="px-2 text-10  text-sm font-semibold ">
      {text}
    </p>
  </div>
);
export default Shop;
