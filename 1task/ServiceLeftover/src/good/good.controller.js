import express from 'express'
import { GoodService } from './good.service.js';
import * as express_validator from 'express-validator';
import { ActionSender } from '../service/actionSender.js';

const router = express.Router();
const goodService = new GoodService();
const actionSender = new ActionSender();

router.post('/',
    express_validator.body('plu').isInt({ min: 1 }).withMessage('Invalid plu format. Plu must be a positive number'),
    express_validator.body('name').isString().notEmpty().withMessage('Name must be a string').isLength({ max: 100 }).withMessage('Name must be less than 100 symbols'),
    async (req, res, next) => {
        try {
            const errors = express_validator.validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { name, plu } = req.body;
            const result = await goodService.createGood(name, plu);
            await actionSender.sendAction(null, plu, 'Good created')
            res.status(200).json(result);
        } catch (err) {
            next(err)
        }
    })
    router.get('/',
        express_validator.query('plu').optional().isInt({ min: 1 }).withMessage('Invalid plu format. Plu must be a positive number'),
        express_validator.query('name').optional().isString().notEmpty().withMessage('Name must be a string').isLength({ max: 100 }).withMessage('Name must be less than 100 symbols'),
        async (req, res, next) => {
            try {
                const errors = express_validator.validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }
                const { plu, name } = req.query;
                const result = await goodService.getGood( plu, name);
                res.status(200).json(result);
            } catch (err) {
                next(err)
            }
        })
export const goodRouter = router