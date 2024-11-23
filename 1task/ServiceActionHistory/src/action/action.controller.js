import express from 'express'
import { ActionService } from './action.service.js';
import * as express_validator from 'express-validator';


const router = express.Router();
const actionService = new ActionService();

router.post('/', async (req, res, next) => {
    try {
        const { shop_id, plu, action } = req.body;
        const result = await actionService.createActionRecord(shop_id, plu, action)
        res.status(200).json({
            status: 'success',
            data: result
        });
    } catch (err) {
        next(err)
    }
})
router.get('/',
    express_validator.query('plu').optional().isInt({ min: 1 }).withMessage('Invalid plu format. Plu must be a positive number'),
    express_validator.query('shop_id').optional().isInt({ min: 1 }).withMessage('Invalid shop_id. Shop_id must be a positive number'),
    express_validator.query('action').optional().isString().notEmpty().withMessage('Action must be a string').isLength({ max: 100 }).withMessage('Action must be less than 100 symbols'),
    express_validator.query('min_date').optional().isDate().withMessage('min_data must be in data format : yyyy-mm-dd'),
    express_validator.query('max_date').optional().isDate().withMessage('max_data must be in data format : yyyy-mm-dd'),
    express_validator.query('page').optional().isInt({ min: 1 }).withMessage('Invalid page number. Page number must be a positive number'),
    express_validator.query('limit').optional().isInt({ min: 1 }).withMessage('Invalid limit number. limit number must be a positive number'),
    async (req, res, next) => {
        try {
            const errors = express_validator.validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { plu, shop_id, action, min_date, max_date, page = 1, limit = 10 } = req.query;
            const result = await actionService.getAction(plu, shop_id, action, min_date, max_date, page, limit);
            res.status(200).json(result);
        } catch (err) {
            next(err)
        }
    })
export const ActionsRouter = router