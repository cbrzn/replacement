function $(id) {
    return document.getElementById(id);
};
function log(){
  var xhr = new XHR();
     xhr.get('./value',{},{}).then((data)=>{
       if (data.session){
          $('cart').style.display = "block";
          $('upload').style.display = "block";
          $('logout').style.display = "block";
          $('order').style.display = "block";
          $('logout').addEventListener('click', function() {
             xhr.get('./logout',{},{}).then((data) => {
               if (data.status == "Bye!") {
                 alert("You have logged out!")
                 window.location.href = "./index.html"
               }
             })
           });
       } else {
         $('login').style.display = "block";
         $('signup').style.display = "block";
          }
       });
     };

addEventListener('load', log);
