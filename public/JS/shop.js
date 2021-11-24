//Use to load certain buttons/functionalities while page is still loading
var windowWidth1 = document.documentElement.clientWidth
var isCart = false
if(document.readyState == 'loading') {
  hideCart()
  document.addEventListener('DOMContentLoaded', ready)
} else {
  hideCart()
  ready()
}
var cartCount = 0

var closeButton = document.getElementById('close-btn')
  closeButton.addEventListener('click', function() {
  hideCart()
})

var cartButton = document.getElementById('cart-icon-btn')
cartButton.addEventListener('click', function() {
  showCart()
})

function hideCart() {
  var cartContainer = document.getElementById('cart')
  cartContainer.style.display = 'none'
  var shoeContainer = document.getElementById('shoes')
  shoeContainer.style.width = '90%'
  var bagBtn = document.getElementById('cart-icon-btn')
  bagBtn.style.opacity = '1'
  getHeight()
  getHeightPicture()
  isCart = false
}

function showCart() {
  var cartContainer = document.getElementById('cart')
  cartContainer.style.display = 'block'
  cartContainer.style.animationName = 'slideOut';
  var shoeContainer = document.getElementById('shoes')
  shoeContainer.style.width = '70%'
  var bagBtn = document.getElementById('cart-icon-btn')
  bagBtn.style.opacity = '0'
  getHeight()
  getHeightPicture()
  isCart = true
}

function ready() {
  var removeBtns = document.getElementsByClassName("remove-btn");

  for(var i = 0; i < removeBtns.length; i++) {
    var button = removeBtns[i]
    button.addEventListener("click", removeCartItem)
  }

}

function checkCartItems() {
  var cartItems = document.getElementsByClassName('cart-items')
  if(cartItems.length == 0) {
    hideCart()
  }
}

function removeCartItem(event) {
  var buttonClicked = event.target
  buttonClicked.parentElement.parentElement.remove();
  var btnText = document.getElementById('cart-icon-btn').innerText
  btnText.replace(cartCount, cartCount - 1)
  cartCount--
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
    showCart()
    addItemToCart(title, price)
    cartCount++
    var btnText = document.getElementById('cart-icon-btn')
    var targetValue = cartCount - 1
    console.log(targetValue.toString())
    btnText.innerText.replace(targetValue.toString(), cartCount.toString())
    addIdToList()
    updateCartTotal()
    ready()
  })
}

var purchaseAbleItemsTotal

function addIdToList() {
  shopItem = button.parentElement.parentElement.id
  if(shopItem == 'AJ1SF') {
    purchaseAbleItemsTotal += 21999
  } else if(shopItem == 'AJ1PT') {

  }
}

