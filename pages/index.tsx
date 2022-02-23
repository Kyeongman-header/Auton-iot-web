import type { GetStaticProps, InferGetStaticPropsType, NextPage, NextPageContext } from 'next';
//next routing을 위함.


import { RootState } from '../redux/store';
//redux 사용을 위한  state type

import { useSelector, useDispatch } from 'react-redux';
// redux의 사용을 위한 훅.

import { togglemachineselected,settruemachinesearched,setfalsemachinesearched,  getmachinelists_fromapiserver, deletesample } from '../redux/machine_slices';
//import { settoken } from '../redux/token_slices';
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

import type {datesandvalue, Machine} from '../components/Types/TypesMachine';
import type { CardProperty } from '../components/Types/TypesCardProperty';
import type { GraphProperty } from '../components/Types/TypesGraphProperty';
import { LengthOfListOfWhatToShowProperty, sample_whattoshowproperty, WhatToShowProperty } from '../components/Types/TypesWhatToShowProperty';
import { ListOfWhatToShowProperty } from '../components/Types/TypesWhatToShowProperty';

import addDays from '../components/addDays';
import convertDateToString from '../components/convertDateToString';
import convertDateFormatString from '../components/ConvertDateFormatString';
import { addGpsSlices, removeGpsSlices } from '../redux/forgps_slices';
import gpstomapgps from '../components/gpstomapgps';
import { EmojiSadIcon } from '@heroicons/react/outline';


