import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import ItemsSearchPage from './component/pages/ItemsSearchPage';
import LoginPage from './component/pages/LoginPage';
import SignupPage from './component/pages/SignupPage'
import ItemSelect1 from './component/pages/ItemSelect1';
import CompareLog from './component/pages/CompareLogPage';
function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route index element={<ItemsSearchPage/>}></Route>
          <Route path="/signin" element={<LoginPage/>}></Route>
          <Route path="/signup" element={<SignupPage/>}></Route>
          <Route path="/select1" element={<ItemSelect1/>}></Route>
          <Route path="/myLog" element={<CompareLog/>}></Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
