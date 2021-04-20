// Url produit
let urlProduct = "";


// Appel de produits index.html

const indexCam = document.querySelector("#indexCam");
const indexRow1 = document.querySelector("#indexRow1");
const indexRow2 = document.querySelector("#indexRow2");

async function getProducts () {
    const response = await fetch("http://localhost:3000/api/cameras" + '/' + urlProduct);
    const data = await response.json();

    console.log(data);
    return data;
}

// Création du panier

let cartProducts = JSON.parse(localStorage.getItem("localStorageCartProducts"));

// Création du LocalStorage

if(cartProducts){

} else {
    cartProducts = [];
    localStorage.setItem("localStorageCartProducts", JSON.stringify(cartProducts))
}

async function getIndex() {
    if (indexCam != null) {
        const allProducts = await getProducts()

        for(i=0; i < allProducts.length; i++) {
            let indexCol = document.createElement("div");
            let indexCard = document.createElement("div");
            let indexLink = document.createElement("a");
            let indexImg = document.createElement("img");
            let indexBodyCard = document.createElement("div");
            let indexProductTitle = document.createElement("h5");
            let indexProductPrice = document.createElement("p");
            
            indexRow1.appendChild(indexCol);
            indexCol.classList.add("col-lg-4");
            indexCol.appendChild(indexCard);
            indexCard.classList.add("card");
            indexCard.appendChild(indexLink);
            indexLink.classList.add("stretched-link")
            indexLink.appendChild(indexImg);
            indexImg.classList.add("card-img-top");
            indexLink.appendChild(indexBodyCard);
            indexBodyCard.classList.add("card-body");
            indexBodyCard.appendChild(indexProductTitle)
            indexProductTitle.classList.add("card-title");
            indexBodyCard.appendChild(indexProductPrice);
            indexProductPrice.classList.add("card-text");
    
            indexRow2.appendChild(indexCol);
            indexCol.classList.add("col-lg-4");
            indexCol.appendChild(indexCard);
            indexCard.classList.add("card");
            indexCard.appendChild(indexLink);
            indexLink.classList.add("stretched-link")
            indexLink.appendChild(indexImg);
            indexImg.classList.add("card-img-top");
            indexLink.appendChild(indexBodyCard);
            indexBodyCard.classList.add("card-body");
            indexBodyCard.appendChild(indexProductTitle)
            indexProductTitle.classList.add("card-title");
            indexBodyCard.appendChild(indexProductPrice);
            indexProductPrice.classList.add("card-text");
    
            indexProductTitle.innerHTML = allProducts[i].name;
            indexProductPrice.innerHTML = parseInt(allProducts[i].price / 100).toFixed(2) + " €";
            indexLink.setAttribute("href", "product.html?id="+ allProducts[i]._id)
            indexImg.setAttribute("src", allProducts[i].imageUrl);
                
        }  
    }   
}

getIndex()


// Page produit

const pictureProduct = document.getElementById("pictureProduct");
const nameProduct = document.getElementById("nameProduct");
const textProduct = document.getElementById("textProduct");
const priceProduct = document.getElementById("priceProduct");
const lensesChoices = document.getElementsByClassName("lensesChoice");



// Création de l'URL

const product = document.querySelector("#pageProduct");

async function pageProduct(){
    if (product != null) {
        let url = window.location.search
        const urlParams = new URLSearchParams(url)
        urlProduct = urlParams.get('id')

        const allProducts = await getProducts()
    
        pictureProduct.setAttribute('src', allProducts.imageUrl)
        nameProduct.innerHTML = allProducts.name
        textProduct.innerHTML = allProducts.description
        priceProduct.innerHTML = parseInt(allProducts.price / 100).toFixed(2) + ' €'

        
        // Ajout du choix de lentilles
        allProducts.lenses.forEach(function(choice) {
            const lensesProduct = document.querySelector("#lensesProduct");
            let lensesChoice = document.createElement("option");
            lensesChoice.classList.add("lensesChoice")

            lensesProduct.appendChild(lensesChoice)
            lensesChoice.innerHTML = choice
        })
    }
}

