import logo from "./logo.svg";
import "./App.css";
import app from "./firebase.init";
import {
  FacebookAuthProvider,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useState } from "react";

const auth = getAuth(app);

function App() {
  const [users, setUser] = useState({});

  const googleProvider = new GoogleAuthProvider();
  const fbProvider = new FacebookAuthProvider();

  const githubProvider = new GithubAuthProvider();


  const handleClick = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setUser(user);
      })
      .catch((error) => {
        console.log("error", error);
      });

    console.log("working");
  };

  const handleFbSign=()=>{
     
    signInWithPopup(auth,fbProvider)
    .then(result=>{
      const user=result.user;
      console.log(user)
    })
    .catch(error=>{
      console.error(error)
    })

  }

  const handleGitSign = () => {
    console.log("this is git hub");
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch((error) => {
        console.log(error, "error");
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // console.log("logout")
        setUser({});
      })
      .catch((error) => {
        console.log("logout error", error);
        setUser({});
      });
  };
  return (
    <div className="App">
      {users.uid ? (
        <button onClick={handleSignOut}>Signout</button>
      ) : (
        <>
          <button onClick={handleClick}>Google Sign In </button>
          <button onClick={handleFbSign}>Google Fb Sign In </button>
          <button onClick={handleGitSign}>Git Hub Sign In</button>
        </>
      )}
      {/* <button onClick={handleClick}>Google Sign In  </button>

      <button onClick={handleSignOut}>Signout</button> */}

      <h3>Name:{users.displayName}</h3>
      <p>I know your email address:{users.email}</p>
      <img src={users.photoURL} alt="" />
    </div>
  );
}

export default App;
