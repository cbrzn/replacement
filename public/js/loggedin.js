function $(id) {
    return document.getElementById(id);
};

function load_products() {
  var xhr = new XHR();
  var marca = $('brand').value;

  xhr.get('./product/all',{brand:marca},{'Content-Type':'application/json'}).then((data)=> {
     var tbl = $('table');
    var tbdy = document.createElement('tbody');
    tbdy.setAttribute('id', 'tbdy')
    if (data.id !== null && data.admin === false) {
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
                th.innerHTML = 'Marca';
              break;
              case 5:
                th.innerHTML = 'Departamento';
              break;
              case 6:
                th.innerHTML = 'Anadir a carro de compra';
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
                td.innerHTML = data.list[i].price;
              break;
              case 3:
                td.innerHTML = data.list[i].stock;
              break;
              case 4:
                td.innerHTML = data.list[i].brand;
              break;
              case 5:
                td.innerHTML = data.list[i].department;
              break;
              case 6:
                var button = document.createElement('button');
                button.innerHTML = "Agregar";
                td.appendChild(button);
              break;
              }

              tr.appendChild(td)
          }
          tbdy.appendChild(tr);
      }
      tbl.appendChild(tbdy);
    } else if (data.admin === true) {
      for (var i=0; i < 9; i++) {
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
              th.innerHTML = 'Marca';
            break;
            case 5:
              th.innerHTML = 'Departamento';
            break;
            case 6:
              th.innerHTML = 'Anadir a carro de compra';
            break;
            case 7:
              th.innerHTML = 'Eliminar producto';
            break;
            case 8:
              th.innerHTML = 'Editar producto';
            break;
          }
          tr.appendChild(th);
        }


    for (var i = 0; i < data.list.length; i++) {
        var tr = document.createElement('tr');
        tr.setAttribute('id', i);
        for (var j = 0; j < 9; j++) {
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
            case 4:
              td.innerHTML = data.list[i].brand;
            break;
            case 5:
              td.innerHTML = data.list[i].department;
            break;
            case 6:
              var button = document.createElement('button');
              var product_id = data.list[i].id;
              td.setAttribute("id", i)
              button.innerHTML = "Agregar";
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
            case 7:
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
            case 8:
              var button = document.createElement('button');
              td.setAttribute("id", i)
              button.innerHTML = "Editar";
              td.appendChild(button);
              td.addEventListener('click', function() {
                select();
                $('search').style.display = "none";
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
          for (var i=0; i < 6; i++) {
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
              th.innerHTML = 'Marca';
            break;
            case 5:
              th.innerHTML = 'Departamento';
            break;
          }
          tr.appendChild(th);
        }


    for (var i = 0; i < data.list.length; i++) {
        var tr = document.createElement('tr');
        tr.setAttribute('id', i);
        for (var j = 0; j < 6; j++) {
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
              if (data.list[i].stock < 0) {
                td.innerHTML = 0;
              }
            break;
            case 4:
              td.innerHTML = data.list[i].brand;
            break;
            case 5:
              td.innerHTML = data.list[i].department;
            break;
            }
            tr.appendChild(td)
        }
        tbdy.appendChild(tr);
    }
    tbl.appendChild(tbdy);
    }
    xhr.get('./product/brands',{},{}).then((data)=> {
      var search = $('search');
      var select = $('select_brand');
      var search_button = document.createElement('button');
      select.style.display = "block";
      for (var i=0; i<data.brands.length; i++) {
        var brands = document.createElement("option");
        brands.value = data.brands[i].brand;
        brands.innerHTML = data.brands[i].brand;
        select.appendChild(brands);
      }
      search_button.innerHTML = "Buscar por marca";
      search.appendChild(search_button);
      search_button.addEventListener('click', function() {
        var brand = select.value;
        xhr.get(`./product/departments_by_brand/${select.value}`,{},{}).then((data) => {
          var length = data.departments.length;
          select.innerHTML = "";
          search_button.innerHTML = "Buscar por departamento"
          for (var i=0; i<length; i++) {
            var brands = document.createElement("option");
            brands.value = data.departments[i].department;
            brands.innerHTML = data.departments[i].department;
            select.appendChild(brands);
          }
          search_button.addEventListener('click', function() {
          search.style.display = "none";
          $('tr').innerHTML = "";
            if ($('tbdy') != null) {
              $('tbdy').remove();
            }
            var department = select.value;
            xhr.post('./product/show_products_by_stuff', {brand:brand, department:department},{'Content-Type':'application/json'}).then((data) => {
             var tbl = $('table');
             var tbdy = document.createElement('tbody');
             tbdy.setAttribute('id', 'tbdy')
             if (data.id !== null && data.admin === false) {
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
                         th.innerHTML = 'Marca';
                       break;
                       case 5:
                         th.innerHTML = 'Departamento';
                       break;
                       case 6:
                         th.innerHTML = 'Anadir a carro de compra';
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
                         td.innerHTML = data.list[i].price;
                       break;
                       case 3:
                         td.innerHTML = data.list[i].stock;
                         if (data.list[i].stock < 0) {
                           td.innerHTML = 0;
                         }
                       break;
                       case 4:
                         td.innerHTML = data.list[i].brand;
                       break;
                       case 5:
                         td.innerHTML = data.list[i].department;
                       break;
                       case 6:
                         var button = document.createElement('button');
                         button.innerHTML = "Agregar";
                         td.appendChild(button);
                       break;
                       }

                       tr.appendChild(td)
                   }
                   tbdy.appendChild(tr);
               }
               tbl.appendChild(tbdy);
             } else if (data.admin === true) {
               for (var i=0; i < 9; i++) {
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
                       th.innerHTML = 'Marca';
                     break;
                     case 5:
                       th.innerHTML = 'Departamento';
                     break;
                     case 6:
                       th.innerHTML = 'Anadir a carro de compra';
                     break;
                     case 7:
                       th.innerHTML = 'Eliminar producto';
                     break;
                     case 8:
                       th.innerHTML = 'Editar producto';
                     break;
                   }
                   tr.appendChild(th);
                 }


             for (var i = 0; i < data.list.length; i++) {
                 var tr = document.createElement('tr');
                 tr.setAttribute('id', i);
                 for (var j = 0; j < 9; j++) {
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
                     case 4:
                       td.innerHTML = data.list[i].brand;
                     break;
                     case 5:
                       td.innerHTML = data.list[i].department;
                     break;
                     case 6:
                       var button = document.createElement('button');
                       var product_id = data.list[i].id;
                       td.setAttribute("id", i)
                       button.innerHTML = "Agregar";
                       td.appendChild(button);
                       td.addEventListener('click', function() {
                         console.log(i)
                         var quantity = prompt("Cantidad a comprar: ");
                         var reg = /^\d+$/;
                         if (reg.test(quantity)) {
                           var total = parseInt(data.list[this.id].price) * parseInt(quantity);
                           if ((parseInt(data.list[this.id].stock) - parseInt(quantity)) < 0 && data.list[this.id].type_supplier === false) {
                             alert("No hay producto en existencia")
                           } else {
                             xhr.post('./cart/new', {product_id:data.list[this.id].id, product_name:data.list[this.id].name, product_price:data.list[this.id].price, quantity:quantity, total:total, stock:data.list[this.id].stock}, {'Content-Type':'application/json'}).then((data)=>{
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
                     case 7:
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
                     case 8:
                       var button = document.createElement('button');
                       td.setAttribute("id", i)
                       button.innerHTML = "Editar";
                       td.appendChild(button);
                       td.addEventListener('click', function() {
                         xhr.get('./product/stuff',{},{}).then((data)=> {
                             for (var i=0; i<data.product.length; i++) {
                               var brand = document.createElement("option");
                               brand.value = data.product[i].brand;
                               brand.innerHTML = data.product[i].brand;
                               if (data.product[i].brand !== null) {
                                 $('brand').appendChild(brand);
                               }
                             }

                             for (var i=0; i<data.product.length; i++) {
                                 var department = document.createElement("option");
                                 department.value = data.product[i].department;
                                 department.innerHTML = data.product[i].department;
                                 if (data.product[i].department !== null) {
                                   $('department').appendChild(department);
                                 }
                             }
                         });
                         $('search').style.display = "none";
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
                   for (var i=0; i < 6; i++) {
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
                       th.innerHTML = 'Marca';
                     break;
                     case 5:
                       th.innerHTML = 'Departamento';
                     break;
                   }
                   tr.appendChild(th);
                 }


             for (var i = 0; i < data.list.length; i++) {
                 var tr = document.createElement('tr');
                 tr.setAttribute('id', i);
                 for (var j = 0; j < 6; j++) {
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
                     case 4:
                       td.innerHTML = data.list[i].brand;
                     break;
                     case 5:
                       td.innerHTML = data.list[i].department;
                     break;
                     }
                     tr.appendChild(td)
                 }
                 tbdy.appendChild(tr);
             }
             tbl.appendChild(tbdy);
              }
                });
              });
            });
          });
        });
      });
};
function delete_product(id) {
  let xhr = new XHR();
  xhr.get(`./product/delete/${id}`,{},{}).then((data)=>{
    console.log(data);
  });
};

function logout(){
  let xhr = new XHR();
  xhr.get('./logout',{},{}).then((data)=>{
    console.log(data);
    window.location.href = "./login.html"
  });
};


function select() {
  let xhr = new XHR();
  xhr.get('./product/stuff',{},{}).then((data)=> {
    console.log(data);
      for (var i=0; i<data.product.length; i++) {
        var brand = document.createElement("option");
        brand.value = data.product[i].brand;
        brand.innerHTML = data.product[i].brand;
        if (data.product[i].brand !== null) {
          $('brand').appendChild(brand);
        }
      }

      for (var i=0; i<data.product.length; i++) {
          var department = document.createElement("option");
          department.value = data.product[i].department;
          department.innerHTML = data.product[i].department;
          if (data.product[i].department !== null) {
            $('department').appendChild(department);
          }
      }
  });
}
addEventListener('load', load_products);
