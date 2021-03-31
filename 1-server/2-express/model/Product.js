const fs = require("fs");
const path = require("path");
const productsPath = path.join(
    path.dirname(require.main.filename),
    "data",
    "products.json"
);

const readProductsFile = (callback) => {
    fs.readFile(productsPath, {}, (err, data) => {
        if (err) {
            console.log(err);
        }
        callback(JSON.parse(data));
    });
};

module.exports = class Product {
    constructor(title) {
        this.title = title;
    }

    static getAll(callback) {
        readProductsFile(callback);
    }

    save() {
        readProductsFile((products) => {
            products.push(this);
            fs.writeFile(productsPath, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }
};
