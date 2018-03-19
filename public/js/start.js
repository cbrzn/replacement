function $(id) {
    return document.getElementById(id);
};
var brand;

function load_products_by_brands() {
  var xhr = new XHR();
  second_function();
   brand = $('brand').value;
  xhr.post('./product/prices',{brand:brand},{'Content-Type':'application/json'}).then((data)=> {
    var brand_name = document.createElement('h2');
    brand_name.innerHTML = brand;
    $('brand_name').appendChild(brand_name);
    $('tr').innerHTML = "";
    if ($('tbdy') != null) {
      $('tbdy').remove();
    }
    var tbl = $('table');
    var tbdy = document.createElement('tbody');
    tbdy.setAttribute('id', 'tbdy')
    if (data.id !== null && data.admin === false) {
      console.log("a");
        for (var i=0; i < 5; i++) {
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
              case 4:
                th.innerHTML = 'Anadir a carro de compra';
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
                td.innerHTML = data.list[i].code;
              break;
              case 1:
                td.innerHTML = data.list[i].description;
              break;
              case 2:
                var size = data.list[i].price.toString().length;
                var number  = data.list[i].price.toString();
                var arr = number.split("").reverse();
                var points = [];
                for (var n=0; n<size; n++) {
                  switch (n) {
                    case 5:
                    case 8:
                    case 11:
                      points.push(arr[n] + ",");
                    break;
                    default:
                      points.push(arr[n]);
                    break;
                  }
                }
                td.innerHTML = points.reverse().join("");
              break;
              case 3:
              if (data.list[i].stock < 0) {
                td.innerHTML = "0";
              } else {
                td.innerHTML = data.list[i].stock;
              }
              break;
              case 4:
                var button = document.createElement('button');
                var product_id = data.list[i].id;
                td.setAttribute("id", i)
                button.innerHTML = "Anadir";
                td.appendChild(button);
                td.addEventListener('click', function() {
                  var quantity = prompt("Cantidad a comprar: ");
                  var reg = /^\d+$/;
                  if (reg.test(quantity)) {
                    var total = parseInt(data.list[this.id].price) * parseInt(quantity);
                    if ((parseInt(data.list[this.id].stock) - parseInt(quantity)) < 0 && data.list[this.id].type_supplier === false) {
                      alert("No hay producto en existencia")
                    } else {
                      xhr.post('./cart/new', {product_id:data.list[this.id].id, product_name:data.list[this.id].code, product_price:data.list[this.id].price, quantity:quantity, total:total, stock:data.list[this.id].stock}, {'Content-Type':'application/json'}).then((data)=>{
                        console.log(data);
                        if (data.msg === 200) {
                          alert("Producto agregado");
                          window.location.href = "./index.html";
                        } else {
                          alert("Producto ya esta agregado a carro de compras");
                          window.location.href = "./index.html";
                        }
                      });
                    }
                } else if (quantity === null) {
                  alert("Producto no anadido")
              } else {
                alert("Error al anadir producto a carro de compras. Debe ingresar un numero. Intente de nuevo");
              }
            });
            break;
            }
            tr.appendChild(td)
          }
          tbdy.appendChild(tr);
      }
      tbl.appendChild(tbdy);
    } else if (data.admin === true) {
        for (var i=0; i < 7; i++) {
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
              case 4:
                th.innerHTML = 'Anadir a carro de compra';
              break;
              case 5:
                th.innerHTML = 'Eliminar producto';
              break;
              case 6:
                th.innerHTML = 'Editar producto';
              break;
            }
            tr.appendChild(th);
          }


        for (var i = 0; i < data.list.length; i++) {
            var tr = document.createElement('tr');
            tr.setAttribute('id', i);
            for (var j = 0; j < 7; j++) {
              var td = document.createElement('td');
              switch (j) {
                case 0:
                  td.innerHTML = data.list[i].code;
                break;
                case 1:
                  td.innerHTML = data.list[i].description;
                break;
                case 2:
                  var size = data.list[i].price.toString().length;
                  var number  = data.list[i].price.toString();
                  var arr = number.split("").reverse();
                  var points = [];
                  for (var n=0; n<size; n++) {
                    switch (n) {
                      case 5:
                      case 8:
                      case 11:
                        points.push(arr[n] + ",");
                      break;
                      default:
                        points.push(arr[n]);
                      break;
                    }
                  }
                  td.innerHTML = points.reverse().join("");
                break;
                case 3:
                if (data.list[i].stock < 0) {
                  td.innerHTML = "0";
                } else {
                  td.innerHTML = data.list[i].stock;
                }
                break;
                case 4:
                  var button = document.createElement('button');
                  var product_id = data.list[i].id;
                  td.setAttribute("id", i)
                  button.innerHTML = "Anadir";
                  td.appendChild(button);
                  td.addEventListener('click', function() {
                    var quantity = prompt("Cantidad a comprar: ");
                    var reg = /^\d+$/;
                    if (reg.test(quantity)) {
                      var total = parseInt(data.list[this.id].price) * parseInt(quantity);
                      if ((parseInt(data.list[this.id].stock) - parseInt(quantity)) < 0 && data.list[this.id].type_supplier === false) {
                        alert("No hay producto en existencia")
                      } else {
                        console.log(data.list[this.id])
                        xhr.post('./cart/new', {product_id:data.list[this.id].id, product_name:data.list[this.id].code, product_price:data.list[this.id].price, quantity:quantity, total:total, stock:data.list[this.id].stock}, {'Content-Type':'application/json'}).then((data)=>{
                          if (data.msg === 200) {
                            alert("Producto agregado");
                            window.location.href = "./index.html";
                          } else {
                            alert("Producto ya esta agregado a carro de compras");
                            window.location.href = "./index.html";
                          }
                        });
                      }
                  } else if (quantity === null) {
                    alert("Producto no agregado")
                  } else {
                    alert("Error al anadir producto a carro de compras. Debe ingresar un numero. Intente de nuevo");
                  }
                });
                break;
                case 5:
                  var button = document.createElement('button');
                  td.setAttribute("id", i)
                  button.innerHTML = "Eliminar";
                  td.appendChild(button);
                  var product_id = data.list[i].id;
                  td.addEventListener('click', function() {
                      var r = confirm("Segur@ que desea eliminar esta orden?")
                      if (r == true) {
                        xhr.get(`./product/delete/${product_id}`,{},{}).then((data)=>{
                          alert("Has eliminado un producto");
                          window.location.href = "./index.html";
                      });
                    }
                  });
                break;
                case 6:
                  var button = document.createElement('button');
                  td.setAttribute("id", i)
                  button.innerHTML = "Editar";
                  td.appendChild(button);
                  td.addEventListener('click', function() {
                    select();
                    $('edit').style.display = "block";
                    $('table').style.display = "none";
                    $('title').innerHTML = "Editar producto";
                    var price = $('precio');
                    price.setAttribute('placeholder', data.list[this.id].price);
                    var description = $('description');
                    description.setAttribute('placeholder', data.list[this.id].description);
                    var code = $('code');
                    code.setAttribute('placeholder', data.list[this.id].code);
                    var stock = $('stock');
                    stock.setAttribute('placeholder', data.list[this.id].stock);
                    var type_supplier = $('type_supplier');
                    type_supplier.setAttribute('placeholder', data.list[this.id].type_supplier);
                    var brand = $('brand').value;
                    var department = $('department').value;
                    var product_id = data.list[this.id].id;
                    var td_id = this.id;
                    $('update').addEventListener('click', function() {
                      if (price.value === "") {
                        price.value = data.list[td_id].price;
                      }
                      if (description.value === "") {
                        description.value = data.list[td_id].description;
                      }
                      if (stock.value === "") {
                        stock.value = data.list[td_id].stock;
                     }
                     if (type_supplier.value === "nothing") {
                        type_supplier.value = data.list[td_id].type_supplier;
                     }
                     if (brand === "not") {
                        brand = data.list[td_id].brand;
                     }
                     if (department === "not_two") {
                        department = data.list[td_id].department;
                     }
                     if (code.value === "") {
                        code.value = data.list[td_id].code;
                     }
                     var producto = data.list[td_id].id;
                      xhr.post(`./product/update`,{price:price.value, description:description.value, stock:stock.value, type_supplier:type_supplier.value, brand:brand, department:department, code:code.value, product_id:producto}, {'Content-Type':'application/json'}).then((data)=>{
                        alert("Producto editado con exito")
                      });
                    });
                 });
                break;
                }

                tr.appendChild(td)
            }
            tbdy.appendChild(tr);
        }
        tbl.appendChild(tbdy);
    } else {
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
                  var size = data.list[i].price.toString().length;
                  var number  = data.list[i].price.toString();
                  var arr = number.split("").reverse();
                  var points = [];
                  for (var n=0; n<size; n++) {
                    switch (n) {
                      case 6:
                      case 9:
                      case 12:
                        points.push(arr[n] + ",");
                      break;
                      default:
                        points.push(arr[n]);
                      break;
                    }
                  }
                  td.innerHTML = points.reverse().join("");
                break;
                case 3:
                if (data.list[i].stock < 0) {
                  td.innerHTML = "0";
                } else {
                  td.innerHTML = data.list[i].stock;
                }
                break;
                }
                tr.appendChild(td)
            }
            tbdy.appendChild(tr);
        }
        tbl.appendChild(tbdy);
       }
      });
    };


    function load_products_by_departments() {
      var xhr = new XHR();
      var department = $('department').value;
      xhr.post('./product/show_products_by_stuff',{brand:brand, department:department},{'Content-Type':'application/json'}).then((data)=> {
        if($('this') !== null) {
          $('this').remove();
        }
        var department_name = document.createElement('h2');
        department_name.setAttribute('id', 'this');
        department_name.innerHTML = department;
        $('brand_name').appendChild(department_name);
        $('tr').innerHTML = "";
        if ($('tbdy') != null) {
          $('tbdy').remove();
        }
        var tbl = $('table');
        var tbdy = document.createElement('tbody');
        tbdy.setAttribute('id', 'tbdy')
        if (data.id !== null && data.admin === false) {
            for (var i=0; i < 5; i++) {
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
                  case 4:
                    th.innerHTML = 'Anadir a carro de compra';
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
                    td.innerHTML = data.list[i].code;
                  break;
                  case 1:
                    td.innerHTML = data.list[i].description;
                  break;
                  case 2:
                    var size = data.list[i].price.toString().length;
                    var number  = data.list[i].price.toString();
                    var arr = number.split("").reverse();
                    var points = [];
                    for (var n=0; n<size; n++) {
                      switch (n) {
                        case 6:
                        case 9:
                        case 12:
                          points.push(arr[n] + ",");
                        break;
                        default:
                          points.push(arr[n]);
                        break;
                      }
                    }
                    td.innerHTML = points.reverse().join("");
                  break;
                  case 3:
                  if (data.list[i].stock < 0) {
                    td.innerHTML = "0";
                  } else {
                    td.innerHTML = data.list[i].stock;
                  }
                  break;
                  case 4:
                    var button = document.createElement('button');
                    var product_id = data.list[i].id;
                    td.setAttribute("id", i)
                    button.innerHTML = "Anadir";
                    td.appendChild(button);
                    td.addEventListener('click', function() {
                      var quantity = prompt("Cantidad a comprar: ");
                      var reg = /^\d+$/;
                      if (reg.test(quantity)) {
                        var total = parseInt(data.list[this.id].price) * parseInt(quantity);
                        if ((parseInt(data.list[this.id].stock) - parseInt(quantity)) < 0 && data.list[this.id].type_supplier === false) {
                          alert("No hay producto en existencia")
                        } else {
                          xhr.post('./cart/new', {product_id:data.list[this.id].id, product_name:data.list[this.id].code, product_price:data.list[this.id].price, quantity:quantity, total:total, stock:data.list[this.id].stock}, {'Content-Type':'application/json'}).then((data)=>{
                            console.log(data);
                            if (data.msg === 200) {
                              alert("Producto agregado");
                              window.location.href = "./index.html";
                            } else {
                              alert("Producto ya esta agregado a carro de compras");
                              window.location.href = "./index.html";
                            }
                          });
                        }
                    } else if (quantity === null) {
                      alert("Producto no anadido")
                  } else {
                    alert("Error al anadir producto a carro de compras. Debe ingresar un numero. Intente de nuevo");
                  }
                });
                break;
                }
                tr.appendChild(td)
              }
              tbdy.appendChild(tr);
          }
          tbl.appendChild(tbdy);
        } else if (data.admin === true) {
            for (var i=0; i < 7; i++) {
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
                  case 4:
                    th.innerHTML = 'Anadir a carro de compra';
                  break;
                  case 5:
                    th.innerHTML = 'Eliminar producto';
                  break;
                  case 6:
                    th.innerHTML = 'Editar producto';
                  break;
                }
                tr.appendChild(th);
              }


            for (var i = 0; i < data.list.length; i++) {
                var tr = document.createElement('tr');
                tr.setAttribute('id', i);
                for (var j = 0; j < 7; j++) {
                  var td = document.createElement('td');
                  switch (j) {
                    case 0:
                      td.innerHTML = data.list[i].code;
                    break;
                    case 1:
                      td.innerHTML = data.list[i].description;
                    break;
                    case 2:
                      var size = data.list[i].price.toString().length;
                      var number  = data.list[i].price.toString();
                      var arr = number.split("").reverse();
                      var points = [];
                      for (var n=0; n<size; n++) {
                        switch (n) {
                          case 6:
                          case 9:
                          case 12:
                            points.push(arr[n] + ",");
                          break;
                          default:
                            points.push(arr[n]);
                          break;
                        }
                      }
                      td.innerHTML = points.reverse().join("");
                    break;
                    case 3:
                    if (data.list[i].stock < 0) {
                      td.innerHTML = "0";
                    } else {
                      td.innerHTML = data.list[i].stock;
                    }
                    break;
                    case 4:
                      var button = document.createElement('button');
                      var product_id = data.list[i].id;
                      td.setAttribute("id", i)
                      button.innerHTML = "Anadir";
                      td.appendChild(button);
                      td.addEventListener('click', function() {
                        var quantity = prompt("Cantidad a comprar: ");
                        var reg = /^\d+$/;
                        if (reg.test(quantity)) {
                          var total = parseInt(data.list[this.id].price) * parseInt(quantity);
                          if ((parseInt(data.list[this.id].stock) - parseInt(quantity)) < 0 && data.list[this.id].type_supplier === false) {
                            alert("No hay producto en existencia")
                          } else {
                            console.log(data.list[this.id])
                            xhr.post('./cart/new', {product_id:data.list[this.id].id, product_name:data.list[this.id].code, product_price:data.list[this.id].price, quantity:quantity, total:total, stock:data.list[this.id].stock}, {'Content-Type':'application/json'}).then((data)=>{
                              if (data.msg === 200) {
                                alert("Producto agregado");
                                window.location.href = "./index.html";
                              } else {
                                alert("Producto ya esta agregado a carro de compras");
                                window.location.href = "./index.html";
                              }
                            });
                          }
                      } else if (quantity === null) {
                        alert("Producto no agregado")
                      } else {
                        alert("Error al anadir producto a carro de compras. Debe ingresar un numero. Intente de nuevo");
                      }
                    });
                    break;
                    case 5:
                      var button = document.createElement('button');
                      td.setAttribute("id", i)
                      button.innerHTML = "Eliminar";
                      td.appendChild(button);
                      var product_id = data.list[i].id;
                      td.addEventListener('click', function() {
                          var r = confirm("Segur@ que desea eliminar esta orden?")
                          if (r == true) {
                            xhr.get(`./product/delete/${product_id}`,{},{}).then((data)=>{
                              alert("Has eliminado un producto");
                              window.location.href = "./index.html";
                          });
                        }
                      });
                    break;
                    case 6:
                      var button = document.createElement('button');
                      td.setAttribute("id", i)
                      button.innerHTML = "Editar";
                      td.appendChild(button);
                      td.addEventListener('click', function() {
                        select();
                        $('edit').style.display = "block";
                        $('table').style.display = "none";
                        $('title').innerHTML = "Editar producto";
                        var price = $('precio');
                        price.setAttribute('placeholder', data.list[this.id].price);
                        var description = $('description');
                        description.setAttribute('placeholder', data.list[this.id].description);
                        var code = $('code');
                        code.setAttribute('placeholder', data.list[this.id].code);
                        var stock = $('stock');
                        stock.setAttribute('placeholder', data.list[this.id].stock);
                        var type_supplier = $('type_supplier');
                        type_supplier.setAttribute('placeholder', data.list[this.id].type_supplier);
                        var brand = $('brand').value;
                        var department = $('department').value;
                        var product_id = data.list[this.id].id;
                        var td_id = this.id;
                        $('update').addEventListener('click', function() {
                          if (price.value === "") {
                            price.value = data.list[td_id].price;
                          }
                          if (description.value === "") {
                            description.value = data.list[td_id].description;
                          }
                          if (stock.value === "") {
                            stock.value = data.list[td_id].stock;
                         }
                         if (type_supplier.value === "nothing") {
                            type_supplier.value = data.list[td_id].type_supplier;
                         }
                         if (brand === "not") {
                            brand = data.list[td_id].brand;
                         }
                         if (department === "not_two") {
                            department = data.list[td_id].department;
                         }
                         if (code.value === "") {
                            code.value = data.list[td_id].code;
                         }
                         var producto = data.list[td_id].id;
                          xhr.post(`./product/update`,{price:price.value, description:description.value, stock:stock.value, type_supplier:type_supplier.value, brand:brand, department:department, code:code.value, product_id:producto}, {'Content-Type':'application/json'}).then((data)=>{
                            alert("Producto editado con exito")
                          });
                        });
                     });
                    break;
                    }

                    tr.appendChild(td)
                }
                tbdy.appendChild(tr);
            }
            tbl.appendChild(tbdy);
        } else {
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
                      var size = data.list[i].price.toString().length;
                      var number  = data.list[i].price.toString();
                      var arr = number.split("").reverse();
                      var points = [];
                      for (var n=0; n<size; n++) {
                        switch (n) {
                          case 6:
                          case 9:
                          case 12:
                            points.push(arr[n] + ",");
                          break;
                          default:
                            points.push(arr[n]);
                          break;
                        }
                      }
                      td.innerHTML = points.reverse().join("");
                    break;
                    case 3:
                    if (data.list[i].stock < 0) {
                      td.innerHTML = "0";
                    } else {
                      td.innerHTML = data.list[i].stock;
                    }
                    break;
                    }
                    tr.appendChild(td)
                }
                tbdy.appendChild(tr);
            }
            tbl.appendChild(tbdy);
           }
          });
        };

