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
    return;
  } else {
    petCardContainer.classList.add("grid");
  }
  pets.forEach((pet) => {
    const { pet_name, image, breed, date_of_birth, gender, price, petId } = pet;
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
                <button onclick="selectPet(${petId})" class="btn bg-white border-2 border-[#0E7A81] text-[#0E7A81]">Adopt</button>
                <button onclick="petDetails(${petId})" class="btn bg-white border-2 border-[#0E7A81] text-[#0E7A81]">Details</button>
              </div>
            </div>
          </div>
    `;
    console.log(pet);
  });
};

// Show the pet details in modal
const petDetails = async (petId) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${petId}`
  );
  const data = await res.json();
  const details = data.petData;

  const {
    breed,
    date_of_birth,
    price,
    image,
    gender,
    pet_details,
    vaccinated_status,
    pet_name,
  } = details;

  const modalContainer = document.getElementById("modal-container");
  modalContainer.innerHTML = `
  <dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
        <div class="modal-box space-y-3">
          <div>
            <img class="w-full" src=${image} alt="" />
          </div>
          <h3 class="text-2xl font-bold">${pet_name}</h3>
          <p class="text-gray-500">Breed: ${breed}</p>
          <p class="text-gray-500">Birth: ${date_of_birth}</p>
          <p class="text-gray-500">Gender: ${gender}</p>
          <p class="text-gray-500">Price : ${price}</p>
          <p class="text-gray-500">Vaccinated Status : ${vaccinated_status}</p>
          <hr />
          <h3 class="text-lg font-bold">details Information</h3>
          <p class="text-gray-500">
            ${pet_details}
          </p>
          <div>
            <form method="dialog">
              <button
                class="btn bg-[#0E7A811A ] border-2 border-[#0E7A81] text-[#0E7A81] w-full"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </dialog>
  `;

  my_modal_5.showModal();
};

// pet selected
const selectPet = async (id) => {
  console.log(id);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${id}`
  );
  const data = await res.json();
  const petDataDetails = data.petData;
  console.log(petDataDetails);

  const selectPetContainer = document.getElementById("select-pet-container");
 
  selectPetContainer.innerHTML += `
  <img class="w-40 rounded-xl" src=${petDataDetails.image} alt="" />
  `;
  
};

// Handle show all button
const handleShowAll = () => {
  showAll = true;
  loadAllPets();
};
loadAllPets();
loadCategories();
