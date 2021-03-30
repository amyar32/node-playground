const MongoClient = require("mongodb").MongoClient;

const uri =
    "mongodb+srv://amyar32:bagoysekali@cluster0.qm0ck.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

//extract MongoClient constructor
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//underscore menandakan variabel ini digunakan internal
let _db;

const mongoConnect = (callback) => {
    //menggunakan MongoClient untuk menagakses database
    //method di bawah akan mereturn promises
    //perintah di bawah menghubungkan ke DATABASE myFirstDatabase
    client
        .connect()
        .then((client) => {
            console.log("Connected");

            //memasukan isi db ke variabel _db
            //ketika sudah terhubung, maka database dipindahkan ke _db lalu direturn untuk dipakai di model
            _db = client.db();

            callback(client);
        })
        .catch((err) => {
            console.log(err);
            throw err;
        });

    // client.connect((err) => {
    //     _db = client.db();
    // });
};

const getDb = () => {
    if (_db) {
        return _db;
    }
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
