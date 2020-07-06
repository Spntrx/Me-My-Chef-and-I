const mysql = require('mysql');
// an external npm package we are using

class Database {
    constructor( config ) {
        this.connection = mysql.createConnection( config );
    }
    query( sql, args ) {
        return new Promise( ( resolve, reject ) => {
            this.connection.query( sql, args, ( err, rows ) => {
                if ( err ) {
                    return reject( err );
                }
                resolve( rows );
            } );
        } );
    }
    close() {
        return new Promise( ( resolve, reject ) => {
            this.connection.end( err => {
                if ( err ) {
                    return reject( err );
                }
                resolve();
            } );
        } );
    }
}

const db = new Database({
    host: 'localhost',
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    insecureAuth : true
});

function selectAll( ){
    return db.query( 'SELECT * FROM food' );
}

function showItem(category) {
    return db.query( 'SELECT * FROM food WHERE category=?', category );
}

function addItem(category, item, quantity, image_url ){
    return db.query( 'INSERT INTO food (category, item, quantity, image_url) VALUES (?,?,?,?)', [category, item, quantity, image_url] );
}

function removeItem(id){
    return db.query( 'DELETE FROM food WHERE id=?', id);
}

function moveItem(id) {
    return db.query( 'SELECT * FROM food WHERE id=?', id);
}

// function saveFridge() {
//     return db.query( 'SELECT * FROM food ' );
// }


module.exports = { selectAll, showItem, addItem, removeItem, moveItem};