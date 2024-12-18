import { categories } from "./data.js";

const mediateka = document.getElementById('mediateka');

// mediateka.innerHTML = `<ul class="list-group-item list-group-item-action list-unstyled">
//                                 ${categories.map(category => `<li onClick="showSubCat.call(this, '${category.id}')"><i class="fa fa-file-${category.id}-o"></i><span class="letters">${category.name}</span></li>`).join('')}
//                              </ul>`


// function showSubCat(id){
//     alert(id);
//     console.log('this', this);
//     this.insertAdjacentHTML("beforeend", createList(id))

// }

// function createList(id){
//   // Знайти категорію за ID
//   const category = categories.find((cat) => cat.id === id);

//   // Якщо категорія знайдена, повернути масив назв підкатегорій
//   if (category) {

//     return category.subcategories.map((subcat) =>  `<div onClick="showSubCatDetails.call(this, '${subcat.name}')"><span class="letters">${subcat.name}</span></div>`).join('');
//   }

//   // Якщо категорія не знайдена, повернути порожній масив
//   return [];
// }


// // Додаємо функцію до глобального об'єкта window
// window.showSubCat = showSubCat;


// Стан відображення
const state = {
    activeCategory: null,
    activeSubcategory: null
};

// Рендер списку категорій
function renderCategories() {
    mediateka.innerHTML = `<ul class="list">
      ${categories
            .map(
                (category) => `
        <li class="list-item" onclick="toggleCategory('${category.id}')">
          <span>${category.name}</span>
          <ul id="${category.id}-subcategories" class="list hide"></ul>
        </li>
      `
            )
            .join("")}
    </ul>`;
}

// Переключення видимості підкатегорій
window.toggleCategory = function (categoryId) {
    const subcategoriesEl = document.getElementById(`${categoryId}-subcategories`);

    // Якщо категорія відкрита, закрити її
    if (state.activeCategory === categoryId) {
        subcategoriesEl.classList.add("hide");
        state.activeCategory = null;
    } else {
        // Закрити попередню категорію
        if (state.activeCategory) {
            const prevEl = document.getElementById(`${state.activeCategory}-subcategories`);
            prevEl.classList.add("hide");
        }

        // Відкрити нову категорію
        const category = categories.find((cat) => cat.id === categoryId);
        subcategoriesEl.innerHTML = category.subcategories
            .map(
                (subcat) => `
          <li class="list-item" onclick="toggleSubcategory('${categoryId}', '${subcat.name}')">
            ${subcat.name}
          </li>
        `
            )
            .join("");
        subcategoriesEl.classList.remove("hide");
        state.activeCategory = categoryId;
    }
};

// Переключення видимості підкатегорії
window.toggleSubcategory = function (categoryId, subcategoryName) {
    const category = categories.find((cat) => cat.id === categoryId);
    const subcategory = category.subcategories.find((subcat) => subcat.name === subcategoryName);
    console.log(subcategory);

    // Генерація унікального ID для підкатегорії
    const detailsId = `${categoryId}-${subcategoryName}-details`;

    const existingDetailsEl = document.getElementById(detailsId);

    if (existingDetailsEl) {
        // Якщо елемент існує, то видалимо його
        existingDetailsEl.remove();
        state.activeSubcategory = null;
    } else {
        // Закрити попередній опис (якщо він є)
        if (state.activeSubcategory) {
            const prevDetailsEl = document.getElementById(state.activeSubcategory);
            if (prevDetailsEl) {
                prevDetailsEl.remove();
            }
        }

        // Створити новий елемент для опису підкатегорії
        const detailsEl = document.createElement("div");
        detailsEl.id = detailsId; // Унікальний ID для кожної підкатегорії
        detailsEl.classList.add("subcategory-details");
        detailsEl.innerHTML = `
        <h4>${subcategory.name}</h4>
        <p>${subcategory.description}</p>
        <ul class="subcategory-projects">
          ${subcategory.projects
                .map(
                    (project) => `
            <li>
              <a href="${project.link}" target="_blank">${project.title}</a>
            </li>
          `
                )
                .join("")}
        </ul>
      `;
        document.getElementById(`${categoryId}-subcategories`).appendChild(detailsEl);
        state.activeSubcategory = detailsId; // Зберігаємо унікальний ID підкатегорії
    }
};


// Ініціалізація
// renderCategories();


// Функція для створення HTML
function renderMediateka() {
    const mediatekaContainer = document.getElementById('mediateka');
  
    mediatekaContainer.innerHTML = categories
      .map(category => {
        const categoryId = `category-${category.id}`;
  
        return `
          <div class="mb-3">
            <p class="letters">
              <a class="text-decoration-none" data-toggle="collapse" data-target="#${categoryId}">
                ${category.name}
              </a>
            </p>
            <div id="${categoryId}" class="collapse">
              <ul class="list-group">
                ${category.subcategories
                  .map((sub, index) => {
                    const subId = `${categoryId}-sub-${index}`;
                    return `
                      <li class="list-group-item">
                        <a data-toggle="collapse" data-target="#${subId}">
                          ${sub.name}
                        </a>
                        <div id="${subId}" class="collapse mt-2">
                          <p>${sub.description || 'Опис недоступний'}</p>
                          <ul>
                            ${sub.projects
                              .map(
                                project => `
                                  <li>
                                    <a href="${project.link}" target="_blank">${project.title}</a>
                                  </li>
                                `
                              )
                              .join('')}
                          </ul>
                        </div>
                      </li>
                    `;
                  })
                  .join('')}
              </ul>
            </div>
          </div>
        `;
      })
      .join('');
  }
  
  // Виклик функції для відображення даних
  document.addEventListener('DOMContentLoaded', renderMediateka);