function addItemToCart(title, price) {
  var cartRow = document.createElement("div")
  var cartItems = document.getElementsByClassName("cart-items")[0]
  var cartItemsNames = cartItems.getElementsByClassName("cart-title")
  for(var i = 0; i < cartItemsNames.length; i++) {
    if(cartItemsNames[i].innerText == title) {
      alert("Item already in cart")
      return
    }
  }
  var cartRowContents = `
  <div class="item-container row">
    <div class="col-lg-5">
      <p class="cart-title shoe-name">${title}</p>
    </div>
    <div class="col-lg-3">
      <p class="cart-title price">${price}</p>
    </div>
    <div class="col-lg-4">
      <button class="remove-btn" style="height: auto; width: 100%; font-size: .6rem; text-align: center;">Remove</button>
    </div>
    <hr style="border-color: white; width: 95%;"/>
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
  if(total == 0) {
    hideCart()
  }
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
// var btnContainer = document.getElementById("btnContainer");
// var btns = btnContainer.getElementsByClassName('btn');
// for (var i = 0; i < btns.length; i++) {
//   btns[i].addEventListener("click", function(){
//     var current = document.getElementsByClassName("active");
//     current[0].className = current[0].className.replace(" active", "");
//     this.className += " active";
//   });
// }

// var dropdownButton = document.getElementById("ddBtn");
// dropdownButton.addEventListener("click", function() {
//   var list = this.nextElementSibling;
//   if(list.style.display == "block") {
//     list.style.display = "none";
//   } else {
//     list.style.display = "block";
//   }
//   list.className.split(" ");
//   list.className += "animate";
// }) 

var btnContainer2 = document.getElementById("side-nav-id");
var btns2 = btnContainer2.getElementsByClassName('btn');
for (var i = 0; i < btns2.length; i++) {
  btns2[i].addEventListener("click", function(){
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

var dropdownButton2 = document.getElementsByClassName("ddBtn");
for(var i = 0; i < dropdownButton2.length; i++) {
  dropdownButton2[i].addEventListener("click", function() {
    var list = this.nextElementSibling;
    if(list.style.display == "block") {
      list.style.display = "none";
    } else {
      list.style.display = "block";
    }
    list.className.split(" ");
    list.className += "animate";
  }) 
}



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


// window.addEventListener('load', changeSideNavWidth)
// window.addEventListener('resize', changeSideNavWidth)

// function changeSideNavWidth() {
//   var windowWidth = document.documentElement.clientWidth
//   var sideNav = document.getElementById('side-nav-id')
//   var shoeContainer = document.getElementById('shoes')
//   if(windowWidth < 1200) {
//     sideNav.style.width = '0'
//     sideNav.style.opacity = '0'
//     shoeContainer.style.width = '100%'
//     shoeContainer.style.marginLeft = 0
//   } else {
//     sideNav.style.width = '10%'
//     sideNav.style.opacity = '1'
//     shoeContainer.style.width = '90%'
//     shoeContainer.style.marginLeft = '10%'
//   }
// }

/*Payment Things*/

var button = document.getElementById("cont-to-checkout")
var cont = true
button.addEventListener("click", function() {
  var purchaseItems = document.getElementsByClassName('shoe-name')
  var itemPrice = document.getElementsByClassName('price')
  var total = 0
  for(var i = 0; i < purchaseItems.length; i++) {
    if(purchaseItems[i].innerText == 'Jordan 1 High Seafoam' && itemPrice[i].innerText == '$229.99') {
      cont = true
      total += 229.99
    } else if(purchaseItems[i].innerText == 'Jordan 1 High Prototype' && itemPrice[i].innerText == '$209.99') {
      cont = true
      total += 209.99
    } else if(purchaseItems[i].innerText == 'Jordan 5 Retro Shattered Backboard' && itemPrice[i].innerText == '$199.99') {
      cont = true
      total += 199.99
    } else if(purchaseItems[i].innerText == 'Jordan 1 Low Team Red' && itemPrice[i].innerText == '$149.99') {
      cont = true
      total += 149.99
    } else if(purchaseItems[i].innerText == 'Jordan 1 Low White Grey Black' && itemPrice[i].innerText == '$149.99') {
      cont = true
      total += 149.99
    } else if(purchaseItems[i].innerText == 'Blazer Low X Sacai British Tan' && itemPrice[i].innerText == '$139.99') {
      cont = true
      total += 139.99
    } else if(purchaseItems[i].innerText == 'Aime Leon Dore New Balance 550 Oxford Grey' && itemPrice[i].innerText == '$219.99') {
      cont = true
      total += 219.99
    } else if(purchaseItems[i].innerText == 'Yeezy Boost 350 V2 Mx Oat' && itemPrice[i].innerText == '$289.99') {
      cont = true
      total += 289.99
    } else if(purchaseItems[i].innerText == 'Dunk Mid X Social Status Strawberry Milk' && itemPrice[i].innerText == '$219.99') {
      cont = true
      total += 219.99
    } else if(purchaseItems[i].innerText == 'Nike X Undefeated Air Force 1' && itemPrice[i].innerText == '$139.99') {
      cont = true
      total += 139.99
    } else if(purchaseItems[i].innerText == 'Air Force 1 X Space Jam' && itemPrice[i].innerText == '$159.99') {
      cont = true
      total += 159.99
    } else if(purchaseItems[i].innerText == 'Jordan 4 Tour Yellow' && itemPrice[i].innerText == '$299.99') {
      cont = true
      total += 299.99
    } else if(purchaseItems[i].innerText == 'Jordan 11 Cool Grey' && itemPrice[i].innerText == '$379.99') {
      cont = true
      total += 379.99
    } else if(purchaseItems[i].innerText == 'Jordan 1 Low Mocha' && itemPrice[i].innerText == '$169.99') {
      cont = true
      total += 169.99
    } else if(purchaseItems[i].innerText == 'Aime Leon Dore New Balance 993' && itemPrice[i].innerText == '$339.99') {
      cont = true
      total += 339.99
    } else if(purchaseItems[i].innerText == 'Jordan 1 High Tokyo Biohack' && itemPrice[i].innerText == '$299.99') {
      cont = true
      total += 299.99
    } else {
      cont = false
      alert('Price was changed! Please refresh your page and try again.')
    }
  }
  if(cont) {
    var items = document.getElementsByClassName("item-container")
    button.addEventListener("click", () => {
      var regex  = /^\d+(?:\.\d{0,2})$/;
      var numStr = total;
      var total2 = total*100
      if (regex.test(numStr) || total2 % 1 == 0) {
        fetch('/create-checkout-session', {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            items: [
              {id: 16, quantity: 1, priceincents: Math.trunc(total2)}
            ],
          }),
        })
        .then(res => {
          if (res.ok) return res.json()
          return res.json().then(json => Promise.reject(json))
        })
        .then(({ url }) => {
          console.log(url)
          window.location = url
        })
        .catch(e => {
          console.error(e.error)
        })
      } else {
        alert("Please enter a valid dollar amount to submit a custom donation")
      }
  })
  }
  
  
})
