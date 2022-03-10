const util = require('util');
const exec = util.promisify(require('child_process').exec);

const command = `speedtest -f json -u Mibps`;

async function measureSpeed() {
    const { stdout, stderr } = await exec(command);
    try {
        const result = {};
        const json = JSON.parse(stdout);
        // console.log(json);

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
        result.packetLoss = json.packetLoss;
        result.result += `Pakiety stracone: ${result.packetLoss}%; `;
        result.isp = json.isp;
        result.result += `ISP: ${result.isp}; `;
        result.server = `${json.server.name}-${json.server.location}`;
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
    console.log(speed.result);
})();
