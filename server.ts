import express, { Request, Response } from 'express'
import axios, { AxiosResponse } from 'axios'
import * as dotenv from 'dotenv'
dotenv.config()

const PORT = 8000
const app = express()

app.get('/quiz-item', async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const response: AxiosResponse = await axios.get(process.env.URL
        , {
            headers: {
                'X-Cassandra-Token':process.env.TOKEN,
                accept: 'application/json'
            }
        })
        if (response.status === 200) {
            const quizItem = await response.data.data["fb31e3ce-53dc-4a9b-9c3d-278a154bce56"]
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
            res.send(quizItem)
        }
    } catch (err) {
        console.error(err)
    }
})

app.listen(PORT, () => console.log('server is running on port ' + PORT))