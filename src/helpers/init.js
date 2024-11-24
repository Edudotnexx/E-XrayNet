import { isValidUUID } from './helpers';
const defaultProxyIP = 'proxyip.digitalocean.hw.090227.xyz';
let userID, dohURL, proxyIP, trojanPassword, defaultHttpPorts, defaultHttpsPorts, panelVersion, hostName, origin, client, pathName;

function initParams(request, env) {
    const proxyIPs = env.PROXYIP?.split(',').map(proxyIP => proxyIP.trim());
    userID = env.UUID || '91a5b755-2540-4fff-8999-2b7ad24e3590';
    if (!isValidUUID(userID)) throw new Error(`Invalid UUID: ${userID}`);
    dohURL = env.DOH_URL || 'https://4arbug92l7.cloudflare-gateway.com/dns-query';
    proxyIP = proxyIPs ? proxyIPs[Math.floor(Math.random() * proxyIPs.length)] : defaultProxyIP;
    trojanPassword = env.TROJAN_PASS || 'bpb-trojan';
    defaultHttpPorts = ['80', '8080', '2052', '2082', '2086', '2095', '8880'];
    defaultHttpsPorts = ['443', '8443', '2053', '2083', '2087', '2096'];
    panelVersion = '2.7.5';
    hostName = request.headers.get('Host');
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);
    client = searchParams.get('app');
    origin = url.origin;
    pathName = url.pathname;
}

export function initializeParams(request, env) {
    initParams(request, env);
    return Promise.resolve();
}

export { userID, dohURL, proxyIP, trojanPassword, hostName, origin, client, pathName, defaultHttpPorts, defaultHttpsPorts, panelVersion };
