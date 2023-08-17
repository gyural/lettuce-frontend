import axios from "axios"
// import { useNavigate } from "react-router"



const login = (email, pw) => {

    // axios를 이용하여 jwt 로그인 요청을 보낸다.
    axios.post('http://localhost:8000/api/user/auth/', {
        'email': email,
        'password': pw,
    }, {withCredentials: true}).then((response) => {
        // console.log(response.data)
        alert('로그인 성공')
        // 벡엔드에서 httponly 쿠키로 토큰들이 전송되어 로그인됨
        // navigate('/')
    }).catch((error) => {
        console.log(error)
        alert('로그인 실패')
    })
}

const register = (email, pw) => {
    // axios를 이용하여 jwt 회원가입 요청을 보낸다.
    axios.post('http://localhost:8000/api/user/register/', {
        'email': email,
        'password': pw
    }, {withCredentials: true}).then((response) => {
        console.log(response.data);
        console.log('회원가입 성공')
        // 벡엔드에서 httponly 쿠키로 토큰들이 전송되어 로그인됨
        // navigate('/')
    }).catch((error) => {
        console.log(error)
        // 백엔드에서 자동으로 리프레시 해주므로 구현할 필요없음
        alert('회원가입 실패')
    })
}

export {login, register};