let titel = document.getElementById('titel');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discoount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'create';
let tmp;
// get total 

function getTotal(){
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) - +discoount.value;
        total.innerHTML = result;

        total.style.background= '#040';
    }else{
        total.innerHTML = '';
        total.style.background = '#a00d02';
    }
    
}



// create product
let dataPro;
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product)
}else{
    dataPro = [];
}



submit.onclick = function(){
    let newpro = {
        titel:titel.value,
        price: price.value,
        taxes:taxes.value,
        ads:ads.value,
        discoount:discoount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value,
       }
       if(mood == 'create'){
       if(newpro.count > 1){
        for(let i = 0 ; i < newpro.count; i++){
            dataPro.push(newpro);
        }
       }else{
         dataPro.push(newpro);
       }
    }else{
        dataPro[tmp] = newpro; 
        mood = 'create';
       submit.innerHTML = 'create';
       count.style.display = 'block';
    }
       // save localstorage
       localStorage.setItem('product',  JSON.stringify(dataPro)  )
      cleardata()
       showData()
}


// clear inputs

function cleardata(){
    titel.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discoount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

// read 

function showData()
{
    getTotal();
    let table = '';

    for (let i = 0; i < dataPro.length; i++){
        table += `
         <tr>
                        <td>${i}</td>
                        <td>${dataPro[i].titel}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discoount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button  onclick="updatedata(${i})" id="ubdate">Ubdate</button></td>
                        <td><button onclick="deleteData( ${i} )" id="delete">Delete</button></td>
                    </tr>

        `
       
    }


    document.getElementById('tbody').innerHTML = table;

    let btn = document.getElementById('deletAll');

    if(dataPro.length > 0){
        btn.innerHTML = `
        <button onclick="deleteAll()" >DELET ALL (${dataPro.length})</button>
        `
    }else{
        btn.innerHTML = '';
    }
}
showData()




// delete

function deleteData(i){
    dataPro.splice(i,1);
    localStorage.product  = JSON.stringify(dataPro);
    showData()
}

function deleteAll(){
    localStorage.clear()
    dataPro.splice(0);
    showData()
}


// count
  


// ubdate
function updatedata(i)
{
    titel.value = dataPro[i].titel;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discoount.value = dataPro[i].discoount;
    getTotal();
    count.style.display = 'none';
    category.value = dataPro[i].category;
    submit.innerHTML = 'update';

    mood = 'update';

    tmp = i;
    scroll({
        top: 0,
        behavior:'smooth',
    })
}



 
// search 
let searchMood = 'title';


function getsearchmood(id){
    let search = document.getElementById('search')
    if(id == 'searchTitle'){
        searchMood = 'title';
        search.ariaPlaceholder = 
    }else{
        searchMood = 'category';
    }
    search.focus();
    console.log(searchMood);
}


// clean data