// Evenement onclick pour appel de produit

indexLink = document.getElementsByClassName("stretched-link")
indexLink = addEventListener('click', pageProduct())

// Evenement localStorage

if (document.getElementById("buttonProduct") != null) {
    let addToLocalStorageButton = document.querySelector("#buttonProduct");
    addToLocalStorageButton.addEventListener("click", addToLocalStorage)
}



async function addToLocalStorage(){
    console.log("Le bouton marche");
    const allProducts = await getProducts()

    cartProducts.push(allProducts)
    localStorage.setItem("localStorageCartProducts", JSON.stringify(cartProducts))
    
    console.log('Ajout au panier réussi !')
    console.log(cartProducts + " sont dans le panier")
}

// Panier


const productCart = document.getElementById("sectionCart");


if(document.readyState == 'loading'){
    document.addEventListener("DOMContentLoaded", ready)
} else {
    ready()
}

function ready () {

    cartItem()

    let removeButton = document.getElementsByClassName("btn-danger");
    for (let i = 0; i < removeButton.length; i++) {
        let button = removeButton[i]
        button.addEventListener("click", removeCartItem)
    }

    let quantityInputsProduct = document.getElementsByClassName("quantityProductCart")
    for ( let i = 0; i < quantityInputsProduct.length; i++) {
        let input = quantityInputsProduct[i] 
        input.addEventListener("change", quantityChanged)
    } 
    
}

const productCartItem = document.getElementById("productCartItem");

function cartItem() {
    if(cartProducts.length > 0 && productCartItem != null) {

        console.log(cartProducts)
        for (i = 0; i < cartProducts.length; i++) {
            
            let rowCartItem = document.createElement("div");
            let colPictureProductCart = document.createElement("div");
            let pictureProductCart = document.createElement("img");
            let colTitleProductCart = document.createElement("div");
            let titleProductCart = document.createElement("h3");
            let lensesProductCart = document.createElement("p");
            let colSpace = document.createElement("div");
            let colSpace2 = document.createElement("div");
            let colPriceProductCart = document.createElement("div");
            let priceProductCart = document.createElement("h3");
            let colQuantityProductCart = document.createElement("div");
            let quantityProductCart = document.createElement("input");
            let colRemoveProductCart = document.createElement("div");
            let removeProductCart = document.createElement("button");
    
            productCartItem.appendChild(rowCartItem);
            rowCartItem.classList.add("row", "rowCartItem");
            rowCartItem.appendChild(colPictureProductCart);
            colPictureProductCart.classList.add("col-2");
            colPictureProductCart.appendChild(pictureProductCart);
            pictureProductCart.classList.add("img-fluid");
            pictureProductCart.setAttribute ("src", cartProducts[i].imageUrl);
            rowCartItem.appendChild(colTitleProductCart);
            colTitleProductCart.classList.add("col-3");
            colTitleProductCart.appendChild(titleProductCart);
            titleProductCart.innerHTML = cartProducts[i].name;
            colTitleProductCart.appendChild(lensesProductCart);
            lensesProductCart.innerHTML = cartProducts[i].lenses;
            rowCartItem.appendChild(colSpace);
            colSpace.classList.add("col-1");
            rowCartItem.appendChild(colPriceProductCart);
            colPriceProductCart.classList.add("col-2");
            colPriceProductCart.appendChild(priceProductCart);
            priceProductCart.innerHTML = cartProducts[i].price;
            priceProductCart.classList.add("priceProductCart")
            rowCartItem.appendChild(colSpace2);
            colSpace2.classList.add("col-1");
            rowCartItem.appendChild(colQuantityProductCart);
            colQuantityProductCart.classList.add("col-2");
            colQuantityProductCart.appendChild(quantityProductCart);
            quantityProductCart.classList.add("quantityProductCart");
            quantityProductCart.setAttribute("type", "number");
            quantityProductCart.setAttribute("value", 1);
            rowCartItem.appendChild(colRemoveProductCart);
            colRemoveProductCart.classList.add("col-1", "text-right");
            colRemoveProductCart.appendChild(removeProductCart);
            removeProductCart.classList.add("btn", "btn-danger");
            removeProductCart.setAttribute("type", "button");
            removeProductCart.innerHTML = "Supprimer"
        }

    } else {

        let emptyCart = document.createElement("p");

        productCartItem.appendChild(emptyCart);
        emptyCart.innerHTML = "Votre panier est vide.";
        console.log("La panier est vide");

    }

}


