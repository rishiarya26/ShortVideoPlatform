import React, { memo, useEffect, useRef, useState } from 'react';
import UserList from '../user-list';
import debounce from 'lodash.debounce';
import { getUserSuggestions } from '../../../sources/explore/user-suggestion';
import Img from '../../commons/image';
import fallbackUser from '../../../../public/images/users.png';
import { getSuggestions as getHashtagSuggestions } from '../../../sources/explore/hashtag-suggestion';

async function search(
  searchTerm,
  setSuggestions,
  setLoading,
  check,
  setShowSuggestions
) { 
  /* eslint-disable no-param-reassign */
  setLoading(true);
  try {
    const trimmedTerm =
      searchTerm.indexOf('#') === 0 || searchTerm.indexOf('@') === 0
        ? searchTerm?.substring(1)
        : searchTerm;
    let response;
    if (check === 'users') {
      response = await getUserSuggestions(trimmedTerm);
    } else {
      response = await getHashtagSuggestions(trimmedTerm);
    }

    const originalSugg = response?.data || [];
    if (response.status === 'success') {
      // console.log('OO', originalSugg, topResp);
      setSuggestions(originalSugg);
      setShowSuggestions(true);
      setLoading && setLoading(false);
    }
  } catch (e) {
    console.log('suggestions error', e);
    setLoading && setLoading(false);
  }
}

const optimisedSearch = debounce(search, 500);

