const express = require('express')
const puppeteer = require('puppeteer')
const bodyParser = require('body-parser')
const app = express()
const port = 1337

browser = null;
// page = null;

(async () => {
    browser = await puppeteer.launch({
        headless: true
    });
    if(browser.isConnected() === true) {
        console.log('Puppeteer Launched');
    } else {
        console.log('Puppeteer Not Started');
    }
})();

app.get('/', async (req, res) => {
    const allpages = await browser.pages();

    res.send('Browser Connected : '+browser.isConnected()+'<br>Num Pages : '+allpages.length)
})

app.get("/pdf/url", async (req, res) => {
    const url = req.query.target;
    // const url = 'https://www.google.com';

    let start = new Date();

    if(browser.isConnected() === true){

        page = await browser.newPage();
        await page.goto(url, {
            waitUntil: "networkidle0"
        });

        const pdf = await page.pdf({
            printBackground: true,
            format: "Letter",
        });

        await page.close();

        let end = new Date();
        console.log('PDF Generated from URL in '+((end - start)/1000)+' seconds');

        res.contentType("application/pdf");
        res.send(pdf);
    } else {
        res.status(409);
        res.send();
    }

})

app.use(bodyParser.urlencoded({ extended: true }));
app.post("/pdf/html", async (req, res) => {

    const content = req.body.content;
    // const url = 'https://www.google.com';

    let start = new Date();

    if(browser.isConnected() === true) {
        page = await browser.newPage()
        await page.setContent(content, {
            waitUntil: "networkidle0"
        });

        const pdf = await page.pdf({
            printBackground: true,
            format: "Letter",
        });

        await page.close();

        let end = new Date();
        console.log('PDF Generated from HTML in '+((end - start)/1000)+' seconds');

        res.contentType("application/pdf");
        res.send(pdf);
    } else {
        res.status(409);
        res.send();
    }

})

app.listen(port, () => {
    console.log(`Puppeteer app listening at http://localhost:${port}`)
})
