const http =require('http')
const fs = require('fs')
var requests = require('requests')
const homefile = fs.readFileSync("home.html","utf-8");
const replaceVal = (tempval,orgval)=>{
    let temperature  = tempval.replace("{%tempval%}",orgval.main.temp);
     temperature  = temperature.replace("{%tempmin%}",orgval.main.temp_min);
     temperature  = temperature.replace("{%tempmax%}",orgval.main.temp_max);
     temperature  = temperature.replace("{%location%}",orgval.name);
     temperature  = temperature.replace("{%country%}",orgval.sys.country);
     temperature  = temperature.replace("{%tempstatus%}",orgval.weather[0].main);
return temperature; 
}
const server = http.createServer((req,res)=>{
    if(req.url == "/"){
    requests('http://api.openweathermap.org/data/2.5/weather?q=nagpur&appid=849fbaeeb62a93d2a29f300edc2f0ba6')
    .on('data', (chunk)=> {
        const objData = JSON.parse(chunk)
        const arrdata =[objData]
        console.log(arrdata[0].weather[0].main)
        const realtimedata = arrdata.map((val) => replaceVal(homefile,val)).join("");
     res.write(realtimedata) 
    })
    .on('end', (err)=> {
      if (err) return console.log('connection closed due to errors', err);
      res.end();
    });
    }
});
server.listen(2000,"127.0.0.1");


