export interface WhatToShowProperty{
    //중요! index를 string으로 넣어서 찾을 수 있게 해주는 index signiture 기술.
    [index : string] : Boolean,
   AverageOrWorst : Boolean, // PM25가 FALSE인 경우 무시되는 PROPERTY.
   PM25:Boolean,
   TEMPERATURE : Boolean,
   HUMIDITY:Boolean,
   CO2:Boolean,
   KHAI:Boolean,
   CO:Boolean,
   SO2:Boolean,
   NO2:Boolean,
   O3:Boolean,
}
export const ListOfWhatToShowProperty =['PM25','TEMPERATURE','HUMIDITY','CO2','KHAI','CO','SO2','NO2','O3'];