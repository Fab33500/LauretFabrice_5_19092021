// recuperation du localstorage
let subTotal = JSON.parse(localStorage.getItem("price"));

/**************  section form ********************/

// selection bouton envoi formulaire
const validate = document.querySelector("#validate");

/**************/

validate.addEventListener("click", (e) => {
	e.preventDefault();
	// recuperation des valeurs du formulaire
	const formHtml = {
		firstName: document.querySelector("#firstName").value,
		lastname: document.querySelector("#lastname").value,
		email: document.querySelector("#email").value,
		address: document.querySelector("#address").value,
		city: document.querySelector("#city").value,
		zip: document.querySelector("#zip").value,
	};

	if (firstName.value == "" || lastname.value == "" || email.value == "" || address.value == "" || city.value == "" || zip.value == "") {
		e.preventDefault();
		alert("merci de remplir tous les champs");
	} else {
		// //  mise de l'objet dans localStorage
		localStorage.setItem("formHtml", JSON.stringify(formHtml));
	}
});

//**************** validation du formulaire ******************

//**************** validation du nom ******************
// ecouter la modification du nom
form.firstName.addEventListener("change", function () {
	validName(this);
});

const validName = (inputfirstName) => {
	// creation regExp validation du nom
	let nameRegExp = new RegExp("^[ \u00c0-\u01ffa-zA-Z'-]+$");
	let testfirstName = nameRegExp.test(inputfirstName.value);
	// recuperation du infoMsgElt juste apres l'input name
	let infoMsgElt = inputfirstName.nextElementSibling;

	// test de l'expression reguliere
	testValidInput(infoMsgElt, testfirstName);
};

//**************** validation du prénom ******************
// ecouter la modification du lastname
form.lastname.addEventListener("change", function () {
	validLastname(this);
});

const validLastname = (inputLastname) => {
	// creation regExp validation du adress
	let lastnameRegExp = new RegExp("^[ \u00c0-\u01ffa-zA-Z'-]+$");
	let testLastname = lastnameRegExp.test(inputLastname.value);

	// recuperation du infoMsgElt juste apres l'input adress
	let infoMsgElt = inputLastname.nextElementSibling;

	// test de l'expression reguliere
	testValidInput(infoMsgElt, testLastname);
};

//**************** validation de l'email ******************

// ecouter la modification de l email
form.email.addEventListener("change", function () {
	validEmail(this);
});

const validEmail = (inputEmail) => {
	// creation regExp validation Email
	let emailRegExp = new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$", "g");
	let testEmail = emailRegExp.test(inputEmail.value);

	// recuperation du infoMsgElt juste apres l'input email
	let infoMsgElt = inputEmail.nextElementSibling;

	// test de l'expression reguliere
	testValidInput(infoMsgElt, testEmail);
};

//**************** validation de l'addresse ******************
// ecouter la modification du address
form.address.addEventListener("change", function () {
	validAddress(this);
});

const validAddress = (inputAddress) => {
	// creation regExp validation du adress
	let addressRegExp = new RegExp("^([a-zA-Z0-9\u0600-\u06FF\u0660-\u0669\u06F0-\u06F9 _.-]+)$");
	let testAddress = addressRegExp.test(inputAddress.value);

	// recuperation du infoMsgElt juste apres l'input address
	let infoMsgElt = inputAddress.nextElementSibling;

	// test de l'expression reguliere
	testValidInput(infoMsgElt, testAddress);
};

//**************** validation de la ville ******************
// ecouter la modification du city
form.city.addEventListener("change", function () {
	validCity(this);
});

const validCity = (inputCity) => {
	// creation regExp validation du city
	let cityRegExp = new RegExp("^[ \u00c0-\u01ffa-zA-Z'-]+$");
	let testCity = cityRegExp.test(inputCity.value);

	// recuperation du infoMsgElt juste apres l'input city
	let infoMsgElt = inputCity.nextElementSibling;

	// test de l'expression reguliere
	testValidInput(infoMsgElt, testCity);
};

//**************** validation du code postal ******************
// ecouter la modification du zip
form.zip.addEventListener("change", function () {
	validZip(this);
});

const validZip = (inputZip) => {
	// creation regExp validation du city
	let zipRegExp = new RegExp("^((0[1-9])|([1-8][0-9])|(9[0-8])|(2A)|(2B))[0-9]{3}$");
	let testZip = zipRegExp.test(inputZip.value);

	// recuperation du infoMsgElt juste apres l'input city
	let infoMsgElt = inputZip.nextElementSibling;

	testValidInput(infoMsgElt, testZip);
};

function testValidInput(infoMsgElt, testName, testLastname, testEmail, testAddress, testZip, testCity) {
	// Message d'alerte du remplissage des inputss
	if (testZip || testCity || testName || testLastname || testEmail || testAddress) {
		infoMsgEltAdd(infoMsgElt);
	} else {
		infoMsgEltRemove(infoMsgElt);
	}
}

