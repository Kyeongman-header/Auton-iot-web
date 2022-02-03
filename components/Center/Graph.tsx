import Image from 'next/image';
import type {GraphProperty} from '../Types/TypesGraphProperty';

import React, { MouseEvent,  useState,useRef, useEffect, forwardRef, ButtonHTMLAttributes} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";//datepicker랑 쌍으로 붙어다니는 놈이다.
import {CalendarIcon,ExclamationIcon} from '@heroicons/react/outline';
import {CalendarIcon as SolidCalendarIcon, ExclamationIcon as SolidExclamationIcon} from '@heroicons/react/solid'
import { ListOfWhatToShowProperty } from '../Types/TypesWhatToShowProperty';

import Chart from './Chart';
import Map from './Map';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';


export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
    specialProp?: string;
  }
export default function Graph({
    id,//디버깅용
  datesandvalue_props,
  WhatToShowProperty,
  ismap,
  gps,
  gps_date,
  pub_date,
  handlepub_date,
  loading,
  onegpsstate,
}: GraphProperty) {
  const [screengraph, setscreengraph] = useState<Boolean>(false);
  const [calendariconmouseon, setcalendariconmouseon] =
    useState<boolean>(false);
 

  const [dateRange, setDateRange] = useState<[Date, Date]>([
    new Date(pub_date[0]),
    new Date(pub_date[1]),
  ]);

  
  //const [startDate, endDate] = dateRange;
  
  let temp_graphproperty = datesandvalue_props.slice();
  for (let whattoshowproperty of ListOfWhatToShowProperty) {
    if (!WhatToShowProperty[whattoshowproperty]) {
      temp_graphproperty = temp_graphproperty.filter(
        (drawable) => drawable.name !== whattoshowproperty
      );
      //whattoshowproperty 배열에서 false인 놈들을 하나씩 삭제시켜 준다.
    }
  }
  //const로 뭔가를 박아버리면 그 어떤 렌더링보다 가장 먼저 그 함수가 호출될때 실행되므로, 특히 props로 들어온 값들로 렌더링 할 데이터들을
  //세팅할 때 유용하다.

  

  const datesandvalue = temp_graphproperty;
  const [zero,setzero]=useState<boolean>(datesandvalue.length===0);
  const doh=pub_date[0] && pub_date[1] && new Date(pub_date[1]).getDate()-new Date(pub_date[0]).getDate() >6 ? true : false;
  const [dayorhour, setdayorhour]=useState<boolean>(doh);
  const [second, setsecond] = useState<boolean>(false);
  const [nothingtoshow, setNothingToShow] =useState<boolean>(true);
  
  const [mouseoncautionicon, setMouseoncautionicon]=useState<boolean>(false);
  const [secondloading,setSecondloading]=useState<boolean>(false);
  //const [isportrait,setisportrait]=useState<boolean>(false);
  // const resizeHandler=async()=>{
  //   if (window.innerWidth <= window.innerHeight && !isportrait) {
  //     // Portrait 모드일 때 실행할 스크립트
  //     setisportrait(true);
  //     setSecondloading(true);
  //     await sleep(500);
  //     setSecondloading(false);

  //   } else if(window.innerWidth >= window.innerHeight && isportrait) {
  //     // Landscape 모드일 때 실행할 스크립트
  //     setisportrait(false);
  //     setSecondloading(true);
  //     await sleep(500);
  //     setSecondloading(false);
  //   }
  // }
//   useEffect(() => {
//     //as EventListener를 주의할 것.
//좋은 시도이긴 했는데 해보니 모바일에서 너무 자주 loading이 된다.
//     window.addEventListener('resize',resizeHandler );
//     return () => {
//         window.removeEventListener('resize',resizeHandler);
//     };
// }, []);

useEffect(()=>{
    // console.log(id);
    // console.log(pub_date);
    // console.log(dateRange);
    // console.log(id +" " + startDate);
    // console.log(id +" " +endDate);
    setDateRange([new Date(pub_date[0]),new Date(pub_date[1])]);
},[loading])

 

  const CalendarInput = forwardRef<HTMLButtonElement,ButtonProps>((props: React.DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, ref: React.Ref<HTMLButtonElement>)=> {
    return (
      <button
        ref={ref}
        title="날짜 선택하기"
        className={"h-10 w-60 mr-1 duration-300 hover:scale-105 " + (nothingtoshow ? " animate-bounce hover:animate-none " : " animate-none ")}
        onMouseOver={() => {
          setcalendariconmouseon(true);
        }}
        onMouseLeave={() => {
          setcalendariconmouseon(false);
        }}
        onClick={props.onClick}
      >
        <div className="flex content-center justfiy-center items-center">
          {!calendariconmouseon ? (
            <CalendarIcon className="w-10 h-10" />
          ) : (
            <>
              <SolidCalendarIcon className="w-10 h-10" />
              
            </>
          )}
          {props.value}
        </div>
      </button>
    );
});
CalendarInput.displayName='Example';
function sleep(ms : number) {
  return new Promise((r) => setTimeout(r, ms));
}

  return (
    <div
    title="클릭하여 확대하기"
      className={
        "min-w-[500px] rounded-lg w-full justify-self-stretch bg-slate-300 row-start-2 row-end-6 col-start-3 col-end-9  transition ease-in-out overflow-auto " //이거 md랑 sm 속성이 먹히려면 sm 속성을 sm안붙이고 지정한 다음 md 속성에 원하는 걸 넣어야 하나보다.
      +(screengraph ? " overflow-visible " : " overflow-y-auto ")}
    >
      <div className="flex flex-col h-full">
        <div className=" w-full h-fit flex flex-wrap justify-between justify-items-center items-center">
          <div className="w-fit ml-2">
            <DatePicker
              selectsRange={true}
              startDate={dateRange[0]}
              endDate={dateRange[1]}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              popperPlacement="top-start"
              customInput={<CalendarInput />}
              onChange={(update: any) => {
                setDateRange(update);

                update[0] && update[1] && handlepub_date(update[0], update[1]);
              }}
            />
          </div>
          <div className="flex flex-wrap">
            <div
              title="컴퓨터 렉 주의"
              className={
                (second
                  ? "bg-slate-500 text-white mr-1"
                  : " bg-inherit text-inherit ") +
                " rounded-full  self-center flex justify-center items-center duration-300 h-8  " +
                (ismap ? "cursor-default" : " hover:shadow-md cursor-pointer")
              }
              onMouseOver={() => {
                !ismap && setMouseoncautionicon(true);
              }}
              onMouseLeave={() => {
                !ismap && setMouseoncautionicon(false);
              }}
              onClick={async () => {
                !ismap && setsecond(!second);
                !ismap && setSecondloading(true);
                await sleep(1000);
                !ismap && setSecondloading(false);
              }}
            >
              {mouseoncautionicon ? (
                <SolidExclamationIcon className="w-5 h-5" />
              ) : (
                <ExclamationIcon className="w-5 h-5" />
              )}
              <p className="text-sm">&nbsp;Second &nbsp;</p>
            </div>
            <div
              className={
                (!dayorhour && !second
                  ? "bg-slate-500 text-white ml-1 mr-1"
                  : " bg-inherit text-inherit ") +
                " flex justify-center items-center w-fit h-8 rounded-full duration-300 text-sm " +
                (ismap ? " cursor-default " : " hover:shadow-md cursor-pointer")
              }
              onClick={async () => {
                !ismap && setdayorhour(false);
                !ismap && setsecond(false);
                !ismap && setSecondloading(true);
                await sleep(1000);
                !ismap && setSecondloading(false);
              }}
            >
              {"\u00a0\u00a0Hour\u00a0\u00a0 "}
            </div>
            <div
              className={
                (dayorhour && !second
                  ? "bg-slate-500 text-white ml-1"
                  : " bg-inherit text-inherit ") +
                " flex justify-center items-center w-fit h-8 rounded-full duration-300 text-sm " +
                (ismap ? " cursor-default " : " hover:shadow-md cursor-pointer")
              }
              onClick={async () => {
                !ismap && setdayorhour(true);
                !ismap && setsecond(false);
                !ismap && setSecondloading(true);
                await sleep(1000);
                !ismap && setSecondloading(false);
              }}
            >
              {"\u00a0\u00a0Day\u00a0\u00a0 "}
            </div>
          </div>
        </div>
        {/* 저기서 grid가 아니라 flex로 하면, google map이 아예 안 그려지는 사건이 발생하니 주의!!! flex는 자체적인 width가 없음!!*/}
        <div
          className={
            "md:max-h-full grow grid grid-cols-1 bg-white rounded-lg cursor-pointer duration-300 border justify-content-center min-w-[30rem] max-h-full" +
            (screengraph
              ? " scale-150 sm:shadow-all_height md:shadow-all_width z-[100]"
              : !ismap
              ? "  "//" hover:drop-shadow-lg hover:scale-95"
              : " ")
          }
          onClick={() => {
            !ismap && setscreengraph(!screengraph);
          }}
        >
          {loading || secondloading ? (
            <div className="justify-self-center self-center h-full w-[500px] flex flex-col justify-center items-center animate-pulse">
              <div className="w-[50px] h-[50px]  justify-self-center text-center animate-spin spinner-border text-green-800 rounded-full"></div>
              <span>Loading...</span>
            </div>
          ) : ismap ? (
            <Map onegpsstate={onegpsstate} datesandvalue={datesandvalue} />
          ) : (
            <Chart
            nothingtoshow={nothingtoshow}
            handlesetNothingToShow={(y:boolean)=>{setNothingToShow(y)}}
              zero={zero}
              datesandvalue={datesandvalue}
              dayorhour={dayorhour}
              second={second}
            />
          )}
        </div>
      </div>
    </div>
  );
}