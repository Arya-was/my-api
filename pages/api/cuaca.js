import axios from 'axios'

export default async function handler(req, res) {
    const { method } = req;
    if (method == "GET") {
        if (!req.query.kota) return res.status(403).json({ success: false, message: 'Input parameter kota!' })
        const { data } = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${req.query.kota}&units=metric&appid=18d044eb8e1c06eaf7c5a27bb138694c`)
        let result = {
            country: data.sys.country,
            Longitude: data.coord.lon,
            Latitude: data.coord.lat,
            Suhu: data.main.temp + " C",
            Angin: data.wind.speed + " m/s",
            Kelembaban: data.main.humidity + "%",
            Cuaca: data.weather[0].main,
            Keterangan: data.weather[0].description,
            Udara: data.main.pressure + " HPa"
        }
        res.status(200).json({ status: true, result })
    } else {
        res.status(400).json({ success: false });
    }
}