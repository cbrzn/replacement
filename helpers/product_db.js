const db = require('./db');

module.exports.add_product = (name, path, price, user_id, description, stock, type_supplier, brand, despartment, code)=>{
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
            obj.none('INSERT INTO products (name, path, price, user_id, description, stock, type_supplier, brand, department, code) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', [name, path, price, user_id, description, stock, type_supplier, brand, despartment, code]).then((data)=>{
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
            obj.any('SELECT code, description, price, stock FROM products WHERE brand = $1',[brand]).then((data)=>{
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

module.exports.show_departments_by_brand = (brand) =>{
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
          obj.any('select distinct on (department) department from products where brand = $1', [brand]).then((data)=>{
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

module.exports.update_product = (name, price, description, stock, type_supplier, brand, department, code, id) =>{
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
          obj.result('UPDATE products SET name = $1, price = $2, description = $3, stock = $4, type_supplier = $5, brand = $6, department = $7, code = $8 WHERE id = $9',[name, price, description, stock, type_supplier, brand, department, code, id]).then((data)=>{
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
