let xhr = new XHR();
function $(id) {
    return document.getElementById(id);
};

function session(){
    let username = $('email').value;
    let password = $('password').value;
    xhr.post(`./login`,{username:username, password:password},{'Content-Type':'application/json'}).then((data)=>{
        console.log(data)
        if (data.status === 200) {
            window.location.href = "./index.html";
        } else {
          alert("Email o contrasena no existen");
        }
    });
};

$('login').addEventListener('click', session);
