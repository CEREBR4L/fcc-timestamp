var express = require('express'),
        app = express(),
     moment = require("moment");

app.use('/', express.static('public'));

app.get('/:date', function(req, res){
    var date = req.params.date;
    var unix = null;
    var natural = null;
     
    
    if(+date >= 0){
      unix = +date;
      natural = toNatural(unix);
    }
    
    if(isNaN(+date) && moment(date, "MMMM D, YYYY").isValid()){
      unix = toUnix(date);
      natural = toNatural(unix); 
    }
    
    var toObj = { "unix": unix, "natural": natural };
    res.send(JSON.stringify(toObj)); 
    
});

function toNatural(unixDate){
  return moment.unix(unixDate).format("MMMM D, YYYY");
}

function toUnix(natDate){
  return moment(natDate, "MMMM D, YYYY").format("X");
}

app.use(function(req, res) {
    res.status(404).end('(404) Opps, seems you have got a little lost!');
});

app.listen('8080', function(){
  console.log('Now listening on port 8080!');
});