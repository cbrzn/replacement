function $(id) {
    return document.getElementById(id);
};


function new_account(){
    let xhr = new XHR();
    let email = $('email').value;
    let name = $('name').value;
    let lastname = $('lastname').value;
    let password = $('password').value;
    let zone = $('zone').value;
    xhr.post(`../signup`,{email:email, password:password, name:name, lastname:lastname, zone:zone},{'Content-Type':'application/json'}).then((data)=>{
      console.log(data);
      if (data.status == 200) {
        window.location.href = "./login.html";
        alert("Te has registrado, ahora inicia sesion");
      }
    });
};

$('signup').addEventListener('click', new_account);
