//Used for index.html
if(document.URL.includes('index.html')) {
  window.addEventListener('load', getHeightPicture)
  window.addEventListener('resize', getHeightPicture)

  function getHeightPicture() {
    var heightElementImg = document.getElementById("imgHeightModel");
    var heightImg = heightElementImg.offsetHeight;
    console.log(heightImg);
    var imgTitles = document.getElementsByClassName("shop-pics");
    for(var i = 0; i < imgTitles.length; i++) {
      if(i != 1) {
        imgTitles.item(i).style.height = heightImg;
        console.log("worked");
      }
    }
  }

  window.addEventListener('load', changeDivWidth2)
  window.addEventListener('resize', changeDivWidth2)

  var sideNavigation2 = document.getElementById('cart')
  function changeDivWidth2() {
    console.log('worked')
    var width = document.documentElement.clientWidth 
    width = (8 / width) * 5000
    var newWidth = parseInt(width).toString() + '%'
    console.log(newWidth)
    sideNavigation2.style.setProperty('--w', newWidth)

  }

  window.addEventListener('load', changeWidth);
  window.addEventListener("resize", changeWidth);

  function changeWidth() {
    var btnWidth = document.getElementById('cart-icon-btn')
    var widthBtn = btnWidth.offsetWidth
    var btnWidth2 = document.getElementById('no-disply')
    btnWidth2.style.width = widthBtn
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
    sessionStorage.setItem('total', total)
  }
  var isCart = false
  ready()
  var selectedStyle = ''
  var nikeBtn = document.getElementById('Nike')
  nikeBtn.addEventListener('click', function () {
    selectedStyle = 'nike'
    sessionStorage.setItem('style', selectedStyle)
    window.location = 'shop.html'
  })
  var jordanBtn = document.getElementById('Jordan')
  jordanBtn.addEventListener('click', function () {
    selectedStyle = 'jordan'
    sessionStorage.setItem('style', selectedStyle)
    window.location = 'shop.html'
  })
  var yzyBtn = document.getElementById('Yeezy')
  yzyBtn.addEventListener('click', function () {
    selectedStyle = 'yeezy'
    sessionStorage.setItem('style', selectedStyle)
    window.location = 'shop.html'
  })
  sessionStorage.setItem('isIndex', '0')

  var itemsInCart = 0;
  var incrementer = 0
  var cartContainerItems = document.getElementById('cart-icon-btn')
  console.log(sessionStorage.getItem('cartItems'))
for(var l = 1; l <= sessionStorage.getItem('cartItems'); l++) {
  var total2 = sessionStorage.getItem('total')
  var totalAmount = document.getElementById("total")
  totalAmount.innerText = "$" + total2
  itemsInCart = sessionStorage.getItem('cartItems')
  var cartRow = document.createElement("div")
  var cartItems = document.getElementsByClassName("cart-items")[0]
  var key = 'cart' + l.toString()
  console.log(key)
  cartRowContents = sessionStorage.getItem(key)
  console.log(cartRowContents)
  cartRow.innerHTML = cartRowContents
  cartItems.append(cartRow)
  var replaceValue2 = itemsInCart
  var newString;
  newString = cartContainerItems.innerText.replace('0', replaceValue2.toString())
  cartContainerItems.innerHTML = newString + '<i class="fas fa-shopping-bag"></i>'
  
}

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
  // var shoeContainer = document.getElementById('shoes')
  // shoeContainer.style.width = '90%'
  // shoeContainer.style.float = ''
  // var bottomCont = document.getElementById('bottom-cont')
  // bottomCont.style.margin = 'auto'
  // var topCont = document.getElementById('top')
  // topCont.style.width = '100%'
  // topCont.style.float = ''
  var bagBtn = document.getElementById('cart-icon-btn')
  bagBtn.style.opacity = '1'
  isCart = false
}

function showCart() {
  var cartContainer = document.getElementById('cart')
  cartContainer.style.display = 'block'
  cartContainer.style.animationName = 'slideOut';
  // var shoeContainer = document.getElementById('shoes')
  // shoeContainer.style.width = '80%'
  // shoeContainer.style.float = 'left'
  // var bottomCont = document.getElementById('bottom-cont')
  // bottomCont.style.margin = '0'
  // var topCont = document.getElementById('top')
  // topCont.style.width = '80%'
  // topCont.style.float = 'left'
  var bagBtn = document.getElementById('cart-icon-btn')
  bagBtn.style.opacity = '0'
  isCart = true
}

