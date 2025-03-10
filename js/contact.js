document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Validate form
        if (!validateForm(name, email, subject, message)) {
            return;
        }
        
        // Simulate form submission
        showSubmissionMessage('success', 'Votre message a été envoyé avec succès! Nous vous répondrons bientôt.');
        
        // Reset form
        contactForm.reset();
    });
    
    function validateForm(name, email, subject, message) {
        // Reset previous error messages
        clearErrors();
        
        let isValid = true;
        
        // Name validation
        if (name.trim().length < 2) {
            showError('name', 'Le nom doit contenir au moins 2 caractères');
            isValid = false;
        }
        
        // Email validation
        if (!isValidEmail(email)) {
            showError('email', 'Veuillez entrer une adresse email valide');
            isValid = false;
        }
        
        // Subject validation
        if (!subject) {
            showError('subject', 'Veuillez sélectionner un sujet');
            isValid = false;
        }
        
        // Message validation
        if (message.trim().length < 10) {
            showError('message', 'Le message doit contenir au moins 10 caractères');
            isValid = false;
        }
        
        return isValid;
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
        field.classList.add('error');
    }
    
    function clearErrors() {
        // Remove all error messages
        document.querySelectorAll('.error-message').forEach(error => error.remove());
        document.querySelectorAll('.error').forEach(field => field.classList.remove('error'));
    }
    
    function showSubmissionMessage(type, message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `submission-message ${type}`;
        messageDiv.textContent = message;
        
        const form = document.querySelector('.contact-form');
        form.insertBefore(messageDiv, form.firstChild);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
});
