import { gps, latlng } from "../redux/forgps_slices";
// "SRID=4326;POINT (127.1458908 37.5003147)",
//(lng,lat)
// 여기서 데이터 정렬과 invalid 값 제거도 해준다.
export default function gpstomapagps (gpss :string[],gps_dates : string[]) : gps[]{
    let latlng : string = "";
    let lat : number = 0;
    let lng : number = 0;
    let templatlng : latlng[]=[];
    let tempgps : gps[] = [];

    gpss.map((gps,index)=>{
        latlng=gps.split(";")[1];
        lng=Number(latlng.split(" ")[1].substring(1));
        lat=Number(latlng.split(" ")[2].substring(0,latlng.split(" ")[2].length-1));
        templatlng.push({lat:lat,lng:lng});
    })
    gps_dates.map((gps_date,index)=>{
        tempgps.push({latlng:templatlng[index],gps_date:gps_date})
    })
    let temp_tempgps = tempgps.filter((tg,index,array)=>{
        return (tg.latlng.lng<=132) && (tg.latlng.lng>=124) && (tg.latlng.lat<=43) && (tg.latlng.lat>=33)
    })

    temp_tempgps.sort(function(a,b){
        //시간까지 포함하여 정렬하려면 getDate가 아니라 getTime인 점 주의.
        return new Date(a.gps_date).getTime()- new Date(b.gps_date).getTime() ;
     });
    
    
    return (temp_tempgps);
}