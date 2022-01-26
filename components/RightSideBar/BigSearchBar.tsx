import Input from './Input';
import type {Machine} from '../Types/TypesMachine';
import MachineList from './MachineList';
import { useEffect } from 'react';

export interface BigSearchBarProperty{
  machines : Machine[],
  handlemachinesselected : (selection : number) => void,
  handlemachinessearched : (selection : number, y: boolean) => void,
  handleallmachinessearchedtrue : () => void
}

export default function BigSearchBar({machines,handlemachinesselected,handlemachinessearched, handleallmachinessearchedtrue} : BigSearchBarProperty)
{    
    useEffect(()=>{
      handleallmachinessearchedtrue();
    },[]);
    
return (
  
  <div className="sticky top-0 left-0 h-screen w-full border border-black  grid grid-rows-[repeat(10,_minmax(0,_1fr))] items-center shadow bg-white translate ease-in-out">
    <div className="row-start-1 row-end-3"></div>
    <Input machines={machines} handlemachinessearched={handlemachinessearched} />
    <div className="row-start-4 row-end-5"></div>
    {/* <div className="self-stretch row-start-5 row-end-[9] bg-black">hi</div> */}
    <MachineList machines={machines} handlemachinesselected={handlemachinesselected} />
    <div className="row-start-[10] row-end-[11]"></div>
  </div>
);   

}