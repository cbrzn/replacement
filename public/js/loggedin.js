let xhr = new XHR();
function $(id) {
    return document.getElementById(id);
};

function load_pictures() {
    xhr.get('./product/all',{},{}).then((data)=> {
      var img = [];
      for (var i=0; i<data.images.length; i++) {
        var images = $('images');
        var name = document.createElement("name");
        img[i] = new Image();
        img[i].setAttribute('src', data.images[i].path);
        img[i].setAttribute('id', data.images[i].id);
        img[i].setAttribute("height", "300");
        img[i].setAttribute("width", "300");
        img[i].style.padding = "60px 20px";
        name.innerHTML = data.images[i].name;
        name.setAttribute("style", "text-align:center");
        images.appendChild(img[i]);
        images.appendChild(name);
        img[i].addEventListener('click', show_product);
        }
   });
};


function show_product() {
  xhr.get(`./product/${this.id}`,{},{}).then((data) => {
    var images = $('images');
    var title = $('title');
    images.innerHTML = "";
    title.innerHTML = "Product"
    var img = document.createElement('img');
    var modify = document.createElement('button');
    var erase = document.createElement('button');
    var add_to_cart = document.createElement('button');
    var name = document.createElement('p');
    var price = document.createElement('p');
    var quantity = document.createElement('input');
    name.innerHTML = data.product.name;
    price.innerHTML = "Price: " + data.product.price;
    modify.innerHTML = "Edit";
    add_to_cart.innerHTML = "Add to cart";
    erase.innerHTML = "Delete";
    img.setAttribute('src', data.product.path);
    img.setAttribute('id', data.product.id);
    img.setAttribute("width", "620");
    img.setAttribute("height", "500");
    img.style.margin = "0 auto";
    img.style.display = "block";
    modify.style.margin = "0 auto";
    modify.style.display = "block";
    erase.style.margin = "0 auto";
    erase.style.display = "block";
    erase.setAttribute('id', 'erase');
    add_to_cart.style.margin = "0 auto";
    add_to_cart.style.display = "block";
    name.setAttribute("style", "text-align:center");
    price.setAttribute("style", "text-align:center");
    quantity.setAttribute("id", "quantity");
    quantity.setAttribute("type", "number");
    quantity.setAttribute("placeholder", "cantidad");
    quantity.style.margin = "0 auto";
    quantity.style.display = "block";
    images.appendChild(name);
    images.appendChild(price);
    images.appendChild(img);
    if (data.id !== null) {
      if (data.id === data.product.user_id) {
        images.appendChild(modify);
        images.appendChild(erase);
      }
      images.appendChild(quantity);
      images.appendChild(add_to_cart);
    }
    erase.addEventListener('click', function() {
      xhr.get(`./product/delete/${img.id}`,{},{}).then((data)=>{
        console.log(data);
        alert("Has eliminado en producto");
        window.location.href = "./index.html";
      });
    });
    modify.addEventListener('click', function() {
      $('edit').style.display = "block";
      $('images').style.display = "none";
      $('title').innerHTML = "Edit product";
      $('update').addEventListener('click', function() {
        var name = $('name').value;
        var price = $('price').value;
        xhr.post(`./product/update/${img.id}`,{name:name, price:price, id:img.id}, {'Content-Type':'application/json'}).then((data)=>{
          console.log("done");
        });
      });
    });
    add_to_cart.addEventListener('click', function() {
      var quantity = $('quantity').value;
      var total = parseInt(data.product.price) * parseInt(quantity);
      xhr.post('./cart/new', {product_id:data.product.id, product_name:data.product.name, product_path:data.product.path, product_price:data.product.price, quantity:quantity, total:total}, {'Content-Type':'application/json'}).then((data)=>{
        if (data.msg !== null) {
          alert("Producto agregado");
        }
      });
    });
  });
};
function delete_product(id) {
  xhr.get(`./product/delete/${id}`,{},{}).then((data)=>{
    console.log(data);
  });
};

function logout(){
  xhr.get('./logout',{},{}).then((data)=>{
    console.log(data);
    window.location.href = "./login.html"
  });
};

addEventListener('load', load_pictures);
