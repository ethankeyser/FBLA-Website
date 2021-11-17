//Use to load certain buttons/functionalities while page is still loading
if(document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready()
}

function ready() {
  var removeBtns = document.getElementsByClassName("remove-btn");

  for(var i = 0; i < removeBtns.length; i++) {
    var button = removeBtns[i]
    button.addEventListener("click", removeCartItem)
  }
}

function removeCartItem(event) {
  var buttonClicked = event.target
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

var cartButtons = document.getElementsByClassName("cart-btn");

for(var i = 0; i < cartButtons.length; i++) {
  var button = cartButtons[i];
  button.addEventListener("click", function(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var shopPrice = button.parentElement
    var title = shopItem.getElementsByClassName("shoe-title")[0].innerText
    var price = shopPrice.getElementsByClassName("shop-price")[0].innerText
    var imgSrc = shopItem.getElementsByClassName("shop-img")[0].src
    console.log(title + " " + price)
    addItemToCart(title, price)
    updateCartTotal()
    ready()
  })
}


function addItemToCart(title, price) {
  var cartRow = document.createElement("div")
  var cartItems = document.getElementsByClassName("cart-items")[0]
  var cartItemsNames = cartItems.getElementsByClassName("cart-title")
  for(var i = 0; i < cartItemsNames.length; i++) {
    if(cartItemsNames[i] == title) {
      alert("Item already in cart")
      return
    }
  }
  var cartRowContents = `
  <div class="item-container row">
    <div class="col-md-5">
      <p class="cart-title">${title}</p>
    </div>
    <div class="col-md-3">
      <p class="cart-title price">${price}</p>
    </div>
    <div class="col-md-4">
      <button class="remove-btn" style="height: auto; width: 100%; font-size: .6rem; text-align: center;">Remove</button>
    </div>
  </div>
  `
  cartRow.innerHTML = cartRowContents
  cartItems.append(cartRow)
}
function addToCart(event) {
  var button = event.target
  var shopItem = button.parentElement.parentElement
  var shopPrice = button.parentElement
  var title = shopItem.getElementsByClassName("shoe-title")[0].innerText
  var price = shopPrice.getElementsByClassName("shop-price")[0].innerText
  console.log(title + " " + price)
}



function updateCartTotal() {
  var priceElements = document.getElementsByClassName("price");
  var total = 0;
  for(var i = 0; i < priceElements.length; i++) {
    total += parseFloat(priceElements[i].innerText.replace('$', ''));
    console.log(total)
  }
  var totalAmount = document.getElementById("total");
  totalAmount.innerText = "$" + total.toString();
}

filterSelection("all")
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("imgDiv");
  if (c == "all") c = "";
  for (i = 0; i < x.length; i++) {
    removeClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) addClass(x[i], "show");
  }
}

function addClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
  }
}

function removeClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);     
    }
  }
  element.className = arr1.join(" ");
}

// Add active class to the current button (highlight it)
var btnContainer = document.getElementById("btnContainer");
var btns = btnContainer.getElementsByClassName('btn');
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function(){
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

var dropdownButton = document.getElementById("ddBtn");
dropdownButton.addEventListener("click", function() {
  var list = this.nextElementSibling;
  if(list.style.display == "block") {
    list.style.display = "none";
  } else {
    list.style.display = "block";
  }
  list.className.split(" ");
  list.className += "animate";
}) 


function getHeight() {
  var heightElement = document.getElementById("J5SB");
  var height = heightElement.offsetHeight;
  console.log(height);
  var shoeTitles = document.getElementsByClassName("shoe-title");
  for(var i = 0; i < shoeTitles.length; i++) {
    shoeTitles.item(i).style.height = height;
    console.log("worked");
  }
}

window.addEventListener('load', getHeight);
window.addEventListener("resize", getHeight);


function getHeightPicture() {
  var heightElementImg = document.getElementById("imgHeightModel");
  var heightImg = heightElementImg.offsetHeight;
  console.log(heightImg);
  var imgTitles = document.getElementsByClassName("img-different");
  for(var i = 0; i < imgTitles.length; i++) {
    imgTitles.item(i).style.height = heightImg;
    console.log("worked");
  }
}

window.addEventListener('load', getHeightPicture);
window.addEventListener("resize", getHeightPicture);
