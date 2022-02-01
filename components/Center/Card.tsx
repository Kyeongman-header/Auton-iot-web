import Graph from './Graph';
import type {CardProperty} from '../Types/TypesCardProperty';
import { indextowords, ListOfWhatToShowProperty, WhatToShowProperty } from '../Types/TypesWhatToShowProperty';
import React,{useRef, useEffect,useState} from 'react';
import {UserIcon, InformationCircleIcon, ChipIcon, TruckIcon, MapIcon, PresentationChartBarIcon as OutlinePresentationChartBarIcon, MinusCircleIcon, DocumentDownloadIcon, CalendarIcon} from '@heroicons/react/outline';
import {MapIcon as SolidMapIcon,PresentationChartBarIcon as SolidPresentationChartBarIcon, MinusCircleIcon as MinusCircleIconsolid, DocumentDownloadIcon as SolidDocumentDownloadIcon } from '@heroicons/react/solid'
import type { MutableRefObject,MouseEventHandler } from 'react';
import type {datesandvalue, Machine} from '../Types/TypesMachine';
import type { GraphProperty } from '../Types/TypesGraphProperty';
import { useRouter } from 'next/router'
import xlsx from 'xlsx';

import "react-datepicker/dist/react-datepicker.css";//datepicker랑 쌍으로 붙어다니는 놈이다.
import { setAutoFreeze } from 'immer';
import convertDateFormatString from '../ConvertDateFormatString';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { OneGpsState } from '../../redux/forgps_slices';

export interface CardsProperty{
  onegpsstate:OneGpsState,
    Machine: Machine,
    WhatToShowProperty: WhatToShowProperty,
    handlewhattoshowproperty : (index : string)=>void,
    buttonsrefs : MutableRefObject<HTMLDivElement[]>,
    handlemachinesselected : (selectids : string[], y:boolean) =>void,
    pub_date : string[],
    handlepub_date:(gte : Date, lte : Date)=>void,
    loading : boolean,
}



