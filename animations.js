// Advanced Animations for AI Automation Agency

// Initialize advanced animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initParticleSystem();
    initAdvancedScrollAnimations();
    initMorphingShapes();
    initTextAnimations();
    initHoverEffects();
    initLoadingAnimations();
    
    console.log('🎨 Advanced animations initialized');
});

// =============================================
// PARTICLE SYSTEM
// =============================================
function initParticleSystem() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    // Create particles container
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    heroSection.appendChild(particlesContainer);
    
    // Particle configuration
    const particleCount = 50;
    const particles = [];
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
    
    function createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * 4 + 2;
        const startPositionX = Math.random() * window.innerWidth;
        const animationDuration = Math.random() * 10 + 10;
        const delay = Math.random() * 10;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(102, 126, 234, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            left: ${startPositionX}px;
            animation: floatParticle ${animationDuration}s linear infinite;
            animation-delay: ${delay}s;
            pointer-events: none;
        `;
        
        container.appendChild(particle);
        
        // Remove and recreate particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
                createParticle(container);
            }
        }, (animationDuration + delay) * 1000);
    }
}

// =============================================
// ADVANCED SCROLL ANIMATIONS
// =============================================
function initAdvancedScrollAnimations() {
    // Parallax scrolling
    const parallaxElements = document.querySelectorAll('.gradient-orb');
    
    window.addEventListener('scroll', throttle(() => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach((element, index) => {
            const speed = (index + 1) * 0.3;
            element.style.transform = `translateY(${rate * speed}px)`;
        });
    }, 16));
    
    // Reveal animations with custom timing
    const revealElements = document.querySelectorAll('.service-card, .portfolio-item, .timeline-item');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 100);
                
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px) scale(0.95)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(element);
    });
    
    // Progress bar animation for skills/stats
    initProgressBars();
}

function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const progress = progressBar.getAttribute('data-progress') || '100';
                
                progressBar.style.width = '0%';
                progressBar.style.transition = 'width 2s ease';
                
                setTimeout(() => {
                    progressBar.style.width = progress + '%';
                }, 100);
                
                progressObserver.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => progressObserver.observe(bar));
}

// =============================================
// MORPHING SHAPES
// =============================================
function initMorphingShapes() {
    const aiVisualization = document.querySelector('.ai-visualization');
    if (!aiVisualization) return;
    
    // Create animated connection lines
    const connections = document.createElement('div');
    connections.className = 'ai-connections';
    aiVisualization.appendChild(connections);
    
    // Add morphing background shapes
    const morphShapes = document.createElement('div');
    morphShapes.className = 'morph-shapes';
    morphShapes.innerHTML = `
        <div class="morph-shape shape-1"></div>
        <div class="morph-shape shape-2"></div>
        <div class="morph-shape shape-3"></div>
    `;
    
    aiVisualization.appendChild(morphShapes);
    
    // Animate connections between nodes
    animateConnections();
}

function animateConnections() {
    const nodes = document.querySelectorAll('.ai-nodes .node');
    const connectionsContainer = document.querySelector('.ai-connections');
    
    if (!connectionsContainer || nodes.length < 2) return;
    
    // Create SVG for connections
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    connectionsContainer.appendChild(svg);
    
    // Draw animated lines between nodes
    setInterval(() => {
        svg.innerHTML = ''; // Clear previous lines
        
        const activeNode = document.querySelector('.node.active');
        if (!activeNode) return;
        
        nodes.forEach(node => {
            if (node !== activeNode) {
                drawAnimatedLine(svg, activeNode, node);
            }
        });
    }, 2000);
}

function drawAnimatedLine(svg, node1, node2) {
    const rect1 = node1.getBoundingClientRect();
    const rect2 = node2.getBoundingClientRect();
    const svgRect = svg.getBoundingClientRect();
    
    const x1 = rect1.left + rect1.width / 2 - svgRect.left;
    const y1 = rect1.top + rect1.height / 2 - svgRect.top;
    const x2 = rect2.left + rect2.width / 2 - svgRect.left;
    const y2 = rect2.top + rect2.height / 2 - svgRect.top;
    
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
    line.setAttribute('stroke', 'rgba(102, 126, 234, 0.3)');
    line.setAttribute('stroke-width', '2');
    line.style.opacity = '0';
    line.style.transition = 'opacity 0.5s ease';
    
    svg.appendChild(line);
    
    // Animate line appearance
    setTimeout(() => {
        line.style.opacity = '1';
    }, 100);
    
    // Remove line after animation
    setTimeout(() => {
        if (line.parentNode) {
            line.style.opacity = '0';
            setTimeout(() => line.remove(), 500);
        }
    }, 1500);
}

// =============================================
// TEXT ANIMATIONS
// =============================================
function initTextAnimations() {
    // Typewriter effect for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        typewriterEffect(heroTitle, 100);
    }
    
    // Glitch effect for section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        title.addEventListener('mouseenter', () => {
            glitchEffect(title);
        });
    });
    
    // Text reveal animation
    initTextReveal();
}

function typewriterEffect(element, speed = 100) {
    const text = element.textContent;
    element.textContent = '';
    element.style.borderRight = '2px solid var(--primary-color)';
    element.style.animation = 'blink 1s infinite';
    
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
            setTimeout(() => {
                element.style.borderRight = 'none';
                element.style.animation = 'none';
            }, 1000);
        }
    }, speed);
}

function glitchEffect(element) {
    const originalText = element.textContent;
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    let iterations = 0;
    
    const glitchInterval = setInterval(() => {
        element.textContent = originalText
            .split('')
            .map((char, index) => {
                if (index < iterations) {
                    return originalText[index];
                }
                return glitchChars[Math.floor(Math.random() * glitchChars.length)];
            })
            .join('');
        
        if (iterations >= originalText.length) {
            clearInterval(glitchInterval);
        }
        
        iterations += 1 / 3;
    }, 30);
}

function initTextReveal() {
    const textElements = document.querySelectorAll('.hero-subtitle, .section-subtitle');
    
    textElements.forEach(element => {
        const text = element.textContent;
        const words = text.split(' ');
        
        element.innerHTML = words.map(word => 
            `<span class="word-reveal">${word}</span>`
        ).join(' ');
        
        const wordSpans = element.querySelectorAll('.word-reveal');
        wordSpans.forEach(span => {
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            span.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        
        // Animate words on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    wordSpans.forEach((span, index) => {
                        setTimeout(() => {
                            span.style.opacity = '1';
                            span.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(element);
    });
}

// =============================================
// HOVER EFFECTS
// =============================================
function initHoverEffects() {
    // Magnetic effect for buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mousemove', magneticEffect);
        button.addEventListener('mouseleave', resetMagnetic);
    });
    
    // Tilt effect for cards
    const cards = document.querySelectorAll('.service-card, .portfolio-item');
    cards.forEach(card => {
        card.addEventListener('mousemove', tiltEffect);
        card.addEventListener('mouseleave', resetTilt);
    });
    
    // Glow trail effect
    initGlowTrail();
}

function magneticEffect(e) {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
}

function resetMagnetic(e) {
    const button = e.currentTarget;
    button.style.transform = 'translate(0, 0)';
}

function tiltEffect(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
}

function resetTilt(e) {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
}

function initGlowTrail() {
    let glowTrail = [];
    const maxTrailLength = 10;
    
    document.addEventListener('mousemove', (e) => {
        // Only show trail on dark sections
        const darkSections = document.querySelectorAll('.hero, .ai-demo, .process, .contact');
        let inDarkSection = false;
        
        darkSections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
                inDarkSection = true;
            }
        });
        
        if (!inDarkSection) return;
        
        // Create glow dot
        const glowDot = document.createElement('div');
        glowDot.className = 'glow-dot';
        glowDot.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: radial-gradient(circle, rgba(102, 126, 234, 0.8) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${e.clientX - 2}px;
            top: ${e.clientY - 2}px;
            transition: opacity 0.5s ease;
        `;
        
        document.body.appendChild(glowDot);
        glowTrail.push(glowDot);
        
        // Remove old trail dots
        if (glowTrail.length > maxTrailLength) {
            const oldDot = glowTrail.shift();
            oldDot.style.opacity = '0';
            setTimeout(() => oldDot.remove(), 500);
        }
        
        // Fade out trail
        glowTrail.forEach((dot, index) => {
            const opacity = (index + 1) / glowTrail.length * 0.8;
            dot.style.opacity = opacity;
        });
    });
}

