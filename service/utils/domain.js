
let domain = process.env.domain || null

if (domain == null) {
    domain = "http://gkdark.xyz"
}

module.exports = domain;