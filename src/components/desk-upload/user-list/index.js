import React, { useState, useEffect, useRef } from "react";
// import Close from "../commons/svgicons/close-black";

const Close = () => (
  <svg viewBox="0 0 24 24" fill="black" width="20px" height="20px">
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);

export default function UserList({
  optimisedSearch,
  userList,
  setUserList,
  setLoading,
  loading,
  setShowSuggestions,
  noUserSelectionCb,
  showUserField,
  setSuggestionListIndex,
  setShowUserField,
  callback,
  userListInputRef
}) {
  const [searchTerm, setSearchTerm] = useState("");
  console.log(userList, "userList");
  // const inputRef = useRef(userListInputRef);

  useEffect(() => {
    if (userListInputRef.current) {
      userListInputRef.current.focus();
    }
  }, [showUserField]);

  const handleChange = (e) => {
    let { value } = e.target;
    optimisedSearch(
      value,
      setUserList,
      setLoading,
      "users",
      setShowSuggestions
    );
    setSuggestionListIndex(0);
    setSearchTerm(value);
  };
  return (
    <div className="flex justify-between">
      <input
      id="userInput"
        ref={userListInputRef}
        autoFocus
        className="w-full border-none focus:outline-none"
        value={searchTerm}
        onChange={handleChange}
        placeholder="friends"
        onClick={(e)=>{
          console.log('coming inside clickable field inner', e.currentTarget, searchTerm);
          callback()
        }}
      />
      <p
        onClick={() => {
          setSearchTerm("");
          noUserSelectionCb && noUserSelectionCb?.();
        }}
      >
        <Close />
      </p>
      {/* {userList?.length > 0 &&
        userList?.map((item, index) => {
          return <div>{item.userId}</div>;
        })} */}
    </div>
  );
}
