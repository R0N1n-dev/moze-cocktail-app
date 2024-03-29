const drink_container = document.getElementById("drink");
const search = document.querySelector(".search");

search.addEventListener("keypress", setQuery);

function setQuery(e) {
    if (e.key == "Enter") {
        getDrink(search.value);
    }
}

function getDrink(query) {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`)
        .then((res) => res.json())
        .then((res) => {
            createDrink(res.drinks[0]);
        })
        .catch((e) => {
            console.warn(e);
        });
}

const createDrink = (drink) => {
        const ingredients = [];

        // Get all ingredients from the object. Up to 20
        for (let i = 1; i <= 20; i++) {
            if (drink[`strIngredient${i}`]) {
                ingredients.push(
                        `${drink[`strIngredient${i}`]} - ${drink[`strMeasure${i}`]}`
      );
    } else {
      // Stop if there are no more ingredients
      break;
    }
  }

  const newInnerHTML = `
		<div class="card">
			<div class="card-image img-responsive">
				<img src="${drink.strDrinkThumb}" alt="Drink Image">
        </div>
        <div class="card-header">
          <div class="card-title">
				${
          drink.strCategory
            ? `<p><strong>Category:</strong> ${drink.strCategory}</p>`
            : ""
        }</div>
        <div class="card-subtitle">
				${drink.strArea ? `<p><strong>Area:</strong> ${drink.strArea}</p>` : ""}
				${
          drink.strTags
            ? `<p><strong>Tags:</strong> ${drink.strTags
                .split(",")
                .join(", ")}</p>`
            : ""
        }
        </div>
        <div class="card-body">
				<h5>Ingredients:</h5>
				<ul>
					${ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}
				</ul>
          </div>
        </div>
        <div class="card-footer">
          <h4>${drink.strDrink}</h4>
          <p>${drink.strInstructions}</p>
			  </div>
			</div>
			
		</div>
	`;
  drink_container.innerHTML = newInnerHTML;
};