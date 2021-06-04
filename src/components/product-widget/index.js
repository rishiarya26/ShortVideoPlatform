import Close from '../commons/svgicons/close-white';

function ProductWidget(props) {
  return (
    <div className="flex w-full bg-gray-900 bg-opacity-50 h-24 justify-between items-center p-2">
              <div className="flex flex-col">
                <div className="flex text-xs text-white mb-2">
                  Products you can buy | 3 items
                </div>
                <div className="flex">
                  <div className="w-14 h-14 rounded-md bg-gray-500">

                  </div>
                </div>
              </div>
              <div className="flex p-4">
                <div className="flex rounded-full h-10 w-10 bg-hipipink justify-center items-center text-white"><Close/></div>
              </div>
          </div>
  );
}

export default ProductWidget;
