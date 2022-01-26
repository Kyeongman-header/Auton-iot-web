import React from 'react';

import {PresentationChartBarIcon} from '@heroicons/react/outline'



type SmallLeftSideBar={
  props?: any;
};
// 이렇게 props의 type을 지정해줘야 실제로 받을 수 있다. 이 경우 props가 필요없기 때문에 옵셔널로 했다.

//반드시 컴포넌트의 이름은 대문자로 시작해야 한다.
export default function SmallLeftSideBar () {
  return (
    //결국 정답은 sticky였다.. 내가 구현하고자 하는 바는 저거였다. 저기서 이제 크기까지 조절하려면 아마 ref를 가져와서 요소가 screen에 표현되는 크기를 이벤트로 받아와가지고 그놈을 이제 translate해야할거 같은데 그건 이제 그만하자..
    <div className="sticky top-0 left-0 h-screen grid grid-cols-1 grid-rows-5  w-full cursor-pointer duration-300 hover:animate-pulse">
      <div className="bg-green-800 rounded "></div>
      <div className="bg-white row-span-2 self-center justify-self-center font-bold">
        <PresentationChartBarIcon className="h-10 w-10 text-slate-500 text-right" />
      </div>
      <div className="row-span-2 bg-green-800 rounded "></div>
    </div>
  );
}
