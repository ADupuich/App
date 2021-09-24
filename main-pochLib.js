//-_-_-_-_-_-_-_-_-_-_-_-_-_- Ajout <hr> entre <h1> et <h2> -_-_-_-_-_-_-_-_-_-_-_-_-_-
let h1Add1 = document.querySelector("h1");
h1Add1.innerHTML = "Poch'Lib <hr>"

//-_-_-_-_-_-_-_-_-_-_-_-_-_- Création du bouton Ajouter un livre #addBook -_-_-_-_-_-_-_-_-_-_-_-_-_-

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

//-_-_-_-_-_-_-_-_-_- Création de la zone pour la recherche des livres #searchZone -_-_-_-_-_-_-_-_-_-

//crée un nouvel élément block de type div
let searchZoneElts1 = document.createElement("div");
//ajoute l'attibut id=searchZone à searchZoneElts
searchZoneElts1.setAttribute('id','searchZone');
//obtient l'élément de référence
let searchZoneElts2 = document.querySelector("h2");
//ajoute l'élément searchZoneElts1 comme enfant de divAdd2
searchZoneElts2.appendChild(searchZoneElts1);
//ajoute le contenu HTML dans #searchZone
searchZoneElts1.innerHTML = 
"<form method='POST' action='traitement.php'>"+
"<p><label for='booksTitle'>Titre du livre :</label>"+
"<input class='searchArea' type='search' name='booksTitle' id='booksTitle' placeholder='Ex : le seigneur des anneaux' required/><br>"+
"<label for='booksAuthor'>Auteur du livre :</label>"+
"<input class='searchArea' type='search' name='booksAuthor' id='booksAuthor' placeholder='Ex : tolkien' required/></p>"+
"</form><input id='search' class='btn' type='button' value='Rechercher'>"+
"<input id='cancel'class='btn btn--cancel' type='button' value='Annuler'>";

//-_-_-_-_-_-_-_-_-_-_-_-_-_- Activation du bouton Ajouter un livre #addBook -_-_-_-_-_-_-_-_-_-_-_-_-_- 

//obtient l'élément de référence
const btnAddBook = document.getElementById("addBook");
//ecouter les événements sur le bouton #addBook
btnAddBook.addEventListener('click', function(){
        //le boutton Ajouter un livre disparaît
        btnAddBook.style.display="none";
        //la zone de recherche #searchZone apparaît
        searchZone.style.display="flex";
})

//-_-_-_-_-_-_-_-_-_-_-_-_-_-  Activation du bouton Rechercher -_-_-_-_-_-_-_-_-_-_-_-_-_- 
//créer la zone et ses id
let resultsLoc1 = document.createElement("div");
resultsLoc1.setAttribute('id','results');
//obtient les éléments référents
const btnSearch = document.getElementById("search");
//listener sur le bouton Rechercher #search
btnSearch.addEventListener('click',goSearch);
//Connections aux API
//API GoogleBooks
//récupérer les infons nécessaires à la recherche
function goSearch(){
    //obtient le titre référent
    const searchTitle = document.getElementById('booksTitle').value;
    const searchAuthor = document.getElementById('booksAuthor').value;
    const searchItem = searchTitle+'+inauthor:'+searchAuthor+'&key=AIzaSyDPf6SpjjbPbG-oKYVPGHv1mJvXJztD7Mw';
    
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchItem}`,{
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(value) {
        //obtient les éléments pour placer le nouveau child
        let resultsLoc2 = document.querySelector('h2');
        resultsLoc2.appendChild(resultsLoc1);
        resultsLoc1.innerHTML = '<div><h2>Résultats de la recherche</h2></div>'+
        '<div id="searchResults"></div>';
        //cibler cet nouvel id
        let resultsLoc3 = document.getElementById('searchResults');
        if (value.items) {
            for (let index = 0; index < value.items.length; index++) {
                let element = value.items[index];

                let data = {
                    "id": element.id,
                    "title": element.volumeInfo.title,
                    "authors": element.volumeInfo.authors,
                    "description": element.volumeInfo.description ? element.volumeInfo.description.replace(/'/g, "\"").substring(0, 200) : "Aucune information disponible",
                    "image": element.volumeInfo.imageLinks ? element.volumeInfo.imageLinks.thumbnail : "./images/unavailable.png"
                }

                resultsLoc3.innerHTML +=
                    "<div class='result result--area' >"+
                    "<div class='result result__text'>"+
                    "<p class='result__text--gras'>Titre: " +data.title+"</p>"+
                    "<p class='result__text--gras result__text--italique'>Id : " +data.id+"</p>"+
                    "<p>Auteur : "+data.authors+"</p>"+
                    "<p class>Description : "+data.description+"</p>"+
                    //"</div>" + "<div class='container2'>" +
                    //"<i class='fas fa-bookmark' onClick='saveStorage(" + JSON.stringify(data) + ")'></i>" + "</div> </div>" +
                    "<div class='result__image'><img src=" + data.image + " alt='image du livre' /></div></div></div>";
            }

        } else {
            resultsLoc3.innerHTML = "<p>Aucun livre n’a été trouvé</p><hr>"
        }
    })
}
//-_-_-_-_-_-_-_-_-_-_-_-_-_- Activation du bouton cancel -_-_-_-_-_-_-_-_-_-_-_-_-_- 

//(doit être placée dans le code après la création #Results)
//obtient les éléments de référence
const btnCcl =document.getElementById("cancel");
const searchZone = document.getElementById("searchZone");
console.log(resultsLoc1);
//listener sur le bouton Annuler #cancel
btnCcl.addEventListener('click', function(){
    //le bouton Ajouter un livre #addBook apparaît
    btnAddBook.style.display = "block";
    //la zone de recherche #searchZone disparaît
    searchZone.style.display = "none";
    resultsLoc1.innerHTML = "";
    window.location.reload()
})