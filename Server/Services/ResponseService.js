const OK = (res, data) => {
    return res.json({ status: true, data: data })
}

const ERROR = (res, data) => {
    return res.json({ status: false, data: data })
}

const RESP = (res, status, data) => {
    return res.json({ status: status, data: data })
}

module.exports = {
    OK, ERROR, RESP
}