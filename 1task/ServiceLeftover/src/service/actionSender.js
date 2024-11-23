import axios from "axios"

const axiosInst = axios.create({
    baseURL: 'http://localhost:4000',  
    timeout: 5000
});

export class ActionSender {
    async sendAction(shop_id, plu, action) {
        try {
            const postData = {
                shop_id: shop_id,
                plu: plu,
                action: action
            };
            const response = await axiosInst.post('/action', postData);
            console.log('Action was successfully sent:', response.data);
        } catch (error) {
            console.error('Error while sending action :', error.stack);
        }
    }
}