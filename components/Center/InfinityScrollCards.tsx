import Card from './Card';
import type {CardProperty} from '../Types/TypesCardProperty'
import { MutableRefObject, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Machine } from '../Types/TypesMachine';
import { LengthOfListOfWhatToShowProperty, ListOfWhatToShowProperty, WhatToShowProperty } from '../Types/TypesWhatToShowProperty';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import machine_slices from '../../redux/machine_slices';

export interface InfinityScrollCardsProperty{
    Machines : Machine[],
    WhatToShowProperty : WhatToShowProperty,
    handlewhattoshowproperty : (index : string)=>void,
    buttonsrefs : MutableRefObject<HTMLDivElement[]>,
    pub_date:string[],
    handlepub_date:(gte : Date, lte : Date)=>void,
    handlemachinesselected : (selectids : string[], y : boolean) => void,
    loading:boolean,
    addloading:boolean,
}


export default function InfinityScrollCards({
  Machines,
  WhatToShowProperty,
  handlewhattoshowproperty,
  buttonsrefs,
  pub_date,
  handlepub_date,
  handlemachinesselected,
  loading,
  addloading,
}: InfinityScrollCardsProperty) {
  // const test = async () => {
  //     const sensor = await fetch(
  //         `/api/auton?sort=gps&pub_date__gte=2022-01-20&pub_date__lte=2022-01-25&machine=41`,
  //         // {
  //         //   headers: {
  //         //     "Content-Type": "application/json",
  //         //     Authorization: `Token 005d516b38535a1e0b1acd0e0d61ed26d4dcb3cd`,
  //         //   },
  //         // }
  //       );
  //     //['KHAI','PM25_2','CO','SO2','NO2','O3','PM25','TEMPERATURE','HUMIDITY','CO2'];
  //       let tempdatas = await sensor.json();
  //       const D=tempdatas[0].gps
  //       console.log(D);
  // }
  // test();

  //console.log(Machines);
  //console.log(Machines.length);
  //console.log(hasMore);
  //sm:w-[600px] md:w-[900px] lg:w-[1100px]
  //여기서 w 정해주는게 문제였음.
  
  const forgps=useSelector((state: RootState)=> state.forgps.OneGpsStates);

  const MachineIdToGpsIndex=(machineid : string)=>{
    let index=0;
    for (index=0;index<forgps.length;index++)
    {
      if(forgps[index].id===machineid){
        break;
      }
    }
    return index;
  }

  return (
    <div className="grow flex flex-col h-fit">
      {Machines.map((machine, index) => {
         return addloading&&index===(Machines.length-1) ? (
           <div
             key={index}
             className="justify-self-center self-center h-screen w-[500px] flex flex-col justify-center items-center animate-pulse"
           >
             <div className="w-[50px] h-[50px]  justify-self-center text-center animate-spin spinner-border text-green-800 rounded-full"></div>
             <span>Loading...</span>
           </div>
         ) : (
           <Card
             key={index}
              onegpsstate={forgps[MachineIdToGpsIndex(machine.id)]}
             Machine={machine}
             WhatToShowProperty={WhatToShowProperty}
             handlewhattoshowproperty={handlewhattoshowproperty}
             buttonsrefs={buttonsrefs}
             handlemachinesselected={handlemachinesselected}
             handlepub_date={handlepub_date}
             pub_date={pub_date}
             loading={loading}
           />
         );
        })}
    </div>
  );
}