//#region inicializációk/deklarálások
let elements = [];
let splitted = [];
let formatted = "";
list = [];
let moda = document.getElementById("modal");
let base = "<div class='col-xxl-1 col-md-2 col-sm-4 col-12'><div class='card cards'><div class'card-body'>";
let end = "</div></div></div>";
let isbn = "";
let title = "";
let category = "";
let description = "";
let authors = "";
let pageCount = "";
let publisher = "";
let img = "";
let raw = "";
let innerHTML = "";
let innerHTMLS = [];
let innerHTMLs = [];
//#endregion

function getText() {
  // read text from URL location
  var request = new XMLHttpRequest();
  if (window.location.href.includes("index.html")) {
    url =
      window.location.href.substring(0, window.location.href.length - 10) +
      "data.txt";
  } else {
    url = window.location.href + "data.txt";
  }
  request.open("GET", url, true);
  request.send(null);
  request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
      var type = request.getResponseHeader("Content-Type");
      if (type.indexOf("text") !== 1) {
        raw = request.responseText;
      }
    }
  };
}

function workText() {
  formatted = raw.replace(/(?:\\[rn]|[\r\n]+)+/g, ";");
  splitted = formatted.split(";");
  let count = 0;
  let count2 = 0;
  let prepreData = [];
  let start = 0;
  let end = 0;
  for (let i = 0; i < splitted.length / 8; i++) {
    start = i * 8;
    end = i * 8 + 8;
    prepreData = splitted.slice(start, end);
    elements[i] = prepreData;
  }
}

function innerHTMLSetUP() {
  for (let i = 0; i < elements.length; i++) {
    for (let j = 0; j < elements[i].length; j++) {
      if (j == 0) {
        isbn = elements[i][j];
      } else if (j == 1) {
        title = elements[i][j];
      } else if (j == 2) {
        category = elements[i][j];
      } else if (j == 3) {
        description = elements[i][j];
      } else if (j == 4) {
        authors = elements[i][j];
      } else if (j == 5) {
        pageCount = elements[i][j];
      } else if (j == 6) {
        publisher = elements[i][j];
      } else if (j == 7) {
        img = elements[i][j];
      }
      else if (j == 8){
        secondImg = elements[i][j]
      }
    }

    /*if (img == null ||img == ""){
      fimg = secondImg;
    }
    else{
      fimg = img;
    }*/


    innerHTMLs = `<img onclick='ContentScreenToggler("${title}","${authors}","${publisher}","${category}","${pageCount}","${description.replace("'"," ").replace('"', " ").replace("`"," ")}","${img}",true)' class='img-fluid img-thumbnail d-block mx-auto auto-align auto-align-imgs' src='${img}" +img +"'>`;
    innerHTML = innerHTML + base + innerHTMLs + end;
  }
  modal.innerHTML = `<div class="row">${innerHTML}</div>`;
  
}

function activeLink() {
  list.forEach((item) => item.classList.remove("active"));
  this.classList.add("active");
}

function autoSizing() {
  /*  let contentScreen = document.getElementsByClassName("content-screen")[0];
  let currentTopPosition = window.scrollY;
  contentScreen.style.top = currentTopPosition + "px";*/
  let navbar = document.getElementById("navbar");
  let navbar_field = document.getElementById("navbar-field");
  let sizables = [navbar, navbar_field];
  sizables.forEach((sizable) => {
    let defaultSize = sizable.offsetWidth;
    let windowSize = window.innerWidth;
    let maximumSize = windowSize - 2 * windowSize * 0.2;
    let currentSize = defaultSize;
    sizable.style.width = maximumSize + "px";
  });
}

