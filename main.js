const title = document.getElementById("title");
const price = document.getElementById("price");
const tax = document.getElementById("tax");
const ads = document.getElementById("ads");
const category = document.getElementById("category");
const Description = document.getElementById("Description");
const discount = document.getElementById("discount");
const total = document.getElementById("total");
const search = document.getElementById("search");
const AddAndUpdate = document.getElementById("AddAndUpdate");
const tbody = document.getElementById("tbody");
const deleteAll = document.getElementById("deleteAll");
var product = "";
var productArray = [];
var currentIndex;

// to display product in the local storage
if (localStorage.getItem("product") != null) {
  productArray = JSON.parse(localStorage.getItem("product"));
  displayProduct(productArray);
} else {
  productArray = [];
}

//function add or update product
function getProduct() {
  if (AddAndUpdate.innerHTML.trim() == "Add Product") {
    //to test Regex
    if (testTitleInput() == true && testNumInput() == true) {
      getAddProduct();
    }
  } else {
    if (testTitleInput() == true && testNumInput() == true) {
      getUpdateProduct();
    }
  }
}

//to add the product
function getAddProduct() {
  product = {
    title: title.value,
    price: price.value,
    tax: tax.value,
    ads: ads.value,
    total: total.dataset.value || 0, // Retrieve the stored total value
    category: category.value,
    Description: Description.value,
    discount: discount.value,
  };
  productArray.push(product);

  localStorage.setItem("product", JSON.stringify(productArray));
  clearInputs();
  displayProduct(productArray);
}

//to update the product
function getUpdateProduct() {
  product = {
    title: title.value,
    price: price.value,
    tax: tax.value,
    ads: ads.value,
    category: category.value,
    Description: Description.value,
    discount: discount.value,
    total: total.dataset.value || 0,
  };
  productArray[currentIndex] = product;
  localStorage.setItem("product", JSON.stringify(productArray));
  displayProduct(productArray);
  AddAndUpdate.innerHTML = "Add Product";
  clearInputs();
}

//to clear all inputs after clicking on add/update button
function clearInputs() {
  title.value = "";
  price.value = "";
  tax.value = "";
  ads.value = "";
  total.value = "";
  category.value = "";
  Description.value = "";
  discount.value = "";
}

//to display the data on the table
function displayProduct(arr) {
  var cartona = ``;
  for (let i = 0; i < arr.length; i++) {
    cartona += ` <tr>
                    <td>${i + 1}</td>
                    <td>${arr[i].title}</td>
                    <td>${arr[i].price}</td>
                    <td>${arr[i].tax}</td>
                    <td>${arr[i].ads}</td>
                    <td>${arr[i].discount}</td>
                    <td>${arr[i].total}</td>
                    <td>${arr[i].Description}</td>
                    <td>${arr[i].category}</td>
                    <td><button class="btn" onclick= "fillInputs(${i})" >Update</button></td>
                    <td><button class="btn" onClick="deleteProduct(${i});">Delete</button></td>
                </tr>`;
  }
  tbody.innerHTML = cartona;
  deleteAll.innerHTML = `Delete All (${[arr.length]})`;
}

//to delete all the data or rows from the table
function deleteAllRows() {
  productArray = [];
  tbody.innerHTML = "";
  localStorage.clear();
  deleteAll.innerHTML = `Delete All (${[productArray.length]})`;
}

//to delete one row of index
function deleteProduct(index) {
  productArray.splice(index, 1);
  localStorage.setItem("product", JSON.stringify(productArray));
  displayProduct(productArray);
}

//to get display the data of row of index in inputs to be updated
function fillInputs(index) {
  currentIndex = index;
  title.value = productArray[index].title;
  price.value = productArray[index].price;
  tax.value = productArray[index].tax;
  ads.value = productArray[index].category;
  category.value = productArray[index].category;
  Description.value = productArray[index].Description;
  discount.value = productArray[index].discount;

  AddAndUpdate.innerHTML = "Update Product";
}

//to search on product
function searchInput(word) {
  var newArray = [];
  for (var i = 0; i < productArray.length; i++) {
    if (productArray[i].title.toLowerCase().includes(word.toLowerCase())) {
      newArray.push(productArray[i]);
    }
    displayProduct(newArray);
  }
  console.log(newArray);
}

//input validation (Regex)
function testTitleInput() {
  let Regex = /^[A-Z]{0,1}[a-z]{3,8}$/;
  if (Regex.test(title.value)) {
    title.classList.add("is-valid");
    title.classList.remove("is-invalid");
    return true;
  } else {
    title.classList.add("is-invalid");
    title.classList.remove("is-valid");
    return false;
  }
}
function testNumInput() {
  let Regex = /^[0-9]{1,}$/;
  if (Regex.test(price.value)) {
    price.classList.add("is-valid");
    price.classList.remove("is-invalid");
    return true;
  } else {
    price.classList.add("is-invalid");
    price.classList.remove("is-valid");
    return false;
  }
}

//to add total
function addTotal() {
  if (price.value != "") {
    let results = +price.value + +tax.value + +ads.value - +discount.value;
    total.dataset.value = results;
    total.innerHTML = "Total: " + results;
    total.style.background = "#040";
  } else {
    total.innerHTML = "Total:";
    total.style.background = "#bb1c1c";
  }
  localStorage.setItem("product", JSON.stringify(productArray));
}
