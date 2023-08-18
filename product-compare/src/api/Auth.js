import axios from "axios"
import { useContext } from "react";
import api from './api'




const login = async (email, pw) => {
    // axios를 이용하여 jwt 로그인 요청을 보낸다.
    return await axios.post('http://localhost:8000/api/user/auth/', {
        'email': email,
        'password': pw,
    }, {withCredentials: true}).then((response) => {
        // console.log(response.data)
        alert('로그인 성공');
        // 벡엔드에서 httponly 쿠키로 토큰들이 전송되어 로그인됨
        // navigate('/')
    }).catch((error) => {
        console.log(error);
        alert('로그인 실패');
        throw error;
    })
}

const register = (email, pw) => {
    // axios를 이용하여 jwt 회원가입 요청을 보낸다.
    return axios.post('http://localhost:8000/api/user/register/', {
        'email': email,
        'password': pw
    }, {withCredentials: true}).then((response) => {
        console.log(response.data);
        console.log('회원가입 성공')
        return true;
        // 벡엔드에서 httponly 쿠키로 토큰들이 전송되어 로그인됨
    }).catch((error) => {
        console.log(error)
        // 백엔드에서 자동으로 리프레시 해주므로 구현할 필요없음
        alert('회원가입 실패');
        return false;
    })
}
const refresh = async () => {
    axios.post('http://localhost:8000/api/user/auth/refresh', {withCredentials:true})
    .then((response)=>{
        console.log('token refreshed');
    })
    .catch((response)=>{
        console.log(response);
        console.log('token refresh error')
    })
}

const refresh_interceptor = () => {

    api.interceptors.response.use(
        (response) => response,
        async (error) => {
          const originalRequest = error.config;
      
          if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
      
            try {
              const response = await axios.post('http://localhost:8000/api/user/token/refresh/');

              return api(originalRequest);
            } catch (error) {
              // 로그아웃
              return Promise.reject(error);
            }
          }
      
          return Promise.reject(error);
        }
      );
}
export {login, register, refresh_interceptor};