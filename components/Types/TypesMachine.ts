export interface datesandvalue{
    name : string,
    dates:string[],
    values: number[],
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