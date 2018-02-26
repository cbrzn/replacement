function $(id) {
    return document.getElementById(id);
};
function sendFile(){
  let xhr = new XHR();
    let formData = new FormData();
    let name = $("name").value;
    let precio = $("precio").value;
    let description = $("description").value;
    let stock = $("stock").value;
    let type_supplier = $("type_supplier").value;
    let brand = $("brand").value;
    let department = $("department").value;
    let code = $("code").value;
    let file = $("file").files[0];
    formData.append('name', name);
    formData.append('price', precio);
    formData.append('description', description);
    formData.append('stock', stock);
    formData.append('type_supplier', type_supplier);
    formData.append('brand', brand);
    formData.append('department', department);
    formData.append('code', code);
    formData.append('file', file, file.name);
     xhr.post(`../file/uploadSingFile`,formData,{}).then((data)=>{
       if (data.status === 200) {
         alert("Producto cargado");
       } else {
         alert("Error al cargar el producto")
       }
  });
};

function select() {
  let xhr = new XHR();
  $('add_stuff').style.margin = "0 auto";
  $('add_stuff').style.display = "block";
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
              if (marca === "") {
                marca = null;
              }
              if (departamento === "") {
                departamento = null;
              }
              xhr.post('./product/add_stuff',{brand:marca, department:departamento},{'Content-Type':'application/json'}).then((data) => {
                 if (data.status === 200) {
                   alert('Marca y/o departamento agregado');
                 } else {
                   alert('Error al agregar marca y/o departamento');
                 }
             });
          });
      });
  });
}

$('sendFile').addEventListener('click',sendFile);
addEventListener('load', select);
