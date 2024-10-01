const requestIp = require("request-ip");
const fetch = require("node-fetch");

const getIpInformation = async (req) => {
    const currentIp = requestIp.getClientIp(req);
    const url = `https://ipapi.co/${currentIp}/json/`;
    console.log(url)
    const ipFetch = await fetch(url);
    const ipData = await ipFetch.json();
    return {
        ipData,
        currentIp
    };
}

module.exports = {
    getIpInformation
}