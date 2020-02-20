const chromium = require('chrome-aws-lambda');

module.exports.handler = async (event) => {
  const reqUrl = event.queryStringParameters.url;
  let browser = null;
  console.log("Capturing PDF for URL: " + reqUrl);

  try {
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless
    });
    const page = await browser.newPage();
    await page.goto(reqUrl);
    const pdf = await page.pdf({format: 'A4'});

    return {
      statusCode: 200,
      isBase64Encoded: true,
      headers: {
          "Content-type": "application/pdf",
          "accept-ranges": "bytes",
          'Access-Control-Allow-Origin': '*',
      },
      body: pdf.toString('base64')
    }
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }
};
