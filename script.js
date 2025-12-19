// DOM Elements
const loginForm = document.getElementById('loginForm');
const customerRegisterForm = document.getElementById('customerRegisterForm');
const providerRegisterForm = document.getElementById('providerRegisterForm');
const searchForm = document.querySelector('.search-box form');

// Sample data for services (in a real app, this would come from a backend API)
const services = [
    { id: 1, name: 'Plumbing', icon: 'fa-wrench', description: 'Leaks, installations, and repairs' },
    { id: 2, name: 'Electrical', icon: 'fa-bolt', description: 'Wiring, fixtures, and repairs' },
    { id: 3, name: 'Cleaning', icon: 'fa-broom', description: 'Home and office cleaning' },
    { id: 4, name: 'Tutoring', icon: 'fa-graduation-cap', description: 'Academic and skill tutoring' },
    { id: 5, name: 'Carpentry', icon: 'fa-hammer', description: 'Furniture and woodwork' },
    { id: 6, name: 'Painting', icon: 'fa-paint-roller', description: 'Interior and exterior painting' },
    { id: 7, name: 'AC Repair', icon: 'fa-snowflake', description: 'AC installation and maintenance' },
    { id: 8, name: 'Pest Control', icon: 'fa-bug', description: 'Pest removal and prevention' }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Populate services in the services section
    populateServices();
    
    // Add animation classes on scroll
    animateOnScroll();
    
    // Listen for scroll events to trigger animations
    window.addEventListener('scroll', animateOnScroll);
});

// Populate services in the services section
function populateServices() {
    const servicesContainer = document.querySelector('#services .row');
    if (!servicesContainer) return;
    
    // Clear any existing content
    servicesContainer.innerHTML = '';
    
    // Add service cards
    services.forEach(service => {
        const serviceCard = document.createElement('div');
        serviceCard.className = 'col-md-3 col-6 mb-4';
        serviceCard.innerHTML = `
            <div class="card service-card h-100" data-service-id="${service.id}">
                <div class="card-body text-center">
                    <div class="service-icon mb-3">
                        <i class="fas ${service.icon}"></i>
                    </div>
                    <h5 class="card-title">${service.name}</h5>
                    <p class="card-text text-muted">${service.description}</p>
                </div>
            </div>
        `;
        servicesContainer.appendChild(serviceCard);
    });
    
    // Add click event listeners to service cards
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', function() {
            const serviceId = this.getAttribute('data-service-id');
            const service = services.find(s => s.id === parseInt(serviceId));
            if (service) {
                // In a real app, this would navigate to a service details page or show a modal
                alert(`You clicked on ${service.name} service. This would show more details in a real application.`);
            }
        });
    });
}

// Handle login form submission
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;
        const password = this.querySelector('input[type="password"]').value;
        
        // In a real app, this would make an API call to authenticate the user
        console.log('Login attempt with:', { email, password });
        
        // Show success message (in a real app, this would be after successful authentication)
        alert('Login functionality will be implemented with the backend.');
        
        // Close the modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
        modal.hide();
    });
}

// Handle customer registration form submission
if (customerRegisterForm) {
    customerRegisterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: this.querySelector('input[type="text"]').value,
            email: this.querySelector('input[type="email"]').value,
            phone: this.querySelector('input[type="tel"]').value,
            password: this.querySelector('input[type="password"]').value,
            userType: 'customer'
        };
        
        // In a real app, this would make an API call to register the user
        console.log('Customer registration:', formData);
        
        // Show success message
        alert('Registration successful! You can now login with your credentials.');
        
        // Close the modal and open login modal
        const registerModal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
        const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
        
        registerModal.hide();
        loginModal.show();
    });
}

// Handle service provider registration form submission
if (providerRegisterForm) {
    providerRegisterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            businessName: this.querySelector('input[type="text"]').value,
            email: this.querySelector('input[type="email"]').value,
            phone: this.querySelector('input[type="tel"]').value,
            serviceCategory: this.querySelector('select').value,
            password: this.querySelector('input[type="password"]').value,
            userType: 'provider'
        };
        
        // In a real app, this would make an API call to register the service provider
        console.log('Provider registration:', formData);
        
        // Show success message
        alert('Service provider registration submitted! Our team will review your application and get back to you soon.');
        
        // Close the modal and open login modal
        const registerModal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
        const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
        
        registerModal.hide();
        loginModal.show();
    });
}

// Handle search form submission
if (searchForm) {
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const service = this.querySelector('input[placeholder*="service"]').value;
        const location = this.querySelector('input[placeholder*="location"]').value;
        
        if (!service || !location) {
            alert('Please enter both service and location to search.');
            return;
        }
        
        // In a real app, this would make an API call to search for service providers
        console.log('Searching for:', { service, location });
        
        // Show a message (in a real app, this would show search results)
        alert(`Searching for ${service} services in ${location}. This would show search results in a real application.`);
    });
}

// Animate elements when they come into view
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .step-card');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animate-fade-in-up');
        }
    });
}

// Handle tab switching in the registration modal
document.addEventListener('DOMContentLoaded', function() {
    const registerTabs = document.querySelectorAll('#registerTabs .nav-link');
    
    registerTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all tabs and panes
            document.querySelectorAll('#registerTabs .nav-link').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('show', 'active'));
            
            // Add active class to clicked tab and corresponding pane
            this.classList.add('active');
            const target = this.getAttribute('data-bs-target');
            document.querySelector(target).classList.add('show', 'active');
        });
    });
});

// Handle back to top button
window.onscroll = function() {
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    }
};

// Add back to top button to the page
function addBackToTopButton() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'backToTop';
    backToTopBtn.title = 'Go to top';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'btn btn-primary rounded-circle position-fixed';
    backToTopBtn.style.display = 'none';
    backToTopBtn.style.bottom = '20px';
    backToTopBtn.style.right = '20px';
    backToTopBtn.style.width = '50px';
    backToTopBtn.style.height = '50px';
    backToTopBtn.style.zIndex = '99';
    
    backToTopBtn.addEventListener('click', function() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    });
    
    document.body.appendChild(backToTopBtn);
}

// Initialize the back to top button
document.addEventListener('DOMContentLoaded', addBackToTopButton);
