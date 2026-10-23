document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.getElementById('newsletterForm');
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        const submitButton = this.querySelector('button[type="submit"]');
        const email = emailInput.value;
        
        submitButton.textContent = 'Subscribing...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            submitButton.textContent = 'Subscribed';
            emailInput.value = '';
            
            setTimeout(() => {
                submitButton.textContent = 'Subscribe';
                submitButton.disabled = false;
            }, 3000);
        }, 1000);
    });
});
