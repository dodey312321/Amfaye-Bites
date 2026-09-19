// ==========================================
// 1. DATA & PRODUCT LIST
// ==========================================
// 💾 DATABASE NOTE: Replace static array with an API fetch call (e.g., fetch('/api/products'))
const products = [
  // PREMIUM DONUTS — ₱99 / 6 pcs
  { id: 1, name: "Premium Donuts - Strawberry", category: "premium", price: 99, icon: "", description: "6 pcs box topped with roasted almonds, mini marshmallows, chocolate stick & pretzel, chocolate bar, and sprinkles (chocolate/rainbow)." },
  { id: 2, name: "Premium Donuts - Ube", category: "premium", price: 99, icon: "", description: "6 pcs box topped with roasted almonds, mini marshmallows, chocolate stick & pretzel, chocolate bar, and sprinkles (chocolate/rainbow)." },
  { id: 3, name: "Premium Donuts - Matcha", category: "premium", price: 99, icon: "", description: "6 pcs box topped with roasted almonds, mini marshmallows, chocolate stick & pretzel, chocolate bar, and sprinkles (chocolate/rainbow)." },
  { id: 4, name: "Premium Donuts - Milk", category: "premium", price: 99, icon: "", description: "6 pcs box topped with roasted almonds, mini marshmallows, chocolate stick & pretzel, chocolate bar, and sprinkles (chocolate/rainbow)." },
  { id: 5, name: "Premium Donuts - Chocolate", category: "premium", price: 99, icon: "", description: "6 pcs box topped with roasted almonds, mini marshmallows, chocolate stick & pretzel, chocolate bar, and sprinkles (chocolate/rainbow)." },

  // MESSY DONUTS — ₱85 / 8 pcs
  { id: 6, name: "Messy Donuts - Strawberry", category: "messy", price: 85, icon: "", description: "8 pcs box topped with roasted almonds, mini marshmallows, pretzel, chocolate stick, sprinkles (chocolate/rainbow), and mini chocolate bar." },
  { id: 7, name: "Messy Donuts - Ube", category: "messy", price: 85, icon: "", description: "8 pcs box topped with roasted almonds, mini marshmallows, pretzel, chocolate stick, sprinkles (chocolate/rainbow), and mini chocolate bar." },
  { id: 8, name: "Messy Donuts - Matcha", category: "messy", price: 85, icon: "", description: "8 pcs box topped with roasted almonds, mini marshmallows, pretzel, chocolate stick, sprinkles (chocolate/rainbow), and mini chocolate bar." },
  { id: 9, name: "Messy Donuts - Milk", category: "messy", price: 85, icon: "", description: "8 pcs box topped with roasted almonds, mini marshmallows, pretzel, chocolate stick, sprinkles (chocolate/rainbow), and mini chocolate bar." },
  { id: 10, name: "Messy Donuts - Chocolate", category: "messy", price: 85, icon: "", description: "8 pcs box topped with roasted almonds, mini marshmallows, pretzel, chocolate stick, sprinkles (chocolate/rainbow), and mini chocolate bar." },

  // DIP-A-DOUGH DONUTS — ₱75 / 10 pcs
  { id: 11, name: "Dip-A-Dough Donuts - Strawberry", category: "dip", price: 75, icon: "", description: "10 pcs donuts served with strawberry dipping sauce." },
  { id: 12, name: "Dip-A-Dough Donuts - Ube", category: "dip", price: 75, icon: "", description: "10 pcs donuts served with ube dipping sauce." },
  { id: 13, name: "Dip-A-Dough Donuts - Matcha", category: "dip", price: 75, icon: "", description: "10 pcs donuts served with matcha dipping sauce." },
  { id: 14, name: "Dip-A-Dough Donuts - Milk", category: "dip", price: 75, icon: "", description: "10 pcs donuts served with milk dipping sauce." },
  { id: 15, name: "Dip-A-Dough Donuts - Chocolate", category: "dip", price: 75, icon: "", description: "10 pcs donuts served with chocolate dipping sauce." },

  // CHEESY DONUTS — ₱65 / 10 pcs
  { id: 16, name: "Cheesy Donuts", category: "cheesy", price: 65, icon: "", description: "10 pcs donuts, cheesy and delicious!" }
];


// ==========================================
// 2. GLOBAL STATE & DOM ELEMENTS
// ==========================================
// Active User Session
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

