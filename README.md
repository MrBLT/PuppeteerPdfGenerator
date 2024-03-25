This app starts a chrome headless browser and express server to generate PDFs from source URLS or HTML. Puppetteer stays
open in the background to avoid the overhead of opening chrome, creating a new tab, generating pdf, closing tab, closing
browser. This just opens a tab, creates pdf, then closes tab.

## Setup Environment Variables
Configure the .env file according to your needs
#### <sub>*REQUIRED* - The port to be consumed by the Express App for HTTP requests</sub>

* `EXPRESS_JS_PORT=1337`

#### <sub>*OPTIONAL* - If deploying via Windows Service, configure the name and description</sub>

* `WINDOWS_SERVICE_NAME="PuppeteerPdfGenerator"`
* `WINDOWS_SERVICE_DESCRIPTION="A service to generate PDFs using Puppeteer"`

#### <sub>*OPTIONAL* - If deploying via Windows Service, configure the path to Chrome, installed by Puppeteer</sub>

<sup><sub>The directory where chrome was downlaoded when puppeteer was installed for this project.
My chrome was downloaded to `C:\Users\username\.cache\puppeteer\chrome\win64-123.0.6312.58` but they only want the
puppeteer folder.
If the windows service isnt working, check error log in daemon folder, look for version like the line above, and search
recursively to locate the chrome install.</sub></sup>

* `PUPPETEER_CACHE_DIR="C:\Users\username\.cache\puppeteer"`

## Launch PuppeteerPdfGenerator Manually

1. run `npm install`
2. run `node index.js`

## Usage

1. Determine HOST running the project, if development this is http://localhost:1337 if port not changed
2. Generate a PDF from URL `<HOST>/pdf/url?target=https%3A%2F%2Fwww.google.com%0A`
3. Generate a PDF from HTML by sending a POST request to `<HOST>/pdf/html`
    * Set the request body with the HTML content

## Deploy as Windows Service

The deployment script will install (or reinstall if already exists) a Windows Service and start it. The "Optional" environment variables above are required if using this deployment.

1. run `npm install`
2. run `node deploy.js`
