const db = require('./db');

module.exports.get_brands = () => {
    return new Promise((res,rej)=> {
          db.connect().then((obj)=> {
              obj.any('SELECT * FROM brands').then((data)=>{
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

module.exports.add_brand = (brand) => {
    return new Promise((res,rej)=> {
          db.connect().then((obj)=> {
              obj.none('INSERT INTO brands (name) VALUES ($1)',[brand]).then((data)=>{
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

module.exports.add_department = (department) => {
    return new Promise((res,rej)=> {
          db.connect().then((obj)=> {
              obj.none('INSERT INTO departments (name) VALUES ($1)',[department]).then((data)=>{
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


module.exports.get_departments = () => {
    return new Promise((res,rej)=> {
          db.connect().then((obj)=> {
              obj.any('SELECT * FROM departments').then((data)=>{
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


module.exports.delete_brand = (brand) => {
    return new Promise((res,rej)=> {
          db.connect().then((obj)=> {
              obj.none('DELETE FROM brands WHERE name = $1',[brand]).then((data)=>{
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


module.exports.delete_department = (department) => {
    return new Promise((res,rej)=> {
          db.connect().then((obj)=> {
              obj.none('DELETE FROM departments WHERE name = $1',[department]).then((data)=>{
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
