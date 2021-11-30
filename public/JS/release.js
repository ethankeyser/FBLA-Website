var drawBtns = document.getElementsByClassName('W') 
for(var i = 0; i < drawBtns.length; i++) {
    drawBtns[i].addEventListener('click', function () {
        window.location.href = 'https://docs.google.com/forms/d/1j5y4Iow-Yir3fuXJOOp3ApVoSBNGVta1Qrq9aGJXqaM'
    })
}

var drawBtns2 = document.getElementsByClassName('M') 
for(var i = 0; i < drawBtns2.length; i++) {
    drawBtns2[i].addEventListener('click', function () {
        window.location.href = 'https://docs.google.com/forms/d/1KNcnPGbtemswqATw-Drpnou65HDNkED0gy5-41iyEg4'
    })
}


function getHeight() {
    var heightElement = document.getElementById("reference");
    var height = heightElement.offsetHeight;
    console.log(height);
    var shoeTitles = document.getElementsByClassName("title-cont");
    for(var i = 0; i < shoeTitles.length; i++) {
      shoeTitles.item(i).style.height = height;
      console.log("worked");
    }
  }
  
  window.addEventListener('load', getHeight);
  window.addEventListener("resize", getHeight);