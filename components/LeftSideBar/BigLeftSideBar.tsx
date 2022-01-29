import React, { useEffect } from 'react';
import { indextowords, LengthOfAirKorea, WhatToShowProperty} from '../Types/TypesWhatToShowProperty';
import { ListOfWhatToShowProperty } from '../Types/TypesWhatToShowProperty';
export interface HandleWhatToShowProperty{
  handlewhattoshowproperty : (index : string)=>void,
  whattoshowproperty : WhatToShowProperty,
}


export default function BigLeftSideBar({handlewhattoshowproperty, whattoshowproperty} :  HandleWhatToShowProperty) {

  return (
    <div className="sticky top-0 left-0 h-screen overflow-auto grid grid-cols-1 w-full justify-items-stretch border border-white">

      {ListOfWhatToShowProperty.map((whattoshow: string, index: React.Key) => (
        <div
          key={index}
          className={
            "cursor-pointer translate duration-200 " +
      (whattoshowproperty[whattoshow]
        ? "bg-green-500 "
        : "bg-green-800 hover:bg-green-600 ")
             +
            " text-white text-center"
          }
          onClick={() => {
            handlewhattoshowproperty(whattoshow);
          }}
        >
          {indextowords(whattoshow)}
        </div>
      ))}
    </div>
  );
}

// {buttonarray.map((buttontext, index) => (
//   <button key={index} className="text-center items-stretch bg-green-800 hover:bg-green-600  text-white">
//     { buttontext }
//   </button>
// ))}