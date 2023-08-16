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
    const result = reviewTexts.toArray()
    // 리뷰 개수를 조정하기
    if (result.length == 0){
        return -1
    }
    else if(result.length < 5){
        return result
    }
    else{
        return result.slice(0, 2)
    }
   
}


export default ParsingItemReview;





