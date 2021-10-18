//-_-_-_-_-_-_-_-_-_-_-_-_-_- Ajout <hr> entre <h1> et <h2> -_-_-_-_-_-_-_-_-_-_-_-_-_-
let h1Add1 = document.querySelector("h1");
h1Add1.innerHTML = "Poch'Lib <hr>"

//-_-_-_-_-_-_-_-_-_-_-_-_-_- Création du bouton Ajouter un livre #addBook -_-_-_-_-_-_-_-_-_-_-_-_-_-
let divAdd1=document.createElement("div");
divAdd1.setAttribute('id','addBook'); 
let divAdd2 = document.querySelector("h2");
divAdd2.appendChild(divAdd1);
divAdd1.innerHTML = "<input class='btn btn--add' type='button' value='Ajouter un livre'>";

//-_-_-_-_-_-_-_-_-_- Création de la zone pour la recherche des livres #searchZone -_-_-_-_-_-_-_-_-_-
let searchZoneElts1 = document.createElement("div");
searchZoneElts1.setAttribute('id','searchZone');
let searchZoneElts2 = document.querySelector("h2");
searchZoneElts2.appendChild(searchZoneElts1);
searchZoneElts1.innerHTML = 
"<form method='POST'>"+
"<p><label for='booksTitle'>Titre du livre :</label>"+
"<input class='searchArea' type='search' name='booksTitle' id='booksTitle' placeholder='Ex : le seigneur des anneaux' required/><br>"+
"<label for='booksAuthor'>Auteur du livre :</label>"+
"<input class='searchArea' type='search' name='booksAuthor' id='booksAuthor' placeholder='Ex : tolkien' required/></p></form>"+
"<input id='search' class='btn' type='button' value='Rechercher'>"+
"<input id='cancel'class='btn btn--cancel' type='button' value='Annuler'>";

//-_-_-_-_-_-_-_-_-_-_-_-_-_- Création de zone utile à postériori -_-_-_-_-_-_-_-_-_-_-_-_-_-
//zone d'affichage des résultats de la recherche
let resultsLoc1 = document.createElement("div");
resultsLoc1.setAttribute('id','results');
let resultsLoc2 = document.querySelector('h2');
resultsLoc2.appendChild(resultsLoc1);

//zone d'affichage des Favoris
let favritesLoc1 = document.createElement('div');
favritesLoc1.setAttribute('class','resultsZone');
let favritesLoc2 = document.getElementById('content');
favritesLoc2.appendChild(favritesLoc1);

//-_-_-_-_-_-_-_-_-_-_-_-_-_- Activation du bouton Ajouter un livre #addBook -_-_-_-_-_-_-_-_-_-_-_-_-_- 
const btnAddBook = document.getElementById("addBook");
btnAddBook.addEventListener('click', function(){
        btnAddBook.style.display="none";
        searchZone.style.display="flex";
})

//-_-_-_-_-_-_-_-_-_-_-_-_-_-  Activation du bouton Annuler -_-_-_-_-_-_-_-_-_-_-_-_-_- 
//obtient l'élément de référence
const btnCclBook = document.getElementById("cancel")
//ecouter les événements sur le bouton #addBook
btnCclBook.addEventListener('click', function(){
    location.reload()
})

//-_-_-_-_-_-_-_-_-_-_-_-_-_-  Activation du bouton Rechercher -_-_-_-_-_-_-_-_-_-_-_-_-_- 
const btnSearch = document.getElementById("search");
btnSearch.addEventListener('click',lancerRecherche);

