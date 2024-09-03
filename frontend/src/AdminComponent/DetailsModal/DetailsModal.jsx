import React from 'react'

const DetailsModal = ({isopen, element, togglemodal}) => {

    if(!isopen)return null;
    const items = element.items;
    // console.log(element)

  return (
    <div className={`${isopen ? 'flex' : 'hidden'}
      overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-30 justify-center items-center w-full h-full bg-neutral-900 bg-opacity-70`}>
      <div className="bg-white p-5 rounded shadow-lg w-1/3 flex flex-col gap-5 justify-center items-center">
      {items && items.map((order , index)=>{
        return (
          <div className = "" key = {index}>
            <div className = "">{order?.name}</div>
          </div>
        )
      })}
      <div className = "text-blue-600">Orderby : <span className = "text-orange-700">{element?.userid?.firstname} {element.userid?.lastname}</span></div>
        <button onClick={togglemodal} className="bg-purple-500 hover:bg-purple-600 p-2 rounded-full w-1/2 text-white font-semibold">Close</button>
      </div>
    </div>
  )
}

export default DetailsModal