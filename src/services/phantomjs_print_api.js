'use strict';

const fs = require('fs');
const path = require('path');
const execFile = require('child_process').execFile;

module.exports.handler = (event, context, callback) => {
  const reqUrl = parseRequestUrl(event, callback);
  const phantomjs = path.resolve('bin/phantomjs-linux');
  const rasterize = path.resolve('lib/rasterize.js');
  const outputPdf = '/tmp/output.pdf';

  process.env['FONTCONFIG_PATH'] = '/var/task/fonts'
  execFile(phantomjs, [rasterize, reqUrl, outputPdf, "A4", 0.68], (err, stdout, stderr) => {
    handlePhantomjsError(err, callback);
    const output = fs.readFileSync(outputPdf);

    callback(null, {
      statusCode: 200,
      isBase64Encoded: true,
      headers: {
        "Content-type": "application/pdf",
        "accept-ranges": "bytes",
        'Access-Control-Allow-Origin': '*',
      },
      body: output.toString('base64')
    });
  });
}

const parseRequestUrl = (event, callback) => {
  console.log(event);
  const reqUrl = event.queryStringParameters.url
  if (!reqUrl) {
    const err = 'url parameter is undefined';
    return callback(err, {
      statusCode: 500,
      body: JSON.stringify({ 'error': err })
    });
  }
  return reqUrl;
}

const handlePhantomjsError = (err, callback) => {
  if (err) {
    console.log(err);
    callback(err, {
      statusCode: 500,
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        'error': err
      }),
    });
  }
}
