import type { NextPage } from 'next';
//next routing을 위함.


import { RootState } from '../redux/store';
//redux 사용을 위한  state type

import { useSelector, useDispatch } from 'react-redux';
// redux의 사용을 위한 훅.

import { addmachine, togglemachineselected,settruemachinesearched,setfalsemachinesearched } from '../redux/machine_slices';
import { settoken } from '../redux/token_slices';
// redux actions.
//onClick={() => dispatch(addmachine("Test"))} 사용법 참고.

import React, { MouseEvent,  useEffect, useState, useRef, useCallback} from 'react';
//마우스 over, out을 위한 리액트 라이브러리 참조.

import SmallLeftSideBar from '../components/LeftSideBar/SmallLeftSideBar';
import BigLeftSideBar from '../components/LeftSideBar/BigLeftSideBar';
//small 상태의 leftsidebar, big 상태의 leftside bar(마우스 포인터가 올라가 있을때)

import SmallSearchBar from '../components/RightSideBar/SmallSearchBar';
import BigSearchBar from '../components/RightSideBar/BigSearchBar';

import InfinityScrollCards from '../components/Center/InfinityScrollCards';

import type {Machine} from '../components/Types/TypesMachine';
import type { CardProperty } from '../components/Types/TypesCardProperty';
import type { GraphProperty } from '../components/Types/TypesGraphProperty';
import type { WhatToShowProperty } from '../components/Types/TypesWhatToShowProperty';
import { ListOfWhatToShowProperty } from '../components/Types/TypesWhatToShowProperty';

