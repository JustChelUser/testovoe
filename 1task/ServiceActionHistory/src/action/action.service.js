import { db } from "../db.js"

export class ActionService {
    async createActionRecord(shop_id, plu, action) {
        try {
            const existedAction = await this.findAction(action)
            if (!existedAction) {
                throw new Error(`Action not exist`)
            }
            const actionId = existedAction['id']
            const queryInsertLeftover = `
            INSERT INTO $1:name ($2:name, $3:name, $4:name) VALUES ($5, $6, $7)
            RETURNING $2:name, $3:name, $4:name`;
            const result = await db.one(queryInsertLeftover, [`ActionHistory`, 'shop_id', 'plu', 'action_id', shop_id, plu, actionId]);
            return result
        }
        catch (err) {
            throw new Error(`error while creating action record: ${err.message}`);
        }
    }
    async findAction(action) {
        try {
            const query = `
            SELECT * From $1:name where $2:name = $3`;
            const result = await db.oneOrNone(query, [`Actions`, 'name', action]);
            return result
        } catch (err) {
            throw new Error('error while finding action')
        }
    }
    async getAction(plu, shop_id, action, min_date, max_date, page, limit) {
        try {
            const offset = (page - 1) * limit;
            let query = `select * from "ActionHistory"
            WHERE true=true`;
            let noPaginationQuery = `SELECT COUNT(*) from "ActionHistory" WHERE true=true`;
            const params = [];
            if (plu) {
                query += ` and "ActionHistory".plu=$${params.length + 1}`
                noPaginationQuery += ` and "ActionHistory".plu=$${params.length + 1}`
                params.push(plu)
            }
            if (shop_id) {
                query += ` and "ActionHistory".shop_id=$${params.length + 1}`
                noPaginationQuery += ` and "ActionHistory".shop_id=$${params.length + 1}`
                params.push(shop_id)
            }
            if (action) {
                query += ` and "ActionHistory".action=$${params.length + 1}`
                noPaginationQuery += ` and "ActionHistory".action=$${params.length + 1}`
                params.push(action)
            }
            if (min_date) {
                query += ` and "ActionHistory".date>$${params.length + 1}::TIMESTAMP`
                noPaginationQuery += ` and "ActionHistory".date>$${params.length + 1}::TIMESTAMP`
                params.push(min_date)
            }
            if (max_date) {
                query += ` and "ActionHistory".date<$${params.length + 1}::TIMESTAMP`
                noPaginationQuery += ` and "ActionHistory".date<$${params.length + 1}::TIMESTAMP`
                params.push(max_date)
            }
            query += ` LIMIT $${params.length + 1}`
            params.push(limit)
            query += ` OFFSET $${params.length + 1}`
            params.push(offset)
            let result = await db.manyOrNone(query, params);
            const allRows = await db.oneOrNone(noPaginationQuery, params)
            if (!allRows) {
                throw new Error(`failed attemp to get count of rows`)
            }
            const RowsCount = allRows.count;
            const pagination = {
                rows: RowsCount,
                pages: Math.ceil(RowsCount / limit),
                currentPage: page,
                pageSize: limit
            }
            return {
                data: result,
                pagination: pagination
            }
        } catch (err) {
            throw new Error(`error while getting leftover: ${err.message}`)
        }
    }
}