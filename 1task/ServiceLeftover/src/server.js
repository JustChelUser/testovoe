import express from 'express'
import { goodRouter } from './good/good.controller.js';
import { LeftoverRouter } from './leftover/leftover.controller.js';

const PORT = process.env.PORT || 3200
const app = express();

function main() {
    app.use(express.json())
    app.use('/goods/', goodRouter)
    app.use('/leftover/', LeftoverRouter)
    app.all('*', (req, res) => {
        res.status(404).json({ message: 'Not Found' })
    })
    app.use((err, req, res, next) => {
        console.error(err.message)
        res.status(500).json({
            message: err.message,
        });
    })
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
}
main()