const cheerio = require('cheerio');

function ParsingItemReview(html) {
    const externalHTML = html;
    const $ = cheerio.load(externalHTML);
    
    const reviewTexts = $('.reviewItems_text__XrSSf').map((index, element) => {
        return $(element).text();
    });
    
    const maxLength = 100;
    const result = reviewTexts.toArray();
    const trimmedArray = result.map(str => {
        if (str.length > maxLength) {
            return str.substring(0, maxLength);
        } else {
            return str;
        }
    });
    
    if (result.length === 0) {
        return ['댓글 없음!!']; // .reviewItems_text__XrSSf 클래스가 없는 경우 -1을 배열로 반환
    } else if (result.length < 5) {
        return trimmedArray;
    } else {
        return trimmedArray.slice(0, 3);
    }
}

export default ParsingItemReview;