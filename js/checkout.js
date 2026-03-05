// Checkout functionality
document.addEventListener('DOMContentLoaded', function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const orderSummary = document.getElementById('order-summary');
    const checkoutTotal = document.getElementById('checkout-total');
    const paymentRadios = document.querySelectorAll('input[name="payment"]');
    const cardDetails = document.getElementById('card-details');
    const placeOrderBtn = document.getElementById('place-order');
    const occasionSelect = document.getElementById('occasion-select');
    const messageSelect = document.getElementById('message-select');

    // Display order summary
    let total = 0;
    orderSummary.innerHTML = '';
    cart.forEach(item => {
        total += item.price * item.quantity;
        orderSummary.innerHTML += `<p>${item.name} x ${item.quantity} - ₹${item.price * item.quantity}</p>`;
    });
    checkoutTotal.textContent = total;

    // Payment method toggle
    paymentRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'card') {
                cardDetails.style.display = 'block';
            } else {
                cardDetails.style.display = 'none';
            }
        });
    });

    // Occasion messages
    const messages = {
        birthday: ['Happy Birthday!', 'Wishing you a fantastic year ahead!', 'May all your dreams come true.'],
        wedding: ['Congratulations on your wedding!', 'Wishing you a lifetime of happiness.', 'Best wishes for your new journey.'],
        newbaby: ['Congratulations on your new baby!', 'Welcome to the world, little one!', 'Wishing you joy and love.'],
        thankyou: ['Thank you for everything!', 'Grateful for your kindness.', 'Thanks a lot!'],
        fathersday: ['Happy Father\'s Day!', 'Thanks for being the best dad!', 'Wishing you a great day.'],
        mothersday: ['Happy Mother\'s Day!', 'Thanks for everything, Mom!', 'You are the best!']
    };

    occasionSelect.addEventListener('change', function() {
        const occasion = this.value;
        messageSelect.innerHTML = '<option value="">Select a message</option>';
        if (messages[occasion]) {
            messages[occasion].forEach(msg => {
                messageSelect.innerHTML += `<option value="${msg}">${msg}</option>`;
            });
        }
    });

    // Place order
    placeOrderBtn.addEventListener('click', function() {
        // Simple validation
        const recipientName = document.getElementById('recipient-name').value;
        const address = document.getElementById('address').value;
        const phone = document.getElementById('phone').value;
        const occasion = occasionSelect.value;
        const message = messageSelect.value || document.getElementById('custom-message').value;

        if (!recipientName || !address || !phone || !occasion) {
            alert('Please fill in all required fields.');
            return;
        }

        // Simulate order placement
        alert('Order placed successfully! Delivery within 5 hours.');
        localStorage.removeItem('cart');
        window.location.href = 'index.html';
    });
});