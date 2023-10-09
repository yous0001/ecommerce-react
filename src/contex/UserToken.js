import { createContext, useState } from "react";

export let UserToken = createContext(null);

export function UsertokenProvider({children}) {
  let [isLogin, setIsLogin] = useState(false);
  return <UserToken.Provider value={{isLogin,setIsLogin}}>
    {children}
    </UserToken.Provider>;
}