function ready() {
  var removeBtns = document.getElementsByClassName("remove-btn");
  console.log('worked')
  console.log(removeBtns.length)
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
  console.log(buttonClicked.parentElement.parentElement)
  var title = buttonClicked.parentElement.parentElement.getElementsByClassName('shoe-name')[0].innerText
  var itemKey = sessionStorage.getItem(title)
  var index = sessionStorage.getItem(itemKey + 'index')
  console.log(index)
  itemsInCart--
  console.log(itemsInCart)
  for(var r = parseInt(index); r <= itemsInCart; r++) {
    var key1 = 'cart' + (r+1).toString()
    console.log(key1)
    if(sessionStorage.getItem(key1) != null) {
      var newKey = key1.replace((r+1).toString(), (r).toString())
      var keyContents = sessionStorage.getItem(key1)
      console.log(keyContents)
      sessionStorage.setItem(newKey, keyContents)
      console.log(newKey)
      console.log(sessionStorage.getItem(newKey))
    }
  }

  var newString;
  var replaceValue = itemsInCart + 1
  newString = cartContainerItems.innerText.replace(replaceValue.toString(), itemsInCart.toString())
  cartContainerItems.innerHTML = newString + '<i class="fas fa-shopping-bag"></i>'
  sessionStorage.setItem('cartItems', itemsInCart)
  updateCartTotal();
}
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
    } else if(purchaseItems[i].innerText == 'Off-White Dunk Low University Red' && itemPrice[i].innerText == '$799.99') {
      cont = true
      total += 219.99
    } else if(purchaseItems[i].innerText == 'Yeezy Boost 350 V2 Mx Oat' && itemPrice[i].innerText == '$289.99') {
      cont = true
      total += 289.99
    } else if(purchaseItems[i].innerText == 'Dunk Mid X Social Status Strawberry Milk' && itemPrice[i].innerText == '$219.99') {
      cont = true
      total += 219.99
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
    } else if(purchaseItems[i].innerText == 'A Ma Maniere Jordan 1 High' && itemPrice[i].innerText == '$499.99') {
      cont = true
      total += 299.99
    }else if(purchaseItems[i].innerText == 'Jordan 1 High Bordaeux' && itemPrice[i].innerText == '$219.99') {
      cont = true
      total += 299.99
    }else if(purchaseItems[i].innerText == 'Dunk High Black White' && itemPrice[i].innerText == '$169.99') {
      cont = true
      total += 299.99
    }else if(purchaseItems[i].innerText == 'Jordan 1 Low OG Starfish' && itemPrice[i].innerText == '$199.99') {
      cont = true
      total += 299.99
    } else if(purchaseItems[i].innerText == 'Dunk Low NY vs NY' && itemPrice[i].innerText == '$299.99') {
      cont = true
      total += 299.99
    } else if(purchaseItems[i].innerText == 'Nike X Sacai LDWaffle' && itemPrice[i].innerText == '$499.99') {
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
        fetch('/create-checkout-session1', {
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
ready()
} else {

var itemsInCart = 0;
var incrementer = 0
var cartContainerItems = document.getElementById('cart-icon-btn')
console.log(sessionStorage.getItem('cartItems'))
for(var l = 1; l <= sessionStorage.getItem('cartItems'); l++) {
  var total2 = sessionStorage.getItem('total')
  var totalAmount = document.getElementById("total")
  totalAmount.innerText = "$" + total2
  itemsInCart = sessionStorage.getItem('cartItems')
  var cartRow = document.createElement("div")
  var cartItems = document.getElementsByClassName("cart-items")[0]
  var key = 'cart' + l.toString()
  console.log(key)
  cartRowContents = sessionStorage.getItem(key)
  console.log(cartRowContents)
  cartRow.innerHTML = cartRowContents
  cartItems.append(cartRow)
  var replaceValue2 = itemsInCart
  var newString;
  newString = cartContainerItems.innerText.replace('0', replaceValue2.toString())
  cartContainerItems.innerHTML = newString + '<i class="fas fa-shopping-bag"></i>'
  
}



//-----------------------------------


window.addEventListener('load', changeDivWidth)
window.addEventListener('resize', changeDivWidth)

var sideNavigation = document.getElementById('side-nav-id')
function changeDivWidth() {
  console.log('worked')
  var width = document.documentElement.clientWidth 
  width = (8 / width) * 2000
  var newWidth = parseInt(width).toString() + '%'
  console.log(newWidth)
  sideNavigation.style.setProperty('--w', newWidth)

}

window.addEventListener('load', changeDivWidth2)
window.addEventListener('resize', changeDivWidth2)

var sideNavigation2 = document.getElementById('cart')
function changeDivWidth2() {
  console.log('worked')
  var width = document.documentElement.clientWidth 
  width = (8 / width) * 5000
  var newWidth = parseInt(width).toString() + '%'
  console.log(newWidth)
  sideNavigation2.style.setProperty('--w', newWidth)

}

var windowWidth1 = document.documentElement.clientWidth
var currentItems;
var clicks = 1

var showFilter = document.getElementsByClassName('fltr-btn')[0]
var filterContainer = document.getElementById('side-nav-id')
var closeBtn = document.getElementById('close-btn2')
closeBtn.addEventListener('click', function() {
  filterContainer.style.display = 'none'
  showFilter.style.display = 'block'
  clicks++
})
showFilter.addEventListener('click', function () {
  if(clicks % 2 != 0) {
    filterContainer.style.display = 'block'
    showFilter.style.display = 'none'
    filterContainer.style.animationName = 'slideOut'
    scrollToTop()
  } else {
    filterContainer.style.display = 'none'
    showFilter.style.display = 'block'

  }
  clicks++
})
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
  // var shoeContainer = document.getElementById('shoes')
  // shoeContainer.style.width = '90%'
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
  // var shoeContainer = document.getElementById('shoes')
  // shoeContainer.style.width = '70%'
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
  console.log(buttonClicked.parentElement.parentElement)
  var title = buttonClicked.parentElement.parentElement.getElementsByClassName('shoe-name')[0].innerText
  var itemKey = sessionStorage.getItem(title)
  var index = sessionStorage.getItem(itemKey + 'index')
  console.log(index)
  itemsInCart--
  console.log(itemsInCart)
  for(var r = parseInt(index); r <= itemsInCart; r++) {
    var key1 = 'cart' + (r+1).toString()
    console.log(key1)
    if(sessionStorage.getItem(key1) != null) {
      var newKey = key1.replace((r+1).toString(), (r).toString())
      var keyContents = sessionStorage.getItem(key1)
      console.log(keyContents)
      sessionStorage.setItem(newKey, keyContents)
      console.log(newKey)
      console.log(sessionStorage.getItem(newKey))
    }
  }

  var newString;
  var replaceValue = itemsInCart + 1
  newString = cartContainerItems.innerText.replace(replaceValue.toString(), itemsInCart.toString())
  cartContainerItems.innerHTML = newString + '<i class="fas fa-shopping-bag"></i>'
  sessionStorage.setItem('cartItems', itemsInCart)
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
    var size1 = shopPrice.getElementsByClassName("size-select")[0]
    var size = size1.options[size1.selectedIndex].value
    if(size != "Select Size") {
      console.log(size)
      var imgSrc = shopItem.getElementsByClassName("shop-img")[0].src
      console.log(title + " " + price)
      showCart()
      addItemToCart(title, price, size)
      cartCount++
      var btnText = document.getElementById('cart-icon-btn')
      var targetValue = cartCount - 1
      console.log(targetValue.toString())
      btnText.innerText.replace(targetValue.toString(), cartCount.toString())
      addIdToList()
      updateCartTotal()
      ready()
      scrollToTop()
    } else {
      alert('please select size')
    }
  })
}

function scrollToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

var purchaseAbleItemsTotal

function addIdToList() {
  shopItem = button.parentElement.parentElement.id
  if(shopItem == 'AJ1SF') {
    purchaseAbleItemsTotal += 21999
  } else if(shopItem == 'AJ1PT') {

  }
}

function addItemToCart(title, price, size) {
  if(size == "Select Size") {
    alert('please select size')
  } else {
    console.log(size)
    var cartRow = document.createElement("div")
    var cartItems = document.getElementsByClassName("cart-items")[0]
    var cartItemsNames = cartItems.getElementsByClassName("shoe-name")
    if(itemsInCart != 0) var cartItemsSizes = document.getElementsByClassName("size")
    // console.log(cartItemsSizes.innerText)
    for(var i = 0; i < itemsInCart; i++) {
      console.log(cartItemsSizes[i].innerText)
      console.log(cartItemsNames[i])
      console.log('Size: ' + size.toString())
      if(cartItemsNames[i].innerText == title && cartItemsSizes[i].innerText == 'Size: ' + size.toString()) {
        alert("Item already in cart")
        return
      }
    }
    var cartRowContents = `
    <div class="item-container row">
      <div class="col-lg-3">
        <p class="cart-title shoe-name">${title}</p>
      </div>
      <div class="col-lg-3">
        <p class="cart-title price">${price}</p>
      </div>
      <div class="col-lg-3">
        <p class="cart-title size" style="margin-left: 5px;">Size: ${size}</p>
      </div>
      <div class="col-lg-3">
        <button class="remove-btn" style="height: auto; width: 100%; font-size: .6rem; text-align: center;">Remove</button>
      </div>
      <hr style="border-color: white; width: 95%;"/>
    </div>
    
    `
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    var replaceValue2 = parseInt(itemsInCart) + 1 
    console.log(replaceValue2)
    console.log(itemsInCart.toString())
    var newString;
    newString = cartContainerItems.innerText.replace(itemsInCart.toString(), replaceValue2.toString())
    cartContainerItems.innerHTML = newString + '<i class="fas fa-shopping-bag"></i>'
    itemsInCart++;
    var num = itemsInCart
    var key = 'cart' + num.toString()
    var indexKey = 'cart' + num.toString() + 'index'
    sessionStorage.setItem(key, cartRowContents)
    sessionStorage.setItem('cartItems', itemsInCart)
    sessionStorage.setItem(title, key)
    sessionStorage.setItem(indexKey, itemsInCart)
  }
  
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
  sessionStorage.setItem('total', total)
}

