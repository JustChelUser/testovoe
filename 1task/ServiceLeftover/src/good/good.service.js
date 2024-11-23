import { db } from "../db.js"

export class GoodService {
    async createGood(name, plu) {
        try {
            const pluUnique = await this.CheckPlu(plu)
            if (pluUnique) {
                throw new Error(`Plu already exist`)
            }
            const query = `
            INSERT INTO $1:name ($2:name, $3:name) VALUES ($4, $5)
            RETURNING $6:name, $7:name, $8:name`;
            const result = await db.one(query, [`Good`, 'name', 'plu', name, plu, 'id', 'name', 'plu']);
            return result
        }
        catch (err) {
            throw new Error(`error while creating good: ${err.message}`)
        }
    }
    async getGood(plu, name) {
        try {
            let query = `
            select * from "Good"
            WHERE true=true`;
            const params = [];
            if (plu) {
                query += ` and "Good".plu=$${params.length + 1}`
                params.push(plu)
            }
            if (name) {
                query += ` and "Good".name=$${params.length + 1}`
                params.push(name)
            }
            const result = await db.manyOrNone(query, params);
            return result
        } catch (err) {
            throw new Error(`error while getting leftover: ${err.message}`)
        }
    }
    async CheckPlu(plu) {
        try {
            const query = `
            SELECT * From $1:name where $2:name = $3`;
            const result = await db.oneOrNone(query, [`Good`, 'plu', plu]);
            return result
        } catch (err) {
            throw new Error('error while checking plu')
        }
    }
}