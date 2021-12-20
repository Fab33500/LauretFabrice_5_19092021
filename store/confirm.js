// recupere uniquement les ID
const products = JSON.parse(localStorage.getItem("products"));

const url = "http://localhost:3000/api/teddies/order ";

const cartConfirmOrder = JSON.parse(localStorage.getItem("cart"));
const contact = JSON.parse(localStorage.getItem("contact"));

const totalPriceOrder = localStorage.getItem("finalPrice");

//  Recuperation de l'URL du produit
const getUrlId = window.location.search;

//  Supression du "?" recuperé avec getUrl
const orderId = getUrlId.slice(1);

const lastnameHtml = document.querySelector(".lastname");
const orderIdHtml = document.querySelector(".order-id");
const totalPriceHtml = document.querySelector(".total-price");

//Fonction insertion des coordonnées de livraison
function insertAfterTable() {
	tableConfirm.insertAdjacentHTML(
		"afterend",
		`<div id="contact-details" >
		<p>La livraison se fera à l'adresse ci-dessous:</p>
		<p>M (Mme) ${contact.firstName} ${contact.lastName}</br>
		${contact.address}</br>
		${contact.zip} ${contact.city}</br>
		${contact.email}</p>
	</div>
`
	);
}

// fonction vider localstorage et reour à l'accueil
function clearOrder() {
	localStorage.clear();
	window.location.href = "./index.html";
}

//Fonction envoi les données au backend et recupere un Id de commande
function sendBackEnd(sendArticles) {
	const option = {
		method: "POST",
		body: JSON.stringify(sendArticles),
		headers: {
			"Content-Type": "application/json",
		},
	};

	fetch(url, option)
		.then((response) => {
			if (response.ok) {
				return response.json();
			}
		})
		.then((order) => {
			// envoi sur page confirm commande
			window.location.href = "./confirm.html?" + order.orderId;
		})
		.catch((error) => {
			alert("Une erreur est survenue !, Vous devez ajouter des articles à votre panier");
		});
}

function empty(element) {
	if (element == null || element == 0) {
		return true;
	}
}

// *********************************************************************************

if (empty(!lastnameHtml) && empty(!orderIdHtml) && empty(!totalPriceHtml)) {
	lastnameHtml.innerHTML = `${contact.lastName} ,`;
	orderIdHtml.innerHTML = `${orderId}`;
	totalPriceHtml.innerHTML = `${totalPriceOrder}€`;
}

// affichage récapitulatif commande
const tbodyConfirmHtml = document.getElementById("tbody-confirm");
const tableConfirm = document.querySelector(".table-confirm");
let listeOrder = [];
if (empty(!cartConfirmOrder) && empty(!tbodyConfirmHtml)) {
	cartConfirmOrder.forEach((elt) => {
		listeOrder += `
		<tr class="tr-confirm">
			<th scope="row" class="table-article">${elt.name}</th>
			<td class="table-quantity">${elt.quantity}</td>
			<td class="table-subtotal">${elt.total}€</td>
		</tr>
		
		`;
		tbodyConfirmHtml.innerHTML = listeOrder;
	});

	insertAfterTable();
}

// effacer le localstorage et revenir à l'accueil
const resetHtml = document.querySelector("#reset");
if (empty(!resetHtml)) {
	setInterval(function () {
		var div = document.querySelector("#counter");
		var count = div.textContent - 1;
		div.textContent = count;
		if (count <= 1) {
			clearOrder();
		}
	}, 1500);

	resetHtml.addEventListener("click", function () {
		clearOrder();
	});
}
