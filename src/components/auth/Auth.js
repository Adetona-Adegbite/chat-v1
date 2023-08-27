import { auth, provider } from "../../firebase-config";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";
import "../../styles/styles.css";

const cookies = new Cookies();

export default function Auth(props) {
  async function signInWithGoogle() {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    cookies.set("auth-token", result.user.refreshToken);
    props.setIsAuth(true);
  }
  return (
    <div className="auth">
      <p>Sign In With Google</p>
      <button onClick={signInWithGoogle}>Sign In</button>
    </div>
  );
}
