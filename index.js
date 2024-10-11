
// load categories
const spinner = document.getElementById("spinner");
const petCardSection = document.getElementById("pet-card-section");
const petsCardContainer = document.getElementById("pets-card-container");
const petImageContainer = document.getElementById("pet-image-container");
const lowToHigSort = document.getElementById("lowToHighSort");
const highToLowSort = document.getElementById("highToLowSort");
let currentData = [];
let currentCategoryData = [];
let isCategoryActive = false;

    spinner.classList.remove("hidden");
    petCardSection.classList.add("hidden")

    lowToHigSort.addEventListener("click",()=>{
        lowToHighSortData();
    })
    highToLowSort.addEventListener("click",()=>{
        highToLowSortData();
    })

const loadCategories = async()=>{
    const res = await fetch("https://openapi.programming-hero.com/api/peddy/categories");
    const data = await res.json();
    displayCategories(data.categories);
}

const loadAllData = async()=>{
    displayAllData(currentData);
    spinner.classList.add("hidden");
    petCardSection.classList.remove("hidden")
    
    const res = await fetch("https://openapi.programming-hero.com/api/peddy/pets");
    const data = await res.json();
    isCategoryActive = false;
    currentData = data.pets;
    
    displayAllData(currentData);
    
}

const lowToHighSortData = ()=>{
    petsCardContainer.innerHTML = '';
    petImageContainer.innerHTML='';
    let dataSort = isCategoryActive?[...currentCategoryData]:[...currentData];
       dataSort.sort((a,b)=>{
            return a.price - b.price;
       })

       spinner.classList.remove("hidden");
       setTimeout(()=>{
        spinner.classList.add("hidden");
        displayAllData(dataSort);
       },1000)
       
}

const highToLowSortData = ()=>{
    petsCardContainer.innerHTML = '';
    petImageContainer.innerHTML='';
    let dataSort = isCategoryActive?currentCategoryData:currentData;
    dataSort.sort((a,b)=>{
            return b.price - a.price;
    })
    spinner.classList.remove("hidden");
    setTimeout(()=>{
        spinner.classList.add("hidden");
        displayAllData(dataSort);
    },1000)

    
}

