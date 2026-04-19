// ✅ ambil data dari localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, desc, img) {
  cart.push({ name, desc, img });

  localStorage.setItem("cart", JSON.stringify(cart));

  renderCart();
}
function removeItem(index) {
  cart.splice(index, 1);

  localStorage.setItem("cart", JSON.stringify(cart));

  renderCart();
}

function addCustomItem() {
  let val = document.getElementById("customItem").value;

  if (val) {
    cart.push({
      name: val,
      desc: "Pesanan custom",
      img: "images/logo.png", // fallback gambar
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    renderCart();
    document.getElementById("customItem").value = "";
  }
}

function renderCart() {
  document.getElementById("cartItems").innerHTML = cart
    .map(
      (item, index) => `
      <div class="cart-item">
        <img src="${item.img || "images/logo.png"}" />
        <div class="info">
          <strong>${item.name}</strong>
          <p>${item.desc || ""}</p>
        </div>
        <button onclick="removeItem(${index})">❌</button>
      </div>
    `,
    )
    .join("");
}

function orderWA() {
  let text = "Halo saya mau belanja:%0A" + cart.join("%0A");
  window.open("https://wa.me/62895394023138?text=" + text);
}

// ✅ render saat pertama load
renderCart();
