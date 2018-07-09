const db = require('./db');

module.exports.add_product = (price, user_id, description, stock, type_supplier, brand, despartment, code)=>{
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
            obj.none('insert into products (price, user_id, description, stock, type_supplier, brand, department, code) values ($1, $2, $3, $4, $5, $6, $7, $8)', [price, user_id, description, stock, type_supplier, brand, despartment, code]).then((data)=>{
                res(200);
                obj.done();
            }).catch((error)=>{
                console.log(error)
                rej(500);
                obj.done();
            });
        }).catch((error)=>{
            console.log(error);
            rej(500);
        });
    });
}

module.exports.show_all_products = (page) => {
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
            obj.any('select * from products order by code limit 15 offset $1',[page]).then((data)=>{
                res(data);
                obj.done();
            }).catch((error)=>{
                rej(error);
                obj.done();
            });
        }).catch((error)=>{
            rej(error);
        });
    });
}

module.exports.show_price_list = (brand, page) => {
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
            obj.any('select * from products where brand = $1 order by code limit 15 offset $2',[brand, page]).then((data)=>{
                res(data);
                obj.done();
            }).catch((error)=>{
                rej(error);
                obj.done();
            });
        }).catch((error)=>{
            rej(error);
        });
    });
}

module.exports.show_by_brand_and_department = (brand, department, page) =>{
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
            obj.any('select * from products where brand = $1 and department = $2 order by code limit 15 offset $3', [brand,department, page]).then((data)=>{
                res(data);
                obj.done();
            }).catch((error)=>{
                rej(error);
                obj.done();
            });
        }).catch((error)=>{
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
                rej(error);
                obj.done();
            });
        }).catch((error)=>{
            rej(error);
        });
    });
}

module.exports.count = () =>{
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
            obj.one('select count(*) from products').then((data)=>{
                res(data);
                obj.done();
            }).catch((error)=>{
                rej(error);
                obj.done();
            });
        }).catch((error)=>{
            rej(error);
        });
    });
}

module.exports.count_by_brand = brand =>{
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
            obj.one('select count(*) from products where brand = $1',[brand]).then(data=>{
                res(data);
                obj.done();
            }).catch((error)=>{
                rej(error);
                obj.done();
            });
        }).catch((error)=>{
            rej(error);
        });
    });
}

module.exports.count_by_brand_and_department = (brand, department) =>{
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
            obj.one('select count(*) from products where brand = $1 and department = $2',[brand, department]).then((data)=>{
                res(data);
                obj.done();
            }).catch((error)=>{
                rej(error);
                obj.done();
            });
        }).catch((error)=>{
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
                rej(error);
                obj.done();
            });
        }).catch((error)=>{
            rej(error);
        });
    });
}




module.exports.show_product = (id) =>{
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
          obj.one('select * from products where id = $1',[id]).then((data)=>{
                res(data);
                obj.done();
            }).catch((error)=>{
                rej(error);
                obj.done();
            });
        }).catch((error)=>{
            rej(error);
        });
    });
}

module.exports.delete_product = (id) =>{
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
          obj.none('delete from products where id = $1',[id]).then((data)=>{
                res(data);
                obj.done();
            }).catch((error)=>{
                rej(error);
                obj.done();
            });
        }).catch((error)=>{
            rej(error);
        });
    });
}

module.exports.delete_product_by_brand = (brand) =>{
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
          obj.none('DELETE FROM products where brand = $1',[brand]).then((data)=>{
                res(data);
                obj.done();
            }).catch((error)=>{
                rej(error);
                obj.done();
            });
        }).catch((error)=>{
            rej(error);
        });
    });
}

module.exports.delete_product_by_deparment = (department) =>{
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
          obj.none('DELETE FROM products where department = $1',[department]).then((data)=>{
                res(data);
                obj.done();
            }).catch((error)=>{
                rej(error);
                obj.done();
            });
        }).catch((error)=>{
            rej(error);
        });
    });
}

module.exports.update_price = (price, id) =>{
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
          obj.none('update products set price = $1 where id = $2',[price, id]).then((data)=>{
                res(data);
                obj.done();
            }).catch((error)=>{
                rej(error);
                obj.done();
            });
        }).catch((error)=>{
            rej(error);
        });
    });
}


module.exports.by_brand = (brand) =>{
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
          obj.any('select id, price from products where brand = $1',[brand]).then((data)=>{
                res(data);
                obj.done();
            }).catch((error)=>{
                rej(error);
                obj.done();
            });
        }).catch((error)=>{
            rej(error);
        });
    });
}

module.exports.by_brand_and_department = (brand, department) =>{
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
          obj.any('select id, price from products where brand = $1 and department = $2',[brand, department]).then((data)=>{
                console.log(data)
                res(data);
                obj.done();
            }).catch((error)=>{
                console.log(error)
                rej(error);
                obj.done();
            });
        }).catch((error)=>{
            rej(error);
        });
    });
}