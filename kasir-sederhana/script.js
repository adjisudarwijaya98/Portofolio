const products = [
  { id: 1, name: "Roti", price: 5000 },
  { id: 2, name: "Teh Botol", price: 4000 },
  { id: 3, name: "Indomie", price: 3500 },
  { id: 4, name: "Air Mineral", price: 3000 },
  { id: 5, name: "Kopi Sachet", price: 2500 },
];

let cart = [];

const productList = document.getElementById("product-list");

products.forEach(product => {
  const card = document.createElement("div");
  card.className = "bg-gray-100 rounded p-3 text-center shadow-sm hover:shadow-md transition";
  card.innerHTML = `
    <p class="font-medium">${product.name}</p>
    <p class="text-sm text-gray-600">Rp ${product.price.toLocaleString()}</p>
    <button onclick="addToCart(${product.id})" class="mt-2 bg-indigo-600 text-white px-2 py-1 rounded text-xs hover:bg-indigo-700">Tambah</button>
  `;
  productList.appendChild(card);
});

function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  renderCart();
}

function renderCart() {
  const cartEl = document.getElementById("cart");
  const totalEl = document.getElementById("total");
  cartEl.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartEl.innerHTML = `<li class="text-center text-gray-400 py-4">Keranjang kosong</li>`;
  }

  cart.forEach((item, idx) => {
    total += item.price;
    const li = document.createElement("li");
    li.className = "flex justify-between py-2";
    li.innerHTML = `
      <span>${item.name}</span>
      <div>
        <span>Rp ${item.price.toLocaleString()}</span>
        <button onclick="removeItem(${idx})" class="ml-2 text-red-500 hover:underline text-xs">Hapus</button>
      </div>
    `;
    cartEl.appendChild(li);
  });

  totalEl.textContent = `Rp ${total.toLocaleString()}`;
  document.getElementById("notif").classList.add("hidden");
}

function removeItem(idx) {
  cart.splice(idx, 1);
  renderCart();
}

function resetCart() {
  cart = [];
  renderCart();
  document.getElementById("notif").classList.add("hidden");
}

function checkout() {
  if (cart.length === 0) {
    alert("Keranjang masih kosong!");
    return;
  }

  // Buat konten struk
  const date = new Date().toLocaleString();
  let strukHTML = `
    <h2 style="font-family:Poppins,sans-serif;text-align:center">🧾 STRUK PEMBAYARAN</h2>
    <p style="text-align:center;font-size:12px;">${date}</p>
    <table style="width:100%;margin-top:10px;border-collapse:collapse;font-family:Poppins,sans-serif;font-size:14px;">
      <thead>
        <tr>
          <th style="text-align:left;border-bottom:1px solid #ccc;">Barang</th>
          <th style="text-align:right;border-bottom:1px solid #ccc;">Harga</th>
        </tr>
      </thead>
      <tbody>
  `;

  let total = 0;
  cart.forEach(item => {
    total += item.price;
    strukHTML += `
      <tr>
        <td>${item.name}</td>
        <td style="text-align:right;">Rp ${item.price.toLocaleString()}</td>
      </tr>
    `;
  });

  strukHTML += `
      </tbody>
    </table>
    <p style="text-align:right;margin-top:10px;font-weight:bold;">TOTAL: Rp ${total.toLocaleString()}</p>
    <p style="text-align:center;margin-top:20px;font-size:12px;">Terima kasih sudah berbelanja! 🙏</p>
  `;

  // Buka jendela baru untuk struk
  const win = window.open("", "Struk", "width=400,height=600");
  win.document.write(`
    <html><head><title>Struk Pembayaran</title></head>
    <body>${strukHTML}</body></html>
  `);
  win.document.close();
  win.focus();

  cart = [];
  renderCart();
}

