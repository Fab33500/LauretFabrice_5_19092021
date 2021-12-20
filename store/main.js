// declaration variables
let colors = [];
let id = [];
let teddyName = [];
let price = [];
let imgUrl = [];
let description = [];

// appel de l'API
fetch(`http://localhost:3000/api/teddies`)
	.then((response) => {
		if (response.ok) {
			return response.json();
		}
	})
	.then((articles) => {
		teddy(articles);
	})
	.catch((error) => {
		alert("Une erreur est survenue !");
	});

// Fonction pour recuperer les articles de l'API et les injecter dans Html
function teddy(articles) {
	articles.forEach((article, i) => {
		// insertion des articles sur accueil

		colors[i] = article.colors;
		id[i] = article._id;
		teddyName[i] = article.name;
		price[i] = article.price / 100;
		imgUrl[i] = article.imageUrl;
		description[i] = article.description;

		document.getElementById("main-list").innerHTML += `
		<div class="col-10 col-sm-10 col-md-5 col-lg-3 card border border-primary">
			<a href="./product.html?${id[i]} " alt="ourson" />
			<img class="card-img-top card-img-list" src="${imgUrl[i]} " alt="ourson" />
					<h5 class="card-title text-center">${teddyName[i]}</h5>
					<p class="card-text description">${description[i]}</p>
					<div class="d-flex card-price-chevron">
						<div class="card-price">${price[i]}<span>€</span></div>
						<div class="card-chevron">
							<i class="fas fa-star"></i>
							<i class="fas fa-star"></i>
							<i class="fas fa-star"></i>
							<i class="fas fa-star"></i>
							<i class="fas fa-star"></i>
						</div>
					</div>
				</div>
			</a>
		</div>
		 `;
	});
}
