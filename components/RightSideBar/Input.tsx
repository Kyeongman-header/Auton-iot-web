import { RootState } from '../../redux/store';
//redux 사용을 위한  state type

import { useSelector, useDispatch } from 'react-redux';
// redux의 사용을 위한 훅.

import type { Machine } from '../Types/TypesMachine';
// redux actions.
//onClick={() => dispatch(addmachine("Test"))} 사용법 참고.
export interface MachineListProperty{
  machines : Machine[],
  handlemachinessearched : (selection : number, y: boolean) => void
}

import {SearchIcon} from "@heroicons/react/solid"
import React from 'react';

export default function Input({machines, handlemachinessearched} : MachineListProperty){
    return (
      <div className="row-start-3 row-end-4 translate duration-200 grid grid-cols-[repeat(13,_minmax(0,_1fr))] h-[50px] min-w-fit">
          <input
          className="rounded border-green-800 border-[6px] hover:border-green-600 focus:border-green-500  w-full col-start-2 col-end-11"
            type="text"
            placeholder="모듈 일련번호, 차량번호, 유저 아이디로 검색"
            onChange={(event) => {
              machines.map((machine : Machine, index : number) =>{
                // console.log("machine " + index.toString() + " " + (machine.user!=undefined && machine.user?.includes(event.target.value.toString())) + " " + machine.car_number.includes(event.target.value.toString()) + " " + machine.id.includes(event.target.value.toString()));
                if ((machine.user!=undefined && machine.user?.includes(event.target.value.toString())) || (machine.car_number && machine.car_number.includes(event.target.value.toString())) || (machine.id.includes(event.target.value.toString())) )
                {
                handlemachinessearched(index, true);
                }
                else
                {
                  handlemachinessearched(index,false);
                }
                
                
              })

            }}
          />
        <SearchIcon className=" w-8 h-8 col-start-12 col-end-13 self-center justify-self-center text-green-800 hover:text-green-500" />
      </div>
    );
}