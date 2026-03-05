// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(id, name, price) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += 1;
    } else {
        cart.push({ id, name, price: parseInt(price), quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Added to cart!');
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

function displayCart() {
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');
    if (!cartItems) return;

    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        cartItems.innerHTML += `
            <div class="card mb-3">
                <div class="card-body">
                    <h5>${item.name}</h5>
                    <p>Price: ₹${item.price} x ${item.quantity} = ₹${item.price * item.quantity}</p>
                    <button class="btn btn-danger" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            </div>
        `;
    });
    if (totalPrice) totalPrice.textContent = total;
}

document.addEventListener('DOMContentLoaded', function() {
    // Add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            const name = this.getAttribute('data-name');
            const price = this.getAttribute('data-price');
            addToCart(id, name, price);
        });
    });

    displayCart();
});