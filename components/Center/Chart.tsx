import { datesandvalue } from "../Types/TypesMachine";
import { ResponsiveLine } from '@nivo/line';
import { useEffect, useState } from "react";
import { X448KeyPairKeyObjectOptions } from "crypto";
import { WhatToShowProperty } from "../Types/TypesWhatToShowProperty";
import {EmojiSadIcon} from "@heroicons/react/outline";
import * as d3 from 'd3';

export interface ChartProperty{
    datesandvalue :datesandvalue[],
    dayorhour : boolean,
    zero : boolean,
    second: boolean,
}

interface XY{
    x: any,
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
  return dayorhour ? now.getFullYear().toString()+"-"+(now.getMonth()+1).toString()+"-"+now.getDate().toString() : now.getFullYear().toString()+"-"+(now.getMonth()+1).toString()+"-"+now.getDate().toString()+" "+now.getHours().toString()+"시";
}

function convertdata(datesandvalue : datesandvalue[], dayorhour : boolean,second:boolean){
    let data : chartform[] = [];
  //second 항목이라면 완전히 다른 방식으로 접근해야 한다.
  //일단 second라면 이녀석은 linear 데이터이다.
  //data 역시 linear 데이터로 잡는다. 그리고 x축을 datesandvalue의 date의 getTime()으로 한다.
  if(second)
  {datesandvalue.map((dav, dav_index) => {
    let xy: XY[] = [];
    for (let index = 0; index < dav.dates.length; index++) {
      //let linearx=new Date(dav.dates[index]).getTime();
      let linearx=dav.dates[index];
      xy.push({ x: linearx, y: dav.values[index] });
    }
    xy.length !== 0 && data.push({ id: dav.name, color: colors[dav_index], data: xy });
  })}
     
  else {
    datesandvalue.map((dav, dav_index) => {
      let xy: XY[] = [];
      let average: number = 0;
      let now: Date = new Date(dav.dates[0]);
      let count: number = 0;
      for (let index = 0; index < dav.dates.length; index++) {
        if (
          dayorhour
            ? new Date(dav.dates[index]).getDate() !== now.getDate() || index===dav.dates.length-1
            : new Date(dav.dates[index]).getDate() !== now.getDate() || new Date(dav.dates[index]).getHours() !== now.getHours() || index===dav.dates.length-1
        ) {
          let time = converter(dayorhour, now);
          xy.push({ x: time, y: average });

          average = 0;
          now = new Date(dav.dates[index]);
          count = 0;
        }
        count = count + 1;
        average = (average * (count - 1) + dav.values[index]) / count;
      }
      let newchartform: chartform = {
        id: dav.name,
        color: colors[dav_index],
        data: xy,
      };
      //길이가 0인 놈은 아예 넣지도 않는다.
      xy.length !== 0 && data.push(newchartform);
    });
  }

    //airkorea와 sensor는 시간축이 다르다. 서로 어떤 시간은 있는 놈도 있고 없는 놈도 있다.
    //없는 시간대에는 그 그래프가 뚝 끊겨 있는게 맞다.
    //이것은 nivo.line에서는 holl이라고 부른다. holl을 표현하기 위해서는 해당 x값(date)는 존재하되 y값이 null이면 된다.

    //이를 위해 모든 x축(시간축)을 전부 포함하는 새로운 x축을 만들고, 현재의 data array들을 거기에 맞춰서 껴넣어야 한다(y값이 없으면 null로.)
    //우선 x축들을 전부 포함하는 중복없는 시간축 배열 temp_dates를 만든다.
    let temp_dates: string[] = [];
    //unique array만 뽑아내는 반복문.
    data.map((d, index) => {
      d.data.map((xy, index) => {
        temp_dates.push(xy.x);
      });
      const uniqueArr = temp_dates.filter((element, index) => {
        return temp_dates.indexOf(element) === index;
      });
      temp_dates = uniqueArr;
    });

    //이제 temp_dates를 시간 순서대로 정렬한다.
    temp_dates.sort(function (a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      let year="";
      let month="";
      let date="";
      let hour="";
      let newa : Date;
      let newb : Date;
      if(second)
      {

        newa = new Date(a);
        newb = new Date(b);
      }
      else{
      if(dayorhour)
      {
        year = a.split("-")[0];
      month = a.split("-")[1];
      date = a.split("-")[2];
      

      newa = new Date(year+"-" + month + "-" + date);

      year = b.split("-")[0];
      month = b.split("-")[1];
      date = b.split("-")[2];
      
      newb = new Date(year+"-" + month + "-" + date);
      }
      else{
        year = a.split(" ")[0].split("-")[0];
      month = a.split(" ")[0].split("-")[1];
      date = a.split(" ")[0].split("-")[2];
      hour = a.split(" ")[1].substring(0,a.split(" ")[1].length-1);
      

      newa = new Date("2022-" + month + "-" + date + " " + hour + ":00:00");

      year = b.split(" ")[0].split("-")[0];
      month = b.split(" ")[0].split("-")[1];
      date = b.split(" ")[0].split("-")[2];
      hour = b.split(" ")[1].substring(0,b.split(" ")[1].length-1);
      
      newb = new Date("2022-" + month + "-" + date + " " + hour + ":00:00");
      }
      
      }
      //시간까지 포함하여 정렬하려면 getDate가 아니라 getTime인 점 주의.
      return newa.getTime() - newb.getTime();
    });

    //이제 temp_dates는 오름차순으로 정렬된 모든 date들을 다 포함하는 배열이다.
    //이제 temp_temp_xy라는 급하게 만든 XY 배열을 만든다.
    //x축은 무조건 temp_dates이고, y축은 data들을 보면서 있는 놈은 현재 값을 넣고 없는 놈은 null을 넣어야 한다.
    data.map((d, index) => {
      let temp_temp_xy: XY[] = [];

      temp_dates.map((td, td_index) => {
        let flag = true;
        d.data.map((xy, index) => {
          if (xy.x === td) {
            flag = false;
            temp_temp_xy.push({ x: td, y: xy.y });
          }
        });
        flag && temp_temp_xy.push({ x: td, y: null });
      });
      //이제 data에는 새롭게 수정된 xy배열을 넣는다.
      d.data = temp_temp_xy.slice();
      //혹시 모르니(복잡한 포인터 문제) temp_temp_xy는 일부러 값도 완전히 초기화를 해준다.
      temp_temp_xy.splice(0, temp_temp_xy.length);
    });
    return data;
}