// Cart State
let cart = JSON.parse(localStorage.getItem("donutCart")) || [];

// DOM References: Product & Cart
const productGrid = document.getElementById("productGrid");
const cartDrawer = document.getElementById("cartDrawer");
const cartBackdrop = document.getElementById("cartBackdrop");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

// DOM References: Checkout & Modals
const checkoutTotal = document.getElementById("checkoutTotal");
const checkoutModal = document.getElementById("checkoutModal");
const successModal = document.getElementById("successModal");
const checkoutBtn = document.getElementById("checkoutButton");

// DOM References: Mobile Menu
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const menuIcon = document.getElementById("menuIcon");

// DOM References: Authentication
const authModal = document.getElementById("authModal");
const openAuthBtn = document.getElementById("openAuth");
const closeAuthBtn = document.getElementById("closeAuth");
const tabLoginBtn = document.getElementById("tabLoginBtn");
const tabSignupBtn = document.getElementById("tabSignupBtn");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

// Tailwind Helper Classes
const DRAWER_CLOSED = ["right-[-100%]", "sm:right-[-430px]"];
const DRAWER_OPEN = ["right-0", "sm:right-0"];
const BACKDROP_HIDDEN = ["opacity-0", "pointer-events-none"];
const BACKDROP_VISIBLE = ["opacity-100", "pointer-events-auto"];
const IMAGE_BG_DEFAULT = "bg-gradient-to-br from-[#ead5c2] to-[#f8efe6]";
const IMAGE_BG_2N = "bg-gradient-to-br from-[#e6d2dc] to-[#f9edf0]";
const IMAGE_BG_3N = "bg-gradient-to-br from-[#dfc4a5] to-[#f7ead5]";


// ==========================================
// 3. UTILITY & HELPER FUNCTIONS
// ==========================================
function peso(amount) {
  return "₱" + amount.toLocaleString("en-PH");
}

function imageBgClass(position) {
  if (position % 3 === 0) return IMAGE_BG_3N;
  if (position % 2 === 0) return IMAGE_BG_2N;
  return IMAGE_BG_DEFAULT;
}

function showModal(modal) {
  if (!modal) return;
  modal.classList.remove(...BACKDROP_HIDDEN);
  modal.classList.add(...BACKDROP_VISIBLE);
  document.body.style.overflow = "hidden";
}

function hideModal(modal) {
  if (!modal) return;
  modal.classList.remove(...BACKDROP_VISIBLE);
  modal.classList.add(...BACKDROP_HIDDEN);
  document.body.style.overflow = "";
}


// ==========================================
// 4. USER AUTHENTICATION & SESSION MANAGEMENT
// ==========================================

// Updates Header Button UI depending on login state
function updateAuthUI() {
  if (!openAuthBtn) return;
  if (currentUser) {
    openAuthBtn.innerHTML = `<span>HI, ${currentUser.name.split(" ")[0].toUpperCase()}</span>`;
  } else {
    openAuthBtn.innerHTML = `<span>LOGIN</span>`;
  }
}

// Open Auth Modal or Handle Logout
if (openAuthBtn) {
  openAuthBtn.addEventListener("click", async () => {
    if (currentUser) {
      if (confirm(`You are logged in as ${currentUser.name}.\nDo you want to log out?`)) {
        
        // 💾 DATABASE NOTE: You can trigger a server-side logout route here:
        // await fetch('/api/logout', { method: 'POST' });

        currentUser = null;
        localStorage.removeItem("currentUser");
        updateAuthUI();

        // Reset checkout fields to guest state
        const nameInput = document.getElementById("customerName");
        const contactInput = document.getElementById("customerContact");
        if (nameInput) {
          nameInput.value = "";
          nameInput.readOnly = false;
          nameInput.classList.remove("bg-gray-100", "cursor-not-allowed");
        }
        if (contactInput) {
          contactInput.value = "";
          contactInput.readOnly = false;
          contactInput.classList.remove("bg-gray-100", "cursor-not-allowed");
        }
      }
    } else {
      showModal(authModal);
    }
  });
}

if (closeAuthBtn) closeAuthBtn.addEventListener("click", () => hideModal(authModal));
if (authModal) {
  authModal.addEventListener("click", (e) => {
    if (e.target === authModal) hideModal(authModal);
  });
}

