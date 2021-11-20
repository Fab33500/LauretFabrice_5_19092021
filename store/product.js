//  Recuperation de l'URL du produit
const getUrl = window.location.search;
console.log(getUrl);

//  Supression du "?" recuperé avec getUrl
const productUrl = getUrl.slice(1);

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

		const teddyElt = document.querySelector(".main-product");

		teddyElt.innerHTML = `<div class="d-flex flex-wrap col-12  card-product border border-primary">
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
					<input type="number" class="quantity-product" name="quantity-product" min="1" max="10" value = "0"</p>
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

		//   ---------------------------Quantité produits----------------
		// selection du bouton ajouter au panier
		const sendCart = document.querySelector("#send-cart");
		console.log(sendCart);

		const quantity = document.querySelector(".quantity-product");
		// controle de l'ajout de la quantité
		if (quantity.value <= 0 || quantity.value == null) {
			console.log("ok c -");
			sendCart.disabled = true;
		}

		// recuperation de la quantité
		function test() {
			quantity.addEventListener("input", () => {
				if (quantity.value <= 0 || quantity.value == null || quantity.value > 10) {
					sendCart.disabled = true;
				} else {
					sendCart.disabled = false;
					console.log(quantity.value);
					let totalProduct = quantity.value * euroPrice;

					document.querySelector(".card-total-price-product").innerHTML = `total Articles : ${totalProduct}€`;
					localStorage.setItem("price", JSON.stringify(totalProduct));
				}
			});
		}
		test();

		//   ---------------------------Panier---------------------------

		//  Création du panier
		let cart;
		const article = {
			id: _id,
			name: name,
			price: euroPrice,
		};

		//  Création fonction ajout au panier dans le localStorage
		function addTeddy(teddy) {
			cart = JSON.parse(localStorage.getItem("cart"));

			if (cart) {
				cart.push(teddy);

				localStorage.setItem("cart", JSON.stringify(cart));
			} else {
				cart = [];
				cart.push(teddy);

				localStorage.setItem("cart", JSON.stringify(cart));
			}
		}
		sendCart.addEventListener("click", () => {
			addTeddy(article);

			// supression des doublons dans le panier
			const removeDuplicates = new Set();
			console.log(removeDuplicates);

			const filterTeddies = cart.filter((el) => {
				const duplicate = removeDuplicates.has(el.id);
				removeDuplicates.add(el.id);
				return !duplicate;
			});
			console.log(filterTeddies);

			if (filterTeddies) {
				localStorage.setItem("cart", JSON.stringify(filterTeddies));
			}
		});
	})
	.catch((error) => {
		alert("Une erreur est survenue !");
	});
