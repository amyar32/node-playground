const mongodb = require("mongodb");

// untuk menarik database yang sudah dihubungkat lewat util/database.js
const getDb = require("../util/database").getDb;

class User {
  constructor(username, email, cart, id) {
    this.username = username;
    this.email = email;
    this.cart = cart; // di dalemnya ada object {items: [product]} buat simpen produk
    this._id = id ? new mongodb.ObjectId(id) : null;
  }

  save() {
    const db = getDb();
    return db
      .collection("users")
      .insertOne(this)
      .then((user) => {
        console.log("User Inserted");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addToCart(product) {
    //1. dicek terlebih dahulu apakah produk yang dimasukan sudah ada dicart atau belum
    //-- kalau misalkan ketemu makan method di bawah akan mereturn index array yang ketemu tersebut
    //-- kalau tidak maka akan mereturn -1
    const cartProductIndex = this.cart.items.findIndex((cp) => {
      return cp.productId.toString() === product._id.toString();
    });

    let newQuantity = 1;
    const updatedCartItem = [...this.cart.items];

    // 2. apabila produk tersebut ada dalam cart sebelumnya, makan quantity ditambah 1
    if (cartProductIndex >= 0) {
      newQuantity = updatedCartItem[cartProductIndex].quantity + 1;
      updatedCartItem[cartProductIndex].quantity = newQuantity;
    } else {
      // -- apabila tidak maka akan push produk baru ke cart
      updatedCartItem.push({
        productId: new mongodb.ObjectId(product._id),
        quantity: newQuantity,
      });
    }

    const updatedCart = {
      items: updatedCartItem,
    };
    const db = getDb();
    return db
      .collection("users")
      .updateOne({ _id: this._id }, { $set: { cart: updatedCart } });
  }

  getCart() {
    const db = getDb();
    // 1. mendapatkan masing-masing id produk yang terdapat dalam cart
    // lalu di buat berupa array baru yang isinya ids produk menggunakan method map
    const productsIds = this.cart.items.map((i) => {
      return i.productId;
    });
    return (
      db
        .collection("products")
        // 2. Berdasarkan id-id di atas, nanti dicocokan ke dalam collection product lewat product id
        .find({ _id: { $in: productsIds } })
        .toArray()
        // 3. ketika sudah ketemu (cocok id dalam cart dengan id dalam collection product) maka produk tersebut sudah siap direturn
        .then((products) => {
          return products.map((p) => {
            // 4. Products hasil ditarik dari database lalu kemudian di map dengan ditambahkan quantity yang diambil dari cart
            return {
              ...p,
              quantity: this.cart.items.find((i) => {
                // 5. Dicari objek berdarkan id yang sesuai, yaitu cart dengan produk dari collection, ketika objek sudah ditemukan
                // maka properti quantity diambil, untuk nantinya akan ditampilkan di views
                return i.productId.toString() === p._id.toString();
              }).quantity,
            };
          });
        })
    );
  }

  deleteProductFromCart(productId) {
    const updatedCartItems = this.cart.items.filter((item) => {
      return item.productId.toString() !== productId.toString();
    });
    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { _id: this._id },
        { $set: { cart: { items: updatedCartItems } } }
      );
  }

  addOrder() {
    const db = getDb();
    return db
      .collection("order")
      .insertOne(this.cart)
      .then((result) => {
        this.cart = { items: [] };
        return db
          .collection("users")
          .updateOne({ _id: this._id }, { $set: { cart: { items: [] } } });
      });
  }

  static findById(userId) {
    const db = getDb();
    return db
      .collection("users")
      .find({ _id: new mongodb.ObjectId(userId) })
      .next()
      .then((user) => {
        return user;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = User;
