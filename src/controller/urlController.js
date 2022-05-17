const urlModel = require("../models/urlModel")
const mongoose = require('mongoose')

const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0;
}
// =========================================postUrl=======================================================



// =========================================getUrl=======================================================

const getUrl = async function (req, res) {
    try {

        const urlCode = req.params.urlCode
        if (!urlCode) {
            return res.status(400).send({ status: false, message: "Please enter urlCode!" });
        }

        const foundedUrl = await urlModel.findOne({ urlCode: urlCode })
        if (!foundedUrl) {
            return res.status(404).send({ status: false, message: "Url not found" })
        }

        const OriginalUrl = foundedUrl.longUrl;
        return res.status(301).redirect(OriginalUrl)

    } catch (err) {
        return res.status(500).send({ status: false, error: err.message })
    }
}
module.exports = {getUrl}