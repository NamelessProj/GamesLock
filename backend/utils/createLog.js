const Log = require('../models/logModel');
const os = require("os");

const createLog =  async (result, user) => {
    await Log.create({
        city: result.ipData.city ?? '',
        country: result.ipData.country ?? '',
        countryName: result.ipData.countryName ?? '',
        system: os.type() ?? '',
        platform: os.platform() ?? '',
        deviceName: os.hostname() ?? '',
        ip: result.currentIp,
        user: user._id
    });
}

module.exports = {
    createLog
}