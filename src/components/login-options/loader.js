
function loginLoader() {
  return (
    <div id="commentbox" className="w-full flex flex-col bg-white py-2">
      <div className="flex my-2">
        <div className="usrimg w-12 h-12 rounded-full mr-2 bg-gray-400" />
        <div id="commentlist" className="flex flex-col w-3/4">
          <div className=" username w-3/12 h-2 bg-gray-400 my-1 rounded-full" />
          <div className=" username w-1/2 h-2 bg-gray-400 my-1 rounded-full" />
          <div className=" username w-4/12 h-2 bg-gray-400 my-1 rounded-full" />
        </div>
        {/* <div id="commentlike" className="flex flex-col items-center">
              <div className="pb-2">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d={`M10 3.75739C12.0823 1.55973 15.2219 1.55695 17.2196 3.56716C19.2601 5.62054 19.2601
                  8.94757 17.2196 11.0009L10.5911 17.671C10.4347 17.8284 10.2219 17.917 10 17.917C9.77808 17.917
                  9.56533 17.8284 9.4089 17.671L2.78042 11.0009C0.739858 8.94757 0.739858 5.62054 2.78042 3.56716C4.77809
                  1.55695 7.91772 1.55973 10 3.75739ZM16.0374 4.74198C14.674 3.36999 12.5063 3.3636 11.0443 5.08853L11.0229
                  5.11371L10 6.14306L8.97708 5.11371L8.95573 5.08853C7.49372 3.3636 5.32605 3.36999 3.96262 4.74198C2.56802
                  6.14533 2.56802 8.42277 3.96262 9.82613L10 15.9014L16.0374 9.82613C17.432 8.42277 17.432 6.14533 16.0374 4.74198Z`}
                    fill="#161823"
                    fillOpacity="0.5"
                  />
                </svg>
              </div>
              <div className=" username w-3/4 h-2 bg-gray-400 my-1 rounded-full" />
            </div> */}
      </div>
    </div>
  );
}

export default loginLoader;

