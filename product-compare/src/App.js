import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItemsSearchPage from "./component/pages/ItemsSearchPage";
import LoginPage from "./component/pages/LoginPage";
import SignupPage from "./component/pages/SignupPage";
import ItemSelect1 from "./component/pages/ItemSelect1";
import CompareLogPage from "./component/pages/CompareLogPage";
import { refresh_interceptor } from "./api/Auth";
import { createContext, useState } from "react";
const AuthContext = createContext();
function App() {
    const [authInfo, setAuthInfo] = useState(false);
    refresh_interceptor();
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
