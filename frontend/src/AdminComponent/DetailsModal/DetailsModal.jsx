import React from 'react'

const DetailsModal = ({isopen, element, tooglemodal}) => {

    if(!isopen)return null;
    const items = element.items[0];
    console.log(items);

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-opacity-50">
      <div className="bg-white p-5 rounded shadow-lg w-1/3">
        <button onClick={tooglemodal} className="text-right mb-2">Close</button>
            {/* {for(const Items in element){

            }} */}
      </div>
    </div>
  )
}

export default DetailsModal