export default function Cards({
  onegpsstate,
  Machine,
  WhatToShowProperty,
  handlewhattoshowproperty,
  buttonsrefs,
  handlemachinesselected,
  pub_date,
  handlepub_date,
  loading,
}: CardsProperty) {
  // const refs=useRef<HTMLDivElement[]>([]);
  // function sleep(ms : number) {
  //     return new Promise((r) => setTimeout(r, ms));
  //   }
  //임시로 자기 자신 누를때만 fade in, fade out이 작동하게 하였음.
  //-------------------------------------

  


  const [startDate, endDate] = pub_date;

  
  
  const zip = (rows: [string[], number[]]) =>
    rows[0].map((_, c) => rows.map((row) => row[c]));
  const zip_2 = (rows: [string[], string[]]) =>
    rows[0].map((_, c) => rows.map((row) => row[c]));

  const [mapiconmouseon, setmapiconmouseon] = useState<boolean>(false);
  const [graphiconmouseon, setgraphiconmouseon] = useState<boolean>(false);
  const [minusiconmouseon, setminusiconmouseon] = useState<boolean>(false);
  const [downloadiconmouseon, setdownloadiconmouseon] =
    useState<boolean>(false);
 
  const [map, setmap] = useState<boolean>(false);
  return (
    <div className="grow grid grid-rows-6 grid-cols-10 h-screen border-y animate-fade-in-down duration-300 ">
      <div className="row-start-1 row-end-7 col-start-1 col-end-3"></div>
      <div className="overflow-auto row-start-1 row-end-2 col-start-3 col-end-9 grid">
        <div className="self-stretch grid grid-rows-3 justify-items-stretch items-center">
          <div className="row-start-1 row-end-3  flex flex-wrap justify-between">
            <div
              title="현재 목록에서 삭제"
              className="w-fit h-5 self-center cursor-pointer flex duration-300 hover:scale-110 ml-3"
              onClick={() => {
                handlemachinesselected([Machine.id], false);
              }}
              onMouseOver={() => {
                setminusiconmouseon(true);
              }}
              onMouseLeave={() => {
                setminusiconmouseon(false);
              }}
            >
              {!minusiconmouseon ? (
                <MinusCircleIcon className="w-5 h-5 self-center" />
              ) : (
                <MinusCircleIconsolid className="w-5 h-5 self-center" />
              )}
              <h1 className="text-justify whitespace-pre text-xl font-bold self-center">
                {map
                  ? "  차량 Iot 모듈 운행 정보"
                  : "  차량 Iot 모듈 공기질 그래프"}
              </h1>
            </div>
            <div
              title={
                map ? "데이터 차트로 보기" : "내가 다닌 미세먼지 road map 보기"
              }
              onMouseOver={() => {
                setmapiconmouseon(true);
                setgraphiconmouseon(true);
              }}
              onMouseLeave={() => {
                setmapiconmouseon(false);
                setgraphiconmouseon(false);
              }}
              onClick={() => {
                setmap(!map);
              }}
              className="w-10 h-10 cursor-pointer duration-300 hover:scale-110 mr-3"
            >
              {!map ? (
                !mapiconmouseon ? (
                  <MapIcon className="w-10 h-10 " />
                ) : (
                  <SolidMapIcon className="w-10 h-10" />
                )
              ) : !graphiconmouseon ? (
                <OutlinePresentationChartBarIcon className="w-10 h-10 " />
              ) : (
                <SolidPresentationChartBarIcon className="w-10 h-10" />
              )}
            </div>
          </div>
          <div className="row-start-3 row-end-4 flex flex-row md:justify-between items-center flex-wrap">
            <div className="flex flex-row justify-items-start">
              {Machine.user && (
                <>
                  <UserIcon className="h-5 w-5" />
                  <p className="ml-1 text-base mr-1">{Machine.user}</p>
                </>
              )}

              {Machine.car_number && (
                <>
                  <TruckIcon className="h-5 w-5" />
                  <p className="ml-1 text-base">{Machine.car_number}</p>
                </>
              )}
              <ChipIcon className="ml-1 text-base h-5 w-5" />
              <p className="ml-1 text-base">{Machine.id}</p>
            </div>
            <div className="flex cursor-pointer justify-items-start">
              
              <div
                title="엑셀(.xlsx) 파일 다운로드"
                className="h-5 w-5 duration-300 hover:scale-125 cursor-pointer mr-1"
                onMouseOver={() => {
                  setdownloadiconmouseon(true);
                }}
                onMouseLeave={() => {
                  setdownloadiconmouseon(false);
                }}
                onClick={() => {
                  const wb = xlsx.utils.book_new();

                  let arrofarr: [string[], string[]] = [
                    Machine.gps_dates,
                    Machine.gps,
                  ];
                  const newarrofarr = zip_2(arrofarr);
                  var ws = xlsx.utils.aoa_to_sheet(newarrofarr);
                  xlsx.utils.book_append_sheet(wb, ws, "gps");

                  Machine.drawable.map((draw, index) => {
                    let name = indextowords(draw.name);
                    let arrofarr: [string[], number[]] = [
                      draw.dates,
                      draw.values,
                    ];
                    const newarrofarr = zip(arrofarr);
                    var ws = xlsx.utils.aoa_to_sheet(newarrofarr);
                    xlsx.utils.book_append_sheet(wb, ws, name);
                  });

                  xlsx.writeFile(
                    wb,
                    Machine.id + "_" + pub_date[0] + "_" + pub_date[1] + ".xlsx"
                  );
                }}
              >
                {downloadiconmouseon ? (
                  <SolidDocumentDownloadIcon className="h-fit w-fit duration-300" />
                ) : (
                  <DocumentDownloadIcon className="h-fit w-fit duration-300" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Graph
      id={Machine.id}
      onegpsstate={onegpsstate}
        datesandvalue_props={Machine.drawable}
        ismap={map}
        gps={Machine.gps}
        gps_date={Machine.gps_dates}
        pub_date={pub_date}
        handlepub_date={handlepub_date}
        WhatToShowProperty={WhatToShowProperty}
        loading={loading}
      />
      {/* 이 밑의 overflow 제어 부분 주목. 저렇게 해야 온전히 다 스크롤 박스 안에 표현됨. */}
      <div className="overflow-scroll mb-1  mt-3 row-start-6 row-end-7 col-start-2 col-end-10 flex flex-wrap flex-row justify-start content-center items-center">
        {ListOfWhatToShowProperty.map(
          (whattoshowproperty: string, index: number) => {
            return (
              WhatToShowProperty[whattoshowproperty] && (
                <div
                  title="클릭하여 지우기"
                  key={index}
                  ref={(el) =>
                    ((buttonsrefs.current as HTMLDivElement[])[index] =
                      el as HTMLDivElement)
                  }
                  className=" animate-fade-in-down bg-green-700 mt-2 ml-1 rounded-lg w-fit h-fit cursor-pointer text-center leading-loose text-xs md:text-sm text-white whitespace-pre hover:scale-105 hover:opacity-60 "
                  onClick={async () => {
                    // refs.current[index]?.classList.remove('animate-fade-in-down')
                    // refs.current[index]?.classList.add('opacity-100')
                    // refs.current[index]?.classList.add('animate-fade-out-down')
                    // await sleep(300);
                    // refs.current[index]?.classListx.remove('animate-fade-out-down')
                    //아까는 분명 됬었는데 지금은 또 안되네...
                    handlewhattoshowproperty(whattoshowproperty);
                  }}
                >
                  {"    " + indextowords(whattoshowproperty) + "    "}
                </div>
              )
            );
          }
        )}
      </div>
      <div className="row-start-1 row-end-7 col-start-9 col-end-11"></div>
    </div>
  );
}