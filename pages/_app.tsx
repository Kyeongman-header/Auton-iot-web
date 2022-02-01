import "../styles/globals.css";
import type { AppProps } from "next/app";
//next 설정을 위한 라이브러리

import {wrapper} from "../redux/store";
//store의 wrapper를 이용해 redux와 next 앱을 연결(SSR에서도 사용 가능.)

import Footer from '../components/footer';
import Navigation from '../components/nav';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
// import { settoken } from '../redux/token_slices';
import { getmachinelists_fromapiserver } from "../redux/machine_slices";
//상단의 nav bar와 footer 가져옴.(global ui.)


function MyApp({ Component, pageProps }: AppProps) {
  // Next.js의 근본적인 구조가 이 Component prop에 우리가 만든 index.ts이든 뭐든 거기의 export default component 들을 가져와서 넣는거다.
  // 그리고 렌더링은 MyApp을 해주는 거고.
  // 따라서 Component 위에 Nav Bar나 아래에 footer 등을 넣어주면 전역적으로 세팅이 된다. 또한 Component에 className="" 하고 전역적인 tailwind css 도 설정 가능하다.
  // const dispatch = useDispatch();
  // useEffect(() => {return () =>{dispatch(settoken("")); }}, []);
  //전역적으로 창이 꺼지면 무조건 login을 하도록 한다.
  //또한 창이 켜지면 데이터를 불러온다.

  //dispatch(getmachinelists_fromapiserver())
  //이는 SSR에서 해줄 일이다.
  
  return (
    <div >
      <div className="flex flex-col min-h-[100vh] min-w-[800pt] bg-black gap-px">
        <Navigation />
        <Component {...pageProps} />
        <Footer />
      </div>
    </div>
  );
}

// NEXT.JS에선 SSR에서 REDUX를 사용하기 위해 PROVIDER로 감싸는 게 아닌 아래처럼 withRedux로 감싸줘야 한다.
export default wrapper.withRedux(MyApp);
