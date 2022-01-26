import Image from 'next/image';
import type {GraphProperty} from '../Types/TypesGraphProperty';

import React, { MouseEvent,  useState} from 'react';

export default function Graph ( { graphproperty }  : {graphproperty :GraphProperty}) {
    const [screengraph, setscreengraph] = useState<Boolean>(false);
    return (
      <div
        className={
          "rounded-lg w-full justify-self-stretch bg-slate-300 row-start-2 row-end-6 col-start-3 col-end-9  transition ease-in-out " +
          (screengraph
            ? " scale-150 z-50"
            : " hover:shadow-lg hover:scale-105 duration-300 cursor-pointer")
        }
        onClick={() => {
          setscreengraph(!screengraph);
        }}
      >
        
      </div>
    );
}