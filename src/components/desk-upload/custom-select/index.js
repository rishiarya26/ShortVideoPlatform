import React, { useState } from 'react'
import DownArrowBlack from '../../commons/svgicons/down-arrow-black';
import UpArrowBlack from '../../commons/svgicons/up-arrow-black';
import styles from '../upload.module.css';

function CustomSelect({type, caption, data, value, setValue, setShowSuggestions, tabIndex }) {

  const [showList, setShowList] = useState(false);

  let comp = {
    language: (<><div className='w-full border border-gray-200 rounded-md px-3 py-2 flex justify-start'>{value.name ? value.name : 'Select language'}</div>
      <span className='absolute right-3 top-2'>
        {showList ? <UpArrowBlack /> : <DownArrowBlack />}
      </span>
      {showList && (
        <div
          id='LanguageList'
          className='bg-white absolute left-0 top-12 min-w-full text-normal text-gray-600 shadow-md rounded-lg overflow-y-scroll thin_bar flex-col max-h-72 z-1'
        >
          {data.map((item, idx) => {
            return (
              <span
                key={idx}
                className={`${
                  value.code === item.code && 'bg-gray-100'
                } px-4 py-2 cursor-pointer hover:bg-gray-100 flex justify-start`}
                onClick={() => {
                  setValue(item);
                }}
              >
                {item.name}
              </span>
            );
          })}
        </div>
      )}
    </>),
    viewPermission: (<><div className='w-full border border-gray-200 rounded-md px-3 py-2 flex justify-start'>{value}</div>
      <span className='absolute right-3 top-2'>
        {showList ? <UpArrowBlack /> : <DownArrowBlack />}
      </span>
      {showList && (
        <div
          id='LanguageList'
          className='bg-white absolute left-0 top-12 min-w-full text-normal text-gray-600 shadow-md rounded-lg overflow-y-scroll thin_bar flex-col max-h-72 z-1'
        >
          {data.map((item, idx) => {
            return (
              <span
                key={idx}
                className={`${
                  value === item && 'bg-gray-100'
                } px-4 py-2 cursor-pointer hover:bg-gray-100 flex justify-start`}
                onClick={() => {
                  setValue(item);
                }}
              >
                {item}
              </span>
            );
          })}
        </div>
    )}</>),
    editPermissions: (<><div className='relative cursor-pointer flex justify-start items-center'>
      {data.map((item, idx) => {
        return (
          <div
            key={idx}
            className='flex justify-center items-end text-sm font-medium text-gray-900 dark:text-gray-300 relative cursor-pointer'
          >
            <input
              className={`${styles.styledCheckbox} h-5 w-5 border-2 rounded-sm border-hipired mr-2 cursor-pointer`}
              id={`${item}-checkbox`}
              checked={value[item]}
              onClick={(e) => setValue(e, item)}
              type='checkbox'
            />

            <label
              className='mr-8 font-normal text-sm flex items-center'
              htmlFor={`${item}-checkbox`}
            >
              {item === 'saveToDevice' ? 'Save to device' : item}
            </label>
          </div>
        );
      })}
  </div></>)
  }

  return (
    <div className={`${type === 'editPermissions'? 'max-w-md' : 'max-w-xs'} flex flex-col relative transition duration-500 ease-in-out mb-4`}>
      <p className={`text-base font-medium text-gray-700 pb-2 pl-1 ${type === 'language' ? 'requiredField': ""}`}>
        {caption}
      </p>
      <button
        tabIndex={tabIndex}
        className='relative cursor-pointer'
        onClick={() => {
          setShowList((prev) => !prev);
          setShowSuggestions && setShowSuggestions(false);
        }}
        onBlur={() =>setShowList(false)}
      >
        {comp?.[type]}
      </button>
    </div>
  )
}

export default CustomSelect;