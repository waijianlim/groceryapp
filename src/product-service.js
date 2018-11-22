
export default class ProductService {

    data = 
    [
        {
            "id": 1,
            "name": "I am Groot",
            "image": "1-groot.jpg",
            "barcode": "041419420065",
            "currency": "MYR",
            "currencyLabel": "RM",
            "price": 19.99,
            "brand": "ALIENWARE"
        },
        {
            "id": 2,
            "name": "Buzz Lightyear Action Doll",
            "image": "2-buzz.jpg",
            "barcode": "041419420065",
            "currency": "USD",
            "currencyLabel": "$",
            "price": 38.50,
            "brand": "ALIENWARE"
        },
        {
            "id": 3,
            "name": "Minion Dave",
            "image": "3-minion-dave.jpg",
            "barcode": "041419420065",
            "currency": "MYR",
            "currencyLabel": "RM",
            "price": 12.99,
            "brand": "ALIENWARE"
        },
        {
            "id": 4,
            "name": "Minion Kevin",
            "image": "4-minion-kevin.jpg",
            "barcode": "041419420065",
            "currency": "USD",
            "currencyLabel": "$",
            "price": 12.99,
            "brand": "ALIENWARE"
        },
        {
            "id": 5,
            "name": "Minion Kevin",
            "image": "4-minion-kevin.jpg",
            "barcode": "041419420065",
            "currency": "USD",
            "currencyLabel": "$",
            "price": 12.99,
            "brand": "ALIENWARE"
        },
        {
            "id": 6,
            "name": "Minion Bob",
            "image": "5-minion-bob.jpg",
            "barcode": "041419420065",
            "currency": "USD",
            "currencyLabel": "RM",
            "price": 12.99,
            "brand": "ALIENWARE"
        },
        {
            "id": 7,
            "name": "Minion Kevin",
            "image": "4-minion-kevin.jpg",
            "barcode": "041419420065",
            "currency": "USD",
            "currencyLabel": "$",
            "price": 12.99,
            "brand": "ALIENWARE"
        },
        {
            "id": 8,
            "name": "Minion Kevin",
            "image": "4-minion-kevin.jpg",
            "barcode": "041419420065",
            "currency": "USD",
            "currencyLabel": "$",
            "price": 12.99,
            "brand": "ALIENWARE"
        },
        {
            "id": 9,
            "name": "Minion Kevin",
            "image": "4-minion-kevin.jpg",
            "barcode": "041419420065",
            "currency": "USD",
            "currencyLabel": "$",
            "price": 12.99,
            "brand": "ALIENWARE"
        },
        {
            "id": 10,
            "name": "Minion Kevin",
            "image": "4-minion-kevin.jpg",
            "barcode": "041419420065",
            "currency": "USD",
            "currencyLabel": "$",
            "price": 12.99,
            "brand": "ALIENWARE"
        },
        {
            "id": 11,
            "name": "Minion Kevin",
            "image": "4-minion-kevin.jpg",
            "barcode": "041419420065",
            "currency": "USD",
            "currencyLabel": "$",
            "price": 12.99,
            "brand": "ALIENWARE"
        },
        {
            "id": 12,
            "name": "Minion Kevin",
            "image": "4-minion-kevin.jpg",
            "barcode": "041419420065",
            "currency": "USD",
            "currencyLabel": "$",
            "price": 12.99,
            "brand": "ALIENWARE"
        },
        {
            "id": 13,
            "name": "Minion Kevin",
            "image": "4-minion-kevin.jpg",
            "barcode": "041419420065",
            "currency": "USD",
            "currencyLabel": "$",
            "price": 12.99,
            "brand": "ALIENWARE"
        },
        {
            "id": 14,
            "name": "Minion Kevin",
            "image": "4-minion-kevin.jpg",
            "barcode": "041419420065",
            "currency": "USD",
            "currencyLabel": "$",
            "price": 12.99,
            "brand": "ALIENWARE"
        },
        {
            "id": 15,
            "name": "Minion Kevin",
            "image": "4-minion-kevin.jpg",
            "barcode": "041419420065",
            "currency": "USD",
            "currencyLabel": "$",
            "price": 12.99,
            "brand": "ALIENWARE"
        },
        {
            "id": 16,
            "name": "Minion Kevin",
            "image": "4-minion-kevin.jpg",
            "barcode": "041419420065",
            "currency": "USD",
            "currencyLabel": "$",
            "price": 12.99,
            "brand": "ALIENWARE"
        },
        {
            "id": 17,
            "name": "Minion Kevin",
            "image": "4-minion-kevin.jpg",
            "barcode": "041419420065",
            "currency": "USD",
            "currencyLabel": "$",
            "price": 12.99,
            "brand": "ALIENWARE"
        },
        {
            "id": 18,
            "name": "Minion Kevin",
            "image": "4-minion-kevin.jpg",
            "barcode": "041419420065",
            "currency": "USD",
            "currencyLabel": "$",
            "price": 12.99,
            "brand": "ALIENWARE"
        },
        {
            "id": 19,
            "name": "Minion Kevin",
            "image": "4-minion-kevin.jpg",
            "barcode": "041419420065",
            "currency": "USD",
            "currencyLabel": "$",
            "price": 12.99,
            "brand": "ALIENWARE"
        },
        {
            "id": 20,
            "name": "Minion Kevin",
            "image": "4-minion-kevin.jpg",
            "barcode": "041419420065",
            "currency": "USD",
            "currencyLabel": "$",
            "price": 12.99,
            "brand": "ALIENWARE"
        }
    ]
    runningId = 20;

    static myInstance = null;
    static getInstance() {
        if (ProductService.myInstance == null) {
            ProductService.myInstance = new ProductService();
        }
        return this.myInstance;
    }

    getAllProducts() {
        return this.data;
    }

    getProductById(id){
        let index = this.data.findIndex((obj => obj.id === parseInt(id)));
        return this.data[index];
    }

    /**this.callBackendAPI(this.state)
        .then(res => this.setState({ open: false }))
        .catch(err => console.log(err)); */

    updateItem(item) {
        // find index
        let index = this.data.findIndex((obj => obj.id === parseInt(item.id)));
        // update item from list
        var tempItem = this.data==null?{id:++this.runningId}:this.data[index];
        tempItem.name = item.name;
        tempItem.image = item.image;
        tempItem.barcode = item.barcode;
        tempItem.currency = item.currency;
        tempItem.currencyLabel = item.currencyLabel;
        tempItem.price = item.price;
        tempItem.brand = item.brand;
    }

    deleteItem(id) {
        // find index
        let index = this.data.findIndex((obj => obj.id === parseInt(id)));
        // delete item from list
        this.data.splice(index, 1);
    }

}