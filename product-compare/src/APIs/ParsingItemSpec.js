import axios from "axios";
const cheerio = require('cheerio')

async function parsingItemSpec(baseURL) {
    try {
        const response = await axios.get(baseURL);
        const html = response.data;
        const $ = cheerio.load(html);

        const nextDataScript = $('script#__NEXT_DATA__').html();
        if (nextDataScript) {
            const jsonData = JSON.parse(nextDataScript);

            try {
                const specImageHtml = jsonData.props.pageProps.initialState.catalog.specInfo.catalogSpec.catalogSpecContent;
                const $specImage = cheerio.load(specImageHtml);
                const imageUrl = $specImage('img').attr('src');

                if (imageUrl) {
                    return Promise.resolve(imageUrl); // 이미지 URL을 Promise로 감싸서 반환
                } else {
                    return Promise.resolve('undefined');
                }
            } catch (error) {
                return Promise.resolve('undefined');
            }
        } else {
            console.log('No data found.');
            return Promise.resolve(-1);
        }
    } catch (error) {
        console.error('Error fetching product detail data:', error);
        return Promise.resolve(-1);
    }
}

export default parsingItemSpec;





