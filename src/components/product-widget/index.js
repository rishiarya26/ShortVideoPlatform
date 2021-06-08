import ImageComp from '../commons/image';
import Close from '../commons/svgicons/close-white';

function ProductWidget({ shopCards, handleSaveLook }) {
  return (
    <div className="flex w-full bg-gray-900 bg-opacity-50 h-24 justify-between items-center p-2">
      <div className="flex flex-col">
        <div className="flex text-xs text-white mb-2">
          Products you can buy | 3 items
        </div>
        <div className="flex">
          { shopCards?.length > 0 && shopCards.map((data, id) => (
            <div key={id} className="w-14 h-14 mr-4 rounded-md bg-gray-500">
              <ImageComp data={data} title="card" height={120} width={120} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex p-4">
        <div
          className="flex rounded-full h-10 w-10 bg-hipipink justify-center items-center text-white"
          onClick={handleSaveLook}
        >
          <Close />
        </div>
      </div>
    </div>
  );
}

export default ProductWidget;
