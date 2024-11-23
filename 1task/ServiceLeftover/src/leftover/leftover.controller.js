import express from 'express'
import * as express_validator from 'express-validator';
import { LeftoverService } from './leftover.service.js';
import { ActionSender } from '../service/actionSender.js';


const router = express.Router();
const leftoverService = new LeftoverService();
const actionSender = new ActionSender();


router.post('/create-leftover',
    express_validator.body('good_id').isInt({ min: 1 }).withMessage('Invalid good_id format. good_id must be a positive number'),
    express_validator.body('shelf_id').isInt({ min: 1 }).withMessage('Invalid shelf_id format. shelf_id must be a positive number'),
    express_validator.body('quantity').isInt({ min: 1 }).withMessage('Invalid quantity format. quantity must be a positive number'),
    async (req, res, next) => {
        try {
            const errors = express_validator.validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { good_id, shelf_id, quantity } = req.body;
            const result = await leftoverService.createLeftover(good_id, shelf_id, quantity);
            const shelf_data = await leftoverService.CheckShelf(shelf_id);
            const good_data = await leftoverService.CheckGood(good_id);
            await actionSender.sendAction(shelf_data.shop_id, good_data.plu, 'Leftover created')
            res.status(200).json(result);
        } catch (err) {
            next(err)
        }
    })
router.post('/increase-leftover',
    express_validator.body('good_id').isInt({ min: 1 }).withMessage('Invalid good_id format. good_id must be a positive number'),
    express_validator.body('shelf_id').isInt({ min: 1 }).withMessage('Invalid shelf_id format. shelf_id must be a positive number'),
    express_validator.body('quantity').isInt({ min: 1 }).withMessage('Invalid quantity format. quantity must be a positive number'),
    async (req, res, next) => {
        try {
            const errors = express_validator.validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { good_id, shelf_id, quantity } = req.body;
            const result = await leftoverService.increaseLeftover(good_id, shelf_id, quantity);
            const shelf_data = await leftoverService.CheckShelf(shelf_id);
            const good_data = await leftoverService.CheckGood(good_id);
            await actionSender.sendAction(shelf_data.shop_id, good_data.plu, 'Leftover increased')
            res.status(200).json(result);
        } catch (err) {
            next(err)
        }
    })
router.post('/decrease-leftover',
    express_validator.body('good_id').isInt({ min: 1 }).withMessage('Invalid good_id format. good_id must be a positive number'),
    express_validator.body('shelf_id').isInt({ min: 1 }).withMessage('Invalid shelf_id format. shelf_id must be a positive number'),
    express_validator.body('quantity').isInt({ min: 1 }).withMessage('Invalid quantity format. quantity must be a positive number'),
    async (req, res, next) => {
        try {
            const errors = express_validator.validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { good_id, shelf_id, quantity } = req.body;
            const result = await leftoverService.DecreaseLeftover(good_id, shelf_id, quantity);
            const shelf_data = await leftoverService.CheckShelf(shelf_id);
            const good_data = await leftoverService.CheckGood(good_id);
            await actionSender.sendAction(shelf_data.shop_id, good_data.plu, 'Leftover decreased')
            res.status(200).json(result);
        } catch (err) {
            next(err)
        }
    })
router.get('/',
    express_validator.query('plu').optional().isInt({ min: 1 }).withMessage('Invalid plu format. Plu must be a positive number'),
    express_validator.query('shop_id').optional().isInt({ min: 1 }).withMessage('Invalid shop_id. Shop_id must be a positive number'),
    express_validator.query('min').optional().isInt({ min: 0 }).withMessage(`Invalid min format. Min must be number at least 0 `),
    express_validator.query('max').optional().isInt({ min: 0 }).withMessage(`Invalid max format. Max must be number at least 0`),
    async (req, res, next) => {
        try {
            const errors = express_validator.validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { plu, shop_id, min, max } = req.query;
            const result = await leftoverService.getLeftover(plu, shop_id, min, max);
            res.status(200).json(result);
        } catch (err) {
            next(err)
        }
    })
router.get('/order',
    express_validator.query('plu').optional().isInt({ min: 1 }).withMessage('Invalid plu format. Plu must be a positive number'),
    express_validator.query('shop_id').optional().isInt({ min: 1 }).withMessage('Invalid shop_id. Shop_id must be a positive number'),
    express_validator.query('min').optional().isInt({ min: 0 }).withMessage(`Invalid min format. Min must be number at least 0 `),
    express_validator.query('max').optional().isInt({ min: 0 }).withMessage(`Invalid max format. Max must be number at least 0`),

    async (req, res, next) => {
        try {
            const errors = express_validator.validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { plu, shop_id, min, max } = req.query;
            const result = await leftoverService.getLeftoverOrder(plu, shop_id, min, max);
            res.status(200).json(result);
        } catch (err) {
            next(err)
        }
    })
export const LeftoverRouter = router