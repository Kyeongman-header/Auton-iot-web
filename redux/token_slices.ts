import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface TokenState{
    login : Boolean,
    token : string,
}
const initialState: TokenState={ // 반드시 initialState라는 이름이어야 한다.
    login:true,
    token: "",
}

export const TokenSlices=createSlice(
    {
        name: 'Token',
        initialState,
        reducers:{
            settoken:(state :any, action: PayloadAction<string>)=>{
                //login 시에는 token을 넣어주고 logout 시에는 token을 ""로 초기화해주면 알아서 된다.
                //그리고 로그아웃은 deleter에서 해줘야 한다. 최상위 루트에서 useEffect를 이용해서 처리한다.
                state.login=!state.login;
                state.token=action.payload;
            },
        },
    }
)
export const { settoken} = TokenSlices.actions;

export default TokenSlices.reducer;

