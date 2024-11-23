import express from 'express'
import { ActionsRouter} from './action/action.controller.js';

const PORT = process.env.PORT || 4200
const app = express();

function main() {
    app.use(express.json())
    app.use('/action/', ActionsRouter)
    app.all('*', (req, res) => {
        res.status(404).json({ message: 'Not Found' })
    })
    app.use((err, req, res, next) => {
        console.error(err)
        res.status(500).json({
            message: err.message,
        });
    })
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
}
main()