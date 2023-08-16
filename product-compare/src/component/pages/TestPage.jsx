import React from "react";
import axios from "axios";
import ParsingItemAspect from "../../ParsingFunction/ParsingItemAspect";
const TestPage = function(){
    const URL = 'https://search.shopping.naver.com/catalog/39850695619'
    axios
    .get(URL)
    .then((res) =>{
        console.log(ParsingItemAspect(res.data))
    })

    return(
        <div>
            테스트용 컴포넌트 입니다!!!
        </div>
    )
}

export default TestPage;