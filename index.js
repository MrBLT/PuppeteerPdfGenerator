// const express = require('express');
// const puppeteer = require('puppeteer');
import puppeteer from "puppeteer";
import express from "express";
const app = express();
const port = 1337;

// Middleware for parsing JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let browser = null;

// Initialize Puppeteer browser
(async () => {
    try {
        browser = await puppeteer.launch({
            headless: true // Run browser in headless mode for server environments
        });
        console.log('Puppeteer Launched');
    } catch (error) {
        console.error('Puppeteer launch failed:', error);
    }
})();

// Route to check Puppeteer browser connection and list open pages
app.get('/', async (req, res) => {
    if (browser) {
        const allPages = await browser.pages();
        res.send(`Browser Connected: ${browser.isConnected()}<br>Number of Pages: ${allPages.length}`);
    } else {
        res.status(503).send('Puppeteer Browser Not Initialized');
    }
});

// Route to generate PDF from URL
app.get('/pdf/url', async (req, res) => {
    const url = req.query.target;
    if (!url) {
        return res.status(400).send('Missing target URL query parameter');
    }

    if (browser && browser.isConnected()) {
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle0' });

        const pdf = await page.pdf({
            printBackground: true,
            format: 'Letter',
        });

        await page.close();
        res.contentType('application/pdf');
        res.send(pdf);
    } else {
        res.status(503).send('Puppeteer Browser Not Connected');
    }
});

// Route to generate PDF from HTML content
app.post('/pdf/html', async (req, res) => {
    const { content } = req.body;
    if (!content) {
        return res.status(400).send('Missing HTML content in request body');
    }

    if (browser && browser.isConnected()) {
        const page = await browser.newPage();
        await page.setContent(content, { waitUntil: 'networkidle0' });

        const pdf = await page.pdf({
            printBackground: true,
            format: 'Letter',
        });

        await page.close();
        res.contentType('application/pdf');
        res.send(pdf);
    } else {
        res.status(503).send('Puppeteer Browser Not Connected');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Puppeteer app listening at http://localhost:${port}`);
});