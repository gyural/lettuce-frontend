import React, { useContext, useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import image1 from "../../images/btnG_완성형.png";
import image2 from "../../images/kakao_login_large_wide.png";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/Auth";
import { AuthContext } from "../../App";

const Container = styled.div`
    border: 2px solid #19ce60;
    width: 500px;
    height: 425px;
    padding: 20px;
    border-radius: 14px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const ButtonWrapper = styled.div``;
const Input = styled.input`
    padding: 4px;
    font-size: 18px;
    display: block;
    width: 440px;
    height: 47px;
    border: 2px solid #19ce60;
    border-radius: 14px;
    box-sizing: border-box;
    &:focus {
        outline: none;
    }
    &::placeholder {
        font-size: 12px;
    }
    margin-bottom: 1px;
`;
function LoginCard(props) {
    const [isLoggedIn, setIsLoggedIn] = useContext(AuthContext);
    const [formData, setFormData] = useState({
        id: "",
        password: "",
        isChecked: true,
    });
    const navigate = useNavigate();
    const handleSubmit = () => {
        //여기에 form 데이터를 서버로 제출하는 로직을 작성하고
        //임시로 콘솔창에 출력하겠습니다.
        console.log(formData);
        if (login(formData.id, formData.password)) {
            const authInfo = {
                isLoggedIn: true,
                id: formData.id,
            };
            setIsLoggedIn(authInfo);
            navigate("/");
        }
    };

    const handleChange = (e) => {
        const { name, value, checked } = e.target;

        if (name === "isChecked") {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: checked,
            }));
        } else {
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
                    placeholder="이메일을 입력해주세요"
                    onChange={handleChange}
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="비밀번호를 입력해주세요"
                    value={formData.password}
                    onChange={handleChange}
                />

                <div
                    className="login-state"
                    style={{
                        display: "flex",
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
                    width: "98%",
                    height: "64px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    gap: "85px",
                    // border: '4px solid red',
                    marginBottom: "8px",
                }}
            >
                <Button
                    style={{
                        marginLeft: "20px",
                        position: "absolute",
                        left: "10px",
                        top: "10px", // 버튼을 아래로 이동시킴
                    }}
                    title={" 로그인 "}
                    bgcolor={"#02C75A"}
                    color={"#ffffff"}
                    onClick={handleSubmit}
                />

                <Button
                    style={{
                        marginTop: "20px",
                        position: "absolute",
                        top: "1px",
                    }}
                    title={"회원가입"}
                    bgcolor={"#6F6B6B"}
                    color={"#ffffff"}
                    onClick={() => {
                        // alert('회원가입 버튼 클릭')
                        navigate("/signup");
                    }}
                />
            </ButtonWrapper>

            <div className="social-login">
                <a
                    className="kakao-login"
                    href="javascript:void(0)"
                    style={{
                        display: "block",
                        width: "440px",
                        height: "54px",
                        backgroundImage: `url(${image2})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        borderRadius: "25px",
                        marginBottom: "18px",
                    }}
                ></a>
                <a
                    className="naver-login"
                    href="javascript:void(0)"
                    style={{
                        backgroundColor: "#02C75A",
                        display: "block",
                        width: "440px",
                        height: "54px",
                        backgroundImage: `url(${image1})`,
                        backgroundSize: "340px 60px",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        borderRadius: "25px",
                    }}
                ></a>
            </div>
        </Container>
    );
}

export default LoginCard;
