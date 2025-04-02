let box = document.querySelector(".boxHome");
let cont = document.querySelector(".cont");
let btnCars = document.querySelector(".btnCars");
let carsina = document.querySelector(".carsina");
let btnCarsConcel = document.querySelector(".btnCarsConcel");
let boxCarsina = document.querySelector(".boxCarsina");
let totalSuma = document.querySelector(".totalSuma");
let CHECKOUT = document.querySelector(".CHECKOUT");
let checkProduct = document.querySelector(".checkProduct");
let allSum = document.querySelector(".allSum");
let BUY = document.querySelector(".BUY");
let CONCEL = document.querySelector(".CONCEL");
let done = document.querySelector(".done");
let burger = document.querySelector(".burger");
let forBurger = document.querySelector(".forBurger");
let concelBurger = document.querySelector(".concelBurger")
const API_URL = "http://localhost:3000/data";

concelBurger.onclick = () => {
  forBurger.close()
}

burger.onclick = () => {
  forBurger.showModal()
}
let arrproducts = [];
CHECKOUT.onclick = () => {
  checkProduct.showModal()
  allSum.innerHTML = totalSuma.innerHTML
}
CONCEL.onclick = () => {
  checkProduct.close()
}
burger.onclick = () => {
  forBurger.showModal()
}
BUY.onclick = () => {
  done.showModal()
  checkProduct.close()
  setTimeout(()=> {
    done.close()
    carsina.close()
    console.log("a");
  }, 1000)
  localStorage.setItem("arrproducts" , JSON.stringify(arrproducts))
  let data = JSON.parse(localStorage.getItem("arrproducts"))
  editForCarsin(data)
  sumPrice(0)
}
function sumPrice(sum) {
  let total = 0;
  if(sum == 0){
    totalSuma.innerHTML = "$0"
    cont.innerHTML = "0"
  }
  else {
    sum.forEach((product) => {
    let number = parseFloat(product.price.replaceAll("$", ""));
    total += number * product.quantity;
  });
  totalSuma.innerHTML = `$${total}`;
  allSum.innerHTML = `$${total}`
}
}

