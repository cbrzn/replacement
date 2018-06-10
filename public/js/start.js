function $(id) {
    return document.getElementById(id);
};
var brand;
var breakpoint = {};
var title = $('title')
var first_update = false;


  //making your buttons beautiful

  const buyButton = (mybutton)=>{
    var buy_icon = document.createElement('i');
    mybutton.setAttribute('class','btn btn-success pl-5 pr-5')
    buy_icon.setAttribute('class','ion-icon ion-android-cart pl-1')
    buy_icon.setAttribute('style','font-size:22px;color:white')
    mybutton.innerHTML ='Añadir al '
    mybutton.appendChild(buy_icon)
    return mybutton
  }
  const eraseButton = (mybutton)=>{
    var erase_icon = document.createElement('i');
    mybutton.setAttribute('class','btn btn-danger pl-5 pr-5')
    erase_icon.setAttribute('class','ion-icon ion-android-delete pl-1 ml-2')
    erase_icon.setAttribute('style','font-size:22px;color:white')
    mybutton.innerHTML = "  Eliminar"
    mybutton.appendChild(erase_icon)
    return mybutton
  }


  const editButton = (mybutton)=>{
    var edit_icon = document.createElement('i');
    mybutton.setAttribute('class','btn btn-primary pl-5 pr-5')
    edit_icon.setAttribute('class','ion-icon ion-edit pl-1 ml-2')
    edit_icon.setAttribute('style','font-size:22px;color:white')
    mybutton.innerHTML = "  Editar";
    mybutton.appendChild(edit_icon)
    return mybutton

  }
  //bitch





