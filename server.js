var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var validator = require('./config/validator.js');
var mailer = require('nodemailer');
var app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => res.send(__dirname + '/public/index.html'));
app.get('/feedback', (req, res) => res.sendFile(__dirname + '/public/form.html'));

app.post('/form', (req, res) => {
  const formConfig = validator.getFormConfig('suggestions');
  const errorFields = validator.validate(req.body, formConfig);

  if(errorFields.length === 0) {
    let transporter = mailer.createTransport({
      service: 'gmail',
      auth: {
        user: '',
        pass: ''
      }
    });

    var mailOptions = {
      from: 'Josh The Gamer <*emailHere*>',
      to: req.body.email,
      subject: 'Response Recieved',
      text: `Hello ${req.body.fname} ${req.body.lname}!
      We have recieved your response! Thank you for your feedback!

      The data you entered was:

      - First Name: ${req.body.fname}
      - Last Name: ${req.body.lname}
      - Email: ${req.body.email}
      - Country: ${req.body.country}
      - Suggestion: ${req.body.suggestion}`,
      html: `Hello ${req.body.fname} ${req.body.lname}!
      We have recieved your response! Thank you for your feedback!

      The data you entered was:

      <ul>
      <li>First Name: ${req.body.fname}</li>
      <li>Last Name: ${req.body.lname}</li>
      <li>Email: ${req.body.email}</li>
      <li>Country: ${req.body.country}</li>
      <li>Suggestion: ${req.body.suggestion}</li>
      </ul>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.send(error);
      } else {
        console.log('Email sent: ' + JSON.stringify(JSON.parse(info.response)));
      }
    });
  } else {
    console.log(errorFields);
  }

  res.json(errorFields);
});

app.listen(8080, () => console.log('Server listening on port 8080'));