function autoAlign() {
  let navbar_buttons_a = Array.from(document.getElementsByClassName("lista"));
  let navbar = document.getElementById("navbar");
  let lists = document.getElementsByClassName("icon")
  let indicator = document.getElementsByClassName("indicator")[0]
  let texts = document.getElementsByClassName("text")
  let windowSize = [window.innerWidth, window.innerHeight];
  let navbar_buttons = Array.from(document.getElementsByClassName("list"));
  let imgs = Array.from(document.getElementsByClassName("auto-align-imgs"));
  let navbar_field = document.getElementById("navbar-field");
  let alignables = [navbar_buttons, navbar,indicator,texts,imgs];
  let parents = [navbar_field.offsetWidth, windowSize,navbar,indicator];
  let counter = 0;
  let max = 0;
  alignables.forEach((alignable) => {
    let size = parents[counter];
    
    if (alignable == navbar) {
      let width = size[0];
      let height = size[1];
      let postiion = (width - alignable.offsetWidth) / 2;
      let topPostiion = height / 33;
      alignable.style.position = "fixed";
      alignable.style.left = postiion + "px";
      if (topPostiion > 35) {
        alignable.style.top = topPostiion + "px";
      } else {
        alignable.style.top = "35px";
      }
    }
    else if(alignable == indicator){

      let parentLeft = size.getBoundingClientRect().left
      let standardSize = 24
      
      let listsLeft = [lists[0].getBoundingClientRect().left,lists[1].getBoundingClientRect().left,lists[2].getBoundingClientRect().left]
      let indicatorINNERHTML = document.getElementById("indicatorStyle")
      let indicatorINNERHTMLs = ""

      for(let i =0 ; i< listsLeft.length; i++){
        let translate = listsLeft[i]-parentLeft-(standardSize+i)

        indicatorINNERHTMLs = indicatorINNERHTMLs + ".navigation ul li:nth-child("+(i+1)+").active ~ .indicator {transform:translateX("+translate+"px);}"
      }
      indicatorINNERHTML.innerHTML = indicatorINNERHTMLs
      

    }
    /*
    else if(alignable == texts){
      var text = document.getElementsByClassName("text")[0]
      var defaultFontSize = parseInt(window.getComputedStyle(text).getPropertyValue("font-size"));
      for(let i=0; i<30; i++){
        var text = document.getElementsByClassName("text")[0]
        var parent = parents[counter]
        text.style.bottom = defaultFontSize+"px"
        var overlap = elementsOverlap( text,parent)
      if(overlap){
        var text = document.getElementsByClassName("text")[0]
        var parent = parents[counter]
        console.log("in")
        var overlap = elementsOverlap( text,parent)
        var defaultFontSize = defaultFontSize -1
        text.setAttribute("style",("font-size:"+defaultFontSize+"px !important"))
        console.log(defaultFontSize,overlap,text,parent)
      }
        
      }
      }*/
    
    else {
      if (typeof alignable == "object") {
        let elementSizes = size / alignable.length;
        Array.from(alignable).forEach((element) => {
          element.style.width = elementSizes + "px";
        });
      }
    }



    counter++;
  });
  imgs.forEach((img)=>{
    if(img.offsetHeight >max){
      max = img.offsetHeight
      //console.log(max)
    }

  })
  imgs.forEach((img2)=>{
    img2.style.height = max + "px";
    //console.log(max)
  })

}

function elementsOverlap(el1, el2) {
  var domRect1 = el1.getBoundingClientRect();
  var domRect2 = el2.getBoundingClientRect();


  return !(
    domRect1.top > domRect2.bottom ||
    domRect1.right < domRect2.left ||
    domRect1.bottom < domRect2.top ||
    domRect1.left > domRect2.right
  );
}

function ContentScreenToggler(h1,h2,h3,h4,h5,p,img, isEnable = false) {
  let body = document.getElementsByTagName("BODY")[0];
  let contentScreen = document.getElementsByClassName("content-screen");
  let contentCard = document.getElementsByClassName("content-card");

  if (isEnable == false) {
    //console.log("false  ")
    body.style.overflow = "unset";
    contentScreen[0].classList.add("d-none");
    contentScreen[0].classList.remove("d-block");
    contentCard[0].classList.add("d-none");
    contentCard[0].classList.remove("d-block");
  }

  if (isEnable == true) {
    //console.log("true")
    body.style.overflow = "hidden";
    contentScreen[0].classList.remove("d-none");
    contentScreen[0].classList.add("d-block");
    contentCard[0].classList.remove("d-none");
    contentCard[0].classList.add("d-block");
    ContentScreenCardSizing();
    ContentScreenPositioning();
    ContentCardContentPlacing(h1,h2,h3,h4,h5,p,img);
  }
}

