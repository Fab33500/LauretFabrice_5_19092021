//  Recuperation de l'URL du produit

const urlRecovery = window.location.search;

//  Supression du "?" recuperé avec urlRecovery avec slice
const idRecovery = urlRecovery.slice(1);

// appel de l'API avec son ID

fetch(`http://localhost:3000/api/teddies/${idRecovery}`)
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

		const cardProduct = document.querySelector(".main-product");

		cardProduct.innerHTML = `<div class="d-flex flex-wrap col-12  card-product border border-primary">
		<img
			class="col-12 col-lg-6 card-img-product"
			src="${imageUrl}"
			alt=""
		/>
		<div class="col-12 col-lg-6 product-description">
			<div id="card-title-content" class="card-title-product-content">
				<div class="d-flex justify-content-between align-content-center card-title-stars">
					<h5 class="card-title">${name}</h5>
					<div class="d-flex align-items-center  card-chevron">
						<i class="fas fa-star"></i>
						<i class="fas fa-star"></i>
						<i class="fas fa-star"></i>
						<i class="fas fa-star"></i>
						<i class="fas fa-star"></i>
					</div>
				</div>
					<p class=" card-text description">${description}</p>
					<select id="select-color">${colorHtml}</select>

					<a href="./order.html">
					<button type="button" id="send-cart" class=" col-12 btn btn-primary">
					Ajouter au panier
					<div class="card-price-product">${euroPrice}€</div>
					</button>
					</a>
				</div>
			</div>
		</div>`;

		//   ---------------------------Panier---------------------------
		// selection du bouton ajouter au panier
		const sendCart = document.querySelector("#send-cart");
		console.log(sendCart);

		let cart;
		const article = {
			id: _id,
			name: name,
			price: euroPrice,
		};
		console.log(article);
		function addProduct(teddy) {
			cart = JSON.parse(localStorage.getItem("cart"));
			if (cart === null) {
				cart = [];
			}
			cart.push(teddy);
			localStorage.setItem("cart", JSON.stringify(cart));
		}

		sendCart.addEventListener("click", () => {
			addProduct(article);
			console.log(cart);
		});
		localStorage.clear();
	})
	.catch((error) => {
		alert("Une erreur est survenue !");
	});
