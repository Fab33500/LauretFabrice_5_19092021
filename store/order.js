// ***************************** FONCTIONS ******************************
// fonction de controle des inputs du formulaire
const valid = (inputs, inputsRegEx) => {
	const nameRegExp = inputsRegEx;
	const testfirstName = nameRegExp.test(inputs.value);

	const infoMsgElt = inputs.nextElementSibling;

	// test de l'expression reguliere
	testValidInput(infoMsgElt, testfirstName);
};

function testValidInput(infoMsgElt, testName, testLastName, testEmail, testAddress, testZip, testCity) {
	// Message d'alerte du remplissage des inputss
	if (testZip || testCity || testName || testLastName || testEmail || testAddress) {
		infoMsgEltAdd(infoMsgElt);
		sendOrder.disabled = false;
	} else {
		infoMsgEltRemove(infoMsgElt);
		sendOrder.disabled = true;
	}
}

// fonction ajout de message d'alerte lors du remplissage des inputs
function infoMsgEltAdd(infoMsgElt) {
	if (infoMsgElt) {
		infoMsgElt.innerHTML = "Le champ est valide";
		infoMsgElt.classList.remove("text-warning");
		infoMsgElt.classList.add("text-success");
		return true;
	}
}

function infoMsgEltRemove(infoMsgElt) {
	if (infoMsgElt) {
		infoMsgElt.innerHTML = "La saisie ne correspond pas au champ ";
		infoMsgElt.classList.remove("text-success");
		infoMsgElt.classList.add("text-warning");
		return false;
	}
}

// fonction ajoutdes articles dans le panier

function addTeddies() {
	let teddies = [];

	cart.forEach((n) => {
		teddies =
			teddies +
			`
			<div class="row row-teddy col-sm-12 ">
			<div class="d-block  col-md-5 row">
			<h2 class="col-4 name-cart-item teddy-name teddy-name-order">${n.name}</h2>
			<p class="name-cart-item ref ref-order">Ref: ${n.id} </p>
		</div>
		<div class="form-row form-compt col-3 mt-3">
			<p id="quantity">Qté: ${n.quantity}</p>
		</div>
		<p class="total-price name-cart-item col-lg-2 col-3  mt-3"> :  ${n.quantity * n.price}€</p>
		<button type="button" id="send-cart" class=" btn-delete btn-primary ">X</button>
	</div>	
	</div>		
		`;

		basketHtml.innerHTML = teddies;
	});
}

//  fonction popup suppression panier
function popupDeleteCart() {
	if (window.confirm("OK pour supprimer le panier ou ANNULER pour rester sur le panier")) {
		localStorage.clear();
		location.reload();
	}
}

// fonction pour corriger les erreurs
function empty(element) {
	if (element == null || element == 0) {
		return true;
	}
}
//**************** validation du formulaire ******************

const regexNameLastCity = new RegExp("^[ \u00c0-\u01ffa-zA-Z'-]+$");
const regexpMail = new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$", "g");
const regExpaddress = new RegExp("^([a-zA-Z0-9\u0600-\u06FF\u0660-\u0669\u06F0-\u06F9 _.-]+)$");
const regexZip = new RegExp("^((0[1-9])|([1-8][0-9])|(9[0-8])|(2A)|(2B))[0-9]{3}$");

//**************** validation du nom ******************
// ecouter la modification du nom
form.firstName.addEventListener("change", function () {
	validName(this);
});

const validName = (inputfirstName) => {
	valid(inputfirstName, regexNameLastCity);
};
//**************** validation du prénom ******************
// ecouter la modification du lastName
form.lastName.addEventListener("change", function () {
	validLastName(this);
});

const validLastName = (inputLastName) => {
	valid(inputLastName, regexNameLastCity);
};

//**************** validation de l'email ******************

// ecouter la modification de l email
form.email.addEventListener("change", function () {
	validEmail(this);
});

const validEmail = (inputEmail) => {
	valid(inputEmail, regexpMail);
};

//**************** validation de l'addresse ******************
// ecouter la modification du address
form.address.addEventListener("change", function () {
	validAddress(this);
});

const validAddress = (inputAddress) => {
	valid(inputAddress, regExpaddress);
};

//**************** validation de la ville ******************
// ecouter la modification du city
form.city.addEventListener("change", function () {
	validCity(this);
});

const validCity = (inputCity) => {
	valid(inputCity, regexNameLastCity);
};