const Home: NextPage = ({machine_list, initialselectedids}:InferGetStaticPropsType<typeof getStaticProps>) => {
  // const [machines,setmachines] : Machine[] =[{id : "41", car_number : "12하 1234"},{id : "42", car_number : "12하 1212", user : "sky@naver.com"},{id : "43", car_number : "12하 1255"}];
  
  //const machines = useSelector((state: RootState) => state.machines.Machines);
  //const token = useSelector((state: RootState) => state.token.token);
  const [isiphonemobile,setisiphonemobile]=useState<boolean>(false);

  const forgps = useSelector((state: RootState) => state.forgps.OneGpsStates);
  const dispatch=useDispatch();

  //왼쪽 사이드바와 오른쪽 사이드바의 확장 state.
  const [ExpandLeftSideBar, setExpandLeftSideBar] =
    useState<boolean>(true);
  const [ExpandRightSideBar, setExpandRightSideBar] =
    useState<boolean>(true);
  const [machines, setmachines]=useState<Machine[]>(machine_list);


    const refleft = useRef<HTMLDivElement>(null);
    const refright = useRef<HTMLDivElement>(null);

    //여기서 이벤트의 타입과 이벤트 리스너의 타입이 대환장 콜라보인데,
    //결론부터 말하자면 딱 지금처럼 쓰는게 정답이다. 그냥 외우자...
    const handleClickOutsideSideBar = (event : CustomEvent<MouseEvent>) => {
      //주의! e.target을 쓰기 위해선 as HTMLElement를 사용해야 한다.
      if (
        refleft.current &&
        refright.current &&
        !refleft.current.contains(event.target as HTMLElement) &&
        !refright.current.contains(event.target as HTMLElement)
      ) {
        setExpandLeftSideBar(false);
        setExpandRightSideBar(false);
      }
  };

  //문서 전체에 전역으로 click 이벤트 핸들러를 등록해주고, 그 이벤트 핸들러에서는 ref로 등록한 양쪽 사이드바 밖에서 클릭이 되었는지를 확인한다.
  //만약 양쪽 사이드 바 바깥 쪽에서 클릭이 되었다면 사이드바는 close된다.


  //어떤 속성을 그래프에 적용해서 표현할 것인지 state.
  const [whattoshowproperty, setwhattoshowproperty] =
    useState<WhatToShowProperty>(sample_whattoshowproperty);
    
    
    const today=new Date();
    const tomorrow=addDays(today,1);

    const default_pub_date=convertDateToString(today,tomorrow);



    const [pub_date,setpub_date]=useState<string[]>(default_pub_date);
    const handlepub_date = (gte:Date, lte:Date)=>{
      const date=convertDateToString(gte,lte);
      setpub_date(date);
      getselectedmachinedata(selectedids,date[0],date[1],true);
    }

    const [selectedall, setselectedall]= useState<boolean>(false);
    const [selectedids,setselectedids]=useState<string[]>(initialselectedids);
    //selectedmachine은 전체 machine list중에서 선택된 녀석들만을 포함하고 있다.
    //사실 그래서 Redux에는 datesandvalues같은 drawable데이터가 있을 필요가 없었다. 걔네가 들어있는 다른 자료형을 만들어서 여기서 쓰고,
    //전역상태에는 순수한 machine list만 있으면 됐었다.
    //근데 이제와서 고치긴 귀찮으니깐 걍 두자. 어차피 텅 비어있기 때문에 메모리를 차지하진 않을 거다.
    //근데 솔직히 만들다보니 느끼는데 redux가 굳이 필요하지 않은 케이스가 대부분인것같다. 하향식 트리 구조가 너무 깊지만 않다면 굳이 redux로 만들 필요가 있나 싶음.


  
    const [showmachine,setshowmachine]=useState<Machine[]>([]);
    //showmachine은 중앙의 InfinityScrollBar에 최종적으로 전달될 녀석이다.
    const [loading,setLoading]=useState<boolean>(false);
    const [addloading,setAddLoading]=useState<boolean>(false);

    useEffect(() => {
      //as EventListener를 주의할 것.
      document.addEventListener('mousedown', handleClickOutsideSideBar as EventListener);
      return () => {
          document.removeEventListener('mousedown', handleClickOutsideSideBar as EventListener);
      };
  }, [refleft,refright]);
  useEffect(() => {
    function isMobile() {
      var user = navigator.userAgent;
      var is_mobile = false;
      if (
        user.indexOf("iPhone") > -1 ||
        user.indexOf("iPad") > -1 ||
        user.indexOf("iPod") > -1
      ) {
        is_mobile = true;
      }

      console.log(is_mobile);
      return is_mobile;
    }
    setisiphonemobile(isMobile());
  !isiphonemobile&& getselectedmachinedata(initialselectedids);
  },[]); 
  useEffect(() => {
    selectedids.length === 0 ?
      refright.current && !ExpandRightSideBar&&
      refright.current.classList.add("animate-pulse") :
      refright.current && !ExpandRightSideBar&&
      refright.current.classList.remove("animate-pulse")
      
  }, );
  useEffect(()=>{

    //로그용.
    // console.log("showmachines");
    // console.log(showmachine);
    // console.log("selectedids") 
    // console.log(selectedids);
    // console.log("all")
    // console.log(machines)
    // console.log("whattoshow")
    // console.log(whattoshowproperty);
    // console.log(pub_date);
    
    let count=0;

    ListOfWhatToShowProperty.map((w: string, _) => {
      whattoshowproperty[w] && count++;
    });

    count === 0 ?
      refleft.current && !ExpandLeftSideBar &&
      refleft.current.classList.add("animate-pulse") :
      refleft.current && !ExpandLeftSideBar &&
      refleft.current.classList.remove("animate-pulse");
      
    
      
    
  },)

  //api에서 데이터를 가져오는 코드.
  //반복문이다. 여러개의 index가 들어올 수도 있기 때문이다.
  const handlesetselectedall=(y : boolean)=>{
    setselectedall(y);
  }


  
  const getselectedmachinedata = async (selections : string[],gte? : string, lte? : string, modify? : boolean) => {

      //새롭게 업데이트할 머신들의 index들에 대한 반복문 시작.

      
      let temp_showmachine=showmachine.slice();
      let add_showmachine : Machine[] = [];
      
      
      setLoading(true);
      if(!modify)
      {
        setAddLoading(true);
      }

      //이거는 진짜진짜 중요하다.
      //반복문 안에서 fetch등이 있어서 async이면 이 반복문 자체가 끝나기를 안 기다리고 그냥 넘어간다.
      //따라서 반복문 바깥에서 setState를 하는 것은 의미가 없어진다.
      //그것을 방지하기 위해 이와 같은 await Promise.all구문을 써줘야 한다!!!!!!!!!
      try{
        let temp=await Promise.all(selections.map(async (selection,index)=>{

          let pub_date__gte=gte ? gte : pub_date[0];
          let pub_date__lte=lte ? lte : pub_date[1];
          
          // console.log("get data from api");
          // console.log(pub_date__gte);
          // console.log(pub_date__lte);
    
          //새롭게 showmachine에 추가해줄 머신들의 기본 drawable 배열의 초기값(name)들을 세팅해준다.
          let initialdrawable:datesandvalue[]=[];
          ListOfWhatToShowProperty.map((listofwhattoshowproperty,list_index)=>{
              initialdrawable.push({name : listofwhattoshowproperty, dates : [], values : []});
          });
    
          //인덱스를 찾긴 찾아야 한다.
          let newindex =-1;
          machines.map((machine,index)=>{machine.id===selection && (newindex=index)})
    
          let newmachine: Machine = {
            ...machines[newindex],//drawable과 gps 데이터가 비어있는 현재 machine list의 특정 index를 추가해준다.
            drawable: initialdrawable,
            gps: [],
            gps_dates : [],
          };
          // console.log('here');
          // console.log(pub_date__gte);
          // console.log(pub_date__lte);
          // console.log(selection);
          // console.log(machines);
      const sensor = await fetch(
        `/api/datas?sort=sensor&pub_date__gte=${pub_date__gte}&pub_date__lte=${pub_date__lte}&machine=${
          selection
        }`,
      );
    //['KHAI','PM25_2','CO','SO2','NO2','O3','PM25','TEMPERATURE','HUMIDITY','CO2'];
      let tempdatas = await sensor.json();
      tempdatas!.map((tempdata: any,temp_index : number)=>{
          let dates : string=convertDateFormatString(tempdata.pub_date);
          newmachine.drawable[ListOfWhatToShowProperty.indexOf("CO2")].values.push(tempdata.sensor.CO2);
          // newmachine.drawable[ListOfWhatToShowProperty.indexOf("CO2")].dates.push(tempdata.pub_date);
          newmachine.drawable[ListOfWhatToShowProperty.indexOf("CO2")].dates.push(dates)
          newmachine.drawable[ListOfWhatToShowProperty.indexOf("HUMIDITY")].values.push(tempdata.sensor.humidity);
          // newmachine.drawable[ListOfWhatToShowProperty.indexOf("HUMIDITY")].dates.push(tempdata.pub_date);
          newmachine.drawable[ListOfWhatToShowProperty.indexOf("HUMIDITY")].dates.push(dates)
          newmachine.drawable[ListOfWhatToShowProperty.indexOf("TEMPERATURE")].values.push(tempdata.sensor.temperature);
          // newmachine.drawable[ListOfWhatToShowProperty.indexOf("TEMPERATURE")].dates.push(tempdata.pub_date);
          newmachine.drawable[ListOfWhatToShowProperty.indexOf("TEMPERATURE")].dates.push(dates)
          newmachine.drawable[ListOfWhatToShowProperty.indexOf("PM25")].values.push(tempdata.sensor['P.M 2.5']);
          // newmachine.drawable[ListOfWhatToShowProperty.indexOf("PM25")].dates.push(tempdata.pub_date);
          newmachine.drawable[ListOfWhatToShowProperty.indexOf("PM25")].dates.push(dates)
          newmachine.drawable[ListOfWhatToShowProperty.indexOf("PM25_2")].values.push(tempdata.sensor['P.M 2.5_2']);
          newmachine.drawable[ListOfWhatToShowProperty.indexOf("PM25_2")].dates.push(dates)
      });
      
    
      const airkorea = await fetch(
          `/api/datas?sort=airkorea&pub_date__gte=${pub_date__gte}&pub_date__lte=${pub_date__lte}&machine=${
            selection
          }`,
        );
    //['KHAI','PM25_2','CO','SO2','NO2','O3','PM25','TEMPERATURE','HUMIDITY','CO2'];
        let tempdatas_2 = await airkorea.json();
        tempdatas_2.map((tempdata: any,temp_index : number)=>{
          let dates : string=convertDateFormatString(tempdata.pub_date).slice();
            newmachine.drawable[ListOfWhatToShowProperty.indexOf("KHAI")].values.push(tempdata.airkorea.khai);
            //newmachine.drawable[ListOfWhatToShowProperty.indexOf("KHAI")].dates.push(tempdata.pub_date);
            newmachine.drawable[ListOfWhatToShowProperty.indexOf("KHAI")].dates.push(dates)
            newmachine.drawable[ListOfWhatToShowProperty.indexOf("PM25_AIRKOREA")].values.push(tempdata.airkorea['P.M 2.5']);
            //newmachine.drawable[ListOfWhatToShowProperty.indexOf("PM25_2")].dates.push(tempdata.pub_date);
            newmachine.drawable[ListOfWhatToShowProperty.indexOf("PM25_AIRKOREA")].dates.push(dates)
            newmachine.drawable[ListOfWhatToShowProperty.indexOf("CO")].values.push(tempdata.airkorea.CO);
            //newmachine.drawable[ListOfWhatToShowProperty.indexOf("CO")].dates.push(tempdata.pub_date);
            newmachine.drawable[ListOfWhatToShowProperty.indexOf("CO")].dates.push(dates)
            newmachine.drawable[ListOfWhatToShowProperty.indexOf("SO2")].values.push(tempdata.airkorea.SO2);
            //newmachine.drawable[ListOfWhatToShowProperty.indexOf("SO2")].dates.push(tempdata.pub_date);
            newmachine.drawable[ListOfWhatToShowProperty.indexOf("SO2")].dates.push(dates)
            newmachine.drawable[ListOfWhatToShowProperty.indexOf("NO2")].values.push(tempdata.airkorea.NO2);
            //newmachine.drawable[ListOfWhatToShowProperty.indexOf("NO2")].dates.push(tempdata.pub_date);
            newmachine.drawable[ListOfWhatToShowProperty.indexOf("NO2")].dates.push(dates)
            newmachine.drawable[ListOfWhatToShowProperty.indexOf("O3")].values.push(tempdata.airkorea.O3);
            //newmachine.drawable[ListOfWhatToShowProperty.indexOf("O3")].dates.push(tempdata.pub_date);
            newmachine.drawable[ListOfWhatToShowProperty.indexOf("O3")].dates.push(dates)
        });
    
        const gps = await fetch(
          `/api/datas?sort=gps&pub_date__gte=${pub_date__gte}&pub_date__lte=${pub_date__lte}&machine=${
            selection
          }`,
        );
    //['KHAI','PM25_2','CO','SO2','NO2','O3','PM25','TEMPERATURE','HUMIDITY','CO2'];
        let tempdatas_3 = await gps.json();
        tempdatas_3.map((tempdata: any,temp_index : number)=>{
          let dates : string=convertDateFormatString(tempdata.pub_date);
            newmachine.gps.push(tempdata.gps);
            newmachine.gps_dates.push(dates);
            
        });
    
    
        //위의 굉장한 코드들을 거치면 newmachine에 새로운 machine 하나가 추가된다.
        if (modify) {
          showmachine.map((sm, index) => {
            if (sm.id === selection) {
              temp_showmachine.splice(index, 1);
              dispatch(removeGpsSlices(selection));
              temp_showmachine.splice(index, 0, newmachine);
              let mapgps = gpstomapgps(newmachine.gps,newmachine.gps_dates);
    
              dispatch(
                addGpsSlices({
                  gps: mapgps,
                  datesandvalue: newmachine.drawable,
                  id: sm.id,
                })
              );
            }
          });
        } else {
          add_showmachine.push(newmachine);
          let mapgps = gpstomapgps(newmachine.gps,newmachine.gps_dates);
          dispatch(
            addGpsSlices({
              gps: mapgps,
              datesandvalue: newmachine.drawable,
              id: selection
            })
          );
        }
          
          }))
          
          setLoading(false);
          setAddLoading(false);
          modify ? setshowmachine(temp_showmachine) : setshowmachine((showmachine) => [...showmachine,  ...add_showmachine ]);

      }
      catch(e){
        console.log("backend error.");
      }
};


    

  const removeunselectedmachinedata=(selections : string[])=>{
    
    //selections는 삭제할 id 배열이다.
    setshowmachine(
      showmachine.filter((sm, index, source) => {
        return selections.indexOf(sm.id) < 0;
      })
    );
    selections.map((selection,index)=>{
      dispatch(removeGpsSlices(selection));
    })
  }
  


  const handlemachinesselected=(selectids : string[] , y : boolean)=>
    {
      let temp_machines=[...machines];
      //사실 잘못된 코드다. 이렇게 하면 machines 는 객체 배열이므로 각각의 객체들은 얕은 복사가 되어서
      //실제로 아래의 코드를 하면 현재의 state도 변화하는 것을 볼 수 있다. 즉 불변성을 깨뜨렸다. 
      //따라서 진짜 좋은 코드를 짜려면 완전히 값 하나하나를 복사하는 deep copy function을 만들어야 한다.
      // 이래서 state는 웬만하면 객체이면 안된다. 최소 단위로 다 분해해야 한다. 지금은 귀찮으니깐 놔두자.(일단은 잘 작동한다.)
      
      //이때 만약 remove에서 행동의 결과로 길이가 0가 될것 같으면
//맨 처음 것 하나는 남겨놓는다.
let lestids = selectedids.filter(
  (selectedid) => selectids.indexOf(selectedid) < 0
);
if(lestids.length===0 && y===false)
{
  selectids.splice(0, 1);
}

      selectids && selectids.map((selectid, index) => {
          temp_machines.map((temp_machine,index)=>{
            temp_machine.id===selectid && (temp_machine.selected=y);
          })
        });

        if (y)
        {
          //추가를 해줄 때는 추가해 줄 목록을 검토해서 이미 selectedids에 존재하는지 확인하고 없는 것만 추가한다.
          selectids = selectids.filter(
            (selectid) => selectedids.indexOf(selectid) < 0
          );

          getselectedmachinedata(selectids);
          setselectedids([...selectedids,...selectids]);
        }
      else{
//machine이 unselect 되면 현재 프론트서버의 메모리에서 빼준다.


        
        selectids && removeunselectedmachinedata(selectids);
        selectids && setselectedids(
          selectedids.filter((selectedid : string) => selectids.indexOf(selectedid) < 0)
        );
        
      }
      setmachines(temp_machines);
      
  }



  // ---------------------------------- whatttoshow button들을 예쁘게 사라지게하기 위한 쌩난리.
  function sleep(ms : number) {
    return new Promise((r) => setTimeout(r, ms));
  }

  const buttonsrefs=useRef<HTMLDivElement[]>([]);

  const handlewhattoshowproperty = async (index: string) => {
    
    let temp_whattoshowproperty: WhatToShowProperty = {...whattoshowproperty};
    temp_whattoshowproperty[index] = !temp_whattoshowproperty[index];
    
    if (!temp_whattoshowproperty[index])
    {
     let num_index=ListOfWhatToShowProperty.indexOf(index);
     buttonsrefs.current[num_index]?.classList.remove('animate-fade-in-down')
     buttonsrefs.current[num_index]?.classList.add('opacity-100')
     buttonsrefs.current[num_index]?.classList.add('animate-fade-out-down')
     await sleep(300);
     buttonsrefs.current[num_index]?.classList.remove('animate-fade-out-down')
    }
    setwhattoshowproperty(temp_whattoshowproperty);
  };
  // 각각 button들의 Ref 배열을 만들어서, 걔네가 사라지는 이벤트(이 경우 handlewhattoshowproperty, 그 중에서도 true->false가 되는 상황)가 벌어지기 직전에 
  //그 해당하는 Ref에 fadeoutdown 애니메이션을 추가하고, 0.5초 딜레이를 주고(sleep), 다시 그 fadeout 이벤트는 삭제를 한다.
  //이때 animate-fade-in-down을 없애주고, opacity를 일부로 100으로 설정한 뒤 animate-fade-out-down을 걸어줘야하고, 또 animate-fade-out-down도 다시 없애줘야
  //사라지는 애니메이션이 잘 작동한다.
  //---------------------------------------------------------
  const handlemachinessearched=(selection : number, y : boolean)=>
  {
    let temp_machine=machines.slice();
    temp_machine[selection].searched=y;
    setmachines(temp_machine);
  }
  const handleallmachinessearchedtrue=()=>
  {
    let temp_machine=machines.slice();
    temp_machine.map((t,index : number) => {t.searched=true;} );
    setmachines(temp_machine);
    //모든 머신들을 searched = true로 초기화한다.
  }

   return isiphonemobile ? ( <div className="flex flex-col justify-center items-center h-screen content-center bg-white">
   <EmojiSadIcon className="w-10 h-10" />
   <p className="text-center text-lg text-slate-800">
     죄송합니다. 아이폰 Safari 브라우저는 현재 지원하지 않습니다. 모바일 혹은 데스크탑 Chrome으로 접속해 주세요.
   </p>
 </div>):(
    // flex를 사용할 거면 flex가 className에 먼저 선언이 되어있어야 함.
    //  w-full 이든 w-2/3 이든 뭐든 백분율로 되어있는 크기 설정은 반드시 상위 컴포넌트가 고정된 크기가 있어야 한다. 혹은 비율 크기라면 그 상위상위 컴포넌트가 고정 크기가 있어야 한다.
    // 백분율 크기는 상위 컴포넌트에 '대한'크기이다. 따라서 hover로 상위 컴포넌트가 크기가 변하면 하위 컴포넌트는 w-full로 고정해서 써놓으면 된다.

    // 또한 중요한 사실은. 아무 내용도 없는 부분(예를 들어, div 의 크기가 wid 500 height 500 px 이어도 그 안에 글자 'hi'만 적혀 있으면 hi 빼고는 다 텅빈 부분이다)은 대부분의 css 속성이 적용이 안되고 그 상위 컴포넌트의 성질(즉 백그라운드)가 그냥 적용된다는 점.
    // 이를 위해 grid col =1 row =1 짜리를 적용해서 한칸짜리 그리드를 채워놓으면 된다.
    // flutter의 Container나 SizedBox가 따로 없다. 전부 grid 아니면 flex로 직접 채워넣어놔야 한다.

    <div className="grow flex flex-row justify-between bg-white w-full h-full justify-items-stretch gap-0 items-stretch">
      <div
        ref={refleft}
        onClick={() => {
          setExpandLeftSideBar(true);
        }}
        className={
          "grow-0 w-20 transition-all ease-in-out duration-300 h-screen sticky top-0 left-0" +
          (ExpandLeftSideBar ? " w-[25rem]" : "")
        }
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
      
      <InfinityScrollCards
        handlepub_date={handlepub_date}
        Machines={showmachine}
        WhatToShowProperty={whattoshowproperty}
        handlewhattoshowproperty={handlewhattoshowproperty}
        buttonsrefs={buttonsrefs}
        pub_date={pub_date}
        handlemachinesselected={handlemachinesselected}
        loading={loading}
        addloading={addloading}
      />
      <div
        ref={refright}
        className={
          "grow-0  w-20 transition-all ease-in-out duration-300 h-screen sticky top-0 right-0 " +
          (ExpandRightSideBar ? " w-[25rem]" : "")
        }
        onClick={() => {
          setExpandRightSideBar(true);
        }}
        // onMouseEnter={handleMouseOverRightSideBar}
        // onMouseLeave={handleMouseOutRightSideBar}
      >
        {ExpandRightSideBar ? (
          <BigSearchBar
            machines={machines}
            handleallmachinessearchedtrue={handleallmachinessearchedtrue}
            handlemachinesselected={handlemachinesselected}
            handlemachinessearched={handlemachinessearched}
            selectedall={selectedall}
            handlesetselectedall={handlesetselectedall}
          />
        ) : (
          <SmallSearchBar />
        )}
      </div>
    </div>
  );
}

