const API = "http://localhost:3000/data"
import { getData } from "./doc.js"
export default async function get() {
    try {
        let response = await fetch(API)
        let data = await response.json()
        getData(data)
    } catch (error) {
        console.error(error);
    }
}
export async function funEdit(id , user) {
    try {
        await fetch(`${API}/${id}` , {
            method : "PUT",
            headers : {"Content-type":"application/json"},
            body : JSON.stringify(user)
        })
        get()
    } catch (error) {
        console.error(error);
    }
}
export async function funCheck(id , user) {
    try {
        await fetch(`${API}/${id}` , {
            method : "PUT",
            headers : {"Content-type":"application/json"},
            body : JSON.stringify(user)
        })
        get()
    } catch (error) {
        console.error(error);
    }
}
export async function funDelete(id) {
    try {
        await fetch(`${API}/${id}` , {
            method : "DELETE"
        })
        get()
    } catch (error) {
        console.error(error);
    }
}
export async function funAdd(newUser) {
    try {
        await fetch(API , {
            method : "POST" ,
            headers : {"Content-type":"Application/json"},
            body : JSON.stringify(newUser)
        })
    } catch (error) {
        console.error();
    }
}