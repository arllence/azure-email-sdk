const { EmailClient } = require("@azure/communication-email");
require("dotenv").config();

// This code demonstrates how to fetch your connection string
// from an environment variable.
const connectionString = process.env['COMMUNICATION_SERVICES_CONNECTION_STRING'];
const sender = process.env['SENDER'];
const help_email = process.env['HELP_EMAIL'];


async function main(email,otp,subject) {
    console.log(email,otp,subject)
    try {
      var client = new EmailClient(connectionString);
      //send mail
      const emailMessage = {
        sender: "<" + sender + ">",
        content: {
          subject: subject,
          plainText: "Hi,\nHere is your otp code for account activation: " + otp + "\n\nRegards\nAfrica Youth Adaptation Challenge\nFor assisatance email: " + help_email
        },
        recipients: {
          to: [
            {
              email: "<"+ email + ">",
            },
          ],
        },
      };
      var response = await client.send(emailMessage);
    } catch (e) {
      console.log(e);
    }
  }
//   main();


var http = require('http');
http.createServer(function (request, response) {

    var body = ''
    request.on('data', function(data) {
        body += data
    })
    request.on('end', function() {
        response.writeHead(200, {'Content-Type': 'text/html'})
        response.end()
        console.log(body)
        try {
            // body = JSON.parse(body) // Coverts received request body to json
            var email = body['email']
            var otp = body['otp']
            var subject = body['subject']
            main(email,otp,subject) // calls azure senamail fuction
          } catch (err) {
            // 👇️ SyntaxError: Unexpected end of JSON input
            console.log('error', err);
          }        
        
    })
    

}).listen(8080);