localStorage.setItem("arrproducts", JSON.stringify(arrproducts));
async function get() {
  try {
    let response = await fetch(API_URL);
    let data = await response.json();
    getData(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
btnCarsConcel.onclick = () => {
  carsina.close()
}
btnCars.onclick = () => {
  carsina.showModal()
  editForCarsin(JSON.parse(localStorage.getItem("arrproducts")))
  console.log(JSON.parse(localStorage.getItem("arrproducts")));
}
function editForCarsin(data){
  boxCarsina.innerHTML = ""
  data.forEach((e)=> {
    let left = document.createElement("div")
    let contener = document.createElement("div")
    contener.style.display = "flex"
    contener.style.alignItems = "center"
    contener.style.gap = "10px"
    contener.style.marginTop = "20px"
    let img = document.createElement("img")
    img.src = e.img
    img.style.width = "170px"
    img.style.height = "120px"
    let name = document.createElement("span")
    name.classList.add("namePrd")
    name.innerHTML = e.name
    let butDel = document.createElement("button")
    butDel.innerHTML = "❌"
    butDel.onclick = () => {
      let data = JSON.parse(localStorage.getItem("arrproducts"));
      let Delete = data.filter(ele => ele.id != e.id);
      sumPrice(Delete)
      localStorage.setItem("arrproducts", JSON.stringify(Delete));
      cont.innerHTML = Delete.length;
      editForCarsin(Delete);
  };
  
    butDel.style.backgroundColor = "transparent"
    butDel.style.border = "none"
    let prace = document.createElement("p")
    prace.style.marginTop = "15px"
    prace.style.marginBottom = "15px"
    prace.innerHTML = e.price
    prace.style.fontSize = "25px"
    prace.style.fontWeight = "bold"
    let btnMin = document.createElement("button")
    btnMin.style.marginLeft = "20px"
    btnMin.style.fontSize = "20px"
    btnMin.style.padding = "0px 8px"
    btnMin.style.borderRadius = "5px"
    btnMin.style.border = "2px solid #BA5D2C"
    btnMin.style.color = "#BA5D2C"
    btnMin.innerHTML = "-"
    let quantity = document.createElement("span")
    quantity.style.fontSize = "20px"
    quantity.style.fontFamily = "sans-serif"
    quantity.innerHTML = e.quantity
    let btnPlus = document.createElement("button")
    btnPlus.style.marginRight = "20px"
    btnPlus.style.fontSize = "20px"
    btnPlus.style.padding = "0px 8px"
    btnPlus.style.borderRadius = "5px"
    btnPlus.style.border = "2px solid #BA5D2C"
    btnPlus.style.color = "#BA5D2C"
    btnPlus.innerHTML = "+"
    btnPlus.onclick = () => {
      let data = JSON.parse(localStorage.getItem("arrproducts"));
      let getDataPlus = data.map(ele => {
          if (ele.id === e.id) {
              ele.quantity += 1;
          }
          return ele;
      });
      sumPrice(getDataPlus)
      
      localStorage.setItem("arrproducts", JSON.stringify(getDataPlus));
      editForCarsin(getDataPlus);
    };
    
    btnMin.onclick = () => {
      let data = JSON.parse(localStorage.getItem("arrproducts"));
      let getDataMin = data.filter(ele => {
        if (ele.id === e.id) {
          ele.quantity -= 1;
          return ele.quantity > 0;
        }
        return true;
      });
      localStorage.setItem("arrproducts", JSON.stringify(getDataMin));
      sumPrice(getDataMin)
      cont.innerHTML = getDataMin.length
      editForCarsin(getDataMin);
  };
  
    left.append(name , butDel , prace , btnPlus , quantity , btnMin)
    contener.append(img , left)
    boxCarsina.append(contener)
  })

}

function funCount(ele) {
  let data = JSON.parse(localStorage.getItem("arrproducts"));
  let obj = data.find((value) => value.id == ele.id);
  if (obj) {
    console.log("true");
    data = data.map((e) => {
      if (e.id == obj.id) {
        e.quantity += 1;
      }
      return e;
    });
    sumPrice(data)
    localStorage.setItem("arrproducts", JSON.stringify(data));
    console.log(data);
  } else {
    data.push(ele);
    console.log(data);
    cont.innerHTML = data.length;
    sumPrice(data)
  }
  console.log(data);
  localStorage.setItem("arrproducts", JSON.stringify(data));
}

function getData(data) {
  box.innerHTML = "";
  let selectedIndexes = new Set();
  while (selectedIndexes.size < 3 && selectedIndexes.size < data.length) {
    let randomIndex = Math.floor(Math.random() * data.length);
    if(data[randomIndex].status != false){
      selectedIndexes.add(randomIndex);
    }
  }
  selectedIndexes.forEach(index => {
    let e = data[index];
    let container = document.createElement("div");
    container.classList.add("cantener")
    // container.style.width = "500px";
    // container.style.height = "400px";
    container.style.textAlign = "center";
    container.style.margin = "auto";
    container.style.borderRadius = "10px";
    container.style.overflow = "hidden";
    container.style.position = "relative";
    let imgUrl = document.createElement("img");
    imgUrl.src = e.img;
    imgUrl.style.width = "100%";
    imgUrl.style.height = "300px";
    imgUrl.style.borderRadius = "10px";
    let divIcon = document.createElement("div");
    divIcon.style.position = "absolute";
    divIcon.style.top = "0";
    divIcon.style.left = "0";
    divIcon.style.right = "0";
    divIcon.style.bottom = "0";
    divIcon.style.background = "rgba(0, 0, 0, 0.5)";
    divIcon.style.display = "flex";
    divIcon.style.justifyContent = "center";
    divIcon.style.alignItems = "center";
    divIcon.style.opacity = "0";
    divIcon.style.transition = "opacity 0.3s ease-in-out";
    let eyeIcon = document.createElement("button");
    eyeIcon.innerHTML = "👁️";
    eyeIcon.style.fontSize = "50px";
    eyeIcon.style.background = "none";
    eyeIcon.style.border = "none";
    eyeIcon.style.margin = "20px";
    eyeIcon.onclick = () => {
      localStorage.setItem("id" , JSON.stringify(e.id))
      window.location.href = "./infoProduct.html"
    }
    let addIcon = document.createElement("button");
    addIcon.innerHTML = "🛒";
    addIcon.style.fontSize = "50px";
    addIcon.style.background = "none";
    addIcon.style.border = "none";
    addIcon.style.margin = "20px";
    addIcon.onclick = () => {
      funCount(e);
    };
    divIcon.append(eyeIcon, addIcon);
    container.addEventListener("mouseenter", () => {
      divIcon.style.opacity = "1";
    });
    container.addEventListener("mouseleave", () => {
      divIcon.style.opacity = "0";
    });

    let nameCont = document.createElement("p");
    nameCont.innerHTML = e.name;
    nameCont.style.marginTop = "10px";
    nameCont.style.marginBottom = "5px";
    nameCont.style.fontSize = "25px";
    nameCont.style.color = "grey";
    nameCont.style.fontWeight = "bold";

    let price = document.createElement("p");
    price.innerHTML = e.price;
    price.style.fontSize = "20px";
    price.style.fontWeight = "bold";

    container.append(imgUrl, divIcon, nameCont, price);
    box.append(container);
  });
}

get();
