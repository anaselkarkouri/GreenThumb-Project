// Enhanced Interactions for GreenThumb

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
});

// Smooth Scroll for Anchor Links
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

// Scroll Indicator
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    });

    // Hide scroll indicator when scrolled
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    });
}

// Season Guide Interaction
const seasonButtons = document.querySelectorAll('.season-btn');
const seasonalTips = document.getElementById('seasonalTips');
const seasonalPlants = document.getElementById('seasonalPlants');

const seasonData = {
    spring: {
        tips: [
            "Préparez vos sols pour les nouvelles plantations",
            "Commencez à semer les légumes de saison",
            "Taillez vos arbres fruitiers",
            "Installez votre système d'irrigation"
        ],
        plants: [
            { name: "Tomates", image: "images/tomatoes.jpg" },
            { name: "Menthe", image: "images/mint.jpg" },
            { name: "Roses", image: "images/roses.jpg" }
        ]
    },
    summer: {
        tips: [
            "Arrosez tôt le matin ou tard le soir",
            "Paillez vos plantations",
            "Surveillez les parasites",
            "Récoltez régulièrement vos légumes"
        ],
        plants: [
            { name: "Basilic", image: "images/basil.jpg" },
            { name: "Poivrons", image: "images/peppers.jpg" },
            { name: "Jasmin", image: "images/jasmine.jpg" }
        ]
    },
    autumn: {
        tips: [
            "Ramassez les feuilles mortes",
            "Plantez les bulbes de printemps",
            "Protégez les plantes sensibles",
            "Préparez votre compost"
        ],
        plants: [
            { name: "Chrysanthèmes", image: "images/chrysanthemums.jpg" },
            { name: "Épinards", image: "images/spinach.jpg" },
            { name: "Safran", image: "images/saffron.jpg" }
        ]
    },
    winter: {
        tips: [
            "Protégez vos plantes du gel",
            "Entretenez vos outils",
            "Planifiez votre jardin",
            "Faites germer en intérieur"
        ],
        plants: [
            { name: "Agrumes", image: "images/citrus.jpg" },
            { name: "Romarin", image: "images/rosemary.jpg" },
            { name: "Cyclamens", image: "images/cyclamen.jpg" }
        ]
    }
};

function updateSeasonalContent(season) {
    // Update tips
    const tips = seasonData[season].tips;
    seasonalTips.innerHTML = tips.map(tip => `<li><i class="fas fa-check"></i> ${tip}</li>`).join('');

    // Update plants
    const plants = seasonData[season].plants;
    seasonalPlants.innerHTML = plants.map(plant => `
        <div class="plant-card" data-aos="fade-up">
            <img src="${plant.image}" alt="${plant.name}">
            <h4>${plant.name}</h4>
        </div>
    `).join('');
}

seasonButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        seasonButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        // Update content
        updateSeasonalContent(button.dataset.season);
    });
});

// Initialize with spring content
updateSeasonalContent('spring');

// Newsletter Form Animation
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const button = newsletterForm.querySelector('button');
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i> Inscrit!';
        button.classList.add('success');
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.classList.remove('success');
            newsletterForm.reset();
        }, 2000);
    });
}

// Category Cards Hover Effect
const categoryCards = document.querySelectorAll('.category-card');
categoryCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.querySelector('.category-content').classList.add('hover');
    });
    
    card.addEventListener('mouseleave', () => {
        card.querySelector('.category-content').classList.remove('hover');
    });
});

// Initialize AOS with custom settings
document.addEventListener('DOMContentLoaded', () => {
    AOS.refresh();
});
