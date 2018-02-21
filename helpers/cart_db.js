const db = require('./db');

module.exports.add_cart = (user_id, product_id, product_name, product_path, quantity, product_price, total)=>{
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
            obj.none('INSERT INTO carts (user_id, product_id, product_name, path, product_price, quantity, total) VALUES ($1, $2, $3, $4, $5, $6, $7)', [user_id, product_id, product_name, product_path, quantity, product_price, total]).then((data)=>{
                res(data);
                obj.done();
            }).catch((error)=>{
                console.log(error);
                rej(error);
                obj.done();
            });
        }).catch((error)=>{
            console.log(error);
            rej(error);
        });
    });
}

module.exports.show_cart = (user_id)=>{
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
          obj.any('SELECT * FROM carts WHERE user_id = $1',[user_id]).then((data)=>{
                res(data);
                obj.done();
            }).catch((error)=>{
                console.log(error);
                rej(error);
                obj.done();
            });
        }).catch((error)=>{
            console.log(error);
            rej(error);
        });
    });
}

module.exports.delete_product_from_cart = (user_id, product_id)=>{
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
          obj.any('DELETE FROM carts WHERE user_id = $1 AND product_id = $2',[user_id, product_id]).then((data)=>{
                res(data);
                obj.done();
            }).catch((error)=>{
                console.log(error);
                rej(error);
                obj.done();
            });
        }).catch((error)=>{
            console.log(error);
            rej(error);
        });
    });
}

module.exports.update_product_stock = (stock, id) =>{
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
          obj.result('UPDATE products SET stock = $1 WHERE id = $2',[stock, id]).then((data)=>{
                res(data);
                obj.done();
            }).catch((error)=>{
                console.log(error);
                rej(error);
                obj.done();
            });
        }).catch((error)=>{
            console.log(error);
            rej(error);
        });
    });
}
