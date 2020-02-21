export API_URL='https://uwzjz947ok.execute-api.us-east-1.amazonaws.com/dev/api/v1/pdf/capture'
export PARAM1=$1
if [ "${PARAM1}" == "" ]
then
	export PARAM1="1"
fi
export DEMO_URL="https%3A%2F%2Fwww.google.com%2Fsearch?q=${PARAM1}&tbm=isch"
export DEMO_URL="https%3A%2F%2Fwww.google.com%2Fsearch%3Fq%3D${PARAM1}%26tbm%3Disch"
echo $DEMO_URL
export TEMP_DIR='/tmp'
export TEMP_FILE_NAME="output-${PARAM1}.pdf"

# Generate and download file 
curl -o "${TEMP_DIR}/${TEMP_FILE_NAME}"  --location --request GET "${API_URL}?url=${DEMO_URL}" --header 'Accept: application/pdf'

# Mac command  open in Preview
#open -n "${TEMP_DIR}/${TEMP_FILE_NAME}"  


# Mac command to open in Chrome
#/usr/bin/open -na "/Applications/Google Chrome.app" --args --new-window  "${TEMP_DIR}/${TEMP_FILE_NAME}"

