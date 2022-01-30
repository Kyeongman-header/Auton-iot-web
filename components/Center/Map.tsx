import {Wrapper,Status} from '@googlemaps/react-wrapper';
import { useState } from 'react';


export interface MapProperty{
    gps : string[],
    gps_date : string[],
}

export default function Map( {gps,gps_date } : MapProperty)
{
    const [mapdata,setmapdata]=useState<[string[],string[]]>([gps,gps_date]);
    return (
        <>
        {gps.map((g, index) => {
    return (
      <div key={index} className="">
        {g}
      </div>
    );
  })}
        </>
    );
}