//Lancement de la recherche
function lancerRecherche(){
    //vérfiier que les champs ayant pour id #booksTitle et #booksAuthor sont bien renseignés
    //obtient les éléménts nécessaires à préparer la requete API
    const searchTitle = document.getElementById('booksTitle').value;
    const searchAuthor = document.getElementById('booksAuthor').value;
    if (searchTitle != null && searchAuthor != null &&searchTitle != 0 && searchAuthor!=0){
    //formalise la requete telle qu'attendue par le service web
    const searchItem = searchTitle+'+inauthor:'+searchAuthor+'&key=AIzaSyDPf6SpjjbPbG-oKYVPGHv1mJvXJztD7Mw';
    
    //realise le fetch
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchItem}`,{
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(value) {
        resultsLoc1.innerHTML = '<hr><div><h2>Résultats de la recherche</h2></div>'+'<div id="searchResults"></div>';
        let resultsLoc3 = document.getElementById('searchResults');
        resultsLoc3.setAttribute('class','resultsZone')
        resultsLoc3.innerHTML = ""
        if (value.items) {
            for (let index = 0; index < value.items.length; index++) {
                let element = value.items[index];
                let book = {
                    "id": element.id,
                    "title": element.volumeInfo.title,
                    "authors": element.volumeInfo.authors,
                    "description": element.volumeInfo.description ? element.volumeInfo.description.replace(/'/g, "\"").substring(0, 200)+"..." : "Aucune information disponible",
                    "image": element.volumeInfo.imageLinks ? element.volumeInfo.imageLinks.thumbnail : "./images/unavailable.png"
                }
                resultsLoc3.innerHTML +=
                    "<div class='result result--area' >"+
                    "<div class='result result__text'>"+
                    "<button id=fvrAdd class='result__book-unregistered' onclick='saveStorage("+JSON.stringify(book)+")'><img src='./images/outline_bookmark_border_black_24dp.png' alt ='fvr'></button>"+
                    "<p class='result__text--gras'>Titre: " +book.title+"</p>"+
                    "<p class='result__text--gras result__text--italique'>Id : " +book.id+"</p>"+
                    "<p>Auteur : "+book.authors+"</p>"+
                    "<p class> Description : "+book.description+"</p>"+
                    "<div class='result__image'><img src=" + book.image + " alt='image du livre' /></div></div></div>";      
                }
        } else {
            resultsLoc1.innerHTML +=
            "<p>Aucun livre n’a été trouvé</p>"
        }
    }) 
    } else {
        alert ("Merci de vérfier que vous avez bien renseigné les champs auteur et/ou titre")
    }  
}

//-_-_-_-_-_-_-_-_-_-_-_-_-_- Fonction Ajouter un Favori -_-_-_-_-_-_-_-_-_-_-_-_-_- 
function saveStorage(itemToAdd){
    var save
    //si save est null ou que le sessionStorage est null alors initialise le tableau save
    if (save == null && sessionStorage.getItem("books") == null){ 
        save = []
    }
    /*Si save est vide et que le session storage CONTIENT des items alors copie le session Storage dans save 
    sinon le report de favoris d'une actualisation à l'autre ne se fait pas, car save se réinitialise à l'actualisation
    et sauvera alors un tableau vide en fin de fonction
    */
    if (save == null && sessionStorage.getItem("books") != null){
        save = JSON.parse(sessionStorage.getItem("books"))
    }
    let state = true
    var checkFavoritesArray = JSON.parse(sessionStorage.getItem("books"))
    //si save contient des données, en comparer les id avec celle d'items, si l'id existe déjà alors produire l'alert
    if (checkFavoritesArray != null) {
        for (i=0;i<checkFavoritesArray.length;i++){
            if(checkFavoritesArray[i].id === itemToAdd.id) {
                alert ("Vous avez déjà enregistré ce livre dans vos favoris")
                state = false
            }
        }
        // si l'id de l'items n'existe pas déjà dans le storage, ajouter items à save et faire un storage de save
        if (state) {
            save.push(itemToAdd)
            sessionStorage.setItem('books',JSON.stringify(save));
        }
        //si save est null (pour le premier favoris) sauvegarder save dans le storage
    } else {
        save.push(itemToAdd)
        sessionStorage.setItem('books', JSON.stringify(save));
    }
    afficherFavoris()
}

//-_-_-_-_-_-_-_-_-_-_-_-_-_- Fonction Supprimer un Favoris -_-_-_-_-_-_-_-_-_-_-_-_-_-
function supprimerFavori(indexOfFavoriToDelete) {
    var toDeleteFavoriArray = JSON.parse(sessionStorage.getItem("books"));
    //indispensable sinon l'exécution du programme est bloquée
    if (toDeleteFavoriArray != null){
            for(i=0; i<toDeleteFavoriArray.length;i++) {
                if(i === indexOfFavoriToDelete){
                    toDeleteFavoriArray.splice(i, 1);
                    sessionStorage.setItem('books', JSON.stringify(toDeleteFavoriArray))
                }
            }
        afficherFavoris();
    }
}

//-_-_-_-_-_-_-_-_-_-_-_-_-_- Fonction Afficher les favoris -_-_-_-_-_-_-_-_-_-_-_-_-_- 
function afficherFavoris() {
    var toShowFavoritesArray = JSON.parse(sessionStorage.getItem("books"));
        //important de remettre la zone d'affichage à zéro ici et pas ailleur spour maintenir l'affichage ok
        if (toShowFavoritesArray != null){
            favritesLoc1.innerHTML = ""
            for(i=0; i< toShowFavoritesArray.length;i++) {
                favritesLoc1.innerHTML += 
                "<div class='result result--area'>"+
                "<div class='result result__text'>"+
                "<button id=fvrAdd class='result__book-unregistered' onclick='supprimerFavori("+JSON.stringify(i)+")'><img src='./images/outline_delete_outline_black_24dp.png' alt ='fvr'></button>"+
                "<p class='result__text--gras'>Titre: " +toShowFavoritesArray[i].title+"</p>"+
                "<p class='result__text--gras result__text--italique'>Id : " +toShowFavoritesArray[i].id+"</p>"+
                "<p>Auteur : "+toShowFavoritesArray[i].authors+"</p>"+
                "<p class> Description : "+toShowFavoritesArray[i].description+"</p>"+
                "<div class='result__image'><img src=" +toShowFavoritesArray[i].image + " alt='image du livre' /></div></div></div>"
            } 
        }               
}

window.addEventListener('DOMContentLoaded', afficherFavoris)