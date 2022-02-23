export interface WhatToShowProperty{
    //중요! index를 string으로 넣어서 찾을 수 있게 해주는 index signiture 기술.
    [index : string] : boolean,
    KHAI:boolean,
    PM25_AIRKOREA:boolean,
    CO:boolean,
    SO2:boolean,
    NO2:boolean,
    O3:boolean,
   PM25:boolean,
   PM25_2:boolean,
   TEMPERATURE : boolean,
   HUMIDITY:boolean,
   CO2:boolean,

}
export const sample_whattoshowproperty={

    KHAI:true,
    PM25_AIRKOREA:false,
    CO:false,
    SO2:false,
    NO2:false,
    O3:false,
   PM25:true,
   PM25_2:false,
   TEMPERATURE : false,
   HUMIDITY:false,
   CO2:false,
}

//이 배열이 상당히 중요함!! datesandvalue에서 name 배열을 전부 얘로 해줘야 한다는 점 잊지 말고.
//근데 그러면 weeks이런 데이터들은 어카지...?
//이거 걔네들도 추가시켜야 할듯. hour, day, week으로.
export const ListOfWhatToShowProperty =['KHAI','PM25_AIRKOREA','CO','SO2','NO2','O3','PM25','PM25_2','TEMPERATURE','HUMIDITY','CO2'];
export const LengthOfListOfWhatToShowProperty=ListOfWhatToShowProperty.length;
export const LengthOfAirKorea=7;
export const indextowords=(index : string)=>{
    switch(index){
        case ListOfWhatToShowProperty[0] : 
            return "한국대기질지수";
        case ListOfWhatToShowProperty[1] :
            return "실외 초미세먼지 농도";
        case ListOfWhatToShowProperty[2] :
            return "실외 일산화탄소 농도";
        case ListOfWhatToShowProperty[3] :
            return "실외 이산화황 농도";
        case ListOfWhatToShowProperty[4] :
            return "실외 이산화질소 농도";
        case ListOfWhatToShowProperty[5] :
            return "실외 오존 농도";
        case ListOfWhatToShowProperty[6] :
            return "차량내 초미세먼지 농도";
        case ListOfWhatToShowProperty[7] :
            return "차량외부 초미세먼지 농도";
        case ListOfWhatToShowProperty[8] :
            return "차량내 온도";
        case ListOfWhatToShowProperty[9] :
            return "차량내 습도";
        case ListOfWhatToShowProperty[10] :
            return "차량내 이산화탄소 농도";
        
    }
}