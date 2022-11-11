import { youtubedl } from '../../plugins/yt'

export default async function handler(req, res) { 
    const { method } = req;
    if (method == "GET") {
        if (!req.query.url) return res.status(403).json({ success: false, message: 'Input parameter url!' })
        try { 
            const result = await youtubedl(req.query.url)
            res.status(200).json({ status: true, result })
        } catch(e){
            res.status(500).json({ success: false, message: 'Internal Server Error' })
        }
    } else {
        res.status(400).json({ success: false });
    }
}