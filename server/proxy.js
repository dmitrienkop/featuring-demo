var corsProxy = require('cors-anywhere');

var host = '0.0.0.0';
var port = 8080;

corsProxy.createServer({
    originWhitelist: [],
    httpProxyOptions: {
        secure: false
    },
    setHeaders: {
        // to bedug miniapp use real authorized user browser cookies
        'cookie': 'mrcu=304861E7AFA93C7C5D1E068B3BD5; p=YAIDAFu6iAAA; searchuid=7359373261642568873; act=f2b7c0a610d645f0b456f5594e14f715; tmr_lvid=45ef5b61d7608405a1eb226793069c83; tmr_lvidTS=1642573741149; t=obLD1AAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAgAAABBAAgI2gcA; s=dpr=2|rt=1; sdcs=OvA7Eo8JXNQHVzlR; __utma=233768479.1311899231.1642573758.1642573758.1642573758.1; __utmc=233768479; __utmz=233768479.1642573758.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); Mpop=1642573830:535963405d4608721905000017031f051c054f6c5150445e05190401041d455c43434058090808115c565c5b1b4341:testqa009@mail.ru:; mtrc=%7B%22utm_source%22%3A%22link%22%2C%22utm_medium%22%3A%22referral%22%2C%22utm_campaign%22%3A%22screenshoter%22%2C%22mytrackerid%22%3A52864%2C%22tmr_lvid%22%3A%2245ef5b61d7608405a1eb226793069c83%22%7D; __utma=91600834.1577429137.1642573884.1642573884.1642573884.1; __utmc=91600834; __utmz=91600834.1642573884.1.1.utmcsr=pmm-17764.api.myalpha4.i.mail.ru|utmccn=(referral)|utmcmd=referral|utmcct=/apps/my/; c=prHnYQEAoHsTAAAUAQwACQAAwDNjkAHEDAjN1IAjAAShj7IxA2YMMoAA; b=QkoBAIA83GgCAQAAwpkNjhkA; tmr_reqNum=13; __utmb=91600834.7.10.1642573884; __utmt=1; __utmb=233768479.22.10.1642573758; VID=0S_fux1_wo2700000a18H4Y7:::70208c6-0-0-701f6e0:CAASEDxsoh-YwoNEQIR_ueJbzeIaYHfIUrfDhwgp_y0VunklZuTfixE0AcQlEuMJymtDZaecb3Z25tuPdPry-CViv-j1rAzKyFYgXG3xT7Xj4cw9tZo_YFyq292wY05ueC9Obq4v21bLAYzc8BeJX3czYTaf6Q'
    }
}).listen(port, host, function() {
    console.log('Running CORS Anywhere on ' + host + ':' + port);
});
