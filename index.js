// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date?", async (req, res) => {

  const dateStr  = req.params.date
 
  const isUnix = dateStr && dateStr.length >= 13 && !isNaN(Number(dateStr));

  let result= {}
   let unix
   let utc

   if(!dateStr || dateStr.trim() === ""){
    const date = new Date()
    unix = date.getTime()
    utc = date.toUTCString()
    result = {unix, utc}
    return res.json(result);
   }

  try {
   
    if(isUnix){
       unix = +dateStr
       utc = new Date(+dateStr).toUTCString()
    }else{
      const date = new Date(dateStr)
      if (isNaN(date.getTime())) {
        // If the date is invalid
        return res.json({ error: "Invalid Date" });
      }
       unix = date.getTime()
       utc = date.toUTCString()
    }
    result = {unix, utc}
    res.json(result);
  } catch (error) {
    console.error(error)
  }
  
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
