import React, { useState, useEffect, useRef } from "react";
import Close from "../../commons/svgicons/close-black";

export default function UserList({
  optimisedSearch,
  userList,
  setUserList,
  setLoading,
  setShowSuggestions,
  noUserSelectionCb,
  showUserField,
  setSuggestionListIndex,
  callback,
  userListInputRef,
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
        onClick={() => callback()}
      />
      <p
        onClick={() => {
          setSearchTerm("");
          noUserSelectionCb && noUserSelectionCb?.();
        }}
      >
        <Close />
      </p>
    </div>
  );
}
