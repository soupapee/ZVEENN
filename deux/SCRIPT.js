let cart = [];
let total = 0;

// Initialisation au chargement
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loadingScreen').classList.add('hidden');
    }, 1500);
    
    initCursor();
    initAnimations();
});

// Curseur personnalisé
function initCursor() {
    const cursor = document.getElementById('cursor');
    const cursorTrail = document.getElementById('cursorTrail');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
        
        setTimeout(() => {
            cursorTrail.style.left = e.clientX - 20 + 'px';
            cursorTrail.style.top = e.clientY - 20 + 'px';
        }, 100);
    });

    // Effet hover sur les boutons
    document.querySelectorAll('button, a').forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.borderColor = 'var(--neon-pink)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.borderColor = 'var(--neon-blue)';
        });
    });
}

// Animations diverses
function initAnimations() {
    // Animation des cartes au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.cyber-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
        observer.observe(card);
    });
}

// Système de panier
function addToCart(itemName, price) {
    cart.push({name: itemName, price: price});
    total += price;
    updateCartDisplay();
    
    // Effet visuel
    const button = event.target;
    const originalText = button.textContent;
    
    button.style.background = 'var(--neon-green)';
    button.style.borderColor = 'var(--neon-green)';
    button.style.color = 'var(--dark-bg)';
    button.textContent = '✓ AJOUTÉ';
    button.style.transform = 'scale(1.05)';
    
    setTimeout(() => {
        button.style.background = '';
        button.style.borderColor = 'var(--neon-pink)';
        button.style.color = 'var(--neon-pink)';
        button.textContent = originalText;
        button.style.transform = 'scale(1)';
    }, 2000);
}

function updateCartDisplay() {
    document.getElementById('cartTotal').textContent = total.toFixed(2);
    
    let cartItemsHTML = '';
    cart.forEach((item, index) => {
        cartItemsHTML += `
            <div class="cart-item">
                <div style="display: flex; justify-content: space-between;">
                    <span>${item.name}</span>
                    <span style="color: var(--neon-pink);">${item.price.toFixed(2)} DT</span>
                </div>
            </div>
        `;
    });
    document.getElementById('cartItems').innerHTML = cartItemsHTML;

    // Animation du total
    const totalElement = document.getElementById('cartTotal');
    totalElement.style.animation = 'none';
    setTimeout(() => {
        totalElement.style.animation = 'textGlow 0.5s ease';
    }, 10);
}

function checkout() {
    if (cart.length === 0) {
        alert('⚠️ Votre panier est vide !');
        return;
    }
    
    let orderSummary = '🌟 ACHAT CONFIRMÉ 🌟\n\n';
    orderSummary += '━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
    cart.forEach(item => {
        orderSummary += `⚡ ${item.name} - ${item.price.toFixed(2)} DT\n`;
    });
    orderSummary += '━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
    orderSummary += `💎 TOTAL: ${total.toFixed(2)} DT\n\n`;
    orderSummary += '🚀 Les articles seront livrés dans votre compte sous 24h\n';
    orderSummary += '🔮 Merci d\'avoir choisi bark nghit rp RP!';
    
    alert(orderSummary);
    
    // Reset du panier
    cart = [];
    total = 0;
    updateCartDisplay();
}

// Navigation fluide
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});