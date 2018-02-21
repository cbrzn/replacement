let xhr = new XHR();
function $(id) {
    return document.getElementById(id);
};
function sendFile(){
    let formData = new FormData();
    let name = $("name").value;
    let price = $("price").value;
    let description = $("description").value;
    let stock = $("stock").value;
    let type_supplier = $("type_supplier").value;
    let brand = $("brand").value;
    let department = $("department").value;
    let code = $("code").value;
    let file = $("file").files[0];
    formData.append('name', name);
    formData.append('description', description);
    formData.append('stock', stock);
    formData.append('type_supplier', type_supplier);
    formData.append('brand', brand);
    formData.append('department', department);
    formData.append('code', code);
    formData.append('price', price);
    formData.append('file', file, file.name);
     xhr.post(`../file/uploadSingFile`,formData,{}).then((data)=>{
       if (data.status === 200) {
       alert("Producto cargado");
     }
  });
};


function sendFiles() {
    var formData = new FormData();
  	var files = $("files").files;
    var price = $("price").value;
    formData.append('price', price);
  	for (var i = 0; i < files.length; i++) {
  		  var file = files[i];
  		  formData.append('files[]', file, file.name);
          }
          xhr.post(`../file/uploadMultFile`,formData,{}).then((data)=>{
              console.log(data);
          });
  }


  function select() {
    xhr.get('./product/stuff',{},{}).then((data)=> {
      console.log(data.product);
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

$('sendFile').addEventListener('click',sendFile);
addEventListener('load', select);
