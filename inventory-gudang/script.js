function updateDashboardUtama() {
  const totalItems = document.getElementById("summary-items");
  const totalStock = document.getElementById("summary-stock");

  if (!totalItems || !totalStock) return;

  totalItems.textContent = inventory.length;
  totalStock.textContent = inventory.reduce((sum, item) => sum + item.qty, 0);
}
