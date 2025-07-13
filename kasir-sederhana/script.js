const products = [
  { id: 1, name: 'Produk A', price: 10000 },
  { id: 2, name: 'Produk B', price: 15000 },
  { id: 3, name: 'Produk C', price: 20000 },
  { id: 4, name: 'Produk D', price: 25000 },
  { id: 5, name: 'Produk E', price: 30000 },
];

let cart = [];
let total = 0;

const productList = document.getElementById('product-list');
const cartEl = document.getElementById('cart');
const totalEl = document.getElementById('total');
const notifEl = document.getElementById('notif');

products.forEach(product => {
  const btn = document.createElement('button');
  btn.className = 'bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded shadow';
  btn.textContent = `${product.name} - Rp${product.price}`;
  btn.onclick = () => addToCart(product);
  productList.appendChild(btn);
});

function addToCart(product) {
  cart.push(product);
  total += product.price;
  renderCart();
}

function renderCart() {
  cartEl.innerHTML = '';
  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.className = 'flex justify-between bg-gray-100 p-2 rounded';
    li.innerHTML = `
      <span>${item.name} - Rp${item.price}</span>
      <button class="text-red-600" onclick="removeItem(${index})">Hapus</button>
    `;
    cartEl.appendChild(li);
  });
  totalEl.textContent = total;
  notifEl.classList.add('hidden');
}

function removeItem(index) {
  total -= cart[index].price;
  cart.splice(index, 1);
  renderCart();
}

function resetCart() {
  cart = [];
  total = 0;
  renderCart();
}

function checkout() {
  if(cart.length === 0) {
    alert('Keranjang masih kosong!');
    return;
  }
  notifEl.textContent = 'Checkout berhasil!';
  notifEl.classList.remove('hidden');
  resetCart();
}
