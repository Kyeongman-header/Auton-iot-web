import { configureStore } from '@reduxjs/toolkit';
import { Context, MakeStore,createWrapper } from 'next-redux-wrapper';
import machineSetSlices from './machine_slices';
import TokenSlices from './token_slices';
import {AnyAction, Store, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
//configureStore를 사용한 이상 쓸 필요가 없다.


export const store=configureStore({
    reducer:{
        machines: machineSetSlices,
        token: TokenSlices
    },
})
// 이 부분은 공식문서에서 추천하는 방식을 그대로 따랐다.
export type RootState=ReturnType<typeof store.getState>;
export type AppDispatch=typeof store.dispatch;

// 이 부분은 NEXT.JS의 SSR에서도 REDUX를 사용하게 하기 위함이다.
const makeStore: MakeStore<Store<RootState,AnyAction>> = () => {return store;};
export const wrapper = createWrapper(makeStore,{debug: true});

