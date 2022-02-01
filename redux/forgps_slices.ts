import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { datesandvalue } from '../components/Types/TypesMachine';

export interface latlng{
    lat : number,
    lng:number
}
export interface gps{
    latlng:latlng,
    gps_date:string,
}
export interface OneGpsState{
    gps : gps[],
    datesandvalue: datesandvalue[],
    id : string,
}
export interface ForGpsState{
    OneGpsStates:OneGpsState[],
}

const initialState: ForGpsState={ // 반드시 initialState라는 이름이어야 한다.
    OneGpsStates:[],
}

export const ForGpsSlices=createSlice(
    {
        name: 'ForGps',
        initialState,
        reducers:{
            addGpsSlices:(state :any, action: PayloadAction<OneGpsState>)=>{
                //login 시에는 token을 넣어주고 logout 시에는 token을 ""로 초기화해주면 알아서 된다.
                //그리고 로그아웃은 deleter에서 해줘야 한다. 최상위 루트에서 useEffect를 이용해서 처리한다.
                state.OneGpsStates.push( action.payload);
            },
            removeGpsSlices:(state:any, action:PayloadAction<string>)=>{
                let index : number = 0;
                    for (let onegpsstate of state.OneGpsStates)
                    {
                    if (action.payload === onegpsstate.id)
                    {
                        break;
                    }
                    index = index +1;
                }
                state.OneGpsStates.splice(index,1);
            }
        },
    }
)
export const { addGpsSlices,removeGpsSlices} = ForGpsSlices.actions;

export default ForGpsSlices.reducer;
