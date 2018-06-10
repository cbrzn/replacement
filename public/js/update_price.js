loading_brand_for_price_update = () => {
    var default_select_brand = document.createElement('option')
    default_select_brand.setAttribute('value', '')
    default_select_brand.innerHTML = '-elegir opción-' 
    var default_select_department = document.createElement('option')
    default_select_department.setAttribute('value', '')
    default_select_department.innerHTML = '-elegir opción-'
    $('brand_price').appendChild(default_select_brand);
    $('department_price').appendChild(default_select_department);

    fetch('./stuff/get_brands_and_departments')
    .then(response => response.json())
    .then(data => {
        for (var i in data.brands) {
            var brand_option = document.createElement("option");
            brand_option.value = data.brands[i].name;
            brand_option.innerHTML = data.brands[i].name;
            $('brand_price').appendChild(brand_option);
        }
        for (var i in data.brands) {
            var department_option = document.createElement("option");
            department_option.value = data.departments[i].name;
            department_option.innerHTML = data.departments[i].name;
            $('department_price').appendChild(department_option);
        }
    })
}

getting_upload_products = () => {
   const brand = $('brand_price').value
   const department =  $('department_price').value
   const porcentage = $('porcentage_update').value
   var r = confirm(`Segur@ que desea actualizar un ${porcentage}% los precios en los productos de marca = ${brand} y departamento = ${department}?`)
    if (r == true) {
        alert('SOPORTALA BOBO')
    } else {
        alert('NERO')
    }
}

$('update_prices').addEventListener('click', loading_brand_for_price_update)
$('update_price_1').addEventListener('click', getting_upload_products)      