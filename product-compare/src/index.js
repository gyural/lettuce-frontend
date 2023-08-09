import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Button from './component/ui/Button'
import LoginCard from './component/ui/LoginCard';
import LoginPage from './component/pages/LoginPage';
import SignupPage from './component/pages/SignupPage';
import ItemSearchPage from './component/pages/ItemsSearchPage';
import ItemBox from './component/List/ItemBox';
import ChoiceButton from './component/ui/ChoiceButton';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
