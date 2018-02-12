let xhr = new XHR();
function $(id) {
    return document.getElementById(id);
};

function check_user() {
  xhr.get('./value',{},{}).then((data)=>{
    if (data.session){
      console.log("logged")
    } else {
      window.location.href ="./login.html";
    }
  });
}

addEventListener('load', check_user);
