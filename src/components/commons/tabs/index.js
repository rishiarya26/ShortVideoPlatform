import React from "react"
import Link from "next/link"

const Tabs = ({ items }) => {
  return (
    <React.Fragment>
      <div className="h-2 p-1 flex items-center from-white justify-center">
          {
              items?.length && items.map((data)=>(
                <Link classname="white p-10 bold" href={`/feed/${data}`}>
                  <a>{data}</a>
                </Link>
              ))
          }
      </div>
    </React.Fragment>
  )
}

export default Tabs