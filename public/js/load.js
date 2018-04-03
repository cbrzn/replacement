function $(id) {
    return document.getElementById(id);
};
function sendFile(){
  let xhr = new XHR();
    let formData = new FormData();
    let precio = $("precio").value;
    precio = precio.replace(/,/g , ".");
    let description = $("description").value;
    let stock = $("stock").value;
    let type_supplier = $("type_supplier").value;
    let brand = $("brand").value;
    let department = $("department").value;
    let code = $("code").value;
    formData.append('price', precio);
    formData.append('description', description);
    formData.append('stock', stock);
    formData.append('type_supplier', type_supplier);
    formData.append('brand', brand);
    formData.append('department', department);
    formData.append('code', code);
     xhr.post(`./product/create`,{price:precio, description:description, stock:stock, type_supplier:type_supplier, brand:brand, department:department, code:code},{'Content-Type':'application/json'}).then((data)=>{
       if (data.status === 200) {
          alert("Producto cargado");
          window.location.href = './upload.html';
        } else {
          alert("Error al cargar el producto")
        }
  });
};

function select() {
  let xhr = new XHR();
  $('add_stuff').style.margin = "0 auto";
  $('add_stuff').style.display = "block";
  $('show_stuff').style.margin = "0 auto";
  $('show_stuff').style.display = "block";
  xhr.get('./stuff/get_brands_and_departments',{},{}).then((data)=> {
      for (var i=0; i<data.brands.length; i++) {
        var brand = document.createElement("option");
        brand.value = data.brands[i].name;
        brand.innerHTML = data.brands[i].name;
        if (data.brands[i].name !== null) {
          $('brand').appendChild(brand);
        }
      }
      for (var i=0; i<data.departments.length; i++) {
          var department = document.createElement("option");
          department.value = data.departments[i].name;
          department.innerHTML = data.departments[i].name;
          if (data.departments[i].name !== null) {
            $('department').appendChild(department);
          }
      }

      $('add_stuff').addEventListener('click', function() {
          $('upload_form').innerHTML = "";
          $('stuff').style.display = "block";
          $('add_stuff').style.display = "none";
          var new_button = document.createElement('button');
          new_button.innerHTML = "anadir";
          new_button.setAttribute('id', 'new_add');
          $('add_btn').appendChild(new_button)
            $('new_add').addEventListener('click', function() {
              var marca = $('brand').value;
              var departamento = $('department').value;
              if (marca !== "" && departamento === "") {
                xhr.post('./stuff/add_brand',{brand:marca},{'Content-Type':'application/json'}).then((data) => {
                   if (data.status === 200) {
                     alert('Marca agregada');
                   } else {
                     alert('Error al agregar marca');
                   }
                });
              } else if (departamento !== "" && marca === "") {
                xhr.post('./stuff/add_department',{department:departamento},{'Content-Type':'application/json'}).then((data) => {
                   if (data.status === 200) {
                     alert('Departamento agregado');
                   } else {
                     alert('Error al agregar departamento');
                   }
               });
             } else if (departamento !== "" && marca !== "") {
               xhr.post('./stuff/add_department',{department:departamento},{'Content-Type':'application/json'}).then((data) => {
                 xhr.post('./stuff/add_brand',{brand:marca},{'Content-Type':'application/json'}).then((data) => {
                    if (data.status === 200) {
                      alert('Marca y departamento agregados');
                    } else {
                      alert('Error al agregar marca y departamento');
                    }
                 });
              });
             }
           });
         });

        $('show_stuff').addEventListener('click', function() {
          $('tr').innerHTML = "";
          if ($('tbdy') != null) {
            $('tbdy').remove();
          }
          $('upload_form').innerHTML = "";
          $('add_stuff').style.display = "none";
          $('show_stuff').style.display = "none";
          xhr.get('./stuff/get_brands_and_departments',{},{}).then((data) => {
                        var tbl = $('table');
                        var tbdy = document.createElement('tbody');
                        tbdy.setAttribute('id', 'tbdy')
                        for (var i=0; i < 2; i++) {
                            var tr = $('table').tHead.children[0], th = document.createElement('th');
                            switch(i) {
                              case 0:
                                th.innerHTML = 'Marca';
                              break;
                              case 1:
                                th.innerHTML = 'Departamento';
                              break;
                              }
                            tr.appendChild(th);
                            }

                            var size = data.brands.length > data.departments.length ? data.brands.length : data.departments.length;

                            for (var i = 0; i < size; i++) {
                                var tr = document.createElement('tr');
                                tr.setAttribute('id', i);
                                for (var j = 0; j < 2; j++) {
                                  var td = document.createElement('td');
                                  switch (j) {
                                    case 0:
                                      if (data.brands[i] !== undefined) {
                                        td.setAttribute("id", data.brands[i].name)
                                      }
                                      if (data.brands[i] === undefined) {
                                        td.innerHTML = "";
                                      } else {
                                        var name = data.brands[i].name;
                                        td.innerHTML = name;
                                        td.addEventListener('click', function(){
                                          var r = confirm("Segur@ que desea eliminar la marca: "+this.id)
                                          if (r == true) {
                                            xhr.get(`./stuff/delete_brand/${this.id}`,{},{}).then((data) => {
                                              alert('Marca eliminada');
                                            })
                                          }
                                        });
                                      }
                                    break;
                                    case 1:
                                      if (data.departments[i] !== undefined) {
                                        td.setAttribute("id", data.departments[i].name)
                                      }
                                      if (data.departments[i] === undefined) {
                                        td.innerHTML = "";
                                      } else {
                                        td.innerHTML = data.departments[i].name;
                                        td.addEventListener('click', function(){
                                          var r = confirm("Segur@ que desea eliminar el departamento: "+this.id)
                                          if (r == true) {
                                            xhr.get(`./stuff/delete_department/${this.id}`,{},{}).then((data) => {
                                              alert('Departamento eliminado');
                                            })
                                          }
                                        });
                                      }
                                    break;
                                  }

                                    tr.appendChild(td)
                                }
                                tbdy.appendChild(tr);
                            }
                        tbl.appendChild(tbdy);

          });
        });
      });
     };

$('sendFile').addEventListener('click',sendFile);
addEventListener('load', select);
