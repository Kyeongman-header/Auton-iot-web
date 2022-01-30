import { X448KeyPairKeyObjectOptions } from "crypto";


export interface datesandvalue{
    name : string,
    dates:string[],
    values: any[], // null을 담을 수 있어야 함(chart)
}


export interface Machine{
    id : string,
    car_number: string,
    user? : string,
    selected : boolean,
    searched : boolean,
    drawable : datesandvalue[],
    gps:string[],
    gps_dates:string[],
}