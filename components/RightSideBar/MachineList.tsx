
import type {Machine} from '../Types/TypesMachine';
import {UserIcon, InformationCircleIcon, ChipIcon, TruckIcon} from '@heroicons/react/outline';
import React from 'react';

export interface MachineListProperty{
    machines : Machine[],
    handlemachinesselected : (selection : number) => void,
  }

export default function MachineList({machines,handlemachinesselected} : MachineListProperty){
    machines=machines.filter(machine=>machine.searched);
    //searched인 머신들만 그릴 것이다.
    return (
    <div className="row-start-5 row-end-[10] flex flex-col justify-start w-full overflow-scroll h-full animate-fade-in-down">
 
        {
        machines.map((machine : Machine,index : number) : JSX.Element =>(
            <div key={index} className={"h-[8rem] min-w-[20rem] "+(machine.selected ? " bg-green-500 " : "bg-green-800 hover:bg-green-600") + " cursor-pointer text-white grid grid-rows-2 grid-cols-10"}
            onClick={()=>{handlemachinesselected(index)}}>
            <p className="ml-2 col-span-4 text-xs">{ `${machine.id}` } </p>
            <p className="col-span-2">{`${machine.car_number}`}</p>
            <p className="col-span-4">{`${machine.user!}`}</p> 
            <ChipIcon className="ml-2 col-span-4 h-5 w-5" />
            <TruckIcon className="col-span-2 h-5 w-5"/>
            <UserIcon className="col-span-4 h-5 w-5"/> 
          </div>
        ))}
    </div>
    );
}