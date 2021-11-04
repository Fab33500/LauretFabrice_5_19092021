let mainOrder = document.querySelector("#main-order");
console.log(mainOrder);

/**************  section form ********************/

// selection bouton envoi formulaire
const validate = document.querySelector("#validate");
console.log(validate);

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
	// recuperation du small juste apres l'input name
	let small = inputfirstName.nextElementSibling;

	// test de l'expression reguliere
	testValidInput(small, testfirstName);
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

	// recuperation du small juste apres l'input adress
	let small = inputLastname.nextElementSibling;

	// test de l'expression reguliere
	testValidInput(small, testLastname);
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

	// recuperation du small juste apres l'input email
	let small = inputEmail.nextElementSibling;

	// test de l'expression reguliere
	testValidInput(small, testEmail);
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

	// recuperation du small juste apres l'input address
	let small = inputAddress.nextElementSibling;

	// test de l'expression reguliere
	testValidInput(small, testAddress);
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

	// recuperation du small juste apres l'input city
	let small = inputCity.nextElementSibling;

	// test de l'expression reguliere
	testValidInput(small, testCity);
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

	// recuperation du small juste apres l'input city
	let small = inputZip.nextElementSibling;

	testValidInput(small, testZip);
};

function testValidInput(small, testName, testLastname, testEmail, testAddress, testZip, testCity) {
	// Message d'alerte du remplissage des inputss
	if (testZip || testCity || testName || testLastname || testEmail || testAddress) {
		smallAdd(small);
	} else {
		smallRemove(small);
	}
}

// fonction ajout de message d'alerte lors du remplissage des inputs
function smallAdd(small) {
	if (small) {
		small.innerHTML = "Le champ est valide";
		small.classList.remove("text-warning");
		small.classList.add("text-success");
		validate.disabled = false;
		return true;
	}
}
function smallRemove(small) {
	if (small) {
		small.innerHTML = "La saisie ne correspond pas au champ ";
		small.classList.remove("text-success");
		small.classList.add("text-warning");
		validate.disabled = true;
		return false;
	}
}

//************************section pannier**********************

//recuperation du panier dans le localStorage
let cart = JSON.parse(localStorage.getItem("cart"));
console.log(cart);

const showCart = document.querySelector("#show-cart");
const showCartEmpty = document.querySelector(".show-cart-empty");
console.log(showCart);

// si panier vide
if (cart === null || cart == 0) {
	submit.disabled = true;
	showCartEmpty.innerHTML = `
	<div class="container-empty-cart col-12 " >
		<div class= "col-12 offset-3"> Aucun article dans votre panier </div>
		<a class="col-6 offset-3 btn btn-primary addArticle" href="./index.html" role="button">Ajouter des articles</a>
	</div>
	`;
	// supprime le bouton "vider le panier" si le panier est vide
	btnDeletCart.style.display = "none";
} else {
	let totalCart = [];
	for (let n = 0; n < cart.length; n++) {
		console.log(cart.length);
		totalCart =
			totalCart +
			`
			<div class="d-block col-sm-12 col-md-6 row">
			<h2 class="col-4 name-cart-item teddy-name teddy-name-order">${cart[n].name}</h2>
			<p class="name-cart-item ref ref-order">Ref: ${cart[n].id}</p>
		</div>
		<div class="form-row form-compt col-3">
			<div class="d-flex plus-minus-row col-2 ">
				<div type="button" id="decrement" class="minus"   />
					<i class="square fas fa-caret-square-up"></i>
				</div>
				<div type="button" id="increment" class="plus"  />
					<i class="square fas fa-caret-square-down"></i>
				</div>
			</div>
			<input type="text" id="quantity" value="1" />
		</div>
		<p class="total-price name-cart-item col-2 mt-3">${cart[n].price}€</p>
		<button type="button" id="send-cart" class=" btn-delete btn-dark ">X</button>
	</div>			
		`;

		if (cart.length) {
			showCart.innerHTML = totalCart;
		}
	}

	submit.disabled = false;
	console.log("pas vide");
}

// suppression des produits du pannier
let btnDelete = document.querySelectorAll(".btn-delete");
console.log(btnDelete);

for (let d = 0; d < btnDelete.length; d++) {
	btnDelete[d].addEventListener("click", (e) => {
		e.preventDefault();

		// selection id à supprimer
		let idDelete = cart[d].id;
		console.log(idDelete);
		// methode filter pour creer un nouveau tableau lors de la supression d'un element
		cart = cart.filter((el) => el.id !== idDelete);
		console.log(cart);
		// envoyer dans local Storage
		localStorage.setItem("cart", JSON.stringify(cart));
		// réactualiser la page
		location.reload();
	});
}

// ********************* vider le panier *********************

// création btn vider panier insertion dans le html
showCart.insertAdjacentHTML(
	"afterend",
	`<button class="btn-delete-cart btn-delete-purchasing">Vider le panier</button>
	<button class=" btn-purchasing btn-delete-purchasing">Continuer les achats</button>
`
);

//  fonction popup suppression panier
function popupDeleteCart() {
	if (window.confirm("OK pour supprimer le panier ou ANNULER pour rester sur le panier")) {
		localStorage.removeItem("cart");
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
