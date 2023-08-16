const cheerio = require('cheerio');

function ParsingItemAspect(html) {
    // 외부 HTML 문서의 내용을 가져옴
    const externalHTML = html;

    // cheerio를 사용하여 HTML을 파싱
    const $ = cheerio.load(externalHTML);

    // 클래스명이 ".filter_sub_list__zbKUv"인 ul 태그 가져오기
    const aspectList = $('.filter_sub_list__zbKUv')
    .children()
    .slice(1) // 첫 번째 자식 요소를 제외한 나머지 요소 선택
    .map((index, el) => $(el).text())
    .get();


    for (let i = aspectList.length - 1; i >= 0; i--) {
        if (aspectList[i] === "가격" ) {
            aspectList.splice(i, 1);
        }
    }
    return aspectList;
}

export default ParsingItemAspect;