const Home: NextPage = (props) => {
  // const [machines,setmachines] : Machine[] =[{id : "41", car_number : "12하 1234"},{id : "42", car_number : "12하 1212", user : "sky@naver.com"},{id : "43", car_number : "12하 1255"}];

  const machines = useSelector((state: RootState) => state.machines.Machines);
  const token = useSelector((state: RootState) => state.token.token);
  const dispatch = useDispatch();

  //왼쪽 사이드바와 오른쪽 사이드바의 확장 state.
  const [ExpandLeftSideBar, setExpandLeftSideBar] =
    useState<boolean>(false);
  const [ExpandRightSideBar, setExpandRightSideBar] =
    useState<boolean>(false);


    const refleft = useRef<HTMLDivElement>(null);
    const refright = useRef<HTMLDivElement>(null);

    //여기서 이벤트의 타입과 이벤트 리스너의 타입이 대환장 콜라보인데,
    //결론부터 말하자면 딱 지금처럼 쓰는게 정답이다. 그냥 외우자...
    const handleClickOutsideSideBar = (event : CustomEvent<MouseEvent>) => {
      //주의! e.target을 쓰기 위해선 as HTMLElement를 사용해야 한다.
      if (refleft.current && refright.current && !refleft.current.contains(event.target as HTMLElement) && !refright.current.contains(event.target as HTMLElement)) {
          setExpandLeftSideBar(false);
          setExpandRightSideBar(false);
      }
  };
  //문서 전체에 전역으로 click 이벤트 핸들러를 등록해주고, 그 이벤트 핸들러에서는 ref로 등록한 양쪽 사이드바 밖에서 클릭이 되었는지를 확인한다.
  //만약 양쪽 사이드 바 바깥 쪽에서 클릭이 되었다면 사이드바는 close된다.
  useEffect(() => {
    //as EventListener를 주의할 것.
    document.addEventListener('mousedown', handleClickOutsideSideBar as EventListener);
    return () => {
        document.removeEventListener('mousedown', handleClickOutsideSideBar as EventListener);
    };
}, [refleft,refright]);


  //어떤 속성을 그래프에 적용해서 표현할 것인지 state.
  const [whattoshowproperty, setwhattoshowproperty] =
    useState<WhatToShowProperty>({
      AverageOrWorst: true,
      PM25: true,
      TEMPERATURE: false,
      HUMIDITY: false,
      CO2: false,
      KHAI: false,
      CO: false,
      SO2: false,
      NO2: false,
      O3: false,
    });

    const handlemachinesselected=(selection : number )=>
    {
      dispatch(togglemachineselected(selection));
  }

  const handlewhattoshowproperty = (index: string) => {
    let temp_whattoshowproperty: WhatToShowProperty = {...whattoshowproperty};
    temp_whattoshowproperty[index] = !temp_whattoshowproperty[index];
    setwhattoshowproperty(temp_whattoshowproperty);
  };

  const handlemachinessearched=(selection : number, y : boolean)=>
  {
    y ? dispatch(settruemachinesearched(selection)) : dispatch(setfalsemachinesearched(selection));
  }
  const handleallmachinessearchedtrue=()=>
  {
    machines.map((_,index : number) => {dispatch(settruemachinesearched(index));} );
    //모든 머신들을 searched = true로 초기화한다.
  }



  //이들은 임시 데이터이다. 실제로는 token을 이용해 api server에서 가져와야 함!

  const graph_sample: GraphProperty = {
    inside_dates_properties: [
      [
        new Date("2022-01-01T03:00:00"),
        new Date("2022-01-01T03:01:00"),
        new Date("2022-01-02T03:02:00"),
      ],
      [
        new Date("2022-01-01T05:00:00"),
        new Date("2022-01-01T05:01:00"),
        new Date("2022-01-02T06:02:00"),
      ],
    ],
    inside_values_properties: [
      [10, 5, 10],
      [8, 8, 10],
    ],
    outside_dates_properties: [
      [
        new Date("2022-01-01T03:00:00"),
        new Date("2022-01-01T03:01:00"),
        new Date("2022-01-02T03:02:00"),
      ],
      [
        new Date("2022-01-01T05:00:00"),
        new Date("2022-01-01T05:01:00"),
        new Date("2022-01-02T06:02:00"),
      ],
    ],
    outside_values_properties: [
      [8, 7, 8],
      [5, 10, 6],
    ],
  };
//샘플 그래프 데이터.
  const card_sample1: CardProperty = {
    Machine: machines[0],
    GraphProperty: graph_sample,
    WhatToShowProperty: whattoshowproperty,
  };
  const card_sample2: CardProperty = {
    Machine: machines[1],
    GraphProperty: graph_sample,
    WhatToShowProperty: whattoshowproperty,
  };
  const card_sample3: CardProperty = {
    Machine: machines[2],
    GraphProperty: graph_sample,
    WhatToShowProperty: whattoshowproperty,
  };
// 샘플 card.
  const cards: CardProperty[] = [card_sample1, card_sample2, card_sample3];

/// 샘플 cards 배열.

  return (
    // flex를 사용할 거면 flex가 className에 먼저 선언이 되어있어야 함.
    //  w-full 이든 w-2/3 이든 뭐든 백분율로 되어있는 크기 설정은 반드시 상위 컴포넌트가 고정된 크기가 있어야 한다. 혹은 비율 크기라면 그 상위상위 컴포넌트가 고정 크기가 있어야 한다.
    // 백분율 크기는 상위 컴포넌트에 '대한'크기이다. 따라서 hover로 상위 컴포넌트가 크기가 변하면 하위 컴포넌트는 w-full로 고정해서 써놓으면 된다.

    // 또한 중요한 사실은. 아무 내용도 없는 부분(예를 들어, div 의 크기가 wid 500 height 500 px 이어도 그 안에 글자 'hi'만 적혀 있으면 hi 빼고는 다 텅빈 부분이다)은 대부분의 css 속성이 적용이 안되고 그 상위 컴포넌트의 성질(즉 백그라운드)가 그냥 적용된다는 점.
    // 이를 위해 grid col =1 row =1 짜리를 적용해서 한칸짜리 그리드를 채워놓으면 된다.
    // flutter의 Container나 SizedBox가 따로 없다. 전부 grid 아니면 flex로 직접 채워넣어놔야 한다.

    <div className="grow flex flex-row  bg-white w-screen h-fit items-stretch gap-0">
      <div
      ref={refleft}
      onClick={() => {setExpandLeftSideBar(true);}}
        className={"grow-0 w-20 transition-all ease-in-out duration-300" + (ExpandLeftSideBar && " w-3/12")}
      >
        {/*여기서 이거를 onMouseOver로 하면 이상하게 튕김현상이 일어나니 주의... 무지 헤맴 ㅠㅠ*/}
        {ExpandLeftSideBar ? (
          <BigLeftSideBar
            whattoshowproperty={whattoshowproperty}
            handlewhattoshowproperty={handlewhattoshowproperty}
          />
        ) : (
          <SmallLeftSideBar />
        )}
      </div>
      <div className="grow ">
        <InfinityScrollCards cardsproperty={cards} handlewhattoshowproperty={handlewhattoshowproperty} />
      </div>
      <div
      ref={refright}
        className={"grow-0 w-20 transition-all ease-in-out duration-300 mr-[0.4rem]" + (ExpandRightSideBar && " w-3/12")}
        onClick={()=>{setExpandRightSideBar(true);}}
        // onMouseEnter={handleMouseOverRightSideBar}
        // onMouseLeave={handleMouseOutRightSideBar}
      >
        {ExpandRightSideBar ? (
          <BigSearchBar machines={machines} handleallmachinessearchedtrue={handleallmachinessearchedtrue} handlemachinesselected={handlemachinesselected} handlemachinessearched={handlemachinessearched}/>
        ) : (
          <SmallSearchBar />
        )}
      </div>
    </div>
  );
}

export default Home;

/*      <div className="grow-0 w-3/12">*/
/* 
<h1 className="text-3xl font-bold underline">hello, world!</h1>
      <div className= "flex flex-row justify-around w-full h-50"> 
        <button
          className="rounded bg-orange-400 hover:bg-orange-200 w-50 "
          onClick={() => dispatch(addmachine("Test"))}
        >
          Machine
        </button>
        <input
          type="text"
          placeholder="token test"
          onChange={(event) => {
            console.log(event.target.value);
            dispatch(settoken(event.target.value));
          }}
          className=" border border-black  w-50"
        />
      </div> */