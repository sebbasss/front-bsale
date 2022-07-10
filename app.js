// calling the api

const getData = (url) => {
  return fetch(url)
  .then(response => response.json())
  .then(data => {
    return data
  })
}

//filling left side

const categoryListItem = (category) => {
  let li = document.createElement("li");
  li.classList.add("list-group-item");
  li.textContent = category.name;
  return li;
};

const categoryList = document.getElementById("category-list");

getData('https://api-bsale-seb.herokuapp.com/api/v1/categories').then(res => {
  res.forEach((el) => {
    categoryList.appendChild(categoryListItem(el))
  })
})




// filling right side
const cards = document.getElementById("cards-grid");

const productCard = (product) => {
  let div = document.createElement("div");
  div.classList.add("card");
  div.innerHTML =`<img src=${product.url_image} class="card-img-top">
  <div class="card-body">
    <p class="card-text">${product.name}</p>
    <h3>$${product.price}</h3>
  </div>`;
  return div;
}

const cardsNode = document.getElementById('category-list')



getData('https://api-bsale-seb.herokuapp.com/api/v1/products')
.then(res => {
  res.forEach((el) => {
    cards.appendChild(productCard(el))
  });
});

// changing selected category



cardsNode.addEventListener('click', (e) => {
  for (let i = 0; i < e.target.parentElement.children.length; i++) {
    e.target.parentElement.children[i].classList.remove('active')
  };
  e.target.classList.add('active')
  console.log(e.target.innerHTML);
  getData(`https://api-bsale-seb.herokuapp.com/api/v1/categories/${e.target.innerHTML}`)
    .then(res => {
      cards.innerHTML = '';
      res.forEach((el) => {
        cards.appendChild(productCard(el))
      });
    });
})

//adding search functionality

const form = document.getElementById('form');

form.addEventListener('submit', (e) => {
  for (let i = 0; i < categoryList.children.length; i++) {
    categoryList.children[i].classList.remove('active')
  };
  getData(`https://api-bsale-seb.herokuapp.com/api/v1/products/${document.querySelector('input').value}`)
    .then(res => {
      cards.innerHTML = '';
      res.forEach((el) => {
        cards.appendChild(productCard(el))
      });
    });
})
