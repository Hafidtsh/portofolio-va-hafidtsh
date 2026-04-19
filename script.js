// ✅ ambil data dari localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// tambah item
function addToCart(name, price, desc, img) {
  cart.push({ name, price, desc, img });

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// hapus item
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// tambah custom item
function addCustomItem() {
  let val = document.getElementById("customItem").value;

  if (val) {
    cart.push({
      name: val,
      price: 0,
      desc: "Pesanan custom",
      img: "images/logo.png",
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    renderCart();
    document.getElementById("customItem").value = "";
  }
}

// render cart + total
function renderCart() {
  let total = 0;

  document.getElementById("cartItems").innerHTML = cart
    .map((item, index) => {
      total += item.price || 0;

      return `
      <div class="cart-item">
        <img src="${item.img || "images/logo.png"}" />
        <div class="info">
          <strong>${item.name}</strong>
          <p>${item.desc || ""}</p>
          <small>Rp${(item.price || 0).toLocaleString()}</small>
        </div>
        <button onclick="removeItem(${index})">❌</button>
      </div>
    `;
    })
    .join("");

  document.getElementById("totalHarga").innerText = "Total: Rp" + total.toLocaleString();
}

// checkout WA (FIX)
function orderWA() {
  let text = "🛒 *Pesanan Saya* %0A%0A";
  let total = 0;

  cart.forEach((item, i) => {
    let price = item.price || 0;
    total += price;

    text += `${i + 1}. ${item.name}%0A   Rp${price.toLocaleString()}%0A`;
  });

  text += `%0A--------------------%0A`;
  text += `💰 *Total: Rp${total.toLocaleString()}*`;

  window.open("https://wa.me/62895394023138?text=" + text);
}

// pertama load
renderCart();
