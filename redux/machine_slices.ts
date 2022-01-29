import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { Machine } from '../components/Types/TypesMachine';
import { ListOfWhatToShowProperty } from '../components/Types/TypesWhatToShowProperty';
import { Sample_Machines } from './sample_machines';

export interface MachineSetState{
    Machines : Machine[],
}


const initialState: MachineSetState = {
  Machines : Sample_Machines.slice()
  //임시 초기값.
};


export const MachineSetSlices = createSlice({
  name: "MachineSet",
  initialState,
  reducers: {
    //createSlice로 만든 state들은 직접 그 state를 변화시켜도 된다.
    resettosample : (state : any)=>{
        state.Machines=Sample_Machines.slice();
    },
    deletesample : (state: any)=>{
        state.Machines.splice(0,state.Machines.length);
    },
    setfalsemachinesearched: (state: any, action: PayloadAction<number>) => {
        //console.log(action.payload);
        state.Machines[action.payload].searched=false;
    },
    settruemachinesearched: (state: any, action: PayloadAction<number>) => {
        //console.log(action.payload);
        state.Machines[action.payload].searched=true;
    },
    togglemachineselected: (state: any, action: PayloadAction<number>) => {

      state.Machines[action.payload].selected =
        !state.Machines[action.payload].selected;
    },

    getmachinelists_fromapiserver:(state:any,action:PayloadAction<Machine[]>)=>{
        
        //action.payload(state.Machines.push(action.payload));
//흐름이, 먼저 Machine의 목록만 먼저 가져오고,
//여기서 selected=false와 searched=true를 넣어놔야 한다.
//그리고 사이트가 휑하면 안되니깐 맨 처음 거는 true로 초기세팅해놓는다.
//물론, drawable 데이터는 텅 빈 상태이다.
    },
    getspecificmachinedata_fromapiserver:(state:any,action: PayloadAction<number>)=>{
        
        //그 다음 그 machine에 
        //여기서 데이터들을 겁나게 가져와서 

// http:// auton-iot.com /api/airkorea
// http:// auton-iot.com /api/sensor
// http:// auton-iot.com /api/gps
//machine의 gps와 drawable 항에 넣어줘야 함.
//이 getspecificmachinedata_함수는 바로 InfinityScrollCards에서 호출한다. 

    },
    removespecificmachinedata_fromnextjsserver:(state:any,action: PayloadAction<number>)=>{
        //삭제해준다.
    }
  },
});
export const { resettosample,deletesample, removespecificmachinedata_fromnextjsserver, togglemachineselected, setfalsemachinesearched, settruemachinesearched, getmachinelists_fromapiserver,getspecificmachinedata_fromapiserver} = MachineSetSlices.actions;

export default MachineSetSlices.reducer;