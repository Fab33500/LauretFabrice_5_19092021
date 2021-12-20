// ***************************** FONCTIONS ******************************
//Fonction ajout article sur page product
function addArticleHtml(imageUrl, name, euroPrice, description, colorHtml) {
	document.querySelector(".main-product").innerHTML = `<div class="d-flex flex-wrap col-12  card-product border border-primary">
		<img
			class="col-12 col-lg-6 card-img-product"
			src="${imageUrl}"
			alt=""
		/>
		<div class="col-12 col-lg-6 product-description">
			<div id="card-title-content" class="card-title-product-content">
				<div class=" card-title-part">
					<div class=" card-title-stars">
						<h5 class="card-title">${name}</h5>
						<div class="d-flex align-items-center  card-chevron">
							<i class="fas fa-star"></i>
							<i class="fas fa-star"></i>
							<i class="fas fa-star"></i>
							<i class="fas fa-star"></i>
							<i class="fas fa-star"></i>
						</div>
					</div>
					<div class="card-price-product">${euroPrice}€</div>
				</div>

					<p class="mt-lg-5 card-text description">${description}</p>
				<div class="d-flex cart-input">
				<div class="d-flex cart-quantity-color">
					<label>Quantité:</label>	
					<input type="number" class="quantity-product" name="quantity-product" min="1" max="10" value = "1" >
				</div>

				<div class="d-flex cart-quantity-color">
					<label>Coloris:</label>
					<select id="select-color" class="mt-lg-5">${colorHtml}</select>
				</div>
				</div>

					<a href="./order.html">
					<button type="button" id="send-cart" class=" mt-5 col-12 btn btn-primary "  >
					Ajouter au panier
					<div class="card-total-price-product"></div>
					</button>
					</a>
				</div>
			</div>
		</div>`;
}

// envoi dans le localstorage
const addTeddy = (teddy) => {
	let cart = JSON.parse(localStorage.getItem("cart")) || [];
	cart.push(teddy);

	localStorage.setItem("cart", JSON.stringify(removeDuplicates(cart)));
};

// supression des doublons du panier
function removeDuplicates(addcart) {
	let newCart = [];
	let uniqueProduct = {};

	// Boucle pour les éléments du tableau
	for (let i in addcart) {
		//Recuperation de l'Id
		let productId = addcart[i]["id"];

		uniqueProduct[productId] = addcart[i];
	}

	// Boucle pour mettre l'objet unique dans le tableau
	for (let i in uniqueProduct) {
		newCart.push(uniqueProduct[i]);
	}

	// Afficher les objets uniques
	return newCart;
}

// *******************************************************************************

//  Recuperation de l'URL du produit
const getUrl = window.location.search;

//  Supression du "?" recuperé avec getUrl
const productUrl = getUrl.slice(1);

// *********************************************************************************
// appel de l'API avec son ID

fetch(`http://localhost:3000/api/teddies/${productUrl}`)
	.then((response) => {
		if (response.ok) {
			return response.json();
		}
	})

	.then(({ name, description, price, colors, imageUrl, _id /* recuperation tableau de l'API*/ }) => {
		// recuperation de la liste des couleurs
		let colorHtml = "";
		colors.forEach((singleColor) => {
			colorHtml += `<option value="${singleColor}">${singleColor}</option>`;
		});

		const euroPrice = price / 100;

		addArticleHtml(imageUrl, name, euroPrice, description, colorHtml);

		//   ---------------------------Quantité produits----------------
		// selection du bouton ajouter au panier
		const sendCart = document.querySelector("#send-cart");

		const quantity = document.querySelector(".quantity-product");

		// controle de la quantite mini et maxi
		quantity.addEventListener("change", () => {
			if (quantity.value < 1 || quantity.value == null || quantity.value > 10) {
				sendCart.disabled = true;
			} else {
				sendCart.disabled = false;

				let totalProduct = quantity.value * euroPrice;

				document.querySelector(".card-total-price-product").innerHTML = `total Articles : ${totalProduct}€`;
			}
		});

		sendCart.addEventListener("click", () => {
			let article = {
				id: _id,
				name: name,
				price: euroPrice,
				quantity: quantity.value,
				total: quantity.value * euroPrice,
			};

			addTeddy(article);
		});
	})
	.catch((error) => {
		alert("Une erreur est survenue !");
	});
