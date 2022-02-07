import { useState } from "react";

//간단히 로그인 화면을 구현한다.
export interface LoginProperty{
  login : boolean,
  handlelogin : (islogin:boolean)=>void,
}

export default function Login({login,handlelogin} : LoginProperty){
  const [password, setPassword] = useState("");
  const [disabled,setDisabled]=useState<boolean>(false);
  const [wrong, setWrong]=useState<boolean>(false);
  function sleep(ms : number) {
    return new Promise((r) => setTimeout(r, ms));
  }
  const handleChangePassword=(e: React.ChangeEvent<HTMLInputElement>)=>setPassword(e.target.value);
  const handleSubmit=async (e: React.SyntheticEvent) => {
    
    e.preventDefault();
    setDisabled(true);
    const _islogin = await fetch(
      `/api/login?password=${password}`,
    );
    if(_islogin.status===200){
      handlelogin(true);
    }
    else{
      handlelogin(false);
      setWrong(true);
      await sleep(1000);
      setWrong(false);
      
    }
    setDisabled(false);
  };
  
    return (
      
      <div className="flex flex-col justify-center items-center h-screen content-center bg-white">
        <form className="flex flex-col justify-evenly h-[400px] w-[300px] border-4 rounded-lg p-5" action="submit" method="get" onSubmit={handleSubmit}>
          <p className=" font-bold">어드민 서버의 암호를 입력해주세요.</p>
          <p className=" font-light">암호를 모르신다면 박경만 연구원에게 연락해주세요.</p>
          <input type="text" className="border border-black rounded p-1" placeholder="password" value={password} onChange={handleChangePassword}/>
          <button type="submit" disabled={disabled}  className={(wrong? "bg-red-800 hover:bg-red-500 animate-wiggle " : "bg-green-800  hover:bg-green-500 " ) + " duration-300 text-white font-bold text-lg border rounded-md  p-3"}>LOGIN</button>
        </form>
      </div>
    );
}