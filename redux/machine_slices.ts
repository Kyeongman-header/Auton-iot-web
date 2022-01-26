import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { Machine } from '../components/Types/TypesMachine';

export interface MachineSetState{
    Machines : Machine[],
}



const initialState: MachineSetState={
    //Machines : [];
    //임시 초기값.
    Machines: [
        //api에서 데이터를 가져온 다음 각각에 대해 selected : false, searched : true를 붙여서 새로운 배열 행을 만들어 줘야 한다.
        { id: "41", car_number: "12하 1234", selected : false, searched : true },
        { id: "42", car_number: "12하 1212", user: "sky@naver.com", selected: false, searched : true },
        { id: "43", car_number: "12하 1255" , selected : false, searched : true },

      ],
}


export const MachineSetSlices = createSlice({
  name: "MachineSet",
  initialState,
  reducers: {
    //createSlice로 만든 state들은 직접 그 state를 변화시켜도 된다.

    addmachine: (state: any, action: PayloadAction<Machine>) => {
      state.Machines.push(action.payload);
    },
    setfalsemachinesearched: (state: any, action: PayloadAction<number>) => {
        console.log(action.payload);
        state.Machines[action.payload].searched=false;
    },
    settruemachinesearched: (state: any, action: PayloadAction<number>) => {
        console.log(action.payload);
        state.Machines[action.payload].searched=true;
    },
    togglemachineselected: (state: any, action: PayloadAction<number>) => {
      // let temp : Machine={...action.payload};
      // let newstate : MachineSetState={...state, Machines : [...state.Machines]};
      // temp.selected=!temp.selected;
      // newstate.Machines.map((m:Machine, index:number) :void => {
      //     if(m.id===action.payload.id)
      //     {
      //         newstate.Machines.splice(index, 1, temp)
      //     }

      // });
      // return newstate;

      state.Machines[action.payload].selected =
        !state.Machines[action.payload].selected;
    },
  },
});
export const {addmachine, togglemachineselected, setfalsemachinesearched, settruemachinesearched} = MachineSetSlices.actions;

export default MachineSetSlices.reducer;