function ContentScreenCardSizing() {
  let currentTopPosition = window.scrollY;
  let currentScreenSize = window.innerHeight;
  let contentScreenCard = document.getElementsByClassName("content-card")[0];
  let contentScreenTop = currentTopPosition + 0.15 * currentScreenSize;
  contentScreenCard.style.top = contentScreenTop + "px";
}

function ContentScreenPositioning() {
  let contentScreen = document.getElementsByClassName("content-screen")[0];
  let currentTopPosition = window.scrollY;
  contentScreen.style.top = currentTopPosition + "px";
}

function ContentCardContentPlacing(h1,h2,h3,h4,h5,p,img) {
  let contentPlace = document.getElementById("content");
  let imagePlace = document.getElementById("content-image");
  let innerHtml = "";
  if(h1 != null && h1 != 0 && h1 != ""){
    innerHtml = innerHtml +
    "<h1>"+h1+"</h1>";
  }
  if(h2 != null && h2 != 0 && h2 != ""){
    innerHtml = innerHtml+
    "<h2>" + h2 + "</h2>" ;
  }
  if(h3 != null && h3 != 0 && h3 != ""){
    innerHtml =innerHtml+
    "<h3>" + h3 + "</h3>";
  }
  if(h4 != null && h4 != 0 && h4 != ""){
    innerHtml =innerHtml+
    "<h4>" + h4 + "</h4>";
  }
  if(h5 != null && h5 != 0 && h5 != ""){
    innerHtml =innerHtml+
    "<h5>" + h5 + "</h5>";
  }
  if(p != null && p != 0 && p != "" ){
    innerHtml =innerHtml+
    "<p>" + p + "</p>";
  }

    contentPlace.innerHTML = innerHtml
  imagePlace.innerHTML = '<img class="img-fluid d-block" src="' + img + '">';

  autoAlignment(true);
}

function outClicking() {
  ContentScreenToggler(0, false);
}

