import { db } from "../db.js"

export class LeftoverService {
    async createLeftover(good_id, shelf_id, quantity) {
        try {
            const goodExist = await this.CheckGood(good_id)
            const shelfExist = await this.CheckShelf(shelf_id)
            if (!goodExist || !shelfExist) {
                throw new Error(`good or shelf dosn't exist`,)
            }
            const existRow = await this.CheckLeftover(good_id, shelf_id)
            if (existRow) {
                throw new Error(`leftover with these data already exist`,)
            }
            const queryInsertLeftover = `
            INSERT INTO $1:name ($2:name, $3:name, $4:name) VALUES ($5, $6, $7)
            RETURNING $2:name, $3:name, $4:name`;
            const result = await db.one(queryInsertLeftover, [`Good_shelf`, 'good_id', 'shelf_id', 'quantity', good_id, shelf_id, quantity]);
            return result
        }
        catch (err) {
            throw new Error(`error while creating leftover: ${err.message}`);
        }
    }
    async increaseLeftover(good_id, shelf_id, quantity) {
        try {
            const leftoverExist = await this.CheckLeftover(good_id, shelf_id)
            if (!leftoverExist) {
                throw new Error(`leftover dosn't exist`,)
            }
            quantity += leftoverExist['quantity']
            const result = await this.updateLeftover(good_id, shelf_id, quantity)
            return result
        }
        catch (err) {
            throw new Error(`error while creating leftover: ${err.message}`);
        }
    }
    async DecreaseLeftover(good_id, shelf_id, quantity) {
        try {
            const leftoverExist = await this.CheckLeftover(good_id, shelf_id)
            if (!leftoverExist) {
                throw new Error(`leftover dosn't exist`)
            }
            const quantityDecreased = leftoverExist['quantity'] - quantity;
            if (quantityDecreased < 0) {
                throw new Error(`result of decreasing quantity can't be negative`,)
            }
            const result = await this.updateLeftover(good_id, shelf_id, quantityDecreased)
            return result
        }
        catch (err) {
            throw new Error(`error while creating leftover: ${err.message}`);
        }
    }
    async updateLeftover(good_id, shelf_id, quantity) {
        try {
            const query = `
            UPDATE $1:name SET $2:name = $3
            WHERE $4:name = $5 and $6:name = $7
            RETURNING $8:name, $4:name, $6:name, $2:name`;
            const result = await db.one(query, [`Good_shelf`, 'quantity', quantity, 'good_id', good_id, 'shelf_id', shelf_id, 'id']);
            return result
        } catch (err) {
            throw new Error(`error while updating leftover: ${err.message}`)
        }
    }
    async getLeftover(plu, shop_id, min, max) {
        try {
            let query = `
            select 	"Good_shelf".id as "Good_shelf.id","Good".name as "Good.name", "Good".plu as "Good.plu","Good_shelf".good_id, "Good_shelf".shelf_id, "Good_shelf".quantity
            from "Good_shelf"
            join "Good" on "Good".id = "Good_shelf".good_id
            join "Shelf" on "Shelf".id = "Good_shelf".shelf_id
            WHERE true=true`;
            const params = [];
            if (plu) {
                query += ` and "Good".plu=$${params.length + 1}`
                params.push(plu)
            }
            if (shop_id) {
                query += ` and "Shelf".shop_id=$${params.length + 1}`
                params.push(shop_id)
            }
            if (min) {
                query += ` and "Good_shelf".quantity>$${params.length + 1}`
                params.push(min)
            }
            if (max) {
                query += ` and "Good_shelf".quantity<$${params.length + 1}`
                params.push(max)
            }
            const result = await db.manyOrNone(query, params);
            return result
        } catch (err) {
            throw new Error(`error while getting leftover: ${err.message}`)
        }
    }
    async getLeftoverOrder(plu, shop_id, min, max) {
        try {
            let query = `select "Good_order".id as "Good_order.id","Good".name as "Good.name", "Good".plu as "Good.plu","Order".shop_id, "Good_order".quantity
            from "Good_order"
            join "Good" on "Good".id = "Good_order".good_id
            join "Order" on "Order".id = "Good_order".order_id
            WHERE true=true`;
            const params = [];
            if (plu) {
                query += ` and "Good".plu=$${params.length + 1}`
                params.push(plu)
            }
            if (shop_id) {
                query += ` and "Order".shop_id=$${params.length + 1}`
                params.push(shop_id)
            }
            if (min) {
                query += ` and "Good_order".quantity>$${params.length + 1}`
                params.push(min)
            }
            if (max) {
                query += ` and "Good_order".quantity<$${params.length + 1}`
                params.push(max)
            }
            const result = await db.manyOrNone(query, params);
            return result
        } catch (err) {
            throw new Error(`error while getting order leftover: ${err.message}`)
        }
    }
    async CheckGood(good_id) {
        try {
            const query = `
            SELECT * From $1:name where $2:name = $3`;
            const result = await db.oneOrNone(query, [`Good`, 'id', good_id]);
            return result
        } catch (err) {
            throw new Error('error while checking good')
        }
    }
    async CheckLeftover(good_id, shelf_id) {
        try {
            const query = `
            SELECT * From $1:name where $2:name = $3 and $4:name = $5`;
            const result = await db.oneOrNone(query, [`Good_shelf`, 'good_id', good_id, 'shelf_id', shelf_id]);
            return result
        } catch (err) {
            throw new Error('error while checking leftover')
        }
    }
    async CheckShelf(shelf_id) {
        try {
            const query = `
            SELECT * From $1:name where $2:name = $3`;
            const result = await db.oneOrNone(query, [`Shelf`, 'id', shelf_id]);
            return result
        } catch (err) {
            throw new Error('error while checking shelf')
        }
    }
}