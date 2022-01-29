import { datesandvalue } from "./TypesMachine";


export interface GraphProperty{
    //이차원 배열로, WhatToShow에서 지정된 요소들을 전부 그래프로 그려준다.
    datesandvalue :datesandvalue[],
    gps:string[],
    gps_date:string[],
    ismap : boolean,
}