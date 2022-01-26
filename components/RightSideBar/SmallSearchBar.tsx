import Input from './Input';
import type {Machine} from '../Types/TypesMachine';
import MachineList from './MachineList';
import {ViewGridAddIcon} from '@heroicons/react/outline';


export default function SmallSearchBar()
{
        return (
            <div className="sticky top-0 left-0 h-screen grid grid-cols-1 grid-rows-5  w-full cursor-pointer hover:animate-pulse">
            <div className="bg-green-800 rounded"></div>
            <div className="bg-white row-span-2 self-center justify-self-center font-bold">
                <ViewGridAddIcon className="h-10 w-10 text-slate-500" />
            </div>
            <div className="row-span-2 bg-green-800 rounded h-full"></div>
          </div>
    );   
}