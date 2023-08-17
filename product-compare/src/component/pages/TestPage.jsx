// import React, { useEffect, useState } from "react";
// import puppeteer from 'puppeteer';

// const TestPage = ({ url }) => {
//   const [htmlContent, setHtmlContent] = useState('');

//   useEffect(() => {
//     const fetchHtml = async () => {
//       try {
//         const browser = await puppeteer.launch();
//         const page = await browser.newPage();
//         await page.goto('https://smartstore.naver.com/tomatozzzzz/products/4886397324');
//         const content = await page.content();
//         setHtmlContent(content);
//         await browser.close();
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     };

//     fetchHtml();
//   }, [url]);

//   return (
//     <div>
//       <h2>HTML Document from {url}</h2>
//       <pre>{htmlContent}</pre>
//     </div>
//   );
// };

// export default TestPage;