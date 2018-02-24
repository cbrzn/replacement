let xhr = new XHR();
function $(id) {
    return document.getElementById(id);
};

function check_admin() {
  xhr.get('./value',{},{}).then((data)=>{
    if (data.admin === false){
      window.location.href = "./index.html";
    }
  });
}

addEventListener('load', check_admin)
