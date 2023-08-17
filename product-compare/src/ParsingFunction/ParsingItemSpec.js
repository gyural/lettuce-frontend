import axios from "axios";
const cheerio = require('cheerio')

function parsingItemSpec(html) {
    if (html) {
      const $ = cheerio.load(html);
      const nextDataScript = $('script#__NEXT_DATA__').html();
      
      if (nextDataScript) {
        try {
          const jsonData = JSON.parse(nextDataScript);
          const specImageHtml = jsonData.props.pageProps.initialState.catalog.specInfo.catalogSpec.catalogSpecContent;
          if (specImageHtml) {
            
            const $specImage = cheerio.load(specImageHtml);
            const imageUrl = $specImage('img').attr('src');
            if(imageUrl){
              return imageUrl
            }
            else{
              return -1
            }
          } else {
            return -1; // specImageHtml이 없을 경우 예외 처리
          }
        } catch (error) {
          console.error("Error parsing JSON data:", error);
          return -1; // JSON 파싱 오류 예외 처리
        }
      }
      else{
        return -1
      }
    }
    
    return -1; // html이 없을 경우 예외 처리
  }

export default parsingItemSpec;