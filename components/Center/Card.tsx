import Graph from './Graph';
import type {CardProperty} from '../Types/TypesCardProperty';
import { ListOfWhatToShowProperty } from '../Types/TypesWhatToShowProperty';
import React from 'react';
import {UserIcon, InformationCircleIcon, ChipIcon, TruckIcon} from '@heroicons/react/outline';

export interface CardsProperty{
    cardproperty : CardProperty,
    handlewhattoshowproperty : (index : string)=>void,
}



export default function Cards ({cardproperty,handlewhattoshowproperty} :CardsProperty) {
    return (
      <div className="grid grid-rows-6 grid-cols-10 h-screen border-y">
        <div className="row-start-1 row-end-7 col-start-1 col-end-3"></div>
        <div className="row-start-1 row-end-2 col-start-3 col-end-9 grid">
          <div className="self-stretch grid grid-rows-3 justify-items-stretch items-center">
            <h1 className="row-start-1 row-end-3 text-justify whitespace-pre text-xl font-bold">
              {"차량 Iot 모듈 정보 "}
            </h1>
            <div className="row-start-3 row-end-4 flex flex-row flex-wrap justify-items-start items-center">
              {cardproperty.Machine.user && (
                <>
                  <UserIcon className="h-5 w-5" />
                  <p className="ml-1 text-base mr-1">{cardproperty.Machine.user}</p>
                </>
              )}

              <TruckIcon className="h-5 w-5" />
              <p className="ml-1 text-base">{cardproperty.Machine.car_number}</p>
              <ChipIcon className="ml-1 text-base h-5 w-5" />
              <p className="ml-1 text-base">{cardproperty.Machine.id}</p>
            </div>
          </div>
        </div>
        {/* 여기서 graph로 넘길 machine의 데이터와 안 넘길 데이터를 WhatToShowProperty를 이용해서 분류해서 넘긴다. */}
        <Graph graphproperty={cardproperty.GraphProperty} />
        <div className="row-start-6 row-end-7 col-start-3 col-end-9 flex flex-wrap flex-row justify-start content-center items-center">
          {ListOfWhatToShowProperty.map(
            (whattoshowproperty: string, index: number) =>
              cardproperty.WhatToShowProperty[whattoshowproperty] && (
                <div
                  key={index}
                  className="bg-green-700 mt-2 ml-1 rounded-lg w-fit h-fit cursor-pointer text-center leading-loose md:text-lg sm:text-base text-white whitespace-pre animate-fade-in-down duration-150 hover:scale-105 hover:opacity-60"
                  onClick={() => {
                    handlewhattoshowproperty(whattoshowproperty);
                  }}
                >
                  {"    " + whattoshowproperty + "    "}
                </div>
              )
          )}
        </div>
        <div className="row-start-1 row-end-7 col-start-9 col-end-11"></div>
      </div>
    );
}