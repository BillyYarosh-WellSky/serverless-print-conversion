const wkhtmltopdf = require('wkhtmltopdf');
const fs = require('fs');
var MemoryStream = require('memorystream');

process.env["PATH"] =
    process.env["PATH"] + ":" + process.env["LAMBDA_TASK_ROOT"] + "/bin";

module.exports.handler = async (event) => {
    const reqUrl = event.queryStringParameters.url

    try {
        const output = event.queryStringParameters.tmpFile == "true" ?
            getPdfFromFile(reqUrl) : await getPdfStream(reqUrl);
        return {
            statusCode: 200,
            isBase64Encoded: true,
            headers: {
                "Content-type": "application/pdf",
                "accept-ranges": "bytes",
                'Access-Control-Allow-Origin': '*',
            },
            body: output.toString('base64')
        };
    }
    catch (error) {
        console.log(error);
    }
};

const getPdfStream = async (reqUrl) => {
    console.log("Executing PDF Stream Request on: " + reqUrl);
    const stream = wkhtmltopdf(reqUrl);
    const chunks = [];
    stream.on("data", chunk => {
        chunks.push(chunk);
    });
    return new Promise((resolve, reject) => {
        stream.on("end", () => resolve(Buffer.concat(chunks)));
        stream.on("error", reject);
    });
};

const getPdfFromFile = (reqUrl) => {
    console.log("Executing PDF Request using TMP file on: " + reqUrl);
    const outputPdf = "/tmp/output.pdf";
    fs.closeSync(fs.openSync(outputPdf, 'w'));
    wkhtmltopdf(reqUrl, {
        output: outputPdf
    });
    return fs.readFileSync(outputPdf);
};

const pipePdfStream = async (reqUrl) => {
    console.log("Executing PDF Pipe Response on: " + reqUrl);
    const stream = wkhtmltopdf(reqUrl);
    const chunks = [];
    stream.on("data", chunk => {
        chunks.push(chunk);
    });
    return new Promise((resolve, reject) => {
        stream.on("end", () => resolve(Buffer.concat(chunks)));
        stream.on("error", reject);
    });
};


module.exports.pipeHandler = function(event, context, callback) {
    const reqUrl = event.queryStringParameters.url
	const memStream = new MemoryStream();

	wkhtmltopdf(reqUrl, {pageSize: "letter"}, function(code, signal) {
	    const response = {
            statusCode: 200,
            body: JSON.stringify({
                pdfBase64: memStream.read().toString('base64'),
                options: body.options
            })
        };
        callback(null, response);
	}).pipe(memStream);
};
