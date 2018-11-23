import axios from 'axios'

export default class ProductService {
    static myInstance = null;
    static getInstance() {
        if (ProductService.myInstance == null) {
            ProductService.myInstance = new ProductService();
        }
        return this.myInstance;
    }

    async getAllProducts() {
        // http://localhost:5000/item
        const response = await axios.get('/item')
        return response.data.map(e => this.formatItem(e));
    }

    async getProductById(id) {
        const response = await axios.get('/item?id='+id)
        return response.data.map(e => this.formatItem(e));
    }

    async updateItem(item) {
        const response = await axios.post('/item', item)
        return response.data;
    }

    async  deleteItem(id) {
        const response = await axios.delete('/item?id='+id)
        return response.data;
    }


    findAllByKeyword(keyword) {
        // 'where keyboard == '
    }

    /**this.callBackendAPI(this.state)
        .then(res => this.setState({ open: false }))
        .catch(err => console.log(err)); */

    formatItem(item) {
        let currenyOptions = {
            "MYR" : "RM",
            "USD" : "$",
        }
        // update item from list
        let tempItem = {};
        tempItem.id = item.id;
        tempItem.name = item.name;
        tempItem.image = item.image;
        tempItem.barcode = item.barcode;
        tempItem.currency = item.currency;
        tempItem.currencyLabel = item.currency!=null?currenyOptions[item.currency]:"";
        tempItem.price = item.price;
        tempItem.brand = item.brand;
        return tempItem;
    }
}