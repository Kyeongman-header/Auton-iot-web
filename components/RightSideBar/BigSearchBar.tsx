import Input from './Input';
import type {Machine} from '../Types/TypesMachine';
import MachineList from './MachineList';
import { useEffect } from 'react';

export interface BigSearchBarProperty{
  machines : Machine[],
  handlemachinesselected : (selections : string[],y : boolean) => void,
  handlemachinessearched : (selection : number, y: boolean) => void,
  handleallmachinessearchedtrue : () => void,
  selectedall : boolean,
  handlesetselectedall : (y : boolean) => void,
}

export default function BigSearchBar({machines,handlemachinesselected,handlemachinessearched, handleallmachinessearchedtrue,selectedall,handlesetselectedall} : BigSearchBarProperty)
{    
    useEffect(()=>{
      handleallmachinessearchedtrue();
    },[]);
    
return (
  
  <div className=" overflow-auto sticky top-0 right-0 h-full w-full  grid grid-rows-[repeat(10,_minmax(0,_1fr))] items-center shadow bg-white translate ease-in-out">
    <div className="row-start-1 row-end-3"></div>
    <Input machines={machines} handlemachinessearched={handlemachinessearched} />
    <div className="row-start-4 row-end-5"></div>
    <MachineList machines={machines} handlemachinesselected={handlemachinesselected} selectedall={selectedall} handlesetselectedall={handlesetselectedall} />
    <div className="row-start-[10] row-end-[11]"></div>
  </div>
);   

}