import React, {useState} from "react";
import styled from "styled-components";
import Button from "./Button";
import image1 from '../../images/btnG_완성형.png';
import image2 from '../../images/kakao_login_large_wide.png';

const Container = styled.div`
    border: 4px solid #19CE60;
    width: 620px;
    height: 531px;
    padding: 20px;
    box-sizing: border-box;
    
`;
const ButtonWrapper = styled.div`
    
`;
const Input = styled.input`
    display: block;
    width: 558px;
    height: 59px;
    border: 2px solid #19CE60;
    border-radius: 14px;
    box-sizing: border-box;
    &:focus{
        outline: none;
    }
    margin-bottom: 1px;
`;
function LoginCard(props){
    const [formData, setFormData]= useState({
        id: '',
        password: '',
        isChecked: true,
    })

    const handleSubmit = () =>{
        //여기에 form 데이터를 서버로 제출하는 로직을 작성하고
        //임시로 콘솔창에 출력하겠습니다.
        console.log(formData)
    }

    const handleChange = (e) => {
        const { name, value, checked} = e.target;
        
        
        if (name === "isChecked"){
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: checked,
                
            }));
        }
        else{
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
                
            }));
        }
        
        
    
    };
    return (
        <Container>
            <form>
                <Input
                    type="text"
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                />
                <Input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <div 
                    className="login-state"
                    style={{
                        display: 'flex',
                    }}
                >
                <input 
                    type="checkbox"
                    name="isChecked"
                    checked={formData.isChecked}
                    onChange={handleChange}
                />
                <p>로그인 상태 유지</p>
            </div>
            </form>
            
            
            <ButtonWrapper
                style={{
                    height: '64px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',

                }}>
                <Button
                    style={{
                        marginTop: '20px',
                    }} 
                    title={"로그인"}
                    bgcolor = {'#02C75A'}
                    color = {'#ffffff'}
                    onClick= {handleSubmit}
                    />
            </ButtonWrapper>
            
            <ButtonWrapper
                style={{
                    height: '64px',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-start',
                }}
            >
                <Button
                style={{
                    marginTop: '20px',
                }} 
                title={"회원가입"}
                bgcolor = {'#333'}
                color = {'#ffffff'}
                onClick= {()=>{
                    alert('회원가입 버튼 클릭')
                }}
                
                />
            </ButtonWrapper>
            <div className="social-login">
                
                
                    <a 
                    className="kakao-login"
                    href="javascript:void(0)"
                    style = {{
                        display: 'block',
                        width: '558px',
                        height: '69px',
                        backgroundImage: `url(${image2})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        borderRadius: '25px',
                        marginBottom: '18px',
                    }}
                    ></a>
                    <a 
                    className="naver-login"
                    href="javascript:void(0)"
                    style = {{
                        display: 'block',
                        width: '558px',
                        height: '69px',
                        backgroundImage: `url(${image1})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        borderRadius: '25px',
                        }}
                        ></a>
                    
                
                
            </div>
        </Container>
    )

}

export default LoginCard;
