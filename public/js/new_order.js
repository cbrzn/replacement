function $(id) {
    return document.getElementById(id);
};


function create_order(){
    let xhr = new XHR();
    let bill = $('bill').value;
    let name = $('name').value;
    let lastname = $('lastname').value;
    let total = $('total').value;
    xhr.post(`./order/create`,{bill:bill, name:name, lastname:lastname, total:total},{'Content-Type':'application/json'}).then((data)=>{
      console.log(data);
      if (data.status == 200) {
        window.location.href = "./order.html";
        alert("Orden creada!");
      }
    });
};


$('create_order').addEventListener('click', create_order);
