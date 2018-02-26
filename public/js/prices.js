function $(id) {
    return document.getElementById(id);
};
function show_prices() {
  var xhr = new XHR();
  var brand = $('brand').value;
  $('tr').innerHTML = "";
  if ($('tbdy') != null) {
    $('tbdy').remove();
  }
  xhr.post('./product/prices',{brand:brand},{'Content-Type':'application/json'}).then((data)=> {
    var tbl = $('table');
    var tbdy = document.createElement('tbody');
    tbdy.setAttribute('id', 'tbdy')
    for (var i=0; i < 4; i++) {
        var tr = $('table').tHead.children[0], th = document.createElement('th');
        switch(i) {
          case 0:
            th.innerHTML = 'Codigo';
          break;
          case 1:
            th.innerHTML = 'Descripcion';
          break;
          case 2:
            th.innerHTML = 'Precio';
          break;
          case 3:
            th.innerHTML = 'Existencia';
          break;
        }
        tr.appendChild(th);
      }

    for (var i = 0; i < data.list.length; i++) {
        var tr = document.createElement('tr');
        tr.setAttribute('id', i);
        for (var j = 0; j < 4; j++) {
          var td = document.createElement('td');
          switch (j) {
            case 0:
              td.innerHTML = data.list[i].code;
            break;
            case 1:
              td.innerHTML = data.list[i].description;
            break;
            case 2:
              td.innerHTML = data.list[i].price;
            break;
            case 3:
              td.innerHTML = data.list[i].stock;
            break;
            }
            tr.appendChild(td)
        }
        tbdy.appendChild(tr);
    }
    tbl.appendChild(tbdy);
  })
}

function select() {
  var xhr = new XHR();
  xhr.get('./product/stuff',{},{}).then((data)=> {
      for (var i=0; i<data.product.length; i++) {
        var brand = document.createElement("option");
        brand.value = data.product[i].brand;
        brand.innerHTML = data.product[i].brand;
        if (data.product[i].brand !== null) {
          $('brand').appendChild(brand);
        }
      }
  });
}

addEventListener('load', select);
$('show').addEventListener('click', show_prices)
