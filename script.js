//variables

let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mood = "create";
let globalI;
//get total

function calcTaxes(taxes, price) {
  let pracantage = +taxes / 100;
  return pracantage * +price;
}
function getTotal() {
  if (price.value != "") {
    let results =
      +price.value + calcTaxes(taxes.value, price.value) + -+discount.value;
    total.innerHTML = results;
    total.style.background = "#040";
  } else {
    total.innerHTML = "";
    total.style.background = " #a00d02";
  }
}

//create product

let dataProduct;
if (localStorage.product != null) {
  dataProduct = JSON.parse(localStorage.product);
} else {
  dataProduct = [];
}

submit.onclick = function () {
  let newProduct = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    newProduct.count < 100
  ) {
    if (mood === "create") {
      if (newProduct.count > 1) {
        for (let i = 0; i < newProduct.count; i++) {
          dataProduct.push(newProduct);
        }
      } else {
        dataProduct.push(newProduct);
      }
    } else {
      dataProduct[globalI] = newProduct;
      mood = "create";
      submit.innerHTML = "create";
      count.style.display = "block";
    }
    clearData();
  }

  //save in local storage
  localStorage.setItem("product", JSON.stringify(dataProduct));

  showData();
};

//clear inputs

function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  discount.value = "";
  count.value = "";
  category.value = "";
  total.innerHTML = "";
}

//read

function showData() {
  getTotal();
  let table = "";
  for (let i = 0; i < dataProduct.length; i++) {
    table += `<tr>
    <td>${i + 1}</td>
    <td>${dataProduct[i].title}</td>
    <td>${dataProduct[i].price}</td>
    <td>${dataProduct[i].taxes}</td>
    <td>${dataProduct[i].discount}</td>
    <td>${dataProduct[i].total}</td>
    <td>${dataProduct[i].category}</td>
    <td><button onclick="updateData(${i})" id="update">update</button></td> 
    <td><button onClick="deleteData(${i})" id="delete">delete</button></td>
</tr>`;
  }
  document.getElementById("tbody").innerHTML = table;
  let btnDelete = document.getElementById("delete-all");
  if (dataProduct.length > 0) {
    btnDelete.innerHTML = `<button onclick= "deleteAll()"> Delete All (${dataProduct.length})</button>`;
  } else {
    btnDelete.innerHTML = "";
  }
}
showData();

//delete

function deleteData(i) {
  dataProduct.splice(i, 1);
  localStorage.product = JSON.stringify(dataProduct);
  showData();
}
function deleteAll() {
  localStorage.clear();
  dataProduct.splice(0);
  showData();
}

//update

function updateData(i) {
  title.value = dataProduct[i].title;
  taxes.value = dataProduct[i].taxes;
  price.value = dataProduct[i].price;
  discount.value = dataProduct[i].discount;
  count.style.display = "none";
  getTotal();
  category.value = dataProduct[i].category;
  submit.innerHTML = "update";
  mood = "update";
  globalI = i;
  scroll({ top: 0, behavior: "smooth" });
}

// search

function clearSearch() {
  let search = document.getElementById("search");
  search.value = "";
  showData();
}
function searchData(value) {
  let table = "";
  for (let i = 0; i < dataProduct.length; i++) {
    if (dataProduct[i].title.includes(value.toLowerCase())) {
      table += `<tr>
      <td>${i}</td>
      <td>${dataProduct[i].title}</td>
      <td>${dataProduct[i].price}</td>
      <td>${dataProduct[i].taxes}</td>
      <td>${dataProduct[i].discount}</td>
      <td>${dataProduct[i].total}</td>
      <td>${dataProduct[i].category}</td>
      <td><button onclick="updateData(${i})" id="update">update</button></td> 
      <td><button onClick="deleteData(${i})" id="delete">delete</button></td>
  </tr>`;
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
