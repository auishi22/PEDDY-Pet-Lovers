// Here the load the categories
const loadCategories = async () => {
  const res = await fetch(
    " https://openapi.programming-hero.com/api/peddy/categories"
  );
  const data = await res.json();
  const categories = data.categories;
  displayCategories(categories);
};

// Here display the categories in button
const displayCategories = (categories) => {
  console.log(categories);
  console.log(categories);
};
loadCategories();
