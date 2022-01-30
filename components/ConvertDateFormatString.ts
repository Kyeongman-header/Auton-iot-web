import { stringify } from "querystring";


export default function convertDateFormatString(pub_date : string){

    //"2021-12-22T11:37:09+09:00",
    
        let DateAndTime : string[]=pub_date.split('T')
    let Year_Month_Date=DateAndTime[0].split('-')
    
    let Hour_Minute_Second=DateAndTime[1].split(':')


    let Year=Year_Month_Date[0]
    let Month=Year_Month_Date[1]
    let Date=Year_Month_Date[2]
    let Hour=Hour_Minute_Second[0]
    let Minute=Hour_Minute_Second[1]
    let Second=Hour_Minute_Second[2].split(".")[0]

    let full_dateformatstring=(Year+"-"+Month+"-"+Date+" "+Hour+":"+Minute+":"+Second);


    return full_dateformatstring
}