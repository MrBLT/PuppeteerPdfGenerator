// Import the necessary modules
import 'dotenv/config'
import {Service} from "node-windows";
import path from "path";
import {fileURLToPath} from 'url';

// Since ES modules don't have __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a new service object
const svc = new Service({
    name: process.env.WINDOWS_SERVICE_NAME,
    description: process.env.WINDOWS_SERVICE_DESCRIPTION,
    script: path.join(__dirname, "index.js"),
    nodeOptions: [
        "--harmony",
        "--max_old_space_size=4096"
    ],
    // allowServiceLogon: true,
    env: {
        name: 'PUPPETEER_CACHE_DIR',
        value: process.env.PUPPETEER_CACHE_DIR
    }
});

// Listen for the "install" event, which indicates the process is installed
svc.on("install", () => {
    console.log('Service is installed.');
    svc.start();
});

// Listen for the "uninstall" event so we know when it's done.
svc.on('uninstall',function(){
    console.log('Uninstall complete. Starting the installation.');

    // Install the service
    svc.install();
});

if (svc.exists) {
    console.log('The service already exists, lets reinstall it.');
    svc.uninstall();
} else {
    console.log('No existing service found, installing it fresh.');
    svc.install();
}