// Racing Gaming Stream JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Loading screen
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }, 2000);

    // Animated counter for statistics
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current).toLocaleString();
        }, 16);
    }

    // Initialize counters when they come into view
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const target = parseInt(entry.target.dataset.target);
                animateCounter(entry.target, target);
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Observe all stat numbers
    document.querySelectorAll('.stat-number').forEach(stat => {
        counterObserver.observe(stat);
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll to stream function
    window.scrollToStream = function() {
        const streamSection = document.getElementById('stream');
        if (streamSection) {
            const offsetTop = streamSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    };

    // Toggle notification function
    window.toggleNotification = function() {
        // Create notification popup
        const notification = document.createElement('div');
        notification.className = 'notification-popup';
        notification.innerHTML = `
            <div class="notification-content">
                <h3>🏁 Race Notifications</h3>
                <p>Get notified when streams go live!</p>
                <div class="notification-form">
                    <input type="email" placeholder="Enter your email" id="notificationEmail">
                    <button onclick="subscribeNotifications()">SUBSCRIBE</button>
                </div>
                <button class="close-notification" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Add styles for notification popup
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                .notification-popup {
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
                    border: 2px solid #FF0040;
                    border-radius: 15px;
                    padding: 2rem;
                    z-index: 10000;
                    box-shadow: 0 20px 40px rgba(255, 0, 64, 0.3);
                    animation: notificationSlide 0.3s ease;
                }
                
                @keyframes notificationSlide {
                    from {
                        opacity: 0;
                        transform: translate(-50%, -60%);
                    }
                    to {
                        opacity: 1;
                        transform: translate(-50%, -50%);
                    }
                }
                
                .notification-content {
                    text-align: center;
                    position: relative;
                }
                
                .notification-content h3 {
                    font-family: 'Russo One', sans-serif;
                    color: #FFD700;
                    margin-bottom: 1rem;
                }
                
                .notification-content p {
                    color: #B0B0B0;
                    margin-bottom: 1.5rem;
                }
                
                .notification-form {
                    display: flex;
                    gap: 0.5rem;
                    margin-bottom: 1rem;
                }
                
                .notification-form input {
                    flex: 1;
                    padding: 0.8rem;
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid #FF0040;
                    border-radius: 5px;
                    color: #FFFFFF;
                    font-family: 'Orbitron', monospace;
                }
                
                .notification-form button {
                    padding: 0.8rem 1.5rem;
                    background: #FF0040;
                    color: #FFFFFF;
                    border: none;
                    border-radius: 5px;
                    font-family: 'Orbitron', monospace;
                    font-weight: bold;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                
                .notification-form button:hover {
                    background: #FFD700;
                    color: #0A0A0A;
                }
                
                .close-notification {
                    position: absolute;
                    top: -10px;
                    right: -10px;
                    width: 30px;
                    height: 30px;
                    background: #FF0040;
                    color: #FFFFFF;
                    border: none;
                    border-radius: 50%;
                    font-size: 1.2rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .close-notification:hover {
                    background: #FFD700;
                    color: #0A0A0A;
                }
            `;
            document.head.appendChild(style);
        }
    };

    // Subscribe to notifications
    window.subscribeNotifications = function() {
        const emailInput = document.getElementById('notificationEmail');
        const email = emailInput.value.trim();
        
        if (email && email.includes('@')) {
            // Show success message
            const notification = document.querySelector('.notification-popup');
            if (notification) {
                notification.innerHTML = `
                    <div class="notification-content">
                        <h3>✅ Success!</h3>
                        <p>You're now subscribed to race notifications!</p>
                        <button class="close-notification" onclick="this.parentElement.parentElement.remove()">CLOSE</button>
                    </div>
                `;
                
                // Auto close after 3 seconds
                setTimeout(() => {
                    if (notification.parentElement) {
                        notification.remove();
                    }
                }, 3000);
            }
        } else {
            // Show error
            const emailInput = document.getElementById('notificationEmail');
            emailInput.style.borderColor = '#FF0000';
            emailInput.placeholder = 'Please enter a valid email';
        }
    };

    // Chat functionality
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');

    window.sendMessage = function() {
        if (chatInput && chatMessages) {
            const message = chatInput.value.trim();
            if (message) {
                // Add user message
                const messageElement = document.createElement('div');
                messageElement.className = 'message';
                messageElement.innerHTML = `
                    <span class="user-name">You:</span>
                    <span class="message-text">${message}</span>
                `;
                chatMessages.appendChild(messageElement);
                
                // Clear input
                chatInput.value = '';
                
                // Scroll to bottom
                chatMessages.scrollTop = chatMessages.scrollHeight;
                
                // Simulate response after delay
                setTimeout(() => {
                    const responses = [
                        "Great race! 🏁",
                        "Amazing drift! 🔥",
                        "Let's go! 🚗",
                        "Nice driving! 💨",
                        "Epic move! ⭐"
                    ];
                    
                    const responseElement = document.createElement('div');
                    responseElement.className = 'message';
                    responseElement.innerHTML = `
                        <span class="user-name">RacingFan:</span>
                        <span class="message-text">${responses[Math.floor(Math.random() * responses.length)]}</span>
                    `;
                    chatMessages.appendChild(responseElement);
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }, 1000 + Math.random() * 2000);
            }
        }
    };

    // Enter key to send message
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    // Stream duration timer
    let streamStartTime = Date.now();
    
    function updateStreamDuration() {
        const durationElement = document.querySelector('.stream-duration');
        if (durationElement) {
            const elapsed = Date.now() - streamStartTime;
            const hours = Math.floor(elapsed / 3600000);
            const minutes = Math.floor((elapsed % 3600000) / 60000);
            const seconds = Math.floor((elapsed % 60000) / 1000);
            
            durationElement.textContent = 
                `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    }

    setInterval(updateStreamDuration, 1000);

    // Viewer count animation
    function updateViewerCount() {
        const viewerElement = document.querySelector('.viewer-number');
        if (viewerElement) {
            const currentCount = parseFloat(viewerElement.textContent);
            const change = (Math.random() - 0.5) * 100; // Random change between -50 and +50
            const newCount = Math.max(100, currentCount + change);
            
            // Format the number (e.g., 1.2K, 3.4K)
            if (newCount >= 1000) {
                viewerElement.textContent = (newCount / 1000).toFixed(1) + 'K';
            } else {
                viewerElement.textContent = Math.floor(newCount).toString();
            }
        }
    }

    // Update viewer count every 5 seconds
    setInterval(updateViewerCount, 5000);

    // Schedule countdown
    function updateScheduleCountdowns() {
        const scheduleCards = document.querySelectorAll('.schedule-card');
        const now = new Date();
        
        scheduleCards.forEach((card, index) => {
            // Simulate different start times for each card
            const startHour = 18 + (index * 2); // 6 PM, 8 PM, 10 PM
            const startTime = new Date();
            startTime.setHours(startHour, 0, 0, 0);
            
            if (startTime > now) {
                const timeUntil = startTime - now;
                const hours = Math.floor(timeUntil / 3600000);
                const minutes = Math.floor((timeUntil % 3600000) / 60000);
                
                const statusElement = card.querySelector('.schedule-status');
                if (statusElement) {
                    statusElement.innerHTML = `
                        <i class="fas fa-clock"></i>
                        ${hours}h ${minutes}m
                    `;
                }
            } else {
                const statusElement = card.querySelector('.schedule-status');
                if (statusElement) {
                    statusElement.className = 'schedule-status live';
                    statusElement.innerHTML = `
                        <i class="fas fa-broadcast-tower"></i>
                        LIVE NOW
                    `;
                }
            }
        });
    }

    // Update schedule countdowns every minute
    setInterval(updateScheduleCountdowns, 60000);
    updateScheduleCountdowns(); // Initial call

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        const carShowcase = document.querySelector('.car-showcase');
        
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        
        if (carShowcase) {
            carShowcase.style.transform = `translateY(${scrolled * 0.3}px) rotate(${scrolled * 0.1}deg)`;
        }
    });

    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Press 'S' to scroll to stream
        if (e.key === 's' && !e.ctrlKey && !e.metaKey) {
            if (document.activeElement.tagName !== 'INPUT') {
                scrollToStream();
            }
        }
        
        // Press 'Escape' to close any popups
        if (e.key === 'Escape') {
            const popups = document.querySelectorAll('.notification-popup');
            popups.forEach(popup => popup.remove());
        }
    });

    // Add hover sound effects (visual feedback instead of actual sound)
    document.querySelectorAll('.btn-racing, .social-card, .game-card').forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = this.style.transform || 'scale(1)';
        });
    });

    // Initialize tooltips for social links
    document.querySelectorAll('.social-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (this.href === '#' || this.href === '') {
                e.preventDefault();
                // Create temporary tooltip
                const tooltip = document.createElement('div');
                tooltip.className = 'social-tooltip';
                tooltip.textContent = 'Link coming soon!';
                tooltip.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: #FF0040;
                    color: white;
                    padding: 1rem 2rem;
                    border-radius: 5px;
                    font-family: 'Orbitron', monospace;
                    z-index: 10000;
                    animation: fadeInOut 2s ease;
                `;
                document.body.appendChild(tooltip);
                
                setTimeout(() => tooltip.remove(), 2000);
            }
        });
    });

    // Add fade animation for tooltips
    if (!document.querySelector('#tooltip-styles')) {
        const style = document.createElement('style');
        style.id = 'tooltip-styles';
        style.textContent = `
            @keyframes fadeInOut {
                0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            }
        `;
        document.head.appendChild(style);
    }

    // Performance optimization: Throttle scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        
        scrollTimeout = window.requestAnimationFrame(() => {
            // Add scroll-based animations here if needed
        });
    });

    // Initialize ElevenLabs widget when loaded
    window.addEventListener('load', () => {
        console.log('Racing Gaming Stream - All systems ready! 🏁');
        
        // Check if ElevenLabs widget is loaded
        setTimeout(() => {
            const elevenLabsWidget = document.querySelector('elevenlabs-convai');
            if (elevenLabsWidget) {
                console.log('ElevenLabs AI Racing Coach loaded successfully!');
            } else {
                console.log('ElevenLabs widget loading...');
            }
        }, 3000);
    });
});
