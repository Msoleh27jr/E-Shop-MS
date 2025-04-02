let btnCars = document.querySelector(".btnCars");
let cont = document.querySelector(".cont");
let totalSuma = document.querySelector(".totalSuma");
let carsina = document.querySelector(".carsina");
let btnCarsConcel = document.querySelector(".btnCarsConcel");
let boxCarsina = document.querySelector(".boxCarsina");
let conter = JSON.parse(localStorage.getItem("arrproducts"))
let CHECKOUT = document.querySelector(".CHECKOUT");
let checkProduct = document.querySelector(".checkProduct");
let allSum = document.querySelector(".allSum");
let BUY = document.querySelector(".BUY");
let CONCEL = document.querySelector(".CONCEL");
let done = document.querySelector(".done");
let forBurger = document.querySelector(".forBurger");
let burger = document.querySelector(".burger");
let concelBurger = document.querySelector(".concelBurger")

let arrproducts = [];

burger.onclick = () => {
  forBurger.showModal()
}
concelBurger.onclick = () => {
  forBurger.close()
}
cont.innerHTML = conter.length
CHECKOUT.onclick = () => {
  checkProduct.showModal()
}
CONCEL.onclick = () => {
  checkProduct.close()
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
btnCarsConcel.onclick = () => {
    carsina.close()
  }
  btnCars.onclick = () => {
    carsina.showModal()
    editForCarsin(JSON.parse(localStorage.getItem("arrproducts")))
    let summa = JSON.parse(localStorage.getItem("arrproducts"))
    sumPrice(summa)
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
    img.style.width = "200px"
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