//**************** validation du code postal ******************
// ecouter la modification du zip
form.zip.addEventListener("change", function () {
	validZip(this);
});

const validZip = (inputZip) => {
	valid(inputZip, regexZip);
};

//************************section pannier**********************
//recuperation du panier dans le localStorage
let cart = JSON.parse(localStorage.getItem("cart"));
let contact1 = JSON.parse(localStorage.getItem("contact"));

//
const basketHtml = document.querySelector("#basket");
const basketEmptyHtml = document.querySelector(".basket-empty");
const deletePurchasing = document.querySelector("#delete-purchasing");

// si panier vide
if (cart === null) {
	basketEmptyHtml.innerHTML = `
	<div class="container-empty-cart col-12 " >
		<div class= "col-12 offset-3"> Aucun article dans votre panier </div>
		<a class="col-6 offset-3 btn btn-primary addArticle" href="./index.html" role="button">Ajouter des articles</a>
	</div>
	`;

	// desactive le bouton "valider la commande" si le panier est vide
	sendOrder.disabled = true;

	// masque la div des boutons "vider le panier" et "continuer les achats"  et le total,si le panier est vide
	deletePurchasing.style.visibility = "hidden";
} else {
	addTeddies();
}

// suppression des produits du pannier
let btnDelete = document.querySelectorAll(".btn-delete");

for (let i = 0; i < btnDelete.length; i++) {
	btnDelete[i].addEventListener("click", (e) => {
		e.preventDefault();

		// selection id à supprimer
		let idDelete = cart[i].id;

		// creer un nouveau tableau lors de la supression d'un element
		cart = cart.filter((el) => el.id !== idDelete);

		// envoyer dans local Storage
		localStorage.setItem("cart", JSON.stringify(cart));
		// réactualiser la page
		location.reload();
	});
}

// ********************* vider le panier *********************

// selection du btn
const btnDeletCart = document.querySelector(".btn-delete-cart");
const btnPurchasing = document.querySelector(".btn-purchasing");

// supprimer la key "cart" dans localStorage
btnDeletCart.addEventListener("click", (e) => {
	e.preventDefault();
	popupDeleteCart();
});

// continuer les achats
btnPurchasing.addEventListener("click", () => {
	window.location.href = "./index.html";
});

// ************total panier *******************

// montant total panier
let globalPrice = [];
// recuperer les prix du panier
if (empty(!cart)) {
	cart.forEach((i) => {
		let cartGlobalPrice = i.quantity * i.price;
		globalPrice.push(cartGlobalPrice);
	});
}

// additionner les prix du panier
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const finalPrice = globalPrice.reduce(reducer, 0);

localStorage.setItem("finalPrice", JSON.stringify(finalPrice));

const showPriceHtml = document.querySelector(".show-price-html");
showPriceHtml.innerHTML = `
Total panier :<span">${finalPrice}€ </span>

`;

if (finalPrice === 0) {
	showPriceHtml.style.visibility = "hidden";
	deletePurchasing.style.visibility = "hidden";

	basketEmptyHtml.innerHTML = `
	<div class="container-empty-cart col-12 " >
		<div class= "col-12 offset-3"> Aucun article dans votre panier </div>
		<a class="col-6 offset-3 btn btn-primary addArticle" href="./index.html" role="button">Ajouter des articles</a>
	</div>
	`;
	sendOrder.disabled = true;
}

// mise des id produits dans le localstorage pour l'envoi vers le back end
let productsId = [];
for (const key in cart) {
	productsId.push(cart[key].id);

	localStorage.setItem("products", JSON.stringify(productsId));
}

// envoi commande
if (sendOrder !== null) {
	// envoi de la commande
	sendOrder.addEventListener("click", (e) => {
		e.preventDefault();
		// recuperation des valeurs du formulaire
		const contact = {
			firstName: document.querySelector("#firstName").value,
			lastName: document.querySelector("#lastName").value,
			email: document.querySelector("#email").value,
			address: document.querySelector("#address").value,
			city: document.querySelector("#city").value,
			zip: document.querySelector("#zip").value,
		};

		if (firstName.value == "" || lastName.value == "" || email.value == "" || address.value == "" || city.value == "" || zip.value == "") {
			alert("merci de remplir tous les champs");
		} else {
			// //  mise de l'objet dans localStorage
			localStorage.setItem("contact", JSON.stringify(contact));

			const sendArticles = {
				products,
				contact,
			};

			sendBackEnd(sendArticles);
		}
	});
}
