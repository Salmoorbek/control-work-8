const cocktailList = document.getElementById('cocktailList');
const searchForm = document.getElementById('searchForm');
const errorMessage = document.getElementById('error-message');
const errorMessage2 = document.getElementById('error-message-second');
searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const searchTerm = document.getElementById('searchTerm').value;
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`)
        .then(response => response.json())
        .then(data => {
            cocktailList.innerHTML = '';
            data.drinks.forEach(drink => {
                const cocktailElement = document.createElement('div');
                cocktailElement.classList.add('cocktail');
                cocktailElement.setAttribute('data-id', drink.idDrink);
                const cocktailName = document.createElement('h3');
                cocktailName.textContent = drink.strDrink;
                const cocktailImg = document.createElement('img');
                cocktailImg.src = drink.strDrinkThumb;
                cocktailImg.alt = drink.strDrink;
                cocktailElement.appendChild(cocktailName);
                cocktailElement.appendChild(cocktailImg);
                cocktailList.appendChild(cocktailElement);

                cocktailElement.addEventListener('click', () => {
                    createModal(drink.idDrink);
                });
                document.getElementById('searchTerm').value = '';
            });
        })
        .catch(error => {
            errorMessage.textContent = 'An error has occurred. Please try again.';
            console.log(error);
        });
});

const searchTermInput = document.getElementById('searchTerm');
searchTermInput.addEventListener('input', () => {
    errorMessage.textContent = '';
});

function createModal(cocktailId) {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`)
        .then(response => response.json())
        .then(data => {
            const modal = document.createElement('div');
            modal.classList.add('modal');
            const modalContent = document.createElement('div');
            modalContent.classList.add('modal-content');
            const closeModal = document.createElement('span');
            closeModal.classList.add('close');
            closeModal.innerHTML = '&times;';
            const cocktailNameModal = document.createElement('h3');
            cocktailNameModal.textContent = data.drinks[0].strDrink;
            const cocktailImgModal = document.createElement('img');
            cocktailImgModal.src = data.drinks[0].strDrinkThumb;
            cocktailImgModal.alt = data.drinks[0].strDrink;
            const glassType = document.createElement('p');
            glassType.textContent = `Served in a ${data.drinks[0].strGlass}`;
            const category = document.createElement('p');
            category.textContent = `Category: ${data.drinks[0].strCategory}`;
            const alcoholic = document.createElement('p');
            alcoholic.textContent = `Alcoholic: ${data.drinks[0].strAlcoholic}`;
            const cocktailIngredients = document.createElement('ul');
            for (let i = 1; i <= 15; i++) {
                if (data.drinks[0][`strIngredient${i}`]) {
                    const ingredient = document.createElement('li');
                    const ingredientImg = document.createElement('img');
                    ingredientImg.src = `https://www.thecocktaildb.com/images/ingredients/${data.drinks[0][`strIngredient${i}`]}.png`;
                    ingredientImg.alt = data.drinks[0][`strIngredient${i}`];
                    const ingredientText = document.createElement('span');
                    ingredientText.textContent = `${data.drinks[0][`strIngredient${i}`]} - ${data.drinks[0][`strMeasure${i}`]}`;
                    ingredient.appendChild(ingredientImg);
                    ingredient.appendChild(ingredientText);
                    cocktailIngredients.appendChild(ingredient);

                    ingredient.addEventListener('click', () => {
                        createIngredientModal(data.drinks[0][`strIngredient${i}`]);
                    });
                }
            }
            const instructions = document.createElement('p');
            instructions.textContent = `Instructions: ${data.drinks[0].strInstructions}`;
            modalContent.appendChild(closeModal);
            modalContent.appendChild(cocktailNameModal);
            modalContent.appendChild(cocktailImgModal);
            modalContent.appendChild(glassType);
            modalContent.appendChild(category);
            modalContent.appendChild(alcoholic);
            modalContent.appendChild(cocktailIngredients);
            modalContent.appendChild(instructions);
            modal.appendChild(modalContent);
            document.body.appendChild(modal);
            closeModal.addEventListener('click', () => {
                modal.remove();
            });
            modal.style.display = 'block';
        })
        .catch(error => console.log(error));
}

const searchFormIngredient = document.getElementById('searchFormIngredient');

searchFormIngredient.addEventListener('submit', (event) => {
    event.preventDefault();
    const searchTermIngredient = document.getElementById('searchTermIngredient').value;
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchTermIngredient}`)
        .then(response => response.json())
        .then(dataIngredient => {
            cocktailList.innerHTML = '';
            dataIngredient.drinks.forEach(drink => {
                const cocktailElement = document.createElement('div');
                cocktailElement.classList.add('cocktail');
                cocktailElement.setAttribute('data-id', drink.idDrink);
                const cocktailName = document.createElement('h3');
                cocktailName.textContent = drink.strDrink;
                const cocktailImg = document.createElement('img');
                cocktailImg.src = drink.strDrinkThumb;
                cocktailImg.alt = drink.strDrink;
                cocktailElement.appendChild(cocktailName);
                cocktailElement.appendChild(cocktailImg);
                cocktailList.appendChild(cocktailElement);

                cocktailElement.addEventListener('click', () => {
                    createModal(drink.idDrink);
                });
                document.getElementById('searchTermIngredient').value = '';
            });
        })
        .catch(error => {
            errorMessage2.textContent = 'An error has occurred. Please try again.';
            console.log(error);
        });
});

function createIngredientModal(ingredientName) {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${ingredientName}`)
        .then(response => response.json())
        .then(data => {
            const modal = document.createElement('div');
            modal.classList.add('modal');
            const modalContent = document.createElement('div');
            modalContent.classList.add('modal-content');
            const closeModal = document.createElement('span');
            closeModal.classList.add('close');
            closeModal.innerHTML = '&times;';
            const ingredientNameModal = document.createElement('h2');
            ingredientNameModal.textContent = data.ingredients[0].strIngredient;
            const ingredientImgModal = document.createElement('img');
            ingredientImgModal.src = `https://www.thecocktaildb.com/images/ingredients/${data.ingredients[0].strIngredient.toLowerCase()}.png`;
            ingredientImgModal.alt = data.ingredients[0].strIngredient;
            const ingredientDescription = document.createElement('p');
            ingredientDescription.textContent = data.ingredients[0].strDescription;
            const ingredientSearchLink = document.createElement('button');
            ingredientSearchLink.classList.add('myButton');
            ingredientSearchLink.textContent = `Search cocktails with ${data.ingredients[0].strIngredient}`;
            ingredientSearchLink.addEventListener('click', () => {
                const searchFormIngredient = document.getElementById('searchFormIngredient');
                const searchTermIngredient = document.getElementById('searchTermIngredient');
                searchTermIngredient.value = data.ingredients[0].strIngredient;
                searchFormIngredient.dispatchEvent(new Event('submit'));
                modal.remove();
            });
            modalContent.appendChild(closeModal);
            modalContent.appendChild(ingredientNameModal);
            modalContent.appendChild(ingredientImgModal);
            modalContent.appendChild(ingredientDescription);
            modalContent.appendChild(ingredientSearchLink);
            modal.appendChild(modalContent);
            document.body.appendChild(modal);
            closeModal.addEventListener('click', () => {
                modal.remove();
            });
            modal.style.display = 'block';
        })
        .catch(error => console.log(error));
}

const searchTermInput2 = document.getElementById('searchTermIngredient');
searchTermInput2.addEventListener('input', () => {
    errorMessage2.textContent = '';
});