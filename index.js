// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const res = require('express/lib/response');
const req = require('express/lib/request');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

function return_object(date, res)
{
  let unix_time = date.getTime();
  let utc_time = date.toUTCString();
  res.json({"unix": unix_time, "utc": utc_time});
};

app.get("/api/:date?", function (req, res) {
  if (/^[0-9]{5,}/.test(req.params.date))
  {
    let date = new Date(parseInt(req.params.date));
    return_object(date, res);
  }
  else if (req.params.date)
  {
    let date = new Date(req.params.date);
    if (date == "Invalid Date")
    {
      res.json({ error : "Invalid Date"});
    }
    else
    {
      return_object(date, res);
    }
  }
  else
  {
    let date = new Date();
    return_object(date, res);
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
