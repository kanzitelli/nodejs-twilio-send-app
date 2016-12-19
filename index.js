var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.urlencoded({ extended: false }));

// RECEIVING MESSAGE
app.post('/message', function(req, res) {
  console.log(req.body);
  var msgFrom = req.body.From;
  var msgBody = req.body.Body;

  res.send(`
    <Response>
      <Message>
        Hello ${msgFrom}. You said: ${msgBody}
      </Message>
    </Response>
  `)
})

// SENDING MESSAGE
// Twilio Credentials
var accountSid = 'YOUR_ACCOUNT_SECURITY_ID';
var authToken = 'YOUR_AUTH_TOKEN';
var client = require('twilio')(accountSid, authToken);

app.get('/sendMessageTo/:number', function(req, res) {
  var number_to_check = '+19173624040'
  var number = req.params.number;

  console.log(number);

  if (number == number_to_check) {
    client.messages.create({
    	from: "+19177464171",
      to: number,
      body: "Hello from Batyr Kanzitdinov 🙂"
    }, function(err, message) {
    	if(err) {
        console.error(err.message);
      } else {
        res.send(`Message is sent to ${number}`);
      }
    });
  } else {
    res.send(`Number ${number} is not ${number_to_check}`);
  }

})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