function load_products_by_brands() {
  var xhr = new XHR();
  second_function();
  $('note').style.display = "none";
  $('department_search_select').innerHTML = "";
  brand = $('brand_search_select').value;
  xhr.post('./product/prices',{brand, page:1},{'Content-Type':'application/json'}).then((data)=> {
    console.log(data)
    var br = document.createElement('br')
    var brand_name = document.createElement('h3');
   // brand_name.setAttribute('id','this_brand')



    $('search_by').innerHTML = ""
    brand_name.setAttribute('class', 'd-inline')
    brand_name.innerHTML = `Marca: ${brand}`;
    $('search_by').appendChild(brand_name);


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
            th.setAttribute('scope','col')
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
                //var add_button = document.createElement('button');
               // var buy_icon = document.createElement('i');
                //add_button.setAttribute('class','btn btn-success pl-5 pr-5')
               // buy_icon.setAttribute('class','ion-icon ion-android-cart pl-1')
               // buy_icon.setAttribute('style','font-size:22px;color:white')
                var add_button1 = document.createElement('button');
                add_button1 = buyButton(add_button1)
                var product_id = data.list[i].id;
                td.setAttribute("id", i)
                //add_button.innerHTML ='Añadir al '
                //add_button.appendChild(buy_icon)
                td.appendChild(add_button1);
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
                  var add_button2 = document.createElement('button');
                  add_button2 = buyButton(add_button2);
                  var product_id = data.list[i].id;
                  td.setAttribute("id", i)
                  //button.innerHTML = "Anadir";
                  td.appendChild(add_button2);
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
                  var erase_button1 = document.createElement('button');
                  erase_button1 = eraseButton(erase_button1);
                  td.setAttribute("id", i)
                  //button.innerHTML = "Eliminar";
                  td.appendChild(erase_button1);
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
                  var edit_button1 = document.createElement('button');
                  edit_button1 = editButton(edit_button1);
                  td.setAttribute("id", i)
                  //button.innerHTML = "Editar";
                  td.appendChild(edit_button1);
                  td.addEventListener('click', function() {
                  if(first_update == false ){
                  select();
                  }

                    //$('trigger_message_modal').click();

                    //UPDATE MODAL CREATION
                    var update_modal_body = $('update_modal_body')
                    //$('edit').style.display = "block";
                    //$('table').style.display = "none";
                    //$('title').innerHTML = "Editar producto";
                    var price = $('update_precio');
                    price.setAttribute('placeholder', data.list[this.id].price);
                    //price.innerHTML = data.list[this.id].price
                    var description = $('update_description');
                    description.setAttribute('placeholder', data.list[this.id].description);
                    var code = $('update_code');
                    code.setAttribute('placeholder', data.list[this.id].code);
                    var stock = $('update_stock');
                    stock.setAttribute('placeholder', data.list[this.id].stock);
                    var type_supplier = $('update_type_supplier');
                    type_supplier.setAttribute('placeholder', data.list[this.id].type_supplier);
                    //var update_brand = $('update_brand_select').value;
                    //var update_department = $('update_department_select').value;
                    var product_id = data.list[this.id].id;
                    var td_id = this.id;
                    //$('update').addEventListener('click', function() {
                    $('update_modal_button').addEventListener('click', function() {
                      var update_brand = $('update_brand_select').value;
                      var update_department = $('update_department_select').value;
                      if (price.value === "") {
                        price.value = data.list[td_id].price;
                      } else {
                        price.value = price.value.replace(/[,.]/g, (m) => {
                          // m is the match found in the string
                          // If `,` is matched return `.`, if `.` matched return `,`
                          return m === ',' ? '.' : '';
                      });
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
                     if (type_supplier.value === "") {
                        type_supplier.value = data.list[td_id].type_supplier;
                     }
                     if (update_brand === "not") {
                        update_brand = data.list[td_id].brand;
                     }
                     if (update_department === "not_two") {
                        update_department = data.list[td_id].department;
                     }
                     if (update_brand === "") {
                        update_brand = data.list[td_id].brand;
                     }
                     if (update_department === "") {
                        update_department = data.list[td_id].department;
                     }
                     if (code.value === "") {
                        code.value = data.list[td_id].code;
                     }
                     var producto = data.list[td_id].id;
                      xhr.post(`./product/update`,{price:price.value, description:description.value, stock:stock.value, type_supplier:type_supplier.value, brand:update_brand, department:update_department, code:code.value, product_id:producto}, {'Content-Type':'application/json'}).then((data)=>{
                        console.log(data)
                        alert("Producto editado con exito")
                      }).then(()=> { jQuery('#update_modal').modal('hide') })
                    });
                    //$('trigger_message_modal').click();
                    jQuery('#update_modal').modal(focus)
                    first_update = true;
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
      var department = $('department_search_select').value;
      xhr.post('./product/show_products_by_stuff',{brand, department, page:1},{'Content-Type':'application/json'}).then((data)=> {
        console.log(data)
        if($('this') !== null) {
          $('this').remove();
        }


        var department_name = document.createElement('h3');
        department_name.setAttribute('id', 'this');
        department_name.innerHTML = `- Departamento: ${department}`;
        department_name.setAttribute('class', 'd-inline');
        $('search_by').appendChild(department_name);

        /*var department_name = document.createElement('h3');
        department_name.setAttribute('class', 'row')
        department_name.setAttribute('id', 'this');
        department_name.innerHTML = `- Departamento: ${department}`;
        department_name.setAttribute('class', 'd-inline p-2 bg-dark text-white');
        $('small_search_by').appendChild(department_name);*/

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
                    var add_button3 = document.createElement('button');
                    add_button3 = buyButton(add_button3);

                    var product_id = data.list[i].id;
                    td.setAttribute("id", i)
                    td.appendChild(add_button3);
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

                       var add_button4 = document.createElement('button');
                       add_button4 = buyButton(add_button4);
                      //var buy_icon = document.createElement('i');
                      //button.setAttribute('class','btn btn-success pl-5 pr-5')
                      //buy_icon.setAttribute('class','ion-icon ion-android-cart pl-1')
                      //buy_icon.setAttribute('style','font-size:22px;color:white')
                      var product_id = data.list[i].id;
                      td.setAttribute("id", i)
                      //button.innerHTML = "Anadir al ";
                      //button.appendChild(buy_icon)
                      td.appendChild(add_button4);
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
                       var erase_button3 = document.createElement('button');
                       erase_button3 = eraseButton(erase_button3);
                      //var erase_icon = document.createElement('i');
                      //button.setAttribute('class','btn btn-danger pl-5 pr-5')
                      //erase_icon.setAttribute('class','ion-icon ion-android-delete pl-1')
                      //erase_icon.setAttribute('style','font-size:22px;color:white')
                      td.setAttribute("id", i)
                      //button.innerHTML = " Eliminar";
                      td.appendChild(erase_button3);
                      var product_id = data.list[i].id;
                      td.addEventListener('click', function() {
                          var r = confirm("Seguro que desea eliminar este producto?")
                          if (r == true) {
                            xhr.get(`./product/delete/${product_id}`,{},{}).then((data)=>{
                              alert("Has eliminado un producto");
                              window.location.href = "./index.html";
                          });
                        }
                      });
                    break;
                    case 6:
                      var edit_button3 = document.createElement('button');
                      edit_button3 = editButton(edit_button3)
                      td.setAttribute("id", i)
                      //button.innerHTML = " Editar";
                      td.appendChild(edit_button3);
                      //IMPORTANT SHIT DOWN HERE
                        td.addEventListener('click', function() {
                        if(first_update == false ){
                        select();
                        }
                        //$('trigger_message_modal').click();

                        //UPDATE MODAL CREATION
                        //var update_modal_body = $('update_modal_body')
                        //$('edit').style.display = "block";
                        //$('table').style.display = "none";
                        //$('title').innerHTML = "Editar producto";
                        var price2 = $('update_precio');
                        price2.setAttribute('placeholder', data.list[this.id].price);
                        //price.innerHTML = data.list[this.id].price
                        var description2 = $('update_description');
                        description2.setAttribute('placeholder', data.list[this.id].description);
                        var code2 = $('update_code');
                        code2.setAttribute('placeholder', data.list[this.id].code);
                        var stock2 = $('update_stock');
                        stock2.setAttribute('placeholder', data.list[this.id].stock);
                        var type_supplier2 = $('update_type_supplier');
                        type_supplier2.setAttribute('placeholder', data.list[this.id].type_supplier);
                        //var update_brand = $('update_brand_select').value;
                        //var update_department = $('update_department_select').value;
                        var product_id2 = data.list[this.id].id;
                        var td_id2 = this.id;
                        //$('update').addEventListener('click', function() {
                        $('update_modal_button').addEventListener('click', function() {
                          var update_brand2 = $('update_brand_select').value;
                          var update_department2 = $('update_department_select').value;
                          if (price2.value === "") {
                            price2.value = data.list[td_id2].price;
                          }
                          if (description2.value === "") {
                            description2.value = data.list[td_id2].description;
                          }
                          if (stock2.value === "") {
                            stock2.value = data.list[td_id2].stock;
                         }
                         if (type_supplier2.value === "nothing") {
                            type_supplier2.value = data.list[td_id2].type_supplier;
                         }
                         if (type_supplier2.value === "") {
                            type_supplier2.value = data.list[td_id2].type_supplier;
                         }
                         if (update_brand2 === "not") {
                            update_brand2 = data.list[td_id2].brand;
                         }
                         if (update_department2 === "not_two") {
                            update_department2 = data.list[td_id2].department;
                         }
                         if (update_brand2 === "") {
                            update_brand2 = data.list[td_id2].brand;
                         }
                         if (update_department2 === "") {
                            update_department2 = data.list[td_id2].department;
                         }
                         if (code2.value === "") {
                            code2.value = data.list[td_id2].code;
                         }
                         var producto2 = data.list[td_id2].id;
                          xhr.post(`./product/update`,{price:price2.value, description:description2.value, stock:stock2.value, type_supplier:type_supplier2.value, brand:update_brand2, department:update_department2, code:code2.value, product_id:producto2}, {'Content-Type':'application/json'}).then((data)=>{
                            console.log(data)
                            alert("Producto editado con exito")
                          }).then(()=> { jQuery('#update_modal').modal('hide') })
                        });
                        //$('trigger_message_modal').click();
                        jQuery('#update_modal').modal(focus)
                        first_update = true;
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



  var default_select = document.createElement('option')
  default_select.setAttribute('value', '')
  default_select.innerHTML = '-elegir opción-'
  xhr.get('./stuff/get_brands_and_departments',{},{}).then((data)=> {
    console.log(data);
      for (var i=0; i<data.brands.length; i++) {
        var brand_option = document.createElement("option");
        brand_option.value = data.brands[i].name;
        brand_option.innerHTML = data.brands[i].name;
        $('brand_select').appendChild(brand_option);
      }
      for (var i=0; i<data.departments.length; i++) {
          var department_option = document.createElement("option");
          department_option.value = data.departments[i].name;
          department_option.innerHTML = data.departments[i].name;
          $('department_select').appendChild(department_option);
      }


        //$('update_brand_select').innerHTML = "";
        $('update_brand_select').appendChild(default_select);

      for (var i=0; i<data.brands.length; i++) {
        var update_brand_option = document.createElement("option");
        update_brand_option.value = data.brands[i].name;
        update_brand_option.innerHTML = data.brands[i].name
        $('update_brand_select').appendChild(update_brand_option);
        console.log($('update_brand_select'))
      }

        $('update_department_select').innerHTML = "";
        $('update_department_select').appendChild(default_select);
      for (var i=0; i<data.departments.length; i++) {
        var update_department_option = document.createElement("option");
        update_department_option.value = data.departments[i].name;
        update_department_option.innerHTML = data.departments[i].name;
        $('update_department_select').appendChild(update_department_option);
      }

  });
}



function second_function() {
  let xhr = new XHR();
  //$('department_input_group').style.display = 'block';
  $('department_div').style.display = 'block';
  $('department_h4').style.display = 'block';
  $('show2').style.display = 'block';
  //$('brand_input_group').style.display = 'none';
  //$('show').style.display = 'none';
  //$('brand').style.display = 'none';
  var b = $('brand_search_select').value;
  xhr.get(`./product/departments_by_brand/${b}`,{},{}).then((data)=> {
    for (var i=0; i<data.departments.length; i++) {
      var department_option = document.createElement("option");
      console.log(data.departments[i].department)
      department_option.value = data.departments[i].department;
      department_option.innerHTML = data.departments[i].department;
      $('department_search_select').appendChild(department_option);
    }

  });
}


stuff = () => {
  fetch('./stuff/get_brands_and_departments')
    .then(response => response.json())
    .then(data => {
      for (var i in data.brands) {
        var brand = document.createElement("option");
        brand.value = data.brands[i].name;
        brand.innerHTML = data.brands[i].name;
        $('brand_search_select').appendChild(brand);
      }
    })                                         
}


stuff();
$('show').addEventListener('click', load_products_by_brands)
$('show2').addEventListener('click', load_products_by_departments)
