
import type {Machine} from '../Types/TypesMachine';
import {UserIcon, InformationCircleIcon, ChipIcon, TruckIcon, CheckIcon,MinusCircleIcon} from '@heroicons/react/outline';
import React, { useEffect, useState } from 'react';

export interface MachineListProperty{
    machines : Machine[],
    handlemachinesselected : (selections : string[], y : boolean) => void,
    selectedall : boolean,
    handlesetselectedall : ( y: boolean) => void
  }

export default function MachineList({machines,handlemachinesselected,selectedall, handlesetselectedall} : MachineListProperty){
    const searched_machines=machines.filter(machine=>machine.searched);
    useEffect(()=>{
      //현재 보여지는 모든 녀석이 selected이면 반드시 uncheck로 바꾼다. 참고로 false인게 check 기능 활성화이다. 참고로 true인게 uncheck 기능 활성화이다
      searched_machines.every((searched_machine)=>searched_machine.selected) && handlesetselectedall(true) })
    //searched인 머신들만 그릴 것이다.
    return (
    <div className="row-start-5 row-end-[10] flex flex-col justify-start w-full overflow-scroll h-full animate-fade-in-down">
        {<div className=" w-20 h-15 flex-col cursor-pointer" onClick={()=>{
          let idlists : string[] = [];
          machines.map((machine:Machine, index:number)=>{ machine.searched && idlists.push(machine.id)});
          handlemachinesselected(idlists,!selectedall);
          handlesetselectedall(!selectedall);
        } } >
        {!selectedall ? <><CheckIcon className="w-10 h-5 text-green-800" /><p className="text-bold text-sm">check all</p></> :<><MinusCircleIcon className="w-10 h-5 text-green-800" /><p className="text-bold text-sm">uncheck all</p></>}
        </div>
        }
        {
        searched_machines.map((machine : Machine,index : number) : JSX.Element =>(
            <div key={index} className={"h-fit min-w-[20rem] "+(machine.selected ? " bg-green-500 " : "bg-green-800 hover:bg-green-600") + " cursor-pointer text-white grid grid-rows-2 grid-cols-10"}
            onClick={()=>{handlemachinesselected([machine.id],!machine.selected)}}>
            <p className="ml-2 col-span-4 text-xs">{ `${machine.id}` } </p>
            <p className="col-span-3">{machine.car_number ? `${machine.car_number}` : "-"}</p>
            <p className="col-span-3">{machine.user ? `${machine.user!}` : "-"}</p> 
            <ChipIcon className="ml-2 col-span-4 h-5 w-5" />
            <TruckIcon className="col-span-3 h-5 w-5"/>
            <UserIcon className="col-span-3 h-5 w-5"/> 
          </div>
        ))}
    </div>
    );
}