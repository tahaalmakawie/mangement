

let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let supmit = document.getElementById("supmit");
let mood = "Create"
let tmp;

//get total

function getTotal(){
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value)
         - discount.value;
         total.innerHTML = result;
         total.style.background="#090";
    }else{
        total.style.background="#500";
        total.innerHTML = 0;
    }
}
let dataPro ;
// creat product

if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product)
}else{
     dataPro = [];
}



submit.onclick = function(){
    let newPro = {
        title   : title.value.toLowerCase(),
        price   : price.value,
        taxes   : taxes.value,
        ads     : ads.value,
        discount: discount.value,
        total   : total.innerHTML,
        count   : count.value,
        category: category.value.toLowerCase()
    }
    if(title.value != '' && price.value != '' &&category.value != '' ){
            if(mood === "Create"){
            if(newPro.count > 1){
        for(let i = 0;i < newPro.count; i++ ){
            dataPro.push(newPro)

        }
    }else{
        dataPro.push(newPro)
    }

    }else{
        dataPro[tmp] = newPro;
        mood = "Create"
        submit.innerHTML="Create"
        count.style.display=" block"

    }
    clearData()
    

    }

    
    // save localStorage
    localStorage.setItem("product" , JSON.stringify(dataPro))

    
    showData()
}

// clear inputs

function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value='';
    total.innerHTML=0
    count.value= ''
    category.value='';
    total.style.background= "#500"
}


// rade

function showData(){
    let table = '';
    for(let i = 0 ; i < dataPro.length; i++){
        table += `
        <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick = "deleteData(${i})" id="delete">Delete</button></td>
          </tr>

        
        `
      
    }
    document.getElementById("tbody").innerHTML = table;
    let btnDelete = document.getElementById("deleteAll");
    if(dataPro.length > 0){
        btnDelete.innerHTML = `
        <button onclick="deleteAll()">Delete All   (${dataPro.length}) </button>
        
        `
    }else{
        btnDelete.innerHTML = '';
    }
    
}showData()

//delete
function deleteData(i){
    dataPro.splice(i,1)
    localStorage.product = JSON.stringify(dataPro)
    showData()
   
}
function deleteAll(){
    localStorage.clear()
    dataPro.splice(0);
    showData()
}
function updateData(i){
    title.value=dataPro[i].title
    price.value=dataPro[i].price
    taxes.value=dataPro[i].taxes
    ads.value=dataPro[i].ads
    discount.value=dataPro[i].discount
    getTotal()
    category.value=dataPro[i].category
    count.style.display="none"
    submit.innerHTML="Update"
    mood = "Update"
    tmp = i;
    scroll({
        top:0 , 
        behavior : "smooth"
    })
}

// searsh
let searsh = document.getElementById("searsh")
let searshMood = "title";

function getsearshMood(id){
    if(id === "searshTitle"){
        searshMood = "title";
        searsh.placeholder="Searsh By Title"
    }else{
        searshMood = "category";
        searsh.placeholder="Searsh By Category"
    }
    searsh.focus()
    searsh.value="";
    showData()
    
}

function searshData(value){
    let table = ''
    if(searshMood === "title"){

        for(let i = 0 ; i < dataPro.length; i++){
            if(dataPro[i].title.includes(value.toLowerCase())){
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td><button onclick = "deleteData(${i})" id="delete">Delete</button></td>
                  </tr>
        
                
                `

            }
        }

    }else{
        for(let i = 0 ; i < dataPro.length; i++){
            if(dataPro[i].category.includes(value.toLowerCase())){
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td><button onclick = "deleteData(${i})" id="delete">Delete</button></td>
                  </tr>
        
                
                `

            }
        }
    }
    document.getElementById("tbody").innerHTML = table;
}