// fonction ajout de message d'alerte lors du remplissage des inputs
function infoMsgEltAdd(infoMsgElt) {
	if (infoMsgElt) {
		infoMsgElt.innerHTML = "Le champ est valide";
		infoMsgElt.classList.remove("text-warning");
		infoMsgElt.classList.add("text-success");
		validate.disabled = false;
		return true;
	}
}
function infoMsgEltRemove(infoMsgElt) {
	if (infoMsgElt) {
		infoMsgElt.innerHTML = "La saisie ne correspond pas au champ ";
		infoMsgElt.classList.remove("text-success");
		infoMsgElt.classList.add("text-warning");
		validate.disabled = true;
		return false;
	}
}

//************************section pannier**********************

//recuperation du panier dans le localStorage

let cartElt = JSON.parse(localStorage.getItem("cart"));

const basket = document.querySelector("#basket");
const basketEmpty = document.querySelector(".basket-empty");

// si panier vide
if (cartElt === null || cartElt == 0) {
	submit.disabled = true;
	basketEmpty.innerHTML = `
	<div class="container-empty-cart col-12 " >
		<div class= "col-12 offset-3"> Aucun article dans votre panier </div>
		<a class="col-6 offset-3 btn btn-primary addArticle" href="./index.html" role="button">Ajouter des articles</a>
	</div>
	`;
	// supprime le bouton "vider le panier" si le panier est vide
	setTimeout(() => {
		document.querySelector("#delete-purchasing").style.display = "none";
	}, 100);
} else {
	addTeddies();

	submit.disabled = false;
}

// fonction ajout dans le panier
function addTeddies() {
	let teddies = [];

	cartElt.forEach((n) => {
		teddies =
			teddies +
			`
			<div class="d-block col-sm-12 col-md-6 row">
			<h2 class="col-4 name-cart-item teddy-name teddy-name-order">${n.name}</h2>
			<p class="name-cart-item ref ref-order">Ref: ${n.id} </p>
		</div>
		<div class="form-row form-compt col-3">
			<input type="number" id="quantity" name="quantity" min="0" max="10" value=5></input>
		</div>
		<p class="total-price name-cart-item col-2 mt-3">${5 * n.price}€</p>
		<button type="button" id="send-cart" class=" btn-delete btn-dark ">X</button>
	</div>			
		`;

		basket.innerHTML = teddies;
	});
}

// suppression des produits du pannier
let btnDelete = document.querySelectorAll(".btn-delete");

for (let i = 0; i < btnDelete.length; i++) {
	btnDelete[i].addEventListener("click", (e) => {
		e.preventDefault();

		// selection id à supprimer
		let idDelete = cartElt[i].id;

		// creer un nouveau tableau lors de la supression d'un element
		cartElt = cartElt.filter((el) => el.id !== idDelete);

		// envoyer dans local Storage
		localStorage.setItem("cart", JSON.stringify(cartElt));
		// réactualiser la page
		location.reload();
	});
}

// ********************* vider le panier *********************

// création btn vider panier insertion dans le html
basket.insertAdjacentHTML(
	"afterend",
	`<div id="delete-purchasing">
		<button class="btn-delete-cart btn-delete-purchasing">Vider le panier</button>
		<button class=" btn-purchasing btn-delete-purchasing">Continuer les achats</button>
	</div>
`
);

//  fonction popup suppression panier
function popupDeleteCart() {
	if (window.confirm("OK pour supprimer le panier ou ANNULER pour rester sur le panier")) {
		localStorage.removeItem("cart");
		localStorage.removeItem("price");
		location.reload();
	}
}

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

// *************recuperer la valeur de l'input "quantity"

// let quantity = document.querySelector("#quantity");
// let totalPrice = document.querySelector(".total-price");

// class Producte {
// 	constructor(qte) {
// 		this.qte = qte;
// 	}
// }

// class Prix {
// 	constructor(prix) {
// 		this.prix = prix;
// 	}
// }

// cart.forEach((z) => {
// 	const prix = new Prix(z.price);
// 	console.log(prix);
// });

// quantity.addEventListener("input", () => {
// 	cart.forEach((z) => {
// 		const producte = new Producte(quantity.value);
// 		console.log(Object.values(producte) * z.price);
// 		totalPrice.innerHTML = `${Object.values(producte) * z.price}`;
// 	});
// });

// // ************total panier *******************

// // montant total panier
// let globalPrice = [];
// // recuperer les prix du panier

// cart.forEach((g) => {
// 	let cartGlobalPrice = g.price;
// 	globalPrice.push(cartGlobalPrice);
// 	console.log(globalPrice + "unité :" + g.price);
// });

// // additionner les prix du panier
// const reducer = (accumulator, currentValue) => accumulator + currentValue;
// const finalPrice = globalPrice.reduce(reducer, 0);
// console.log(finalPrice);

// // afficher le total dans le panier html
// const showPriceHtml = `
// <h3 class= "show-price-html">Total panier :<span> ${finalPrice}€</span></h2>
// `;
// basket.insertAdjacentHTML("afterend", showPriceHtml);

// // test