// =============================================
// LOADING ANIMATIONS
// =============================================
function initLoadingAnimations() {
    // Enhanced loading screen animation
    const loadingScreen = document.getElementById('loading-screen');
    const aiLoader = document.querySelector('.ai-loader');
    
    if (aiLoader) {
        // Add pulsing effect to neurons
        const neurons = aiLoader.querySelectorAll('.neuron');
        neurons.forEach((neuron, index) => {
            neuron.style.animationDelay = `${index * 0.3}s`;
        });
        
        // Add scanning line effect
        const scanLine = document.createElement('div');
        scanLine.className = 'scan-line';
        scanLine.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, transparent, var(--primary-color), transparent);
            animation: scan 2s linear infinite;
        `;
        
        aiLoader.appendChild(scanLine);
    }
}

// =============================================
// UTILITY FUNCTIONS
// =============================================

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Random number between min and max
function random(min, max) {
    return Math.random() * (max - min) + min;
}

// Lerp (linear interpolation)
function lerp(start, end, factor) {
    return start + (end - start) * factor;
}

// =============================================
// ADDITIONAL CSS ANIMATIONS
// =============================================

// Add dynamic styles for animations
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes scan {
        0% { transform: translateY(0); opacity: 0; }
        50% { opacity: 1; }
        100% { transform: translateY(80px); opacity: 0; }
    }
    
    .morph-shapes {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
    }
    
    .morph-shape {
        position: absolute;
        border-radius: 50%;
        background: var(--primary-gradient);
        opacity: 0.1;
        filter: blur(20px);
        animation: morph 8s ease-in-out infinite;
    }
    
    .shape-1 {
        width: 100px;
        height: 100px;
        top: 20%;
        left: 10%;
        animation-delay: 0s;
    }
    
    .shape-2 {
        width: 150px;
        height: 150px;
        top: 60%;
        right: 20%;
        animation-delay: 2s;
    }
    
    .shape-3 {
        width: 80px;
        height: 80px;
        bottom: 30%;
        left: 50%;
        animation-delay: 4s;
    }
    
    @keyframes morph {
        0%, 100% {
            transform: scale(1) rotate(0deg);
            border-radius: 50%;
        }
        25% {
            transform: scale(1.2) rotate(90deg);
            border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
        }
        50% {
            transform: scale(0.8) rotate(180deg);
            border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%;
        }
        75% {
            transform: scale(1.1) rotate(270deg);
            border-radius: 30% 70% 30% 70% / 70% 30% 70% 30%;
        }
    }
    
    .glow-dot {
        animation: glowPulse 0.5s ease-out;
    }
    
    @keyframes glowPulse {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(1);
            opacity: 0.8;
        }
    }
    
    .word-reveal {
        display: inline-block;
        margin-right: 0.25em;
    }
    
    .ai-connections {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    }
    
    /* Enhanced button hover effects */
    .btn {
        position: relative;
        overflow: hidden;
        transition: all 0.3s ease;
    }
    
    .btn::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
        transition: left 0.5s;
    }
    
    .btn:hover::before {
        left: 100%;
    }
    
    /* Enhanced card transitions */
    .service-card, .portfolio-item {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    /* Loading dots animation */
    .loading-dots {
        display: inline-flex;
        gap: 4px;
    }
    
    .loading-dots span {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--primary-color);
        animation: loadingDots 1.4s ease-in-out infinite both;
    }
    
    .loading-dots span:nth-child(1) { animation-delay: -0.32s; }
    .loading-dots span:nth-child(2) { animation-delay: -0.16s; }
    .loading-dots span:nth-child(3) { animation-delay: 0s; }
    
    @keyframes loadingDots {
        0%, 80%, 100% {
            opacity: 0.3;
            transform: scale(0.8);
        }
        40% {
            opacity: 1;
            transform: scale(1);
        }
    }
`;

document.head.appendChild(animationStyles);

// Initialize performance monitoring
let animationFrameId;
let isAnimating = false;

function startAnimationLoop() {
    if (isAnimating) return;
    isAnimating = true;
    
    function animate() {
        // Add any continuous animations here
        animationFrameId = requestAnimationFrame(animate);
    }
    
    animate();
}

function stopAnimationLoop() {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        isAnimating = false;
    }
}

// Start animations when page is visible
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        stopAnimationLoop();
    } else {
        startAnimationLoop();
    }
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    stopAnimationLoop();
});