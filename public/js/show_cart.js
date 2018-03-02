function $(id) {
    return document.getElementById(id);
};
function cart() {
  var xhr = new XHR();
  $('tr').innerHTML = "";
  if ($('tbdy') != null) {
    $('tbdy').remove();
  }
  xhr.get('./cart/product',{},{}).then((data)=> {
    var tbl = $('table');
    var tbdy = document.createElement('tbody');
    tbdy.setAttribute('id', 'tbdy')
    for (var i=0; i < 5; i++) {
        var tr = $('table').tHead.children[0], th = document.createElement('th');
        switch(i) {
          case 0:
            th.innerHTML = 'Codigo';
          break;
          case 1:
            th.innerHTML = 'Precio';
          break;
          case 2:
            th.innerHTML = 'Cantidad';
          break;
          case 3:
            th.innerHTML = 'Total';
          break;
          case 4:
            th.innerHTML = 'Eliminar producto de carro de compras';
          break;
        }
    tr.appendChild(th);
    }
    for (var i = 0; i < data.list.length; i++) {
        var tr = document.createElement('tr');
        tr.setAttribute('id', i);
        for (var j = 0; j < 5; j++) {
          var td = document.createElement('td');
          switch (j) {
            case 0:
              td.innerHTML = data.list[i].product_name;
            break;
            case 1:
              td.innerHTML = data.list[i].product_price;
            break;
            case 2:
              td.innerHTML = data.list[i].quantity;
            break;
            case 3:
              td.innerHTML = data.list[i].total;
            break;
            case 4:
              td.setAttribute('id', data.list[i].product_id)
              var erase = document.createElement('button');
              erase.innerHTML = "Eliminar"
              td.appendChild(erase);
              td.addEventListener('click', function() {
                xhr.get(`./cart/delete/${this.id}`,{},{}).then((data) => {
                alert("Has eliminado un producto del carro de compras!");
                window.location.href = "./cart.html";
                })
              })
            break;
            }
            tr.appendChild(td)
        }
        tbdy.appendChild(tr);
    }
    tbl.appendChild(tbdy);

  var total = 0;
  for (var i=0; i<data.list.length; i++) {
  total += data.list[i].total;
  }
  var arr_names = [];
  for (var i=0; i<data.list.length; i++) {
  arr_names.push(data.list[i].product_name);
  }
  var arr_quantity = [];
  for (var i=0; i<data.list.length; i++) {
  arr_quantity.push(data.list[i].quantity);
  }
  var arr_price = [];
  for (var i=0; i<data.list.length; i++) {
  arr_price.push(data.list[i].product_price);
  }
  var arr_id = [];
  for (var i=0; i<data.list.length; i++) {
  arr_id.push(data.list[i].product_id);
  }
  var user_name = data.session.name;
  var user_lastname = data.session.last_name;
  var user_id = data.session.id;
  $('send_card').addEventListener('click', function() {
      xhr.post('./order/send_email',{user_name:user_name, user_lastname:user_lastname, products_name:arr_names, total:total, quantity:arr_quantity, price:arr_price, user_id:user_id, product_id:arr_id},{'Content-Type':'application/json'}).then((data) => {
        console.log(data);
        if (data.sent === true) {
          alert("Pedido enviado")
        } else {
          alert("Error al enviar el pedido. Por favor intente de nuevo")
        }
      })
    });
  });
}

addEventListener('load', cart);
