# DEMO Chatbots BACKEND,  Planning to host multiple backends for various bots here

##Get Started
#Install Dependencies and typings 
`npm install`

#build both client and server applications
`gulp`

#Go to dist and run node app
`cd dist`
`node server`

#As the bots will be deployed on Facebook messanger, refer messager docs on
`https://developers.facebook.com/docs/messenger-platform7`

#Endpoint urls
`localhost:9090/   -> That is the base endpoint URL`


#As Facebook needs the HTTPS urls for its Webhook, so we are using ngrok for local testing, it creates https tunnels for your localhost urls
`ngrok http 8080   -> creates tunnel on http port 8080, so http://localhost:8080 will be tunneled to some https address ngrok provides`
`http://localhost:4040/inspect/http  -> track all Rest calls happening via tunnel`
`ngrok documentation  - https://ngrok.com/`


# Mock JSON server
For fast proptotyping, we are using json-server to mock REST apis for banking chatbots applications


**steps to follow** 

:one: For project personal-assistant-chatbot-backend run 
      **npm install**
      This will install **json-server** for application
	  
:two: Open cmd and cd to personal-assistant-chatbot-backend\server\src\data\mockdata 

:three: start json server by executing command 
        **json-server userData.json**
        This will start json server (by default) at http://localhost:3000

**NOTE** -
**userData.json** will be treated as mock DB and with json-server you can doa all HTTP GET/POST/PUT/DELET operations.

 