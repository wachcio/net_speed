const COMMAND = `speedtest`;

import util from 'util';
import { exec as execute } from 'child_process';
const exec = util.promisify(execute);

import { promises as fs } from 'fs';

import { fileURLToPath } from 'url';
import path, { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const logsFile = join(__dirname, 'logs', 'log.txt');

async function measureSpeed() {
    const { stdout, stderr } = await exec(COMMAND + ' -f json');
    try {
        const result = {};
        const json = JSON.parse(stdout);

        result.timestamp = json.timestamp;
        result.result = `Data pomiaru: ${result.timestamp}; `;
        result.download = (json.download.bandwidth / 125000).toFixed(2);
        result.result += `Download: ${result.download}Mbps; `;
        result.upload = (json.upload.bandwidth / 125000).toFixed(2);
        result.result += `Upload: ${result.upload}Mbps; `;
        result.ping = json.ping.latency.toFixed(2);
        result.result += `Ping: ${result.ping}ms; `;
        result.jitter = json.ping.jitter.toFixed(2);
        result.result += `Jitter: ${result.jitter}ms; `;
        result.packetLoss =
            json.packetLoss > 0 ? json.packetLoss.toFixed(2) : json.packetLoss;
        result.result += `Pakiety stracone: ${result.packetLoss}%; `;
        result.isp = json.isp;
        result.result += `ISP: ${result.isp}; `;
        result.server = `${json.server.name} - ${json.server.location}`;
        result.result += `Serwer pomiaru: ${result.server}; `;
        result.url = json.result.url;
        result.result += `URL: ${result.url}`;

        return result;
    } catch {
        console.error('stderr:', stderr);
    }
}

(async () => {
    const speed = await measureSpeed();
    try {
        await fs.appendFile(logsFile, speed.result + '\r\n', 'utf8');
    } catch {
        console.error('cannot access');
        await fs.mkdir(path.dirname(logsFile));
        await fs.appendFile(logsFile, speed.result + '\r\n', 'utf8');
    }
    console.log(speed.result);
})();
