// URLs (api)
const categoriesURL = 'https://api-bsale-seb.herokuapp.com/api/v1/categories';
const productsURL = 'https://api-bsale-seb.herokuapp.com/api/v1/products';

// DOM ELEMENTS
const categoryList = document.getElementById("category-list");
const cards = document.getElementById("cards-grid");
const form = document.getElementById('form');

// FUNCTIONS TO BE REUSED
const getData = (url) => {
  return fetch(url)
  .then(response => response.json())
  .then(data => {
    return data
  });
};

const append = (api, parentElement, childElement) => {
  getData(api)
  .then(res => {
    res.forEach((el) => {
      parentElement.appendChild(childElement(el))
    });
  });
};

const removeSelectedList = (pathDOM) => {
  for (let i = 0; i < pathDOM.length; i++) {
    pathDOM[i].classList.remove('active')
  };
};

// CREATION OF HTML ELEMENTS
const categoryListItem = (category) => {
  let li = document.createElement("li");
  li.classList.add("list-group-item");
  li.textContent = category.name;
  return li;
};

const productCard = (product) => {
  let div = document.createElement("div");
  div.classList.add("card");
  div.innerHTML =`<img src="${product.url_image}" onerror="this.src='https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';"
  class="card-img-top">
  <div class="card-body">
    <p class="card-text">${product.name}</p>
    <h3>$${product.price}</h3>
  </div>`;
  return div;
};

// FILLING LIST AND CARDS - initialization
append(categoriesURL, categoryList, categoryListItem);
append(productsURL, cards, productCard);

// ADDING CATEGORY LIST FUNCTIONALITY
categoryList.addEventListener('click', (e) => {
  removeSelectedList(categoryList.children);
  e.target.classList.add('active');
  cards.innerHTML = '';
  if(e.target.innerHTML === 'todos los productos') {
    const url = productsURL;
    append(url, cards, productCard);
  } else {
    const url = `https://api-bsale-seb.herokuapp.com/api/v1/categories/${e.target.innerHTML}`
    append(url, cards, productCard);
  };
});

// ADDING SEARCH BAR FUNCTIONALITY
form.addEventListener('submit', (e) => {
  removeSelectedList(categoryList.children);
  cards.innerHTML = '';
  const url = `https://api-bsale-seb.herokuapp.com/api/v1/products/${document.querySelector('input').value}`;
  fetch(url)
  .then(response => response.json())
  .then(data => {
    if (data.length === 0) {
      window.alert("No tenemos productos con ese nombre!")
    } else {
      append(url, cards, productCard);
    }
  });
  form.reset();
  e.preventDefault()
});