// Auth Tab Switcher (Login vs Signup)
if (tabLoginBtn && tabSignupBtn) {
  tabLoginBtn.addEventListener("click", () => {
    loginForm.classList.remove("hidden");
    signupForm.classList.add("hidden");
    tabLoginBtn.classList.add("text-orange", "border-orange");
    tabLoginBtn.classList.remove("text-[#999]", "border-transparent");
    tabSignupBtn.classList.remove("text-orange", "border-orange");
    tabSignupBtn.classList.add("text-[#999]", "border-transparent");
  });

  tabSignupBtn.addEventListener("click", () => {
    signupForm.classList.remove("hidden");
    loginForm.classList.add("hidden");
    tabSignupBtn.classList.add("text-orange", "border-orange");
    tabSignupBtn.classList.remove("text-[#999]", "border-transparent");
    tabLoginBtn.classList.remove("text-orange", "border-orange");
    tabLoginBtn.classList.add("text-[#999]", "border-transparent");
  });
}

// Handle Login Form Submission
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const phone = document.getElementById("loginPhone").value.trim();
    const password = document.getElementById("loginPassword")?.value || "";

    try {
      // -------------------------------------------------------------
      // 💾 DATABASE INTEGRATION POINT: USER LOGIN
      // -------------------------------------------------------------
      // Replace localStorage logic below with your API call:
      // const res = await fetch('/api/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ phone, password })
      // });
      // const data = await res.json();
      // currentUser = { id: data.user.id, name: data.user.name, phone: data.user.phone };
      // -------------------------------------------------------------

      // Temporary LocalStorage(Pre-database) NASA BABA NG COMMENT NA TO YUNG PAPALITAN PAG MAG ADD NA NG DATABASE:
      const savedUsers = JSON.parse(localStorage.getItem("appUsers")) || [];
      const foundUser = savedUsers.find(u => u.phone === phone);
      
      currentUser = foundUser ? foundUser : { name: "Customer", phone: phone };
      localStorage.setItem("currentUser", JSON.stringify(currentUser));

      updateAuthUI();
      hideModal(authModal);
      loginForm.reset();
    } catch (error) {
      console.error("Login Failed:", error);
      alert("Error logging in. Please try again.");
    }
  });
}

// Handle Signup Form Submission
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("signupName").value.trim();
    const phone = document.getElementById("signupPhone").value.trim();
    const password = document.getElementById("signupPassword")?.value || "";

    try {
      // -------------------------------------------------------------
      // 💾 DATABASE INTEGRATION POINT: USER REGISTRATION
      // -------------------------------------------------------------
      // Replace localStorage logic below with your API call:
      // const res = await fetch('/api/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ name, phone, password })
      // });
      // const data = await res.json();
      // currentUser = { id: data.user.id, name: data.user.name, phone: data.user.phone };
      // -------------------------------------------------------------

      // Temporary LocalStorage (Pre-database) NASA BABA NG COMMENT NA TO YUNG PAPALITAN PAG MAG ADD NA NG DATABASE:
      currentUser = { name, phone };
      const savedUsers = JSON.parse(localStorage.getItem("appUsers")) || [];
      savedUsers.push(currentUser);
      localStorage.setItem("appUsers", JSON.stringify(savedUsers));
      localStorage.setItem("currentUser", JSON.stringify(currentUser));

      updateAuthUI();
      hideModal(authModal);
      signupForm.reset();
    } catch (error) {
      console.error("Signup Failed:", error);
      alert("Error creating account. Please try again.");
    }
  });
}


// ==========================================
// 5. SHOPPING CART & PRODUCT RENDERING
// ==========================================
function saveCart() {
  localStorage.setItem("donutCart", JSON.stringify(cart));
}

