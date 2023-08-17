const cheerio = require('cheerio')

function ParsingItemReview(html) {
    // 외부 HTML 문서의 내용을 가져옴
    const externalHTML = html;

    // cheerio를 사용하여 HTML을 파싱
    const $ = cheerio.load(externalHTML);

    // 클래스명이 ".reviewItems_text__XrSSf"인 요소들 가져오기
    const reviewTexts = $('.reviewItems_text__XrSSf').map((index, element) => {
        return $(element).text();
    })
    const maxLength = 100;
    const result = reviewTexts.toArray()
    const trimmedArray = result.map(str => {
        if (str.length > maxLength) {
            return str.substring(0, maxLength); // 지정된 길이까지 자르기
        } else {
            return str;
        }
    });
    // 리뷰 개수를 조정하기
    if (result.length == 0){
        return -1
    }
    else if(result.length < 5){
        return trimmedArray
    }
    else{
        return trimmedArray.slice(0, 3)
    }
   
}


export default ParsingItemReview;