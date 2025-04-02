let box = document.querySelector(".box")
let editModal = document.querySelector(".editModal")
let AddModal = document.querySelector(".AddModal")
let editForm = document.querySelector(".editForm")
let AddForm = document.querySelector(".AddForm")
let concel = document.querySelector(".concel")
let Concel = document.querySelector(".Concel")
let info = document.querySelector(".info")
let btnCars = document.querySelector(".btnCars")
let burger = document.querySelector(".burger");
let forBurger = document.querySelector(".forBurger");
let addColor = document.querySelector(".addColor");
let editColor = document.querySelector(".editColor");
let concelBurger = document.querySelector(".concelBurger")
let colorNumber = document.querySelector(".colorNumber")

import { funEdit , funCheck , funDelete , funAdd} from "./api.js"

burger.onclick = () => {
  forBurger.showModal()
}
concelBurger.onclick = () => {
    forBurger.close()
}
let EditforColor = []

editColor.onclick = () => {
    EditforColor.push(editForm["color"].value)
    colorNumber.innerHTML = EditforColor.length
}
function funedit(ele) {
    editForm.onsubmit = (event) => {
        event.preventDefault();
        let EditUser = {
            id : ele.id,
            img: event.target["img"].value,
            name: event.target["name"].value,
            color: EditforColor, 
            company: event.target["company"].value,
            price: event.target["price"].value,
            disc: event.target["disc"].value,
            status: event.target["select"].value === "true",
            quantity : 1
        };
        funEdit(ele.id, EditUser);
    };
}

btnCars.onclick = () => {
    AddModal.showModal()
}
Concel.onclick = () => {
    AddModal.close()
}
let forColor = []
addColor.onclick = () => {
    forColor.push(AddForm["color"].value)
}
AddForm.onsubmit = (event) => {
    event.preventDefault()
    let NewUser = {
        img : event.target["img"].value ,
        name : event.target["name"].value ,
        color : forColor ,
        company : event.target["company"].value,
        price : event.target["price"].value,
        disc : event.target["disc"].value ,
        status : event.target["select"].value == "true" ? true : false,
        quantity : 1
    };
    funAdd(NewUser)
}
export function getData(data){
    box.innerHTML = ""
    data.forEach((e)=> {
        let contener = document.createElement("tr")
        let img = document.createElement("td")
        let image = document.createElement("img")
        image.src = e.img
        image.style.width = "60px"
        image.style.height = "60px"
        let name = document.createElement("td")
        name.style.textDecoration = e.status == true ? "none" : "line-through"
        name.innerHTML = e.name
        let comp = document.createElement("td")
        comp.innerHTML = e.company
        let price = document.createElement("td")
        price.innerHTML = e.price
        let status = document.createElement("td")
        status.style.color = e.status == true ? "green" : "red"
        status.innerHTML = e.status == true ? "in Stock" : "Out of Stock"
        let forBtn = document.createElement("td")
        let btnEdit = document.createElement("button")
        btnEdit.innerHTML = "🆕"
        btnEdit.style.backgroundColor = "transparent"
        btnEdit.style.border = "none"
        btnEdit.style.fontSize = "30px"
        btnEdit.onclick = () => {
            concel.onclick = () => {
                editModal.close()
            }
            funedit(e)
            editModal.showModal()
            editForm["name"].value = e.name
            editForm["img"].value = e.img
            editForm["company"].value = e.company
            editForm["price"].value = e.price
            editForm["color"].value = e.color[0]
            console.log(e.color[0]);
            
            editForm["disc"].value = e.disc
            editForm["select"].value = e.status == true ? "true" : "false"
        }
        let btnCheck = document.createElement("button")
        btnCheck.innerHTML = "🔄️"
        btnCheck.style.backgroundColor = "transparent"
        btnCheck.style.border = "none"
        btnCheck.style.fontSize = "30px"
        btnCheck.onclick = () => {
            let check = {
                ...e , 
                status : !e.status
            }
            funCheck(e.id , check)
        }
        let btnDelet = document.createElement("button")
        btnDelet.innerHTML = "🚮"
        btnDelet.style.backgroundColor = "transparent"
        btnDelet.style.border = "none"
        btnDelet.style.fontSize = "30px"
        btnDelet.onclick = () => {
            funDelete(e.id)
        }
        let btnInfo = document.createElement("button")
        btnInfo.innerHTML = "ℹ️"
        btnInfo.style.backgroundColor = "transparent"
        btnInfo.style.border = "none"
        btnInfo.style.fontSize = "30px"
        btnInfo.onclick = () => {
            info.innerHTML = ""
            info.showModal()
            let id = document.createElement("p")
            id.innerHTML = e.id
            let name = document.createElement("h2")
            name.innerHTML = e.name
            let conbtn = document.createElement("button")
            conbtn.innerHTML = "Concel"
            conbtn.style.padding = "2px 20px"
            conbtn.style.fontSize = "20px"
            conbtn.style.backgroundColor = "red"
            conbtn.onclick = () => {
                info.close()
            }
            info.append(id , name , conbtn)
        }
        forBtn.append(btnEdit , btnCheck , btnDelet , btnInfo)
        img.append(image)
        contener.append(img , name , comp , price , status , forBtn)
        box.append(contener)
    })
}