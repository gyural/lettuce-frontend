import axios from "axios";
const cheerio = require('cheerio')


async function ParsingItemURL(productId) {
    // const baseUrl = 'https://search.shopping.naver.com/product/37097247618';
    const baseURL = 'https://search.shopping.naver.com/product/'
    const targetURL = baseURL + productId
    
    
    try {
        const response = await axios.post(targetURL);
        const html = response.data;

        if (html) {
            const $ = cheerio.load(html);
            const productLinks = $('.product_btn_link__XRWYu'); // 클래스명에 해당하는 요소 선택
            return(productLinks.eq(1).attr('href').toString());
        }
    } catch (error) {
        console.error('Error fetching HTML:', error);
        return null;
    }
}

export default ParsingItemURL;


