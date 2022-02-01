import React from 'react';

import {PresentationChartBarIcon} from '@heroicons/react/outline'
import {AdjustmentsIcon} from '@heroicons/react/outline'


type SmallLeftSideBar={
  props?: any;
};
// 이렇게 props의 type을 지정해줘야 실제로 받을 수 있다. 이 경우 props가 필요없기 때문에 옵셔널로 했다.

//반드시 컴포넌트의 이름은 대문자로 시작해야 한다.
export default function SmallLeftSideBar () {
  return (
    //결국 정답은 sticky였다.. 내가 구현하고자 하는 바는 저거였다. 저기서 이제 크기까지 조절하려면 아마 ref를 가져와서 요소가 screen에 표현되는 크기를 이벤트로 받아와가지고 그놈을 이제 translate해야할거 같은데 그건 이제 그만하자..
    <div title="데이터 목록 선택하기" className="sticky top-0 left-0 h-full grid grid-cols-1 grid-rows-5  w-full ">
      <div className=" row-span-2 bg-white rounded "></div>
      <div className="row-span-1 bg-green-800 self-center justify-self-center font-bold flex items-center h-full rounded-full cursor-pointer duration-300 hover:scale-105 hover:opacity-80">
        <AdjustmentsIcon className="h-10 w-10 text-white text-right" />
      </div>
      <div className="row-span-2 bg-white rounded "></div>
    </div>
  );
}
