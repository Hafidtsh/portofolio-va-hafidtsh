// ✅ ambil data dari localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// tambah item
function addToCart(name, price, desc, img) {
  // cek kalau barang sudah ada → tambah qty
  let existing = cart.find((item) => item.name === name);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name, price, desc, img, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

//Quantity
function changeQty(index, change) {
  cart[index].qty += change;

  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }

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
      let subtotal = (item.price || 0) * item.qty;
      total += subtotal;

      return `
      <div class="cart-item">
        <img src="${item.img || "images/logo.png"}" />
        
        <div class="info">
          <strong>${item.name}</strong>
          <p>${item.desc || ""}</p>
          <small>Rp${item.price.toLocaleString()}</small>

          <div class="qty">
            <button onclick="changeQty(${index}, -1)">-</button>
            <span>${item.qty}</span>
            <button onclick="changeQty(${index}, 1)">+</button>
          </div>
        </div>

        <button onclick="removeItem(${index})">❌</button>
      </div>
    `;
    })
    .join("");

  // ongkir
  let ongkir = cart.length > 0 ? 5000 : 0;

  let totalFinal = total + ongkir;

  document.getElementById("totalHarga").innerText = "Total: Rp" + totalFinal.toLocaleString();
}

// checkout WA (FIX)
function orderWA() {
  let nama = document.getElementById("nama").value;
  let alamat = document.getElementById("alamat").value;

  let text = "🛒 *Pesanan* %0A%0A";
  let total = 0;

  cart.forEach((item, i) => {
    let subtotal = item.price * item.qty;
    total += subtotal;

    text += `${i + 1}. ${item.name} x${item.qty}%0A   Rp${subtotal.toLocaleString()}%0A`;
  });

  let ongkir = cart.length > 0 ? 5000 : 0;
  let totalFinal = total + ongkir;

  text += `%0A🚚 Ongkir: Rp${ongkir.toLocaleString()}%0A`;
  text += `💰 *Total: Rp${totalFinal.toLocaleString()}*%0A%0A`;

  text += `👤 Nama: ${nama}%0A`;
  text += `📍 Alamat: ${alamat}`;

  window.open("https://wa.me/62895394023138?text=" + text);
}

// pertama load
renderCart();
