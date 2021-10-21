let mainOrder = document.querySelector("#main-order");
console.log(mainOrder);

/**************  section form ********************/
let newDiv;
//  recuperation du formulaire
const recoveryForm = () => {
	newDiv = document.createElement("section");
	newDiv.setAttribute("id", "section-form");
	newDiv.setAttribute("class", "col-sm-12 col-lg-6");
	newDiv.innerHTML = `<form action="./confirm.html" method="POST" name="form" id="infos-form">
	<div class="form-row  col-lg-12">
		<div class="form-group col-lg-6">
			<label for="name">Nom</label>
			<input type="text" class="form-control" id="name" placeholder="Nom" name="name" />
			<small></small>
		</div>
	
		<div class="form-group col-lg-6">
			<label for="lastname">Prenom</label>
			<input type="text" class="form-control" id="lastname" placeholder="Prénom" name="lastname" />
			<small></small>
		</div>
	
		<div class="form-group col-md-12">
			<label for="email">Email</label>
			<input type="email" class="form-control" id="email" placeholder="JohnDoe@mail.fr" name="email" />
			<small></small>
		</div>
	
		<div class="form-group col-md-12">
			<label for="address">Addresse</label>
			<input type="text" class="form-control" id="address" placeholder="12 rte..." name="address" />
			<small></small>
		</div>
	
		<div class="form-group col-md-7">
			<label for="city">ville</label>
			<input type="text" class="form-control" id="city" placeholder="Bordeaux" name="city" />
			<small></small>
		</div>
	
		<div class="form-group col-md-5">
			<label for="zip">Code postal</label>
			<input type="text" class="form-control" id="zip" placeholder="33000" name="zip" />
			<small></small>
		</div>
	
		<p id="form--info">Tous les champs du formulaire doivent etre renseigner</p>
		<input type="button" id="submit" class="col-md-12 btn btn-primary btn-block" value ="Validez vos coordonnées"/>
	
		</form-row>
		`;
};
recoveryForm();
mainOrder.appendChild(newDiv);

// selection bouton envoi formulaire
const submit = document.querySelector("#submit");
console.log(submit);

/**************/

submit.addEventListener("click", (e) => {
	e.preventDefault();
	// recuperation des valeurs du formulaire
	const formHtml = {
		name: document.querySelector("#name").value,
		lastname: document.querySelector("#lastname").value,
		email: document.querySelector("#email").value,
		address: document.querySelector("#address").value,
		city: document.querySelector("#city").value,
		zip: document.querySelector("#zip").value,
	};
	console.log(formHtml);

	//  mise de l'objet dans localStorage
	localStorage.setItem("formHtml", JSON.stringify(formHtml));

	// envoi du cart et du formulaire la page de confirmation
	const confirm = {
		formHtml,
		cart,
	};
	console.log(confirm);
});

//**************** validation du formulaire ******************

// ecouter le bouton de paiement et empecher l'envoi si non conforme
let form = document.querySelector("#infos-form");

form.addEventListener("click", function (e) {
	if (validName == "" || validLastname == "" || validEmail == "" || validAddress == "" || validCity == "" || validZip == "") {
		e.preventDefault();
		alert("merci de remplir tous les");
		console.log("hello");
	}
});

//**************** validation du nom ******************
// ecouter la modification du nom
form.name.addEventListener("change", function () {
	validName(this);
});

const validName = (inputName) => {
	// creation regExp validation du nom
	let nameRegExp = new RegExp("^[ \u00c0-\u01ffa-zA-Z'-]+$");
	let testName = nameRegExp.test(inputName.value);
	// recuperation du small juste apres l'input name
	let small = inputName.nextElementSibling;

	// test de l'expression reguliere
	testValidInput(small, testName);
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
		return true;
	}
}
function smallRemove(small) {
	if (small) {
		small.innerHTML = "La saisie ne correspond pas au champ ";
		small.classList.remove("text-success");
		small.classList.add("text-warning");
		return false;
	}
}

// section pannier

//recuperation de l'article
const cart = JSON.parse(localStorage.getItem("cart"));

newDiv = document.createElement("section");
newDiv.setAttribute("id", "section-cart");
newDiv.setAttribute("class", " col-12 col-lg-6");

newDiv.innerHTML = `
<h2 class="col-6">Votre panier</h2>
<div class="row">
	<h1 class="col teddy-name">${cart[0].name}</h1>
	<p class="col-6 ref">Ref: ${cart[0].id}</p>
</div>

<div class="row">
	<div class="d-flex form-row col-6">
		<input type="button" id="decrement" class="minus" value=" - " />
		<input type="text" id="quantity" value="1" />
		<input type="button" id="increment" class="plus" value="+" />
	</div>
	<div class="row">
		<p class="col-6 prix">${cart[0].price}€</p>
	</div>
</div>
<div class="row">
	<button type="submit" id="submit" class="col-md-12 btn btn-primary btn-block">Finaliser le paiement</button>
	</div>
`;

mainOrder.appendChild(newDiv);

let valueCount;
let prix = document.querySelector("prix");
let inputMinus = document.querySelector(".minus");
let inputPlus = document.querySelector(".plus");

// ecouter le bouton plus
document.querySelector("#increment").addEventListener("click", function () {
	valueCount = document.querySelector("#quantity").value;
	valueCount++;
	document.querySelector("#quantity").value = valueCount;
	// desactivation bouton plus si il vaut 10 et desactive le bouton moins
	if (valueCount >= 10) {
		inputPlus.disabled = true;
	}
	if (inputPlus) {
		inputMinus.disabled = false;
	}
	console.log(quantity.value);
	console.log(cart[0].price);
	console.log(quantity.value * cart[0].price + "€");
});

// ecouter le bouton moins
document.querySelector("#decrement").addEventListener("click", function () {
	valueCount = document.querySelector("#quantity").value;
	valueCount--;
	document.querySelector("#quantity").value = valueCount;

	// desactivation bouton moins si il vaut 1
	if (valueCount < 1) {
		inputMinus.disabled = true;
	}

	if (document.querySelector("#increment")) {
		inputPlus.disabled = false;
	}

	console.log(quantity.value);
	console.log(valueCount * cart[0].price + "€");
});