const loadCategoryData=async(category)=>{
    
    const categoryBtns = document.getElementsByClassName("categoryBtn");
    
        for(btn of categoryBtns){
            btn.classList.remove("rounded-[4rem]","bg-[#0E7A81]","text-white","bg-white")
        }
        
        const categoryBtn = document.getElementById(`btn-${category}`);
        
        categoryBtn.classList.add("rounded-[4rem]","bg-[#0E7A81]","text-white");
        
    spinner.classList.remove("hidden");
    
    petCardSection.classList.add("hidden")
   
    petsCardContainer.innerHTML = ''
    petImageContainer.innerHTML = '';
    
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`);
    const data = await res.json();
    currentCategoryData = data.data;
    isCategoryActive = true;
    setTimeout(()=>{
        spinner.classList.add("hidden");
        petCardSection.classList.remove("hidden")
        displayAllData(data.data);
    },2000)
}



const displayCategories = (categories)=>{
    
    const categoryBtnContainer = document.getElementById("category-btn-container");
    categories.forEach((item)=>{
        const {category,category_icon,id} = item;
        
        const div = document.createElement("div");
        
         div.innerHTML = `
                         
                        

                            <button id="btn-${category}" onclick="loadCategoryData('${category}')" class="categoryBtn btn h-[4rem] sm:h-[6rem]  rounded-[16px] w-full bg-white border border-[#0E7A81]  hover:bg-[#0E7A81] hover:text-white">
                                <div class="flex gap-3 items-center">
                                    <img class="w-[30%] sm:w-full" src=${category_icon} alt="">
                                    <span class="font-[700] text-[16px] sm:text-[24px]">${category}</span>
                                </div>
                            </button>
                        
                        
                    
       `
       categoryBtnContainer.append(div);

    })
}

const displayAllData =(pets)=>{
    
    const petsCardContainer = document.getElementById("pets-card-container");
    petsCardContainer.innerHTML = ''
    
    if(pets.length == 0 ){
        petsCardContainer.classList.remove("grid")
        petsCardContainer.innerHTML = `
                <div class="flex flex-col justify-center items-center min-h-[300px] space-y-4 py-10">
                    <div>
                        <img src="images/error.webp"/>
                    </div>
                    <div class="flex flex-col items-center justify-center space-y-2">
                        <h2 class="text-center text-[24px] font-bold">No Information Available</h2>
                        <p class="text-center w-3/5 opacity-80">It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
                            its layout. The point of using Lorem Ipsum is that it has a.</p>
                    </div>
                </div>
        `
        return;
    }else{
        petsCardContainer.classList.add("grid")
    }
    pets.forEach((pet)=>{
        
        const div = document.createElement("div");
        div.innerHTML = `
             <!-- dynamic card -->
                                            <div class="p-4 border  shadow-md rounded-xl space-y-2">
                                                <div class="rounded-lg w-full">
                                                  <img class="rounded-xl w-full" src=${pet.image} alt="">
                                                </div>
                                                <div class="space-y-1">
                                                  <h2 class="text-[24px] font-bold mb-2">${pet.pet_name}</h2>

                                                  <p class="opacity-80 font-semibold"><i class="fa-solid fa-qrcode mr-2"></i>Breed: ${pet.breed?pet.breed:"Not found"}</p>
                                                  <p class="opacity-80 font-semibold"><i class="fa-regular fa-calendar mr-2"></i>Birth: ${pet.date_of_birth?pet.date_of_birth:"Not found"}</p>
                                                  <p class="opacity-80 font-semibold"><i class="fa-solid fa-venus mr-2"></i>gender: ${pet.gender?pet.gender:"Not found"}</p>
                                                  <p class="opacity-80 font-semibold"><i class="fa-solid fa-dollar-sign mr-2"></i>Price : ${pet.price?pet.price:"Not found"}</p>
                                                
                                                </div>
                                                <div class="divider"></div>
                                                <div class="flex justify-between">
                                                    <button onclick="showPetImage('${pet.image}')" class="btn btn-sm px-6  bg-white border-[#0E7A81] hover:bg-[#0E7A81] hover:text-white"><i class="fa-regular fa-thumbs-up"></i></button>
                                                    <button id="adopt-btn-${pet.petId}" class="btn btn-sm px-5  bg-white border-[#0E7A81] text-[#0E7A81] hover:bg-[#0E7A81] hover:text-white font-bold">Adopt</button>
                                                    <button id="details-btn-${pet.petId}" class="btn btn-sm px-5  bg-white border-[#0E7A81] text-[#0E7A81] hover:bg-[#0E7A81] hover:text-white font-bold">Details</button>
                                                </div>
                                          </div>
                                       <!-- dynamic card -->

        `
        petsCardContainer.append(div);

        // Add event listener to the "Details" button
        const detailsBtn = document.getElementById(`details-btn-${pet.petId}`);
        detailsBtn.addEventListener("click",()=>{
                displayDetailsModal(pet);
      
        })

          // adopt button
          const adoptBtn = document.getElementById(`adopt-btn-${pet.petId}`)
          adoptBtn.addEventListener("click",()=>{
              displayAdoptModal(pet.petId);
          })
    })

    
}



const displayDetailsModal = (pet)=>{
        
    
    const modalContent = document.getElementById("modal-content");
    modalContent.innerHTML = `
                                <div class="w-full object-cover rounded-md">
                            <img class="w-full h-[300px] object-cover rounded-md" src=${pet.image}/>
                        </div>
                        <div class="space-y-2 ">
                            <h2 class="text-[24px] font-bold mb-2">${pet.pet_name}</h2>
                            <div class="flex gap-5">
                                <div>
                                    <p class="opacity-80 font-semibold"><i class="fa-solid fa-qrcode mr-2"></i>Breed: ${pet.breed}</p>
                                   
                                    <p class="opacity-80 font-semibold"><i class="fa-solid fa-venus mr-2"></i>category: ${pet.category}</p>
                                    <p class="opacity-80 font-semibold"><i class="fa-solid fa-dollar-sign mr-2"></i>Price :Vaccinated status: ${pet.vaccinated_status}</p>
                                </div>
                                <div>
                                     <p class="opacity-80 font-semibold"><i class="fa-regular fa-calendar mr-2"></i>Birth: ${pet.date_of_birth?pet.date_of_birth:"Not found"}</p>
                                    <p class="opacity-80 font-semibold"><i class="fa-solid fa-dollar-sign mr-2"></i>Price : ${pet.price}</p>
                                </div>
                            </div>
                             <div class="divider"></div>
                             <div>
                                <h2 class="text-[24px] font-bold mb-2">Detail Information</h2>
                                <p class="opacity-80">${pet.pet_details}</p>
                                
                             </div>
                        </div>
                        

                        
                        `
                        my_modal_1.showModal()
}

const displayAdoptModal = (petId)=>{
        const adoptModalContentContainer = document.getElementById("adopt-modal-content-container");
        let num = 3;

        adoptModalContentContainer.innerHTML = `
                <div class="flex flex-col justify-center items-center space-y-2">
                    <div>
                        <img src="https://img.icons8.com/?size=100&id=q6BlPrJZmxHV&format=png&color=000000"/>
                    </div>

                    <h2 class="text-[2rem] font-bold">Congrates</h2>
                    <p class="opacity-80 font-semibold">Adoption Process is start for your pet</p>
                    <div  >
                           <h2 id="countdown" class="text-[3rem] font-extrabold">${num}</h2>
                    </div>
                </div>
        `
        
        const countdown = document.getElementById("countdown");

      const clockId =  setInterval(()=>{
        
            num--;
           
                countdown.innerText = num;
                if(num<=0){
                    clearInterval(clockId);
                    const adoptModalCloseBtn = document.getElementById("adopt-modal-close-btn");
                    adoptModalCloseBtn.click();
                    const adoptBtn = document.getElementById(`adopt-btn-${petId}`);
                    adoptBtn.innerText = 'adopted';
                    adoptBtn.setAttribute("disabled",true)

                }
        },1000)
     

    adoptModal.showModal();
}

const showPetImage=(image)=>{
   
        petImageContainer.innerHTML += `
            <div class="rounded-md p-2 border h-fit  ">
                <img class="rounded-md" src=${image}/>
            </div>
        `
}


// const demoData = {
//     "petId": 8,
//     "breed": "Beagle",
//     "category": "Dog",
//     "date_of_birth": "2023-03-22",
//     "price": 1200,
//     "image": "https://i.ibb.co.com/MCDfNqN/pet-8.jpg",
//     "pet_details": "Born on March 22, 2023, this female Beagle is curious and loves outdoor adventures. Fully vaccinated, she enjoys playing with children and exploring new places. Priced at $1200, she's a perfect fit for families looking for a playful and affectionate dog.",
//     "vaccinated_status": "Fully",
//     "pet_name": "Luna"
// }

loadCategories();

setTimeout(()=>{
    loadAllData();
},2000)