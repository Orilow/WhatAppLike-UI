import { useState } from "react";
import Login from "./components/auth/login";
import Chat from "./components/chat/chat";
import { TAuthData } from "./types/auth.types";


const App = () => {
  const idInstance = localStorage.getItem('idInstance');
  const apiTokenInstance = localStorage.getItem('apiTokenInstance');
  const localStorageData = idInstance && apiTokenInstance ? {idInstance, apiTokenInstance} : null;
  const [auth, setAuth] = useState<TAuthData| null>(localStorageData);
  return auth ? <Chat auth={auth} setAuth={setAuth}/> : <Login setAuth={setAuth} />;
};

export default App;