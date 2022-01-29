import Image from 'next/image';
import type {GraphProperty} from '../Types/TypesGraphProperty';

import React, { MouseEvent,  useState,useRef, useEffect} from 'react';

export default function Graph ( { datesandvalue ,ismap, gps, gps_date}  : GraphProperty) {
    const [screengraph, setscreengraph] = useState<Boolean>(false);
    //datesandvalue.map((d,_)=>(console.log(d.name)));
    return (
      <div
      title="클릭하여 확대하기"
        className={
          " z-50 cursor-pointer rounded-lg w-full justify-self-stretch bg-slate-300 row-start-2 row-end-6 col-start-3 col-end-9  transition ease-in-out " +
          (screengraph
            ? " scale-150 sm:shadow-all_height md:shadow-all_width"
            : " duration-300 hover:shadow-lg hover:scale-105")
        }
        onClick={() => {
          setscreengraph(!screengraph);
        }}
      >
        <div className="grid grid-cols-1">
          {ismap ? gps.map((g,index)=>{return (<div key={index}>{g}</div>)}): datesandvalue.map((d, index) => {
            return (
              <div key={index} className="grid grid-cols-3">
                <div>{d.name}</div>
                <div>{d.dates.length + " "}</div>
                <div>{d.values.length + " "}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
}