function quantityChanged(event) {
    let input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function removeCartItem(event){
    let buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    localStorage.removeItem("localStorageCartProducts")
    console.log(localStorage)
    updateCartTotal()
}



function updateCartTotal() {
    let rowCarts = document.getElementsByClassName("rowCartItem")
    let total = 0
    for (let i = 0; i < rowCarts.length; i++) {
        let rowCart = rowCarts[i]
        let priceProductCart = rowCart.getElementsByClassName("priceProductCart")[0]
        let quantityProductCart = rowCart.getElementsByClassName("quantityProductCart")[0]
        let price = parseFloat(priceProductCart.innerText.replace("€", " "))
        let quantity = quantityProductCart.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName("totalPriceCart")[0].innerText = total + "€"
}


// Affichage formulaire
const affichageDuFormulaire = function () {
    const positionForm = document.getElementById("positionForm");
    const formContent = 
        `<form id="formValidation" method="POST">
            <div class="row justify-content-center">
                <div class="col-12 col-lg-8">
                    <label for="Last name" class="form-label">Nom :</label>
                    <span id="erreurNom" class="text-danger"></span>
                    <input id="lastNameOrder" type="text" class="form-control" required/>
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-12 col-lg-8">
                    <label for="First name" class="form-label">Prénom :</label>
                    <span id="erreurPrenom" class="text-danger"></span>
                    <input id="firstNameOrder" type="text" class="form-control" required/>
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-12 col-lg-8">
                    <label for="Adress" class="form-label">Adresse :</label>
                    <span id="erreurAdresse" class="text-danger"></span>
                    <input id="adressOrder" type="text" class="form-control" required/>
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-12 col-lg-8">
                    <label for="City" class="form-label">Ville :</label>
                    <span id="erreurVille" class="text-danger"></span>
                    <input id="cityOrder" type="text" class="form-control" required/>
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-12 col-lg-8">
                    <label for="Email" class="form-label">Email :</label>
                    <span id="erreurEmail" class="text-danger"></span>
                    <input id="emailOrder" type="email" class="form-control" required placeholder="exemple@domaine.fr/com"/>
                </div>
            </div>
        </form>`;
    
    positionForm.insertAdjacentHTML("afterbegin", formContent);
};

affichageDuFormulaire();

let contact = {}
let products = []
let sendValues

// Récupération des données du formulaire + envoie LocalStorage
const buttonOrder = document.getElementById("buttonOrder");
buttonOrder.addEventListener("click", sendToLocalStorage)

function sendToLocalStorage(event){
    event.preventDefault()

    const contact = {
        firstName : document.getElementById("firstNameOrder").value,
        lastName : document.getElementById("lastNameOrder").value,
        address : document.getElementById("adressOrder").value,
        city : document.getElementById("cityOrder").value,
        email : document.getElementById("emailOrder").value,
    }

    // Verification du panier
    const cartCheck = function() {
        if(JSON.parse(localStorage.getItem("localStorageCartProducts")) == null || JSON.parse(localStorage.getItem("localStorageCartProducts")).length > 1) {
            alert("Votre panier est vide")
            window.location.href = "panier.html"
            return false;
        } else {
            return true;
        }
    }


    //Vérification du formulaire
    const regexPrenomNomVille = function(value) {
        return /^([A-Za-z]{3,20})?([-]{0,1})([A-Za-z]{3,20})$/.test(value);
    }
    const regexEmail = function(value) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
    }

    const regexAdresse = function(value) {
        return /^[A-Za-z0-9\s]{5,50}$/.test(value);
    }

    function prenomCheck() {
        const verifPrenom = contact.firstName;
        if (regexPrenomNomVille(verifPrenom)) {
            document.querySelector("#erreurPrenom").textContent = "";
            return true;
        } else {
            document.querySelector("#erreurPrenom").textContent = "Le prénom ne peut contenir que des lettres, de 3 à 20 caractères.";
            return false
        }
    }

    function nomCheck() {
        const verifNom = contact.lastName;
        if (regexPrenomNomVille(verifNom)) {
            document.querySelector("#erreurNom").textContent = "";
            return true;
        } else {
            document.querySelector("#erreurNom").textContent = "Le nom ne peut contenir que des lettres, de 3 à 20 caractères.";
            return false
        }
    }

    function villeCheck() {
        const verifVille = contact.city;
        if (regexPrenomNomVille(verifVille)) {
            document.querySelector("#erreurVille").textContent = "";
            return true;
        } else {
            document.querySelector("#erreurVille").textContent = "La ville ne peut contenir que des lettres, de 3 à 20 caractères.";
            return false
        }
    }

    function emailCheck() {
        const verifEmail = contact.email;
        if(regexEmail(verifEmail)){
            document.querySelector("#erreurEmail").textContent = "";
            return true;
        } else {
            document.querySelector("#erreurEmail").textContent = "L'email doit etre au format : exemple@domaine.fr/com";
            return false;
        }
    }

    function adressCheck() {
        const verifAdresse = contact.address;
        if(regexAdresse(verifAdresse)){
            document.querySelector("#erreurAdresse").textContent = "";
            return true;
        } else {
            document.querySelector("#erreurAdresse").textContent = "L'adresse ne peut contenir que des chiffres, des lettres et des espaces. Pas de ponctuation.";
            return false;
        }
    }

    const formCheck = function () {
        if (prenomCheck() == true && nomCheck() == true && villeCheck() == true && emailCheck() == true && adressCheck() == true) {
            localStorage.setItem("contact", JSON.stringify(contact));
            return contact
        } else {
            alert("Veuillez remplir correctement le formulaire");
        }
    }

    formCheck();



    let sendAPI = function () {
        if (cartCheck() == true && formCheck() != false) {
            cartProducts.forEach(function(product) {
                products.push(product._id)
            })

            let values = {
                contact,
                products,
            }

            let sendValues = JSON.stringify(values)
            console.log(sendValues)



            const envoieAPI = fetch ("http://localhost:3000/api/cameras/order", {
                method : "POST",
                body : JSON.stringify(sendValues),
                headers : {
                            "content-type" : "application/json",
                }
            });
            
            console.log(sendValues);
        }
    }

    sendAPI();
}




//Préremplir le formulaire avec localStorage

const dataLocalStorage = localStorage.getItem("contact");

const dataLocalStorageJson = JSON.parse(dataLocalStorage)

function preRemplirLesInputsAvecLocalStorage () {
    if(dataLocalStorageJson == null) {
        console.log("Le LocalStorage est vide")
    } else {
        document.querySelector("#firstNameOrder").value = dataLocalStorageJson.firstName;
        document.querySelector("#lastNameOrder").value = dataLocalStorageJson.lastName;
        document.querySelector("#adressOrder").value = dataLocalStorageJson.address;
        document.querySelector("#cityOrder").value = dataLocalStorageJson.city;
        document.querySelector("#emailOrder").value = dataLocalStorageJson.email;
    }
}

preRemplirLesInputsAvecLocalStorage("firstNameOrder");
preRemplirLesInputsAvecLocalStorage("lastNameOrder");
preRemplirLesInputsAvecLocalStorage("adressOrder");
preRemplirLesInputsAvecLocalStorage("cityOrder");
preRemplirLesInputsAvecLocalStorage("emailOrder");


    



// Page de confirmation et envoie de formulaire


// Check si le panier est vide

// Envoie des données du formulaire à l'API

