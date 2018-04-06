function $(id) {
    return document.getElementById(id);
};

function check_user() {
  let xhr = new XHR();
  xhr.get('./value',{},{}).then((data)=>{
    if (!data.session){
      alert("Debes iniciar sesion");
      window.location.href ="./index.html";
      }
  });
}

addEventListener('load', check_user);
