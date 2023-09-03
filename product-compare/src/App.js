import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItemsSearchPage from "./component/pages/ItemsSearchPage";
import LoginPage from "./component/pages/LoginPage";
import SignupPage from "./component/pages/SignupPage";
import ItemSelect1 from "./component/pages/ItemSelect1";
import CompareLogPage from "./component/pages/CompareLogPage";
import { refresh_interceptor, getUser } from "./api/Auth";
import { createContext, useState } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;
const AuthContext = createContext();
async function autologin(setAuthInfo) {
    try {
        const UserInfo = await getUser();
        const _authInfo = {
            isLoggedIn: true,
            id: UserInfo.email
        };
        setAuthInfo(_authInfo);
    } catch (error) {
        console.error(error);
    }
}
function App() {
    refresh_interceptor();
    const [authInfo, setAuthInfo] = useState(false);
    const savedAccessToken = localStorage.getItem("access");
    if(!authInfo)
        autologin(setAuthInfo);
    return (
        <AuthContext.Provider value={[authInfo, setAuthInfo]}>
            <BrowserRouter>
                <Routes>
                    <Route index element={<ItemsSearchPage />}></Route>
                    <Route path="/signin" element={<LoginPage />}></Route>
                    <Route path="/signup" element={<SignupPage />}></Route>
                    <Route path="/select1" element={<ItemSelect1 />}></Route>
                    <Route path="/myLog" element={<CompareLogPage />}></Route>
                </Routes>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
export { AuthContext };
