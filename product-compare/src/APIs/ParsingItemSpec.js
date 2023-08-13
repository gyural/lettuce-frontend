import axios from "axios";
const cheerio = require('cheerio')

async function parsingItemSpec(baseURL) {
    try {
        const response = await axios.get(baseURL, { headers: { 'User-Agent': '저 사람입니다ㅠㅠㅠ' } });
        const html = response.data;
        const $ = cheerio.load(html);

        const nextDataScript = $('script#__NEXT_DATA__').html();
        if (nextDataScript) {
            const jsonData = JSON.parse(nextDataScript);

            try {
                const specImageHtml = jsonData.props.pageProps.initialState.catalog.specInfo.catalogSpec.catalogSpecContent;
                const $specImage = cheerio.load(specImageHtml);
                const imageUrl = $specImage('img').attr('src');
                return imageUrl;
            } catch (error) {
                return 'undefined';
            }
        } else {
            console.log('No data found.');
            return -1;
        }
    } catch (error) {
        console.error('Error fetching product detail data:', error);
        return -1;
    }
}

export default parsingItemSpec;