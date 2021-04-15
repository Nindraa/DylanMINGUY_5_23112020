
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

console.log(lensesChoices)

// Evenement onclick pour appel de produit

indexLink = document.getElementsByClassName("stretched-link")
indexLink = addEventListener('click', pageProduct())

// Evenement localStorage

let productToStorage = JSON.parse(localStorage.getItem("LocalStorageCartProducts"));

if (document.getElementById("buttonProduct") != null) {
    let addToLocalStorageButton = document.querySelector("#buttonProduct");
    addToLocalStorageButton.addEventListener("click", addToLocalStorage)

    async function addToLocalStorage(){
        console.log("Le bouton marche");
        const allProducts = await getProducts()

        if(productToStorage){
            productToStorage = [];
            productToStorage.push(allProducts)
            localStorage.setItem("LocalStorageCartProducts", JSON.stringify(productToStorage))
        } else {
            productToStorage = [];
            productToStorage.push(allProducts)
            localStorage.setItem("LocalStorageCartProducts", JSON.stringify(productToStorage))
        }
    }
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
    console.log("allo?")

    if(productToStorage.length < 0 && productCartItem != null) {
        let emptyCart = document.createElement("p")
        emptyCart.innerHTML = "Votre panier est vide."
        console.log("La panier est vide");

    } else {
        console.log(productToStorage)
        for (i = 0; i < productToStorage.length; i++) {
            
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
            pictureProductCart.setAttribute ("src", productToStorage[i].imageUrl);
            rowCartItem.appendChild(colTitleProductCart);
            colTitleProductCart.classList.add("col-3");
            colTitleProductCart.appendChild(titleProductCart);
            titleProductCart.innerHTML = productToStorage[i].name;
            colTitleProductCart.appendChild(lensesProductCart);
            rowCartItem.appendChild(colSpace);
            colSpace.classList.add("col-1");
            rowCartItem.appendChild(colPriceProductCart);
            colPriceProductCart.classList.add("col-2");
            colPriceProductCart.appendChild(priceProductCart);
            priceProductCart.innerHTML = productToStorage[i].price;
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


