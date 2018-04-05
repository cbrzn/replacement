function stuff() {
  var xhr = new XHR();
  xhr.get('./stuff/get_brands_and_departments',{},{}).then((data)=> {
      for (var i=0; i<data.brands.length; i++) {
        var brand = document.createElement("option");
        brand.value = data.brands[i].name;
        brand.innerHTML = data.brands[i].name;
        $('brand_search_select').appendChild(brand);
      }
  });
}

addEventListener('load', stuff);
