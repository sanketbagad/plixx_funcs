import express from 'express'
import axios from 'axios'

const PornRouter = express.Router()

PornRouter.get('/', async (req, res) => {
    const { name, page, per_page } = req.query

    if (name && page && per_page) {
        const anime = await axios.get(`https://adultvideosapi.com/api/videos/search?query=${name}&page=${page}&per_page=${per_page}`, {
            headers: {
                'x-api-key': '1KOJjWSWI9OMF9ThrK9bp5g3Zz2cvCwy'
            }
        })

        if (anime) {
            res.status(200).json(anime.data)
        }
        else {
            res.status(404).json({error: 'Anime not found'})
        }
    }
    else {
        res.status(400).json({error: 'Missing parameters'})
    }
})

PornRouter.get('/:id', async (req, res) => {
    const { id } = req.params

    if (id) {
        const anime = await axios.get(`https://adultvideosapi.com/api/videos/get-by-id?video_ids=${id}`, {
            headers: {
                'x-api-key': '1KOJjWSWI9OMF9ThrK9bp5g3Zz2cvCwy'
            }
        })

        if (anime) {
            res.status(200).json(anime.data)
        }
        else {
            res.status(404).json({error: 'Anime not found'})
        }
    }
    else {
        res.status(400).json({error: 'Missing parameters'})
    }

})

export default PornRouter