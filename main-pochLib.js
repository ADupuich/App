//Création du bouton Ajouter un livre #addBook
//crée un nouvel élément block de type div
let divAdd1=document.createElement("div");
//ajoute l'attibut id=addBook à divAdd
divAdd1.setAttribute('id','addBook');
//obtient l'élément de référence 
let divAdd2 = document.querySelector("h2");
//ajoute l'élément divAdd1 comme enfant de divAdd2
divAdd2.appendChild(divAdd1);
//ajoute le contenu HTML comme enfant de h2
divAdd1.innerHTML = "<input class='btn btn--add' type='button' value='Ajouter un livre'>";

//Création de la zone pour la recherche des livres #searchZone
//crée un nouvel élément block de type div
const searchZoneElts1 = document.createElement("div");
//ajoute l'attibut id=searchZone à searchZoneElts
searchZoneElts1.setAttribute('id','searchZone');
//obtient l'élément de référence
let searchZoneElts2 = document.querySelector("h2");
//ajoute l'élément searchZoneElts1 comme enfant de divAdd2
searchZoneElts2.appendChild(searchZoneElts1);
//ajoute le contenu HTML dans #searchZone
searchZoneElts1.innerHTML = "<form method='POST' action='traitement.php'><p><label for='booksTitle'>Titre du livre :</label><input class='searchArea' type='search' name='booksTitle' id='booksTitle' placeholder='Ex : le seigneur des anneaux' required/><br><label for='booksAutor'>Auteur du livre :</label><input class='searchArea' type='search' name='booksAutor' id='booksAutor' placeholder='Ex : tolkien' required/></p></form><input class='btn' type='button' value='Rechercher'><input id='cancel'class='btn btn--cancel' type='button' value='Annuler'>";
//searchZone.style.display = "flex";

//Activation du bouton Ajouter un livre #addBook
//obtient l'élément de référence
const btnAddBook = document.getElementById("addBook");
//ecouter les événements sur le bouton #addBook
btnAddBook.addEventListener('click', function(){
        //le boutton Ajouter un livre disparaît
        btnAddBook.style.display="none";
        //la zone de recherche #searchZone apparaît
        searchZone.style.display="flex";

})
//Activation du bouton cancel
//obtient les éléments de référence
const btnCcl =document.getElementById("cancel");
const searchZone = document.getElementById("searchZone");
//listener sur le bouton Annuler #cancel
btnCcl.addEventListener('click', function(){
    //le bouton Ajouter un livre #addBook apparaît
    btnAddBook.style.display = "block";
    //la zone de recherche #searchZone disparaît
    searchZone.style.display = "none";
})