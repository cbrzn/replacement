const db = require('./db');
const bcrypt = require('bcryptjs');
module.exports.getUserByUsername = (username)=>{
    return new Promise((res,rej)=>{
          db.connect().then((obj)=>{
              obj.one('SELECT * FROM users where email = $1',[username]).then((data)=>{
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

module.exports.comparePassword = (candidatePassword, hash)=>{
    return new Promise((res,rej) => {
        let hashedPass = bcrypt.hashSync(hash, 10);
        bcrypt.compare(candidatePassword, hashedPass, function(err, isMatch) {
            if (err) throw rej(err);
            res(isMatch);
        });
    });
};

module.exports.add_user = (username, email, password, name, lastname, zone)=>{
    return new Promise((res,rej)=>{
    //  bcrypt.hash(password, 10, function(err, hash) {
        db.connect().then((obj)=>{
            obj.none('INSERT INTO users (username, email, password, name, last_name, zone) VALUES ($1, $2, $3, $4, $5, $6)',[username, email, password, name, lastname, zone]).then((data)=>{
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
  //  });
}