function getTotal() {
  return cart.reduce((total, item) => {
    const product = products.find(p => p.id === item.id);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);
}

function getItemCount() {
  return cart.reduce((total, item) => total + item.quantity, 0);
}

function renderProducts(category = "all") {
  const visibleProducts = category === "all"
    ? products
    : products.filter(product => product.category === category);

  productGrid.innerHTML = visibleProducts.map((product, index) => `
    <article class="bg-white p-4 sm:p-[18px] rounded-xl shadow-[0_4px_15px_rgba(80,60,50,.05)] sm:shadow-[0_7px_25px_rgba(80,60,50,.07)] transition-all duration-200 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between">
      <div>
        <div class="h-[150px] sm:h-[190px] rounded-lg grid place-items-center text-6xl sm:text-[92px] overflow-hidden ${imageBgClass(index + 1)}">${product.icon}</div>
        <div class="pt-3 sm:pt-4 px-1">
          <h3 class="text-brown font-bold text-base sm:text-[17px] leading-snug">${product.name}</h3>
          <p class="text-xs text-[#8b817c] mt-1 sm:min-h-[38px] leading-relaxed">${product.description}</p>
        </div>
      </div>
      <div class="flex items-center justify-between mt-4 pt-2 border-t border-gray-100">
        <span class="font-extrabold text-orange text-base sm:text-lg">${peso(product.price)}</span>
        <button class="border-none bg-orange text-white rounded-full py-2 px-3 sm:py-[9px] sm:px-[14px] cursor-pointer font-bold text-xs hover:bg-[#d83d0e] active:scale-95 transition-all" onclick="addToCart(${product.id})">ADD TO CART</button>
      </div>
    </article>
  `).join("");
}

function renderCart() {
  cartCount.textContent = getItemCount();

  if (cart.length === 0) {
    cartItems.innerHTML = `<p class="text-center text-[#999] mt-20 text-sm">Your cart is empty.<br>Go pick a doughnut!</p>`;
  } else {
    cartItems.innerHTML = cart.map(item => {
      const product = products.find(p => p.id === item.id);
      if (!product) return "";

      return `
        <div class="grid grid-cols-[48px_1fr_auto] sm:grid-cols-[55px_1fr_auto] gap-3 items-center py-3">
          <div class="w-12 h-12 sm:w-[55px] sm:h-[55px] bg-[#f3e7db] rounded-lg grid place-items-center text-2xl sm:text-3xl">${product.icon}</div>
          <div>
            <h4 class="text-brown font-semibold text-xs sm:text-sm leading-tight">${product.name}</h4>
            <small class="text-[#999] text-[11px]">${peso(product.price)} each</small>
            <div class="flex items-center gap-2 mt-1">
              <button class="w-6 h-6 border border-[#ddd] rounded-full bg-white cursor-pointer flex items-center justify-center font-bold text-xs hover:bg-gray-100" onclick="changeQuantity(${product.id}, -1)">−</button>
              <span class="text-xs sm:text-sm font-semibold">${item.quantity}</span>
              <button class="w-6 h-6 border border-[#ddd] rounded-full bg-white cursor-pointer flex items-center justify-center font-bold text-xs hover:bg-gray-100" onclick="changeQuantity(${product.id}, 1)">+</button>
            </div>
          </div>
          <div class="text-right">
            <strong class="text-xs sm:text-sm text-brown">${peso(product.price * item.quantity)}</strong>
            <br>
            <button class="text-[#b33] text-[10px] sm:text-[11px] font-bold border-none bg-transparent cursor-pointer hover:underline mt-1" onclick="removeFromCart(${product.id})">REMOVE</button>
          </div>
        </div>
      `;
    }).join("");
  }

  cartTotal.textContent = peso(getTotal());
  checkoutTotal.textContent = peso(getTotal());
}

function addToCart(id) {
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ id, quantity: 1 });
  }
  saveCart();
  renderCart();
  openCart();
}

function changeQuantity(id, amount) {
  const item = cart.find(item => item.id === id);
  if (!item) return;

  item.quantity += amount;
  if (item.quantity <= 0) {
    cart = cart.filter(item => item.id !== id);
  }

  saveCart();
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  renderCart();
}

function openCart() {
  cartDrawer.classList.remove(...DRAWER_CLOSED);
  cartDrawer.classList.add(...DRAWER_OPEN);
  cartBackdrop.classList.remove(...BACKDROP_HIDDEN);
  cartBackdrop.classList.add(...BACKDROP_VISIBLE);
  document.body.style.overflow = "hidden";
}

function closeCart() {
  cartDrawer.classList.remove(...DRAWER_OPEN);
  cartDrawer.classList.add(...DRAWER_CLOSED);
  cartBackdrop.classList.remove(...BACKDROP_VISIBLE);
  cartBackdrop.classList.add(...BACKDROP_HIDDEN);
  document.body.style.overflow = "";
}


// ==========================================
// 6. CHECKOUT & ORDER SUBMISSION
// ==========================================

