/* eslint-disable max-len */

const Shop = ({ text }) => (
  <div className="flex items-center px-2 py-2 bg-hipipink rounded-l-lg bg-opacity-30">
    { text !== 'saved' ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="20"
        fill="none"
        viewBox="0 0 22 20"
      >
        <path
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3.31 3.143a5.042 5.042 0 000 7.13l7.637 7.638.053-.052.053.052 7.637-7.637a5.042 5.042 0 10-7.13-7.13l-.207.205a.5.5 0 01-.707 0l-.205-.206a5.042 5.042 0 00-7.131 0z"
        />
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
    <p className="w-12 text-10 px-2 text-sm font-medium leading-4">
      {text}
    </p>
  </div>
);
export default Shop;
