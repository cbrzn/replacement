const db = require('./db');

module.exports.add_product = (price, user_id, description, stock, type_supplier, brand, despartment, code)=>{
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
            obj.none('INSERT INTO products (price, user_id, description, stock, type_supplier, brand, department, code) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [price, user_id, description, stock, type_supplier, brand, despartment, code]).then((data)=>{
                res(200);
                obj.done();
            }).catch((error)=>{
                console.log(error);
                rej(500);
                obj.done();
            });
        }).catch((error)=>{
            console.log(error);
            rej(500);
        });
    });
}

module.exports.show_all_products = () => {
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
            obj.any('SELECT * FROM products ORDER BY stock ASC LIMIT 6').then((data)=>{
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

module.exports.show_price_list = (brand) => {
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
            obj.any('SELECT * FROM products WHERE brand = $1',[brand]).then((data)=>{
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

module.exports.show_departments_by_brand = (brand, department) =>{
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
          obj.any('select * from products where brand = $1 and department = $2', [brand, department]).then((data)=>{
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


module.exports.show_brands = (brand) =>{
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
          obj.any('select distinct on (brand) brand from products', [brand]).then((data)=>{
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

module.exports.show_departments_by_brand_and_department = (brand, department) =>{
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
          obj.any('select * from products where brand = $1 and department = $2', [brand,department]).then((data)=>{
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



module.exports.show_product = (id) =>{
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
          obj.one('SELECT * FROM products where id = $1',[id]).then((data)=>{
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

module.exports.delete_product = (id) =>{
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
          obj.none('DELETE FROM products where id = $1',[id]).then((data)=>{
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

module.exports.update_product = (price, description, stock, type_supplier, brand, department, code, id) =>{
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
          obj.result('UPDATE products SET price = $1, description = $2, stock = $3, type_supplier = $4, brand = $5, department = $6, code = $7 WHERE id = $8',[price, description, stock, type_supplier, brand, department, code, id]).then((data)=>{
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
