
import fetch from "node-fetch";
import { logger } from "./logger.helper.js";
import { HttpsProxyAgent } from "https-proxy-agent";
import { sleep } from "./general.helper.js";
import { changeURL } from "../const/config.const.js";


export class Proxy {
    constructor(proxy) {
        this.proxy = proxy;
        this.changeURL = changeURL;
        this.proxyAgent = this.proxy === '' ? undefined : new HttpsProxyAgent(this.proxy);
    }

    async changeIP() {
        if (this.changeURL != '') {
            try {
                const response = await fetch(this.changeURL, {
                    method: 'GET', headers: {
                        'Content-Type': 'application/json',
                    }
                })
                const resp = await response.text()
                logger.proxy('Change URL | ' + resp);
                logger.proxy('Change URL | Triggered. Sleep 30 sec');
                await sleep(30 * 1000);
                await this.getIP();
            } catch (e) {
                logger.error(e + '\nTry again after 10 seconds');
                sleep(10000);
                await this.changeIP();
            }
        }
    }

    async getIP() {
        try {
            const response = await fetch('https://api.ipify.org', {
                method: 'GET', headers: {
                    'Content-Type': 'application/json',
                }, agent: this.proxyAgent
            })
            logger.proxy(`Current IP: ${await response.text()}`)
        } catch (e) {
            logger.error(e + '\nTry again after 10 seconds');
            sleep(10000);
            await this.getIP();
        }
    }

    async sendRequest(url, options) {
        try {
            const response = await fetch(url, { ...options, agent: this.proxyAgent });
            return await response.json();
        } catch (e) {
            logger.error(e + '\nTry again after 10 seconds');
            sleep(10000);
            return await this.sendRequest(url, options);
        }
    }
}

