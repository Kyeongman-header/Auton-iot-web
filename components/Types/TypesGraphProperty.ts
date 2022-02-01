import { OneGpsState } from "../../redux/forgps_slices";
import { datesandvalue } from "./TypesMachine";
import { WhatToShowProperty } from "./TypesWhatToShowProperty";


export interface GraphProperty{
    //이차원 배열로, WhatToShow에서 지정된 요소들을 전부 그래프로 그려준다.
    id : string,
    datesandvalue_props :datesandvalue[],
    gps:string[],
    gps_date:string[],
    ismap : boolean,
    pub_date : string[],
    WhatToShowProperty: WhatToShowProperty,
    handlepub_date:(gte : Date, lte : Date)=>void,
    loading:boolean,
    onegpsstate:OneGpsState,
}