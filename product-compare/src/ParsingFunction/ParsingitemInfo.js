const cheerio = require('cheerio');

function ParsingitemInfo(html) {
    // 외부 HTML 문서의 내용을 가져옴
    const externalHTML = html;
    // cheerio를 사용하여 HTML을 파싱
    const $ = cheerio.load(externalHTML);
    
    // 리뷰 수 정보 가져오기
    const totalReview = $('.totalArea_value__VV7TJ').children('span').text();
    
    // 기본 정보
    const itemInfo = $('.top_info_inner__aM_0Z')
    .children('span')
    .map((index, el) => $(el).text()).get()
    
    // "정보 수정요청" 이전의 요소들만 추출하여 새로운 배열 생성
    const indexToRemove = itemInfo.indexOf("정보 수정요청");
    const newItemInfo = indexToRemove !== -1 ? itemInfo.slice(indexToRemove + 1) : itemInfo;
    // total 리뷰에서 평점과 리뷰 개수로 분리
    const totalReviewArray = totalReview.split('');
    const score = totalReviewArray.slice(0, 3).join('');
    const reviewNum = totalReviewArray.slice(5).join('');
    // "score"와 "reviewNum" 분리
    // const score = totalReviewArray.slice(0, 4).join(' ');
    // const reviewNum = totalReviewArray.slice(4).join(' ');
    return [score, reviewNum, newItemInfo]
}


export default ParsingitemInfo;