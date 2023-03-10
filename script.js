// Esse tipo de comentário que estão antes de todas as funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições! 
// Fique a vontade para modificar o código já escrito e criar suas próprias funções!

// const getSavedCartItems = require("./helpers/getSavedCartItems");

// const saveCartItems = require("./helpers/saveCartItems");

/**
 * 
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */
const paiDeTodos = document.getElementsByClassName('items')[0];
const carrinho = document.getElementsByClassName('cart__items')[0];
const loading = document.querySelector('.loading');
const clearCar = document.querySelector('.empty-cart');
const ol = document.querySelector('.cart__items');
ol.innerHTML = getSavedCartItems('cartItems');

const subTotal = async () => {
  const itemPrice = document.querySelectorAll('.cart__item');
  const button = document.querySelector('.total-price');
  let totalSum = 0;

  itemPrice.forEach((element) => {
    const calc = Number(element.innerText.split('$')[1]);
   totalSum += calc;
  });
  button.innerText = `Subtotal: R$${Math.round(totalSum * 100) / 100}`;
};

const removeCar = (event) => {
  const itemCar = event.target;
  itemCar.remove('.cart__items');
  console.log('click', itemCar);
};

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto. 
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */

 const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.addEventListener('click', removeCar);
  subTotal();
  return li;
};

const addCartProduct = async (event) => {
  const id = (event.target.parentNode.firstChild.innerText);
  const newProduct = await fetchItem(id);
  const addCarrinho = createCartItemElement(newProduct);
  carrinho.appendChild(addCarrinho);
  console.log('click', addCarrinho);
  saveCartItems(ol.innerHTML); 
  subTotal();
};

const createProductItemElement = ({ id, title, thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';
  const buttons = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  buttons.addEventListener('click', addCartProduct);
  subTotal();
  loading.remove();

  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(buttons);

  return section;
};

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
const getIdFromProductItem = (product) => product.querySelector('span.item_id').innerText;

/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */

async function cartProduct(event) {
  const findId = addProductItem(event.target.parentNode);
  const data = await fetchItem(findId);
  const addCartItens = createCartItemElement(data);
  cartList.appendChild(addCartItens);
  saveCartItems(cartList.innerHTML);
}

const addProduct = async () => {
  const product = await fetchProducts('computador');
  product.results.forEach((element) => {
    const minhaSection = createProductItemElement(element);
    paiDeTodos.appendChild(minhaSection);
  });
};

const carItem = () => {
  const lis = ol.childNodes;
  lis.forEach((li) => li.addEventListener('click', removeCar));
  subTotal();
};

const addText = () => {
  loading.innerText = 'carregando...';
};

clearCar.addEventListener('click', () => {
Array.from(ol.children).forEach((product) => { ol.removeChild(product); });
saveCartItems(ol.innerHTML);
subTotal();
});

window.onload = () => {
  addProduct();
  carItem();
  addText();
};