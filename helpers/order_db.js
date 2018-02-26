const db = require('./db');

module.exports.add_order = (bill_number, first_name, last_name, total, billing_date, user_id)=>{
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
            obj.none('INSERT INTO orders (bill_number, first_name, last_name, total, billing_date, user_id) VALUES ($1, $2, $3, $4, $5, $6)', [bill_number, first_name, last_name, total, billing_date, user_id]).then((data)=>{
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

module.exports.show_all_orders = ()=>{
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
          obj.any('select * from orders order by status asc, deliver_date asc').then((data)=>{
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

module.exports.show_by_user = (user_id)=>{
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
          obj.any('select * from orders where user_id = $1', [user_id]).then((data)=>{
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

module.exports.show_order = (bill_number)=>{
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
          obj.one('SELECT * FROM orders WHERE bill_number = $1',[bill_number]).then((data)=>{
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

module.exports.delete_order = (bill_number)=>{
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
          obj.any('DELETE FROM orders WHERE bill_number = $1',[bill_number]).then((data)=>{
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

module.exports.check_payment_date = (bill_number)=>{
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
          obj.one('SELECT payment_date FROM orders WHERE bill_number = $1',[bill_number]).then((data)=>{
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

module.exports.change_status = (status, bill_number)=>{
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
          obj.any('UPDATE orders SET status = $1 WHERE bill_number = $2',[status, bill_number]).then((data)=>{
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

module.exports.ordered_carts = (ordered, product_id, user_id, status) =>{
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
          obj.any('UPDATE carts SET ordered = $1 WHERE product_id = $2 AND user_id = $3 AND ordered = $4',[ordered, product_id, user_id, status]).then((data)=>{
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


module.exports.comment_order = (comment, bill_number)=>{
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
          obj.any('UPDATE orders SET comment = $1 WHERE bill_number = $2',[comment, bill_number]).then((data)=>{
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

module.exports.show_orders_by_tag = (value) => {
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
            obj.any('SELECT * FROM orders WHERE last_name like \'%\' || $1 || \'%\'', [value]).then((data)=>{
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

module.exports.show_user_orders = (value) => {
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
            obj.any('SELECT * FROM orders WHERE user_id = $1',[value]).then((data)=>{
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


module.exports.order_delivered = (deliver_date, payment_date, bill_number)=>{
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
          obj.any('UPDATE orders SET deliver_date = $1, payment_date = $2 WHERE bill_number = $3',[deliver_date, payment_date, bill_number]).then((data)=>{
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