function autoAlignment(isTheAligmentFromContentCard) {
  let doms = document.getElementsByClassName("auto-align-dom");
  let alignables = document.getElementsByClassName("auto-align");
  let button = document.getElementsByClassName("auto-align-button")[0];
  let h2 = document.getElementsByClassName("auto-align-h2")[0];
  let screen = window.innerWidth;
  let numberOfAlignables = alignables.length;
  //let maxWidth = 0
  let maxHeight = 0;
  let currentHeight = 0;
  //let currentWidth = 0
  let defaultSize = 0;
  let newSize = 0;
  let isDone = false;

  if (isTheAligmentFromContentCard) {
    for (let i = 0; i < numberOfAlignables; i++) {
      if (alignables[i].classList.contains("auto-align-p")) {
        let h2Size = Math.ceil(h2.offsetHeight) + 1;
        let buttonSize = button.offsetHeight;
        //maxWidth = doms[i].offsetWidth;
        maxHeight = doms[i].offsetHeight;
        isDone = false;
        defaultSize = window.getComputedStyle(alignables[i]).fontSize + ".";
        newSize = defaultSize.slice(0, defaultSize.indexOf("px"));
        while (isDone == false) {
          currentHeight = alignables[i].offsetHeight;
          //currentWidth = alignables[i].offsetWidth;
          //console.log({"i":i,"isdone":isDone,"currentHeight":currentHeight,"maxHeight":maxHeight,"newSize":newSize,"maxHeightCalc":(maxHeight - 20 - h2Size - buttonSize),"h2Size":h2Size,"buttonSize":buttonSize})

          if (currentHeight > maxHeight - 20 - h2Size - buttonSize) {
            newSize = newSize - 1;
            isDone = false;
          }

          if (currentHeight <= maxHeight - 20 - h2Size - buttonSize) {
            isDone = true;
          }
          alignables[i].style.fontSize = newSize + "px";
        }
      }

      if (alignables[i].classList.contains("auto-align-div")) {
        fullWidth = screen - (screen / 10) * 2;
        marginSize = (screen / 10) * 2;
        alignables[i].style.width = fullWidth + "px";
        alignables[i].style.left = marginSize / 2 + "px";
        alignables[i].style.display = "inline-block";
      }

      if (i != numberOfAlignables - 1) {
        if (
          alignables[i].classList.contains("auto-align-button") &&
          alignables[i + 1].classList.contains("auto-align-button")
        ) {
          maxWidth = doms[i].offsetWidth;
          isDone = false;
          defaultSize = window.getComputedStyle(alignables[i]).fontSize + ".";
          newSize = defaultSize.slice(0, defaultSize.indexOf("px"));
          while (isDone == false) {
            //currentHeight = alignables[i].offsetHeight;
            currentWidth =
              alignables[i].offsetWidth + alignables[i + 1].offsetWidth;

            if (currentWidth > maxWidth - 20) {
              newSize = newSize - 1;
              isDone = false;
            }

            if (currentWidth <= maxWidth - 20) {
              isDone = true;
            }
            alignables[i].style.fontSize = newSize + "px";
            alignables[i + 1].style.fontSize = newSize + "px";
          }
          if (
            typeof document.getElementsByClassName("auto-align-ul")[0] !=
            "undefined"
          ) {
            size =
              document.getElementsByClassName("auto-align-ul")[0].offsetHeight;
          }
          if (
            typeof document.getElementsByClassName("auto-align-p")[0] !=
            "undefined"
          ) {
            size =
              document.getElementsByClassName("auto-align-p")[0].offsetHeight;
          }

          maxHeight =
            document.getElementsByClassName("content-card")[0].offsetHeight;
          currentButtonSize = alignables[i].offsetHeight;
          /*console.log({
            Size: size,
            marginValue: maxHeight - maxHeight / 10 - currentButtonSize + "px",
            currentButtonSize: currentButtonSize,
            maxHeight: maxHeight,
          });*/
          alignables[i].style.marginTop =
            maxHeight - maxHeight / 8 - currentButtonSize - size + "px";
          alignables[i + 1].style.marginTop =
            maxHeight - maxHeight / 8 - currentButtonSize - size + "px";
        }
      }
      /*
    if (alignables[i].classList.contains("auto-align-h2")) {
      maxHeight = doms[i].offsetHeight;
      maxWidth = doms[i].offsetWidth;
      isDone = false;
      defaultSize = window.getComputedStyle(alignables[i]).fontSize + ".";
      newSize = defaultSize.slice(0, defaultSize.indexOf("px"));
      while (isDone == false) {
        currentHeight = alignables[i].offsetHeight;
        currentWidth = alignables[i].offsetWidth;

        if (currentWidth > maxWidth || currentHeight > maxHeight - 20) {
          newSize = newSize - 1;
          isDone = false;
        }

        if (currentWidth <= maxWidth - 20 && currentHeight <= maxHeight - 20) {
          isDone = true;
        }
        alignables[i].style.fontSize = newSize + "px";
      }
    }
    */
    }
  } else if (!isTheAligmentFromContentCard) {
    for (let i = 0; i < numberOfAlignables; i++) {
      if (alignables[i].classList.contains("auto-align-div")) {
        fullWidth = screen - (screen / 10) * 2;
        marginSize = (screen / 10) * 2;
        alignables[i].style.width = fullWidth + "px";
        alignables[i].style.left = marginSize / 2 + "px";
        alignables[i].style.display = "inline-block";
      }
      if (alignables[i].classList.contains("auto-align-div-height")) {
        row = alignables[i].closest(".parent");
        alignableHeight = alignables[i].offsetHeight;
        rowHeight = row.offsetHeight;
        alignables[i].style.marginTop =
          (rowHeight - alignableHeight) / 2 + "px";
      }
    }
  }
}

function startUp() {
  setTimeout(getText, 500);
  setTimeout(workText, 1000);
  setTimeout(innerHTMLSetUP, 1500);
  setTimeout(autoAlign, 2000)

  list = document.querySelectorAll(".list");
  list.forEach((item) => item.addEventListener("click", activeLink));

  autoSizing();
  autoAlign();

  ContentScreenToggler();
  autoAlignment(false);
}
