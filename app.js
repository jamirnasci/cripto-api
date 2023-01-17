const axios = require('axios')
const cheerio = require('cheerio')
const http = require('http')

const keys = {
    BITCOIN: 'bitcoin',
    BNB: 'bnb',
    TETHER: 'tether',
    USD_COIN: 'usd-coin',
    XRP: 'xrp',
    ETHEREUM: 'ethereum'
}

async function api() {
    let finalJson = {}
    for (let [key, valu] of Object.entries(keys)) {
        let req = await axios(`https://br.investing.com/crypto/${valu}`)
            .then(function (response) {
                let $ = cheerio.load(response.data)
                let val = $("#last_last").text()
                finalJson[key] = `USD ${val}`
            })

    }
    return finalJson
}
http.createServer(function(req, res){
    api().then(function(criptoValues){
        res.end(JSON.stringify(criptoValues))
    })
}).listen(8080)
