function $(id) {
    return document.getElementById(id);
};

function check_user() {
  let xhr = new XHR();
  xhr.get('./value',{},{}).then((data)=>{
    if (!data.session){
      window.location.href ="./login.html";
      }
  });
}

addEventListener('load', check_user);
