const URI = process.env.REACT_APP_URI;

export function postRecipe(recipe) {
  const recipeStringify = JSON.stringify(recipe);
  return fetch(`${URI}/api/recipes/`, {
    method: "POST",
    body: recipeStringify,
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json());
}

export function getRecipes() {
  return fetch(`${URI}/api/recipes`)
    .then((res) => res.json());
}

export function getFilteredRecipes(ingredients) {
  const ingredientsStringify = JSON.stringify(ingredients);
  return fetch(`${URI}/api/recipes/filtered`, {
    method: "POST",
    body: ingredientsStringify,
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json());
}

export function getRandomRecipe() {
  return fetch(`${URI}/api/recipes/random`)
    .then((res) => res.json());
}

export function getRecipe(recipeId) {
  return fetch(`/api/recipes/${recipeId}`)
    .then((res) => res.json());
}

export function getIngredients() {
  return fetch(`${URI}/api/ingredients`)
    .then((res) => res.json());
}

export function getVerificationStatus(token) {
  return fetch(`${URI}/api/user/auth/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.status);
}

export function putUserIngredients(ingredients, token) {
  const ingredientsStringify = JSON.stringify({ ingredients });
  return fetch(`${URI}/api/user/ingredients`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: ingredientsStringify,
  });
}

export function getUserIngredients(token) {
  return fetch(`${URI}/api/user/ingredients`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json());
}

export function postSignIn(user) {
  const userStringify = JSON.stringify(user);
  return fetch(`${URI}/api/auth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: userStringify,
  })
    .then((res) => res.json());
}

export function postSignUp(user) {
  const userStringify = JSON.stringify(user);
  return fetch(`${URI}/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: userStringify,
  })
    .then((res) => res.json());
}
