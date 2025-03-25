let showAll = false;

// Here the load the categories
const loadCategories = async () => {
  const res = await fetch(
    " https://openapi.programming-hero.com/api/peddy/categories"
  );
  const data = await res.json();
  const categories = data.categories;
  displayCategories(categories);
};

// {
//   "id": 1,
//   "category": "Cat",
//   "category_icon": "https://i.ibb.co.com/N7dM2K1/cat.png"
// }
// Here display the categories in button
const displayCategories = (categories) => {
  const categoriesContainer = document.getElementById("categories-container");
  categories.forEach((category) => {
    categoriesContainer.innerHTML += `
    <button onclick="loadcategoriesPets('${category.category}')"
          class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg px-14 btn-outline"
        >
          <img
            class="w-8"
            src=${category.category_icon}
            alt=""
          />
          <h1>${category.category}</h1>
        </button>
    `;
  });
};

// load the categories pets
const loadcategoriesPets = async (petName) => {
  const res = await fetch(
    ` https://openapi.programming-hero.com/api/peddy/category/${petName}`
  );
  const data = await res.json();
  const categoryPets = data.data;
  displayAllPets(categoryPets);
};

// Load all the pets
const loadAllPets = async () => {
  const res = await fetch(
    " https://openapi.programming-hero.com/api/peddy/pets"
  );
  const data = await res.json();
  const pets = data.pets;
  displayAllPets(pets);
};

// {
//   "petId": 1,
//   "breed": "Golden Retriever",
//   "category": "Dog",
//   "date_of_birth": "2023-01-15",
//   "price": 1200,
//   "image": "https://i.ibb.co.com/p0w744T/pet-1.jpg",
//   "gender": "Male",
//   "pet_details": "This friendly male Golden Retriever is energetic and loyal, making him a perfect companion for families. Born on January 15, 2023, he enjoys playing outdoors and is especially great with children. Fully vaccinated, he's ready to join your family and bring endless joy. Priced at $1200, he offers love, loyalty, and a lively spirit for those seeking a playful yet gentle dog.",
//   "vaccinated_status": "Fully",
//   "pet_name": "Sunny"
// }

// Display All pets
const displayAllPets = (pets) => {
  const petCardContainer = document.getElementById("pet-card-container");

  const showAllBtn = document.getElementById("show-all-btn");
  if (showAll) {
    showAllBtn.classList.add("hidden");
  } else {
    showAllBtn.classList.remove("hidden");
  }
  if (pets.length > 6 && !showAll) {
    pets = pets.slice(0, 6);
  }

  petCardContainer.innerHTML = "";

  // if there have no pet in amy category
  if (pets.length === 0) {
    petCardContainer.classList.remove("grid");
    petCardContainer.innerHTML = `
    <div class="bg-gray-200 text-center  p-32 space-y-4 rounded-2xl">
        <div class="flex justify-center items-center"><img   src="./images/error.webp" alt=""></div>
        <h1 class="text-5xl font-bold">No information Available</h1>
        <p>Oops! It seems that we currently don’t have any relevant information available for this section. This might be due to missing data or temporary unavailability. Please try checking back later.</p>
       </div>
    
    `;
    return
  }else{
    petCardContainer.classList.add("grid");
  }
  pets.forEach((pet) => {
    const { pet_name, image, breed, date_of_birth, gender, price } = pet;
    petCardContainer.innerHTML += `
    <div class="card  w-[360px] border-2">
            <figure class="px-6 pt-6">
              <img
                src=${image}
                alt="Shoes"
                class="rounded-xl w-full"
              />
            </figure>
            <div class="card-body  ">
              <h2 class="card-title">${pet_name} </h2>
              <p class="text-gray-500">Breed: ${breed} </p>
              <p class="text-gray-500">Birth: ${date_of_birth} </p>
              <p class="text-gray-500">Gender: ${gender} </p>
              <p class="text-gray-500">Price : ${price}$ </p>
              <hr>
              <div class="card-actions flex justify-around">
                <button class="btn bg-white border-2 border-[#0E7A81] text-[#0E7A81]"><img class="w-8" src="https://img.icons8.com/?size=100&id=U6uSXVbuA1xU&format=png&color=000000" alt=""></button>
                <button class="btn bg-white border-2 border-[#0E7A81] text-[#0E7A81]">Adopt</button>
                <button class="btn bg-white border-2 border-[#0E7A81] text-[#0E7A81]">Details</button>
              </div>
            </div>
          </div>
    `;
    console.log(pet);
  });
};

// Handle show all button
const handleShowAll = () => {
  showAll = true;
  loadAllPets();
};
loadAllPets();
loadCategories();
