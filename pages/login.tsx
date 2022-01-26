//간단히 로그인 화면을 구현한다.
export default function Login(){
    return (
      <div>
        <form action="submit" method="post">
          login 화면
          <input type="text" placeholder="id" />
          <input type="text" placeholder="password" />
          <button type="submit"></button>
        </form>
      </div>
    );
}