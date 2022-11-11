import axios from 'axios'
import cheerio from 'cheerio'


function igdownloader(URL) {
    return new Promise(async(resolve, reject) => {
       const { data } = await axios.request({
        url: 'https://instaoffline.net/process/',
        method: 'POST',
        data: new URLSearchParams(Object.entries({ q: URL }))
       })
       const $ = cheerio.load(data.html)
       const result = []
       $('div > div > div > div').each(function(a, b) {
        let url = $(b).find('a').attr('href')
        result.push(url)
       })
       resolve(result.filter(v => v))
    })
}
igdownloader('https://www.instagram.com/p/Ckj_w3iBj5W/')

module.exports = { igdownloader }