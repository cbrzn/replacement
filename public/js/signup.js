let xhr = new XHR();
function $(id) {
    return document.getElementById(id);
};


function new_account(){
    let username = $('username').value;
    let email = $('email').value;
    let name = $('name').value;
    let lastname = $('lastname').value;
    let password = $('password').value;
    xhr.post(`../signup`,{username:username, email:email, password:password, name:name, lastname:lastname},{'Content-Type':'application/json'}).then((data)=>{
      console.log(data);
      if (data.status == 200) {
        window.location.href = "./login.html";
        alert("You have registered!");
      }
    });
};

$('signup').addEventListener('click', new_account);