function delete_product(id) {
  let xhr = new XHR();
  xhr.get(`./product/delete/${id}`,{},{}).then((data)=>{
    window.location.href = "./index.html"
  });
};

function logout(){
  let xhr = new XHR();
  xhr.get('./logout',{},{}).then((data)=>{
    window.location.href = "./login.html"
  });
};


function select() {
  let xhr = new XHR();
  xhr.get('./stuff/get_brands_and_departments',{},{}).then((data)=> {
    console.log(data);
      for (var i=0; i<data.brands.length; i++) {
        var brand = document.createElement("option");
        brand.value = data.brands[i].name;
        brand.innerHTML = data.brands[i].name;
        $('brands').appendChild(brand);

      }

      for (var i=0; i<data.departments.length; i++) {
          var department = document.createElement("option");
          department.value = data.departments[i].name;
          department.innerHTML = data.departments[i].name;
          $('departments').appendChild(department);
      }
  });
}

function second_function() {
  let xhr = new XHR();
  $('department').style.display = 'block';
  $('show2').style.display = 'block';
  $('show').style.display = 'none';
  $('brand').style.display = 'none';
  xhr.get('./stuff/get_brands_and_departments',{},{}).then((data)=> {
    for (var i=0; i<data.departments.length; i++) {
      var department = document.createElement("option");
      department.value = data.departments[i].name;
      department.innerHTML = data.departments[i].name;
      $('department').appendChild(department);

    }
  });
}

$('show').addEventListener('click', load_products_by_brands)
$('show2').addEventListener('click', load_products_by_departments)