export default Home;
export const getStaticProps :GetStaticProps=async(context)=> {
  let tempMachines : Machine[] = [] as Machine[];
  let selectedids: string[] =[];
  


  
  try{
    const machine_list = await fetch( `https://auton-iot.com/api/machine/`,
  {
    method: 'GET',
    headers:{
      'Content-Type': 'application/json',
      'Authorization' : `Token ${process.env.MASTER_KEY}`
    }
  }
  );
  
  let tempdatas = await machine_list.json();
  
  tempdatas.map((tempdata:any,index:number)=>{
    let tempMachine : Machine = {} as Machine;
    tempMachine.id=tempdata.id;
    tempMachine.car_number=tempdata.car_number;
    if(tempdata.user) {tempMachine.user=tempdata.user;}

    index===0 ? tempMachine.selected=true :tempMachine.selected=false ;

    tempMachine.searched=true;
    tempMachine.drawable=[];
    tempMachine.gps=[];
    tempMachine.gps_dates=[];
    //context.store.dispatch(getmachinelists_fromapiserver(tempMachine));
    tempMachines.push(tempMachine);

    tempMachine.selected && selectedids.push(tempMachine.id);
  })

  }
  catch(e)
  {
    console.log(e);
  }
  
  //console.log(context.store);
//['KHAI','PM25_2','CO','SO2','NO2','O3','PM25','TEMPERATURE','HUMIDITY','CO2'];
  
  
  
  

    return {
      props: {
        machine_list:tempMachines,
        initialselectedids : selectedids,
      }
    }

}

