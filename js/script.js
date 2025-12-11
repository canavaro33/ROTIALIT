// ===========================
// MOBILE NAVIGATION TOGGLE
// ===========================
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu li a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnHamburger = hamburger.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
});

// ===========================
// SMOOTH SCROLLING
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ===========================
// NAVBAR SCROLL EFFECT
// ===========================
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 6px 30px rgba(45, 95, 79, 0.2)';
    } else {
        navbar.style.boxShadow = '0 4px 20px rgba(45, 95, 79, 0.15)';
    }
});

// ===========================
// CONTACT FORM SUBMISSION
// ===========================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Validate form
        if (!name || !email || !phone || !subject || !message) {
            alert('⚠️ Mohon lengkapi semua field yang wajib diisi!');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('⚠️ Format email tidak valid!');
            return;
        }
        
        // Phone validation (Indonesian format)
        const phoneRegex = /^(\+62|62|0)[0-9]{9,12}$/;
        if (!phoneRegex.test(phone.replace(/[\s-]/g, ''))) {
            alert('⚠️ Format nomor telepon tidak valid!');
            return;
        }
        
        // Success message
        alert('✅ Terima kasih! Pesan Anda telah terkirim.\n\nTim kami akan menghubungi Anda segera.\n\nNama: ' + name + '\nEmail: ' + email);
        
        // Reset form
        contactForm.reset();
    });
}

// ===========================
//  CARD ANIMATION ON SCROLL
// ===========================
function animateOnScroll() {
    const elements = document.querySelectorAll('.product-card, .menu-item, .value-card, .team-member, .job-card, .location-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize animations when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', animateOnScroll);
} else {
    animateOnScroll();
}

// ===========================
// BUTTON HOVER EFFECTS
// ===========================
document.querySelectorAll('.btn-primary, .btn-secondary, .btn-apply').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.02)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ===========================
// ORDER/APPLY BUTTON ALERTS
// ===========================
document.querySelectorAll('.btn-primary').forEach(button => {
    // Skip contact form submit button and links (yang sudah punya href)
    if (!button.classList.contains('btn-submit') && button.tagName === 'BUTTON') {
        button.addEventListener('click', function(e) {
            const parentCard = this.closest('.-card-large, .-card');
            if (parentCard) {
                const Name = parentCard.querySelector('h3').textContent;
                e.preventDefault();
                alert('🛒 Terima kasih!\n\nAnda memilih: ' + Name + '\n\nSilakan hubungi kami via WhatsApp di +62 857 - 8116 - 9656 untuk melakukan pemesanan.');
            }
        });
    }
});

document.querySelectorAll('.btn-apply').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const jobCard = this.closest('.job-card');
        const jobTitle = jobCard.querySelector('h4').textContent;
        const confirmed = confirm('📝 Lamar untuk posisi: ' + jobTitle + '\n\nAnda akan diarahkan untuk mengirim email lamaran.\n\nLanjutkan?');
        
        if (confirmed) {
            window.location.href = 'mailto:career@rotialit.com?subject=Lamaran - ' + jobTitle + '&body=Kepada HRD Roti Alit,%0D%0A%0D%0ASaya tertarik untuk melamar posisi ' + jobTitle + '.%0D%0A%0D%0ATerlampir CV dan portfolio saya.%0D%0A%0D%0ATerima kasih,%0D%0A[Nama Anda]';
        }
    });
});

// ===========================
// LOADING ANIMATION
// ===========================
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===========================
// BACK TO TOP BUTTON (Optional Enhancement)
// ===========================
// Create back to top button
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '↑';
backToTopButton.className = 'back-to-top';
backToTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #2d5f4f 0%, #1e4038 100%);
    color: white;
    border: none;
    font-size: 24px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 5px 20px rgba(45, 95, 79, 0.3);
    z-index: 999;
`;

// --- KONFIGURASI WHATSAPP ---
const whatsappNumber = '6285781169656'; // Ganti dengan nomor WhatsApp Anda
const baseUrl = `https://wa.me/${whatsappNumber}?text=Halo%2C%20saya%20ingin%20order%20`;
// --------------------------

// 1. Dapatkan elemen tombol
const orderButton = document.getElementById('order-button');
// 2. Dapatkan nama produk (misalnya dari h1 dengan id="product-name")
const productNameElement = document.getElementById('product-name');

if (orderButton && productNameElement) {
    // Ambil teks nama produk dan bersihkan dari spasi berlebih
    let productName = productNameElement.textContent.trim();
    
    // Ganti spasi dengan '%20' agar aman untuk URL (URL Encoding)
    const encodedProductName = productName.replace(/\s/g, '%20');

    // Buat pesan lengkap
    const fullMessage = `${baseUrl}${encodedProductName}%20Alit.`;

    // Sisipkan link dinamis ke tombol
    orderButton.href = fullMessage;
}

document.body.appendChild(backToTopButton);

// Show/hide back to top button
window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        backToTopButton.style.opacity = '1';
        backToTopButton.style.visibility = 'visible';
    } else {
        backToTopButton.style.opacity = '0';
        backToTopButton.style.visibility = 'hidden';
    }
});

// Scroll to top when clicked
backToTopButton.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

backToTopButton.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-5px) scale(1.1)';
    this.style.boxShadow = '0 8px 30px rgba(45, 95, 79, 0.5)';
});

backToTopButton.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
    this.style.boxShadow = '0 5px 20px rgba(45, 95, 79, 0.3)';
});

// ===========================
// CONSOLE MESSAGE
// ===========================
console.log('%c🍞 Roti Alit Website', 'color: #2d5f4f; font-size: 20px; font-weight: bold; font-family: Playfair Display;');
console.log('%cWebsite created with ❤️ by Your Assistant', 'color: #d4af37; font-size: 12px;');
console.log('%cAll rights reserved © 2024', 'color: #5a5a5a; font-size: 11px;');

document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const categoryContents = document.querySelectorAll('.-category-content');
    
    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                tabButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Hide all category contents
                categoryContents.forEach(content => {
                    content.classList.remove('active');
                });
                
                // Show selected category content
                const categoryId = this.getAttribute('data-category');
                const selectedContent = document.getElementById(categoryId);
                if (selectedContent) {
                    selectedContent.classList.add('active');
                    
                    // Smooth scroll to content
                    selectedContent.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'nearest' 
                    });
                }
            });
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const categoryCards = document.querySelectorAll('.category-card');
    const categorySelection = document.getElementById('categorySelection');
    const categoryContents = document.querySelectorAll('.-category-content');
    const backButton = document.getElementById('backButton');
    
    if (categoryCards.length > 0) {
        // Handle category card click
        categoryCards.forEach(card => {
            card.addEventListener('click', function() {
                const categoryId = this.getAttribute('data-category');
                
                // Hide category selection
                categorySelection.classList.add('hidden');
                
                // Show back button
                backButton.style.display = 'inline-flex';
                
                // Show selected category content
                const selectedContent = document.getElementById(categoryId);
                if (selectedContent) {
                    selectedContent.classList.add('active');
                    
                    // Scroll to top smoothly
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Handle back button click
        if (backButton) {
            backButton.addEventListener('click', function() {
                // Hide all category contents
                categoryContents.forEach(content => {
                    content.classList.remove('active');
                });
                
                // Hide back button
                backButton.style.display = 'none';
                
                // Show category selection
                categorySelection.classList.remove('hidden');
                
                // Scroll to top smoothly
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }
});