const MyResponsiveLine = ({ second, data,linearorpoint } : any) => {
  let xScale:any={};
  if(linearorpoint==='linear' && data)
  {
    xScale = {
      type: "point",
      min:'auto',
    };
  }
  else{
    xScale={
      type:'point',
    }
  }
  console.log(second);
  
    
  return (<ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 80, left: 60 }}
        xScale={xScale}
        //xFormat="time:%Y-%m-%d"
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

        //second인 경우 렌더링의 성능 저하가 극심하므로 쓸데없는 효과들은 빼준다.
        animate={second? false : true}
        isInteractive={second? false : true}
        useMesh={second? false : true}
        enablePoints={second? false:true}
        enableGridX={second? false: true}
        //enableGridY={second? false: true}
        axisBottom={second? null:{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -68,
        }}
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
        colors={{ scheme: 'category10' }}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        
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
    );
      }

//dayorhour -> false가 기본값, 시간 데이터.
export default function Chart({datesandvalue,dayorhour,zero,second} : ChartProperty)
{
    const [nothingtoshow, setNothingToShow] =useState<boolean>(true);
    const [data, setData]=useState<chartform[]>([]);
    useEffect(()=>{
      setData(zero ? [] : convertdata(datesandvalue,dayorhour,second));
    },[datesandvalue,dayorhour]);

    useEffect(()=>{
      (zero || data.length===0) ? setNothingToShow(true) : setNothingToShow(false);

    //console.log(data);
    },);
    return (
      <>
        {nothingtoshow ? (
          <div className="flex flex-col justify-center items-center">
            <EmojiSadIcon className="w-10 h-10" />
            <p className="text-center text-sm">
              데이터가 존재하지 않습니다. 그래프 속성을 추가하시거나, 날짜를
              새롭게 지정하세요.
            </p>
          </div>
        ) : (
          <MyResponsiveLine
            second={second}
            data={data}
            linearorpoint={second ? "linear" : "point"}
          />
        )
        }
      </>
    );
}