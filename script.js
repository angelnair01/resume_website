document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 50,
                behavior: 'smooth'
            });
        });
    });
    
    // Falling petals animation
    const petalContainer = document.getElementById('petalContainer');
    const petalToggle = document.getElementById('petalToggle');
    let petalAnimationActive = false;
    let petals = [];
    
    // Petal colors and shapes
    const petalColors = ['#FFB6C1', '#E6E6FA', '#98FB98', '#FFD700'];
    
    function createPetal() {
        if (!petalAnimationActive) return;
        
        const petal = document.createElement('div');
        petal.className = 'petal';
        
        // Randomize petal properties
        const size = Math.random() * 15 + 10;
        const startPositionX = Math.random() * window.innerWidth;
        const rotationSpeed = Math.random() * 2 + 1;
        const swayAmount = Math.random() * 5 + 3;
        const fallSpeed = Math.random() * 2 + 1;
        const color = petalColors[Math.floor(Math.random() * petalColors.length)];
        
        // Set petal styles
        petal.style.width = `${size}px`;
        petal.style.height = `${size}px`;
        petal.style.borderRadius = '50% 50% 50% 0';
        petal.style.backgroundColor = color;
        petal.style.left = `${startPositionX}px`;
        petal.style.top = '-20px';
        petal.style.opacity = '0.7';
        petal.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        petalContainer.appendChild(petal);
        
        // Animation variables
        let posY = -20;
        let posX = startPositionX;
        let rotation = Math.random() * 360;
        let sway = 0;
        
        // Store petal and its animation properties
        const petalObj = {
            element: petal,
            posY,
            posX,
            fallSpeed,
            rotationSpeed,
            rotation,
            sway,
            swayAmount,
            swayDirection: Math.random() > 0.5 ? 1 : -1
        };
        
        petals.push(petalObj);
    }
    
    function animatePetals() {
        if (!petalAnimationActive) return;
        
        petals.forEach((petal, index) => {
            // Update position
            petal.posY += petal.fallSpeed;
            
            // Sway effect
            petal.sway += 0.01;
            petal.posX += Math.sin(petal.sway) * petal.swayDirection * 0.5;
            
            // Rotate petal
            petal.rotation += petal.rotationSpeed;
            
            // Apply styles
            petal.element.style.top = `${petal.posY}px`;
            petal.element.style.left = `${petal.posX}px`;
            petal.element.style.transform = `rotate(${petal.rotation}deg)`;
            
            // Remove petal if it's out of view
            if (petal.posY > window.innerHeight + 100) {
                petal.element.remove();
                petals.splice(index, 1);
            }
        });
        
        // Request next animation frame
        requestAnimationFrame(animatePetals);
    }
    
    // Toggle falling petals animation
    petalToggle.addEventListener('change', function() {
        petalAnimationActive = this.checked;
        
        if (petalAnimationActive) {
            petalContainer.style.display = 'block';
            
            // Start creating petals
            const createPetalInterval = setInterval(() => {
                if (!petalAnimationActive) {
                    clearInterval(createPetalInterval);
                    return;
                }
                createPetal();
            }, 300);
            
            // Start animation
            animatePetals();
        } else {
            // Clear all petals
            petals.forEach(petal => petal.element.remove());
            petals = [];
            petalContainer.style.display = 'none';
        }
    });
    
    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would normally send the form data to a server
            // For demo purposes, just show an alert
            alert(`Thank you, ${name}! Your message has been received. I'll get back to you soon.`);
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Skill card animations
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(255, 182, 193, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 20px rgba(255, 182, 193, 0.15)';
        });
    });
});
