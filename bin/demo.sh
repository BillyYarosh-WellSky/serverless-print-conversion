export API_URL='https://uwzjz947ok.execute-api.us-east-1.amazonaws.com/dev/api/v1/pdf/capture'
export DEMO_URL='https%3A%2F%2Fapple.com'
export TEMP_DIR='/tmp'
export TEMP_FILE_NAME='output.pdf'

# Generate and download file 
curl -o '${TEMP_DIR}/${TEMP_FILE_NAME}'  --location --request GET '${API_URL}?${DEMO_URL}' --header 'Accept: application/pdf'

# Mac command  open in internet browser
open output.pdf  