// Open Checkout Modal & Auto-fill inputs if logged in
if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Your cart is empty. Add some doughnuts first!");
      return;
    }

    const nameInput = document.getElementById("customerName");
    const contactInput = document.getElementById("customerContact");

    if (currentUser) {
      if (nameInput) {
        nameInput.value = currentUser.name;
        nameInput.readOnly = true;
        nameInput.classList.add("bg-gray-100", "cursor-not-allowed");
      }
      if (contactInput) {
        contactInput.value = currentUser.phone;
        contactInput.readOnly = true;
        contactInput.classList.add("bg-gray-100", "cursor-not-allowed");
      }
    } else {
      if (nameInput) {
        nameInput.readOnly = false;
        nameInput.classList.remove("bg-gray-100", "cursor-not-allowed");
      }
      if (contactInput) {
        contactInput.readOnly = false;
        contactInput.classList.remove("bg-gray-100", "cursor-not-allowed");
      }
    }

    checkoutTotal.textContent = peso(getTotal());
    showModal(checkoutModal);
  });
}

// Order Type Selection Logic (Delivery vs Pickup)
document.getElementById("orderType")?.addEventListener("change", (event) => {
  const address = document.getElementById("customerAddress");
  if (!address) return;
  
  if (event.target.value === "Delivery") {
    address.required = true;
    address.placeholder = "Enter your delivery address";
  } else {
    address.required = false;
    address.placeholder = "Address is optional for pickup";
  }
});

// Submit Order Form
document.getElementById("checkoutForm")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = document.getElementById("customerName").value.trim();

  // -------------------------------------------------------------
  // 💾 DATABASE INTEGRATION POINT: SUBMIT ORDER TO BACKEND
  // -------------------------------------------------------------
  // Send order details to backend server / database:
  // const orderPayload = {
  //   userId: currentUser ? currentUser.id : null,
  //   customerName: name,
  //   contact: document.getElementById("customerContact").value.trim(),
  //   orderType: document.getElementById("orderType").value,
  //   address: document.getElementById("customerAddress").value.trim(),
  //   paymentMethod: document.getElementById("paymentMethod").value,
  //   cartItems: cart,
  //   totalPrice: getTotal()
  // };
  // await fetch('/api/orders', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(orderPayload)
  // });
  // -------------------------------------------------------------

  document.getElementById("successName").textContent = name || "customer";

  hideModal(checkoutModal);
  closeCart();
  showModal(successModal);

  // Clear local cart state
  cart = [];
  saveCart();
  renderCart();
  event.target.reset();
});

// Modal Dismiss Controls
document.getElementById("closeCheckout")?.addEventListener("click", () => hideModal(checkoutModal));
document.getElementById("finishOrder")?.addEventListener("click", () => hideModal(successModal));

checkoutModal?.addEventListener("click", (e) => { if (e.target === checkoutModal) hideModal(checkoutModal); });
successModal?.addEventListener("click", (e) => { if (e.target === successModal) hideModal(successModal); });


// ==========================================
// 7. EVENT LISTENERS & INITIALIZATION
// ==========================================

// Mobile Navbar Controls
mobileMenuBtn?.addEventListener("click", () => {
  const isHidden = mobileMenu.classList.contains("hidden");
  if (isHidden) {
    mobileMenu.classList.remove("hidden");
    mobileMenu.classList.add("flex");
    menuIcon.textContent = "✕";
  } else {
    mobileMenu.classList.add("hidden");
    mobileMenu.classList.remove("flex");
    menuIcon.textContent = "☰";
  }
});

document.querySelectorAll(".mobile-nav-link").forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
    mobileMenu.classList.remove("flex");
    menuIcon.textContent = "☰";
  });
});

// Drawer Triggers
document.getElementById("openCart")?.addEventListener("click", openCart);
document.getElementById("closeCart")?.addEventListener("click", closeCart);
cartBackdrop?.addEventListener("click", closeCart);

// Category Tab Filters
document.querySelectorAll(".category-tabs button").forEach(button => {
  button.addEventListener("click", () => {
    const activeButton = document.querySelector(".category-tabs button.active");
    if (activeButton) {
      activeButton.classList.remove("active", "bg-brown", "text-white");
      activeButton.classList.add("bg-transparent", "text-brown");
    }
    button.classList.add("active", "bg-brown", "text-white");
    button.classList.remove("bg-transparent", "text-brown");
    renderProducts(button.dataset.category);
  });
});

// Initial Page Load Execution
renderProducts();
renderCart();
updateAuthUI();