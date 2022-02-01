import Input from './Input';
import type {Machine} from '../Types/TypesMachine';
import MachineList from './MachineList';
import {ViewGridAddIcon} from '@heroicons/react/outline';


export default function SmallSearchBar()
{
        return (
            <div title="차량 추가 및 삭제하기" className="sticky top-0 right-0 h-full grid grid-cols-1 grid-rows-5  w-full">
            <div className="row-span-2 bg-white rounded"></div>
            <div className="row-start-3 row-end-4 bg-green-800 row-span-2 self-center justify-self-center flex items-center font-bold h-full rounded-full  cursor-pointer duration-300 hover:scale-105 hover:opacity-80">
                <ViewGridAddIcon className="h-10 w-10 text-white" />
            </div>
            <div className="row-span-2 bg-white rounded h-full"></div>
          </div>
    );   
}