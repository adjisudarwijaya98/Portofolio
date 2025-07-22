let inventory = [];

function addItem() {
  const name = document.getElementById('itemName').value.trim();
  const qty = parseInt(document.getElementById('itemQty').value);

  if (!name || isNaN(qty) || qty <= 0) {
    alert('Nama barang dan jumlah harus diisi dengan benar!');
    return;
  }

  inventory.push({ name, qty });
  renderInventory();

  document.getElementById('itemName').value = '';
  document.getElementById('itemQty').value = '';
}

function removeItem(index) {
  inventory.splice(index, 1);
  renderInventory();
}

function resetInventory() {
  if (confirm('Yakin ingin reset semua data?')) {
    inventory = [];
    renderInventory();
  }
}

function renderInventory() {
  const tbody = document.getElementById('inventoryList');
  const totalQtyEl = document.getElementById('totalQty');
  tbody.innerHTML = '';

  let totalQty = 0;

  if (inventory.length === 0) {
    tbody.innerHTML = `<tr><td colspan="3" class="text-center text-gray-500 py-4">Belum ada data barang</td></tr>`;
    totalQtyEl.textContent = 0;
    return;
  }

  inventory.forEach((item, index) => {
    totalQty += item.qty;

    const row = document.createElement('tr');
    row.classList.add(index % 2 === 0 ? 'bg-gray-50' : 'bg-white');
    row.innerHTML = `
      <td class="px-4 py-2">${item.name}</td>
      <td class="px-4 py-2">${item.qty}</td>
      <td class="px-4 py-2 text-center">
        <button onclick="removeItem(${index})" class="text-red-600 hover:underline">Hapus</button>
      </td>
    `;
    tbody.appendChild(row);
  });

  totalQtyEl.textContent = totalQty;
}

function printInventory() {
  window.print();
}
