import { useState } from 'react';
import { debounce } from 'lodash';
import { SubmitButton } from '../button/submit';
import useDrawer from '../../../hooks/use-drawer';
import useTranslation from '../../../hooks/use-translation';

function search(enteredValue, setFilteredData, data) {
  /* eslint-disable no-param-reassign */
  try {
    enteredValue = enteredValue?.toLowerCase();
    const filteredData = data?.filter(
      data => data?.value.toLowerCase().includes(enteredValue) || data?.code.toLowerCase().includes(enteredValue)
    );
    setFilteredData(filteredData);
  } catch (e) {
    console.log('error in search', e);
  }
}

const optimisedSearch = debounce(search, 400);

export default function ListWithSearch({ data, onValueChange, type }) {
  const [filteredData, setFilteredData] = useState(data);
  const { close } = useDrawer();
  const { t } = useTranslation();

  const info = { countryCode: { title: t('SELECT_COUNTRY'), placeholder: t('SEARCH_COUNTRY') } };

  return (
    <div className="flex flex-col w-full">
      <div className="flex w-full border-b-2 border-gray-300 relative justify-center p-4">
        <div className="font-bold">{info[type].title}</div>
      </div>
      <div className="flex px-2 py-4">
        <div className="flex w-9/12">
          <input
            id="Search"
            onChange={e => optimisedSearch(e.target.value, setFilteredData, data)}
            className=" w-full bg-gray-100 px-4 py-2 mx-2"
            type="text"
            placeholder={info[type].placeholder}
          />
        </div>
        <div className="flex w-3/12">
          <SubmitButton text="Search" />
        </div>
      </div>
      {filteredData?.map((data, id) => (
        <div
          key={id}
          id={id}
          className="flex flex-col p-2"
          onClick={e => {
            onValueChange(filteredData[e.currentTarget.id]);
            close();
          }}
        >
          <div className="flex px-2 justify-between font-medium">
            <div>{data?.value}</div>
            <div>
              {data?.code}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
