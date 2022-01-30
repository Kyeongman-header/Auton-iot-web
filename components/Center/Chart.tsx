import { datesandvalue } from "../Types/TypesMachine";
import { ResponsiveLine } from '@nivo/line';
import { useEffect, useState } from "react";
import { X448KeyPairKeyObjectOptions } from "crypto";
import { WhatToShowProperty } from "../Types/TypesWhatToShowProperty";
import {EmojiSadIcon} from "@heroicons/react/outline";
import { xorBy } from "lodash";

export interface ChartProperty{
    datesandvalue :datesandvalue[],
    dayorhour : boolean,
    zero : boolean,
}

interface XY{
    x: string,
    y: any,
}
interface chartform{
    id : string,
    color: string,
    data : XY[],
}
//['KHAI','PM25_2','CO','SO2','NO2','O3','PM25','TEMPERATURE','HUMIDITY','CO2'];
const colors = ["hsl(100, 5%, 5%)","hsl(111, 10%, 10%)","hsl(63, 15%, 15%)","hsl(130, 20%, 20%)","hsl(100, 25%, 25%)","hsl(100,30%,30%)","hsl(100,35%,35%)","hsl(100,40%,40%)","hsl(100,46%,46%)","hsl(100,78%,58%)"]
function converter(dayorhour:boolean,now:Date)
{
  return dayorhour ? (now.getMonth()+1).toString()+"."+now.getDate().toString() : (now.getMonth()+1).toString()+"."+now.getDate().toString()+"/"+now.getHours().toString();
}

function convertdata(datesandvalue : datesandvalue[], dayorhour : boolean){
    let data : chartform[] = [];
    let prevdates : Date[] = [];
    let nowdates : Date[] = [];
    datesandvalue.map((dav,dav_index) =>{
        let previndex=0;
        let nowindex=0;
        let xy : XY[] =[];
        let average : number = 0;
        let now : Date=new Date(dav.dates[0]);
        let count : number =0;
        for (let index=0;index<dav.dates.length;index++)
        {
          
          //dates를 보며 시간/day가 변할 때마다 now를 바꾸고 average를 xy에다가 넣는다.
          //이때 모든 data가 x축은 통일하되 y축 값은 null로 해도 된다.
          //따라가면서 바로 이전 date를 보고 만약 거기에 없는 값이 들어가는 거라면 위치를 보고 앞뒤 본 다음에 앞의 데이터에 x는 해당 타임라인값을, y는 null을 넣어주면 된다.

          if(dayorhour ? new Date(dav.dates[index]).getDate()!==now.getDate() : new Date(dav.dates[index]).getHours()!==now.getHours())
          {
              
              
              // else // 그냥 정상적으로 똑같을 때.
              {
                // previndex=previndex+1;
                // nowindex=nowindex+1;
                let time=converter(dayorhour,now);
                //data[dav_index].data.splice(nowindex,0,{x:converter(dayorhour, now),y: average});
              xy.push({x:time,y:average})
              }
              nowindex=nowindex+1;
              nowdates.push(now);

              average=0;
              now=new Date(dav.dates[index]);
              count=0;

          }
          count=count+1;
          average=(average*(count-1)+dav.values[index])/count;
        }
        let newchartform : chartform = {id : dav.name, color:colors[dav_index],data : xy};
        //길이가 0인 놈은 아예 넣지도 않는다.
        xy.length!==0 && data.push(newchartform);
        prevdates=nowdates.slice();
    })

    let temp_dates : string[] = [];
    //unique array만 뽑아냄.
    data.map((d,index)=>{
      
      d.data.map((xy,index)=>{
        temp_dates.push(xy.x);
      })


      const uniqueArr = temp_dates.filter((element, index) => {
        return temp_dates.indexOf(element) === index;
    });
      temp_dates=uniqueArr;
    })

    
    temp_dates.sort(function(a,b){
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      let month=a.split('.')[0];
      let date=a.split('.')[1].split('/')[0];
      let hour=a.split('.')[1].split('/')[1];
      let newa=new Date("2022-"+month+"-"+date+" "+hour+":00:00");
      month=b.split('.')[0];
      date=b.split('.')[1].split('/')[0];
      hour=b.split('.')[1].split('/')[1];
      let newb=new Date("2022-"+month+"-"+date+" "+hour+":00:00");
      return new Date(newa).getTime()- new Date(newb).getTime() ;
    });
    
    //이제 temp_dates는 오름차순으로 정렬된 모든 date들을 다 포함하는 배열이다.
    // let temp_xy : XY[]=[];
    // for(let i =0; i<temp_dates.length; i++)
    // {
    //   let newxy : XY={x:temp_dates[i],y:null};
    //   temp_xy.push(newxy);
    // }
    
    //이제 temp_xy는 모든 date들을 다 포함하는, XY 배열이다.
    //이녀석이 근본적으로 모든 놈들의 탬플릿이 된다.
    console.log(temp_dates);
    data.map((d,index)=>{
      let temp_temp_xy : XY[] = [];
      
      
      temp_dates.map((td,td_index)=>{
        console.log(d);
        console.log(td);
        let flag=true;
        console.log(flag);
        d.data.map((xy,index)=>{
          
          if(xy.x===td)
          {
            flag=false;
            temp_temp_xy.push({x:td,y:xy.y});
          }
          
        })
        console.log(flag);
        flag && temp_temp_xy.push(
          {x:td,y:null}
        )
      })
      
      d.data=temp_temp_xy.slice();
      temp_temp_xy.splice(0,temp_temp_xy.length);
    })

    console.log(data);

    return data;
}

const MyResponsiveLine = ({ data } : any) => (
    <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: false,
            reverse: false
        }}
        
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        // axisBottom={{
        //     orient: 'bottom',
        //     tickSize: 5,
        //     tickPadding: 5,
        //     tickRotation: 0,
        //     legend: 'transportation',
        //     legendOffset: 36,
        //     legendPosition: 'middle'
        // }}
        // axisLeft={{
        //     orient: 'left',
        //     tickSize: 5,
        //     tickPadding: 5,
        //     tickRotation: 0,
        //     legend: 'count',
        //     legendOffset: -40,
        //     legendPosition: 'middle'
        // }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
)

//dayorhour -> false가 기본값, 시간 데이터.
export default function Chart({datesandvalue,dayorhour,zero } : ChartProperty)
{
    const [nothingtoshow, setNothingToShow] =useState<boolean>(true);
    const [data, setData]=useState<chartform[]>([]);
    useEffect(()=>{
      setData(zero ? [] : convertdata(datesandvalue,dayorhour));
    },[datesandvalue]);
    useEffect(()=>{
      
      (zero || data.length===0) ? setNothingToShow(true) : setNothingToShow(false);
      
    console.log(data);
    },);

    return (
      <>
        {nothingtoshow ? (<div className="flex flex-col justify-center items-center" ><EmojiSadIcon className="w-10 h-10"/><p className="text-center text-sm">데이터가 존재하지 않습니다. 그래프 속성을 추가하시거나, 날짜를 새롭게 지정하세요.</p></div>) : <MyResponsiveLine data={data}/>}
        </>
    );
}