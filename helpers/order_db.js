const db = require('./db');

module.exports.add_order = (bill_number, first_name, last_name, total, billing_date)=>{
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
            obj.none('INSERT INTO orders (bill_number, first_name, last_name, total, billing_date) VALUES ($1, $2, $3, $4, $5)', [bill_number, first_name, last_name, total, billing_date]).then((data)=>{
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
          obj.any('select * from orders order by status asc, deliver_date desc').then((data)=>{
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

module.exports.order_by_lastname = (last_name)=>{
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
          obj.any('SELECT FROM orders WHERE last_name = $1',[last_name]).then((data)=>{
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
