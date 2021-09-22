const btnAdd = document.getElementById("addBook");
const btnCcl =document.getElementById("cancel");
const searchZone = document.getElementById("searchZone");

btnAdd.addEventListener('click', function(){
        btnAdd.style.display = "none";
        searchZone.style.display = "flex";
})
btnCcl.addEventListener('click', function(){
    btnAdd.style.display = "block";
    searchZone.style.display = "none";
})