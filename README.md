# Serverless Print Conversion

Convert HTML print documents to PDF thru a lambda functions.

&nbsp;

This is a serverless API with multiple [AWS Lambda](https://www.github.com/serverless-components/aws-lambda) Components for converting HTML files to PDF for printing.

[Learn more about the AWS Lambda Component in its repository.](https://www.github.com/serverless-components/aws-lambda)

&nbsp;

1. [Install](#1-install)
2. [Deploy](#2-deploy)
3. [Notes](#3-notes)

&nbsp;

### 1. Install

Install the [Serverless Framework](https://www.github.com/serverless/serverless):

```console
$ npm i -g serverless
$ cd serverless-print-conversion
$ npm install
```

Apply the access keys of an AWS IAM Role with `AdministratorAccess`, using this format:

```bash
$ serverless config credentials --provider aws --key 1234 --secret 5678
```

Or, you can set these as environment variables manually before deploying.

### 2. Deploy

Deploy via the `serverless` command:

```console
$ serverless deploy
```

Use the `--debug` flag if you'd like to learn what's happening behind the scenes:

```console
$ serverless deploy --debug
```
