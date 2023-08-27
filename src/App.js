import { useRef, useState } from "react";
import Auth from "./components/auth/Auth";
import Cookies from "universal-cookie";
import Chat from "./components/chat/Chat";
import "./styles/styles.css";

const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);
  const inputRef = useRef(null);
  if (!isAuth) {
    return (
      <div className="App">
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }
  return (
    <div>
      {room ? (
        <Chat room={room} />
      ) : (
        <div className="room">
          <label>Enter Room</label>
          <input ref={inputRef} />
          <button onClick={() => setRoom(inputRef.current.value)}>
            Join Room
          </button>
        </div>
      )}
      <div className="sign-out">
        <button>Sign Out</button>
      </div>
    </div>
  );
}

export default App;