function DeskCaption({
  InputRefCaption,
  closePopup,
  showSuggestions,
  setShowSuggestions,
  tabIndex,
  discard,
  setDiscard
  // uploadingStatus,
  // videoFileName,
}) {
  const [showUserField, setShowUserField] = useState(false);
  const [suggestionListIndex, setSuggestionListIndex] = useState();
  const [userList, setUserList] = useState([]);
  const [hastagList, setHashtagList] = useState([]);
  const [userListloading, setUserListloading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [captionLength, setCaptionLength] = useState(0);

  // Refs
  const myRefs = useRef([]);
  const inputRef = useRef();
  const searchSuggRef = useRef();
  const userListInputRef = useRef();

  useEffect(() => {
    const closeDrop = (e) => {
      console.log(e?.path?.[0]);
      if (
        e.path[0] !== inputRef?.current &&
        e.path[0] !== searchSuggRef?.current &&
        e.path[0] !== InputRefCaption?.current &&
        e.path[0] !== userListInputRef?.current
      ) {
        closeDropdown();
      }
    };
    document.body.addEventListener('click', closeDrop);
    return () => document.body.removeEventListener('click', closeDrop);
  }, []);

  // useEffect(() =>{
  //   if(uploadingStatus){   
  //     const fileName = videoFileName.split(".")[0] || "";
  //     const input = InputRefCaption.current;
  //     input.querySelectorAll('.current').forEach((el) => {
  //       el.classList.remove('current');
  //     });
  //     let spanElemParent = document.createElement('span');
  //     ;
  //     spanElemParent.classList.add('emptySpan');
  //     spanElemParent.classList.add('current');
  //     spanElemParent.setAttribute('contentEditable', true);
  //     spanElemParent.innerHTML = `${fileName}`;
  //     input.innerHTML = input.innerHTML.replace(/(\s+)?.$/, '');
  //     input?.appendChild(spanElemParent);
  //     setCaptionLength(prevState => prevState + fileName?.length)
  //     toFocus();
  //   }
  // },[uploadingStatus])

  useEffect(() => {
    if(discard) {
      setCaptionLength(0);
      setDiscard(false);
    }
  },[discard])

  function closeDropdown() {
    setShowSuggestions(false);
  };

  const handleSearchTerm = (e) => {
   
    const input = InputRefCaption.current;
    if(input.innerHTML === '') {
      setCaptionLength(0)
    }
    if(captionLength >= 200) {
      e.preventDefault()
      return false;
    }

    closePopup && closePopup(); //TODO
    const hasHashinSpan = input?.querySelector('.current');
    // const hasEmptySpan = input?.querySelectorAll('.emptySpan');
    console.log(e.keyCode);

    if (e.which === 64) {
      e.preventDefault();
      let spanElemParent = document.createElement('span');
      input.querySelectorAll('.current').forEach((el) => {
        el.classList.remove('current');
      });
      spanElemParent.classList.add('mentions');
      spanElemParent.classList.add('current');
      spanElemParent.setAttribute('contentEditable', true);
      spanElemParent.innerHTML = ``;
      input.innerHTML = input.innerHTML.replace(/(\s+)?.$/, '');
      input?.appendChild(spanElemParent);
      setCaptionLength(prevState => prevState + 1)
      setShowUserField(true);
    }

    if (e.which === 35) {
      e.preventDefault();
      input.querySelectorAll('.current').forEach((el) => {
        el.classList.remove('current');
      });
      let spanElemParent = document.createElement('span');
      ;
      spanElemParent.classList.add('emptySpan');
      spanElemParent.classList.add('current');
      spanElemParent.setAttribute('contentEditable', true);
      spanElemParent.innerHTML = `#`;
      input.innerHTML = input.innerHTML.replace(/(\s+)?.$/, '');
      input?.appendChild(spanElemParent);
      setCaptionLength(prevState => prevState + 1)
      toFocus();
    }

    if (
      (e.which === 32 ||
        e.which !== 13 ||
        (e.which >= 97 && e.which <= 122) ||
        (e.which >= 65 && e.which <= 90)) &&
      e.which !== 35
    ) {
      setTimeout(() => {
        if (hasHashinSpan?.classList?.contains('current')) {
          if (
            hasHashinSpan?.innerHTML?.charAt(0) === '#' &&
            hasHashinSpan?.innerHTML?.length >= 3 &&
            hasHashinSpan?.innerHTML !== ''
          ) {
            //optimisedSearch.cancel();
            optimisedSearch(
              hasHashinSpan?.innerHTML,
              setHashtagList,
              setLoading,
              'dd',
              setShowSuggestions
            );
            setSuggestionListIndex(0);
          } else {
            setShowSuggestions(false);
          }
        }
      }, 200);
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === 'Backspace') {
      setCaptionLength(InputRefCaption?.current?.innerText.length)
    }
  };

  const handleDeleteAction = (event, targetElem, suggestionsSelectedIndex) => {
    //setShowSuggestions(false);
    // e.preventDefault();
    const input = InputRefCaption.current;
    const hasHashinSpan = input?.querySelector('.current');
    //const hasEmptySpan = input.querySelectorAll('.emptySpan');
    if(input.innerHTML === '') {
      setCaptionLength(0)
    }
    if(event?.which === 32){

    }

    if (hasHashinSpan?.innerHTML && event?.which === 13) {
      event.preventDefault();
      if (
        suggestionsSelectedIndex !== undefined &&
        suggestionListIndex !== null
      ) {
        hasHashinSpan.innerHTML =
          hastagList?.[suggestionsSelectedIndex]?.hashtag;

        hasHashinSpan.classList.remove('current');
        hasHashinSpan.classList.add('valid');
        input.innerHTML = `${input.innerHTML}&#160`;
        setShowUserField(false);
        setTimeout(() => {
          toFocus();
        }, 200);
      } else {
        handleSearch(hasHashinSpan.innerHTML);
      }
      inputRef && inputRef?.current?.blur();
    }

    if (suggestionListIndex !== null && suggestionListIndex !== undefined) {
      let tempSug = suggestionListIndex === 0 ? 0 : suggestionListIndex || 0;
      if (event?.key === 'ArrowUp' && targetElem) {
        tempSug = tempSug > 0 ? tempSug - 1 : 0;
        targetElem?.focus();
      } else {
        if (event?.key === 'ArrowDown' && targetElem) {
          tempSug =
            tempSug === hastagList.length - 1
              ? hastagList.length - 1
              : tempSug + 1;
          targetElem?.focus();
        }
      }
      setSuggestionListIndex(tempSug);
    } else {
      setSuggestionListIndex(0);
    }

    let s = window.getSelection(),
      r = s.getRangeAt(0),
      el = r.startContainer.parentElement;
    if (event.which == 8) {
      let s = window.getSelection(),
        r = s.getRangeAt(0),
        el = r.startContainer.parentElement;
      console.log(el, 'element');

      setTimeout(() => {
        if (el.classList.contains('current')) {
          if (
            el.innerHTML.charAt(0) === '#' &&
            el.innerHTML.length >= 3 &&
            el.innerHTML !== ''
          ) {
            //optimisedSearch.cancel();
            optimisedSearch(
              el.innerHTML,
              setHashtagList,
              setLoading,
              'dddd',
              setShowSuggestions
            );
            setSuggestionListIndex(0);
          } else {
            setShowSuggestions(false);
          }
        }
      }, 100);
      // Check if the current element is the .label
      if (el.classList.contains('valid')) {
        // Check if we are exactly at the end of the .label element
        if (
          r.startOffset == r.endOffset &&
          r.endOffset == el.textContent.length
        ) {
          // prevent the default delete behavior
          event.preventDefault();
          if (el.classList.contains('highlight')) {
            // remove the element
            el.remove();
          } else {
            el.classList.add('highlight');
          }
          return;
        }
      }
    }
    if (event.which !== 8 && event.which !== 35) {
      let s = window.getSelection(),
        r = s.getRangeAt(0),
        el = r.startContainer.parentElement;
      if (el.classList.contains('valid')) {
        event.preventDefault();
        el.classList.add('invalid');
        el.classList.remove('valid');
        return;
        // }
      }
    }
    // toFocus();
    event?.target?.querySelectorAll('span.highlight').forEach((el) => {
      el?.classList?.remove('highlight');
    });
  };

  const noUserSelection = () => {
    let currentRef = InputRefCaption.current;
    var currentChild = currentRef.querySelector('.current');
    currentChild.innerHTML = '@';
    currentChild.classList.remove('current');
    currentChild.classList.remove('mentions');
    currentChild.classList.add('invalid');
    setShowUserField(false);
    setShowSuggestions(false);
    toFocus();
  };

  function toFocus() {
    console.log('coming inside focus');
    let hashtagRange = document.createRange();
    let windowSelection = window.getSelection();
    //remove any previously created ranges
    windowSelection.removeAllRanges();
    let theNodes = InputRefCaption?.current?.childNodes;
    let firstNode = theNodes?.[0];
    // let lastNode = theNodes?.[theNodes.length - 1];
    // let start = theNodes?.[0];
    let end = theNodes?.[theNodes.length - 1];
    firstNode && hashtagRange.setStartBefore(firstNode);
    end && hashtagRange.setEndAfter(end);
    hashtagRange.collapse(false);
    //add the range to a window selection object.
    hashtagRange && windowSelection.addRange(hashtagRange);
    windowSelection.collapseToEnd();
    InputRefCaption.current.focus();
  }

  const handleUserList = (item) => {
    var currentChild = InputRefCaption?.current?.querySelector('.current');
    currentChild.innerHTML = `@${item}`;
    currentChild.classList.remove('current');
    currentChild.classList.add('valid');
    //currentChild.setAttribute('contentEditable', false);
    InputRefCaption.current.innerHTML = `${InputRefCaption?.current?.innerHTML}&#160`;
    setShowUserField(false);
    setCaptionLength(prevState => prevState + currentChild.innerText.length)
    setTimeout(() => {
      toFocus();
    }, 200);
  };

  const handleHashtagList = (item) => {
    
    var currentChild = InputRefCaption?.current?.querySelector('.current');
    var remainLength = InputRefCaption?.current?.innerText.length - currentChild.innerText.length
    setCaptionLength(remainLength);
    currentChild.innerHTML = ``;
    currentChild.innerHTML = `${item}`;
    currentChild.classList.add('valid');
    currentChild.classList.remove('current');
    //currentChild.setAttribute('contentEditable', false);
    InputRefCaption.current.innerHTML = `${InputRefCaption?.current?.innerHTML}&#160`;
    setShowUserField(false);
    setShowSuggestions(false);
    setCaptionLength(prevState => prevState + currentChild.innerText.length+1);
    setTimeout(() => {
      toFocus();
    }, 200);
  };

  function callback(){
    setShowUserField(true);
    setShowSuggestions(true);
  }

  const friendsearch = () => {
    const input = InputRefCaption.current;
    let spanElemParent = document.createElement('span');
      input.querySelectorAll('.current').forEach((el) => {
        el.classList.remove('current');
      });
      spanElemParent.classList.add('mentions');
      spanElemParent.classList.add('current');
      spanElemParent.setAttribute('contentEditable', true);
      spanElemParent.innerHTML = ``;
      input.innerHTML = input.innerHTML.replace(/(\s+)?.$/, '');
      input?.appendChild(spanElemParent);
      setCaptionLength(prevState => prevState + 1)
      setShowUserField(true);
  }

  const hashtagSearch = (e) => {
      e.preventDefault();
      const input = InputRefCaption.current;
      input.querySelectorAll('.current').forEach((el) => {
        el.classList.remove('current');
      });
      let spanElemParent = document.createElement('span');
      ;
      spanElemParent.classList.add('emptySpan');
      spanElemParent.classList.add('current');
      spanElemParent.setAttribute('contentEditable', true);
      spanElemParent.innerHTML = `#`;
      input.innerHTML = input.innerHTML.replace(/(\s+)?.$/, '');
      input?.appendChild(spanElemParent);
      setCaptionLength(prevState => prevState + 1)
      toFocus();
  }

  return (
    <div className='flex flex-col w-full relative mb-4'>
      <div className='flex justify-between items-center'>
        <p style={{color:'#171924'}} className='text-base font-medium pb-2 pl-1 caption'>
            {/* {!showUserField ? "Caption" : "@Friends"} */}
            Captions
        </p>
        {!showUserField && (
          <p className='text-sm text-gray-400 pt-2'>{captionLength}/200</p>
        )}
      </div>
      <div
        className={`${
          !showUserField ? 'pr-20' : ''
        } relative w-full border border-gray-200 rounded-md py-2 px-3`}
      >
        <div
          tabIndex={tabIndex}
          contentEditable
          ref={InputRefCaption}
          id='captionField'
          className={`${!showUserField ? 'block' : 'hidden'} w-full border-none py-1 focus:outline-none`}
          onInput={(e) => captionLength < 200 && setCaptionLength(e.currentTarget.textContent.length)}
          onKeyPress={(e) => handleSearchTerm(e, suggestionListIndex && suggestionListIndex)}
          onKeyUp={handleKeyUp}
          onPaste={(e)=>{e.preventDefault();return false;}}
          onKeyDown={(e) => handleDeleteAction(e,myRefs?.current[suggestionListIndex],suggestionListIndex)}
        ></div>

        {showUserField ? (
          <div
            ref={inputRef}
            className={`${!showUserField ? 'hidden' : 'block'}`}
          >
            <UserList
              userListInputRef={userListInputRef}
              setShowUserField={setShowUserField}
              optimisedSearch={optimisedSearch}
              userList={userList}
              setUserList={setUserList}
              loading={userListloading}
              setLoading={setUserListloading}
              setShowSuggestions={setShowSuggestions}
              noUserSelectionCb={noUserSelection}
              showUserField={showUserField}
              setSuggestionListIndex={setSuggestionListIndex}
              callback={callback}
            />
          </div>
        ) : null}
 
        {!showUserField && (
          <div className='absolute right-4 top-3 text-lg w-10 flex items-center justify-between'>
            {' '}
            <span className='cursor-pointer' onClick={friendsearch}>@</span>{" "}
            <span className='cursor-pointer' onClick={hashtagSearch}>#</span>
          </div>
        )}
        <div ref={searchSuggRef}>
          {showUserField && showSuggestions && userList.length > 0 && (
            <div
              id='userList'
              className='bg-white absolute left-0 top-12 min-w-full shadow-md rounded-lg overflow-y-scroll thin_bar flex flex-col max-h-56 z-1'
            >
              {userList?.map((item, index) => {
                return (
                  <div
                    key={index}
                    ref={(el) => (myRefs.current[index] = el)}
                    className={`${
                      index === suggestionListIndex ? 'bg-gray-100' : ''
                    } hover:bg-gray-100`}
                    onClick={() => handleUserList(item.userId)}
                  >
                    <span className='p-4 flex items-end whitespace-nowrap space-x-6 mr-12 lg:mr-0 cursor-pointer'>
                      <div className='usrimg w-10 h-10 overflow-hidden rounded-full'>
                        <Img
                          title='Hipi'
                          data={item.userIcon}
                          fallback={fallbackUser?.src}
                        />
                      </div>

                      <div className='text-sm font-normal text-gray-500'>
                        <div className='text-base font-semibold text-gray-900'>
                          {item.firstName} {item.lastName}
                        </div>
                        <div className='text-sm font-normal text-gray-500'>
                          {item.userId}
                        </div>
                      </div>
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        {!showUserField && showSuggestions && hastagList.length > 0 && (
          <div
            id='hastagList'
            className='bg-white absolute left-0 top-16 min-w-full shadow-md rounded-lg overflow-y-scroll thin_bar flex flex-col max-h-72 z-1'
          >
            {hastagList?.map((item, index) => {
              return (
                <div
                  key={index}
                  ref={(el) => (myRefs.current[index] = el)}
                  className={`${
                    index === suggestionListIndex ? 'bg-gray-100' : ''
                  } hover:bg-gray-100`}
                  onClick={() => {
                    handleHashtagList(item.hashtag);
                  }}
                >
                  <span className=' py-2 px-4 flex items-center justify-between whitespace-nowrap space-x-6 mr-12 lg:mr-0 cursor-pointer'>
                    <div className='flex items-center justify-between text-sm font-normal text-gray-500 min-w-full'>
                      <div className=' text-sm font-extralight text-red-500'>
                        {item.hashtag}
                      </div>
                    </div>
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(DeskCaption);
