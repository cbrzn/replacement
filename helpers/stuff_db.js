const db = require('./db');

module.exports.get_stuff = () => {
    return new Promise((res,rej)=> {
          db.connect().then((obj)=> {
              obj.any('SELECT * FROM stuff').then((data)=>{
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

  module.exports.add = (brand, department) => {
      return new Promise((res,rej)=> {
            db.connect().then((obj)=> {
                obj.none('INSERT INTO stuff (brand, department) VALUES ($1 , $2)',[brand, department]).then((data)=>{
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
