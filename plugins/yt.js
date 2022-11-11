import axios from 'axios'
import cheerio from 'cheerio'

async function getTOken() {
    const { data } = await axios.get('https://flashsave.net/id/')
    const $ = cheerio.load(data)
    let token = $('#token').attr('value')
    return token
}

function youtubedl(URL) {
    return new Promise(async(resolve, reject) => {
        let token = await getTOken()
        let { data } = await axios.request({
            url: 'https://flashsave.net/wp-json/aio-dl/video-data/',
            method: 'POST',
            data: new URLSearchParams(Object.entries({ url: URL, token: token }))
        })
        resolve(data)
    })
}

module.exports = { youtubedl }