const cheerio = require('cheerio');

function ParsingitemInfo(html) {
    // 외부 HTML 문서의 내용을 가져옴
    const externalHTML = html;
    // cheerio를 사용하여 HTML을 파싱
    console.log('1111')
    const $ = cheerio.load(externalHTML);

    // 리뷰 평점 가져오기!!!!
    const reviewAvg = $('.top_summary_title__ViyrM').text();
    
    // 리뷰 수 정보 가져오기
    const totalReview = $('.totalArea_value__VV7TJ').children('span').text();
    
    // 기본 정보
    const itemInfo = $('.top_info_inner__aM_0Z')
    .children('span')
    .map((index, el) => $(el).text())
    
    return {
        reviewAvg: reviewAvg,
        totalReview: totalReview,
        itemInfo: itemInfo
    }; 
}


export default ParsingitemInfo;