var appliedFilters = document.getElementById('appliedFilters')
var previousType = ''
var previousName = ''
let classArray = new Array
let cArray = new Map ([
  ['style', ''],
  ['color', ''],
  ['sizing', '']
])
if(sessionStorage.getItem('style') == null || sessionStorage.style == '') {
  filterSelection("all", 'all')
} else {
  console.log(sessionStorage.getItem('style'))
  filterSelection(sessionStorage.getItem('style'), 'style')
}
function filterSelection(c, type) {
  var x, i, num;
  var alreadyPressed = false
  x = document.getElementsByClassName("imgDiv");
  if (c == "all") {
    appliedFilters.innerText = "Applied Filters: "
    c = ''
    cArray = new Map([
      ['style', ''],
      ['color', ''],
      ['sizing', '']
    ])
    for (i = 0; i < x.length; i++) {
      removeClass(x[i], "show");
      if (x[i].className.indexOf(c) > -1) addClass(x[i], "show");
    }
    previousType = ''
    previousName = ''
  } else {
    num = 0
    // console.log(previousType)
    // previousFilter = cArray.get(previousType)
    var num, style = false, color = false, sizing = false
    cArray.set(type, c)
    // if(previousType == type) {
    //   appliedFilters.innerText.replace(previousFilter, cArray.get(type))
    // }
    for(var i = 0; i < x.length; i++) {
      var dontAdd = false
      console.log(cArray.get('style'))
      if(cArray.get('style') != '') {
        style = true
        if(x[i].className.indexOf(cArray.get('style')) > -1 && dontAdd == false) {
         addClass(x[i], 'show')
        } else {
          dontAdd = true
          removeClass(x[i], 'show')
        }
      }
      if(cArray.get('color') != '') {
        color = true
        if(x[i].className.indexOf(cArray.get('color')) > -1 && dontAdd == false) {
          addClass(x[i], 'show')
        } else {
          dontAdd = true
          removeClass(x[i], 'show')
        }
      } 
      if(cArray.get('sizing') != '') {
        sizing = true
        if(x[i].className.indexOf(cArray.get('sizing')) > -1 && dontAdd == false) {
          addClass(x[i], 'show')
        } else {
          dontAdd = true
          removeClass(x[i], 'show')
        }
      }
      
    }

    if(type == previousType) {
      var newFilter = appliedFilters.innerText.replace(previousName, cArray.get(type))
      appliedFilters.innerText = newFilter
    } else {
      console.log('false')
      appliedFilters.innerText += ' ' + cArray.get(type)
    }
    previousType = type
    previousName = cArray.get(type)
    // if(classArray.length == 0) {
    //   x = document.getElementsByClassName('imgDiv')
    // } else {
    //   x = document.getElementsByClassName('show')
    // }
    // console.log(x)
    // for(var i = 0; i < classArray.length; i++) {
    //   if(classArray[i] == type) {
    //     alreadyPressed = true
    //   }
    // }
    // console.log(alreadyPressed)
    // console.log(c)
    // if(alreadyPressed) {
    //   for (i = 0; i < x.length; i++) {
    //     if (x[i].className.indexOf(c) > -1) {
    //       console.log('true ' + x[i].className)
    //       addClass(x[i], 'show')
    //     } else {
    //       removeClass(x[i], 'show')
    //     }
    //   }
    // } else {
    //   for (i = 0; i < x.length; i++) {
    //     if (x[i].className.indexOf(c) > -1) {
    //       console.log(x[i].className.indexOf(c))
    //     } else {
    //       removeClass(x[i], "show")
    //     }
    //   }
    // }
    // classArray.push(type)
    
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


var dropdownButton2 = document.getElementsByClassName("ddBtn");
for(var i = 0; i < dropdownButton2.length; i++) {
  dropdownButton2[i].addEventListener("click", function() {
    var list = this.nextElementSibling;
    var index = this
    if(list.style.display == "block") {
      var changeArrow = index.innerHTML.replace('<i class="fas fa-caret-up" aria-hidden="true"></i>', '<i class="fas fa-caret-down" aria-hidden="true"></i>')
      index.innerHTML = changeArrow
      list.style.display = "none";
    } else {
      var changeArrow = index.innerHTML.replace('<i class="fas fa-caret-down" aria-hidden="true"></i>', '<i class="fas fa-caret-up" aria-hidden="true"></i>')
      index.innerHTML = changeArrow
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

window.addEventListener('load', changeWidth);
window.addEventListener("resize", changeWidth);

function changeWidth() {
  var btnWidth = document.getElementById('cart-icon-btn')
  var widthBtn = btnWidth.offsetWidth
  var btnWidth2 = document.getElementById('no-disply')
  btnWidth2.style.width = widthBtn
}


function getHeightPicture() {
  var heightElementImg = document.getElementById("imgHeightModel");
  var heightImg = heightElementImg.offsetHeight;
  console.log(heightImg);
  var imgTitles = document.getElementsByClassName("img-different");
  var parentEle = document.getElementById('exDiv')
  console.log(parentEle.style.display)
  if(parentEle.style.display != '') {
    for(var i = 0; i < imgTitles.length; i++) {
      imgTitles.item(i).style.height = heightImg;
      console.log("worked");
    }
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
    } else if(purchaseItems[i].innerText == 'Off-White Dunk Low University Red' && itemPrice[i].innerText == '$799.99') {
      cont = true
      total += 219.99
    } else if(purchaseItems[i].innerText == 'Yeezy Boost 350 V2 Mx Oat' && itemPrice[i].innerText == '$289.99') {
      cont = true
      total += 289.99
    } else if(purchaseItems[i].innerText == 'Dunk Mid X Social Status Strawberry Milk' && itemPrice[i].innerText == '$219.99') {
      cont = true
      total += 219.99
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
    } else if(purchaseItems[i].innerText == 'A Ma Maniere Jordan 1 High' && itemPrice[i].innerText == '$499.99') {
      cont = true
      total += 299.99
    }else if(purchaseItems[i].innerText == 'Jordan 1 High Bordaeux' && itemPrice[i].innerText == '$219.99') {
      cont = true
      total += 299.99
    }else if(purchaseItems[i].innerText == 'Dunk High Black White' && itemPrice[i].innerText == '$169.99') {
      cont = true
      total += 299.99
    }else if(purchaseItems[i].innerText == 'Jordan 1 Low OG Starfish' && itemPrice[i].innerText == '$199.99') {
      cont = true
      total += 299.99
    } else if(purchaseItems[i].innerText == 'Dunk Low NY vs NY' && itemPrice[i].innerText == '$299.99') {
      cont = true
      total += 299.99
    } else if(purchaseItems[i].innerText == 'Nike X Sacai LDWaffle' && itemPrice[i].innerText == '$499.99') {
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
sessionStorage.setItem('style', '')
var k = 0;
var txt = 'Find Your Pair';
var speed = 50;

function typeWriter() {
  if (k < txt.length) {
    document.getElementById("title").innerHTML += txt.charAt(k);
    k++;
    setTimeout(typeWriter, speed);
  }
}

document.addEventListener('load', typeWriter())
}
