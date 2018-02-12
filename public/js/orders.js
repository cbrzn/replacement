var xhr = new XHR();

function $(id) {
    return document.getElementById(id);
};

function show_orders() {
  xhr.get('./order/all',{},{}).then((data)=> {
    var a = new Date();
    var hour = parseInt(a.getHours())+4;
    var month = parseInt(a.getMonth())+1;
    var date = a.getFullYear()+"-"+month+"-"+a.getDate()+"T"+hour+":"+a.getMinutes()+":"+a.getMilliseconds()+"Z";
  //  console.log(data.product[1].payment_date > date);
    var tbl = $('table');
    tbl.setAttribute("id", "table");
    tbl.style.width = '100%';
    tbl.setAttribute("border", "3");
    var tbdy = document.createElement('tbody');
    for (var i = 0; i < data.orders.length; i++) {
        var tr = document.createElement('tr');
        tr.setAttribute('id', i);
        for (var j = 0; j < 10; j++) {
          var td = document.createElement('td');
          switch (j) {
            case 0:
              td.innerHTML = data.orders[i].bill_number;
            break;
            case 1:
              td.innerHTML = data.orders[i].first_name;
            break;
            case 2:
              td.innerHTML = data.orders[i].last_name;
            break;
            case 3:
              td.innerHTML = data.orders[i].total;
            break;
            case 4:
              td.innerHTML = data.orders[i].deliver_date;
            break;
            case 5:
              td.innerHTML = data.orders[i].payment_date;
            break;
            case 6:
              if (data.orders[i].status === false) {
                td.innerHTML = "No ha pagado";
              } else {
                td.innerHTML = "Pago"
              }
            break;
            case 7:
              if (data.orders[i].status === false) {
                if (data.orders[i].payment_date > date) {
                  td.innerHTML = "Aplazado";
                } else {
                  td.innerHTML = "A tiempo";
                }
              } else {
                td.innerHTML = "-";
              }

            break;
            case 8:
            if (data.orders[i].comment === null) {
              td.innerHTML = "No hay comentarios";
            } else {
              td.innerHTML = data.orders[i].comment;
            }
            break;
            case 9:
              td.innerHTML = "Detalles";
              td.setAttribute("id", data.orders[i].bill_number)
              td.addEventListener('click', order_info);
            break;
          }
            tr.appendChild(td)
        }
        tbdy.appendChild(tr);
    }
    tbl.appendChild(tbdy);
  })
}

function order_info() {
  xhr.get(`./order/show/${this.id}`,{},{}).then((data) => {
      var a = new Date();
      var hour = parseInt(a.getHours())+4;
      var month = parseInt(a.getMonth())+1;
      var date = a.getFullYear()+"-"+month+"-"+a.getDate()+"T"+hour+":"+a.getMinutes()+":"+a.getMilliseconds()+"Z";
      $("table").innerHTML = "";
      var order = $("test");
      var bill = document.createElement('p');
      var name = document.createElement('p');
      var status = document.createElement('p');
      var deliver_date = document.createElement('p');
      var payment_date = document.createElement('p');
      var total = document.createElement('p');
      var comments = document.createElement('p');
      var text = document.createElement('input');
      var update = document.createElement('button');
      var comment = document.createElement('button');
      var erase = document.createElement('button');
      bill.innerHTML = "Factura #"+data.order.bill_number;
      deliver_date.innerHTML = "Fecha de entrega: "+data.order.deliver_date;
      payment_date.innerHTML = "Fecha de pago: "+data.order.payment_date;
      name.innerHTML = "Cliente: "+data.order.first_name+" "+data.order.last_name;
      update.innerHTML = "Actualizar status";
      comment.innerHTML = "Comentar orden";
      erase.innerHTML = "Eliminar order";
      if (data.order.payment_date < date) {
        if (data.order.status === false) {
          status.innerHTML = "No ha pagado"
        } else {
          status.innerHTML = "Pago";
        }
      } else {
        status.innerHTML = "Pago atrasado"
      }
      name.setAttribute("style", "text-align:center");
      bill.setAttribute("style", "text-align:center");
      status.setAttribute("style", "text-align:center");
      deliver_date.setAttribute("style", "text-align:center");
      payment_date.setAttribute("style", "text-align:center");
      erase.style.margin = "0 auto";
      erase.style.display = "block";
      comment.style.margin = "0 auto";
      comment.style.display = "block";
      update.style.margin = "0 auto";
      update.style.display = "block";
      text.style.margin = "0 auto";
      text.style.display = "block";
      text.setAttribute("placeholder", "observacion");
      order.appendChild(name);
      order.appendChild(bill);
      order.appendChild(status);
      order.appendChild(deliver_date);
      order.appendChild(payment_date);
      order.appendChild(text);
      order.appendChild(comment);
      order.appendChild(erase);
      order.appendChild(update);
    });
};

addEventListener('load', show_orders);
