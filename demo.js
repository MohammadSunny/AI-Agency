// Interactive AI Demo Scripts

// Initialize demo functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initDemoControls();
    initWorkflowDemo();
    initChatbotDemo();
    initAnalyticsDemo();
    
    console.log('🤖 AI Demo functionality initialized');
});

// =============================================
// DEMO CONTROLS
// =============================================
function initDemoControls() {
    const demoButtons = document.querySelectorAll('.demo-btn');
    const demoContents = document.querySelectorAll('.demo-content');
    
    demoButtons.forEach(button => {
        button.addEventListener('click', () => {
            const demoType = button.getAttribute('data-demo');
            
            // Remove active class from all buttons
            demoButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            // Hide all demo contents
            demoContents.forEach(content => content.classList.remove('active'));
            // Show selected demo content
            const targetContent = document.getElementById(`demo-${demoType}`);
            if (targetContent) {
                targetContent.classList.add('active');
                
                // Initialize specific demo
                switch(demoType) {
                    case 'workflow':
                        activateWorkflowDemo();
                        break;
                    case 'chatbot':
                        activateChatbotDemo();
                        break;
                    case 'analytics':
                        activateAnalyticsDemo();
                        break;
                }
            }
        });
    });
}

// =============================================
// WORKFLOW AUTOMATION DEMO
// =============================================
function initWorkflowDemo() {
    const playButton = document.getElementById('play-workflow');
    
    if (playButton) {
        playButton.addEventListener('click', runWorkflowDemo);
    }
}

function activateWorkflowDemo() {
    // Reset workflow visualization
    const steps = document.querySelectorAll('.workflow-step');
    steps.forEach(step => step.classList.remove('active'));
    
    // Activate first step
    if (steps.length > 0) {
        steps[0].classList.add('active');
    }
}

function runWorkflowDemo() {
    const steps = document.querySelectorAll('.workflow-step');
    const playButton = document.getElementById('play-workflow');
    
    if (!steps.length) return;
    
    // Disable button during animation
    playButton.disabled = true;
    playButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    
    // Reset all steps
    steps.forEach(step => step.classList.remove('active'));
    
    // Animate through each step
    steps.forEach((step, index) => {
        setTimeout(() => {
            step.classList.add('active');
            
            // Add processing effect
            const processingIndicator = document.createElement('div');
            processingIndicator.className = 'processing-indicator';
            processingIndicator.innerHTML = '<div class="loading-dots"><span></span><span></span><span></span></div>';
            step.appendChild(processingIndicator);
            
            // Remove processing indicator after delay
            setTimeout(() => {
                if (processingIndicator.parentNode) {
                    processingIndicator.remove();
                }
                
                // Add completion checkmark
                const checkmark = document.createElement('div');
                checkmark.className = 'completion-check';
                checkmark.innerHTML = '<i class="fas fa-check"></i>';
                step.appendChild(checkmark);
                
                // Remove checkmark after delay
                setTimeout(() => {
                    if (checkmark.parentNode) {
                        checkmark.remove();
                    }
                }, 1000);
                
            }, 1000);
            
            // Re-enable button after last step
            if (index === steps.length - 1) {
                setTimeout(() => {
                    playButton.disabled = false;
                    playButton.innerHTML = '<i class="fas fa-play"></i> Run Demo';
                    
                    // Show success message
                    showDemoNotification('Workflow completed successfully! 🎉', 'success');
                }, 2000);
            }
            
        }, index * 1500);
    });
}

// =============================================
// CHATBOT DEMO
// =============================================
function initChatbotDemo() {
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-message');
    
    if (chatInput && sendButton) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendChatMessage();
            }
        });
        
        sendButton.addEventListener('click', sendChatMessage);
    }
}

function activateChatbotDemo() {
    const messagesContainer = document.getElementById('chat-messages');
    
    if (!messagesContainer) return;
    
    // Reset chat messages
    messagesContainer.innerHTML = `
        <div class="message bot-message">
            <div class="message-content">
                Hello! I'm your AI assistant. How can I help you today?
            </div>
        </div>
    `;
    
    // Add welcome suggestions
    setTimeout(() => {
        addBotMessage('Try asking me about:');
        setTimeout(() => {
            addBotMessage('• "What services do you offer?"');
            setTimeout(() => {
                addBotMessage('• "How can AI help my business?"');
                setTimeout(() => {
                    addBotMessage('• "What\'s your pricing?"');
                }, 500);
            }, 500);
        }, 500);
    }, 1000);
}

function sendChatMessage() {
    const chatInput = document.getElementById('chat-input');
    const message = chatInput.value.trim();
    
    if (!message) return;
    
    // Add user message
    addUserMessage(message);
    
    // Clear input
    chatInput.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    // Generate bot response after delay
    setTimeout(() => {
        hideTypingIndicator();
        const response = generateBotResponse(message);
        addBotMessage(response);
    }, 1000 + Math.random() * 1000);
}

function addUserMessage(message) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user-message';
    messageDiv.innerHTML = `
        <div class="message-content">
            ${escapeHtml(message)}
        </div>
    `;
    messagesContainer.appendChild(messageDiv);
    scrollToBottom(messagesContainer);
}

function addBotMessage(message) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot-message';
    messageDiv.innerHTML = `
        <div class="message-content">
            ${message}
        </div>
    `;
    messagesContainer.appendChild(messageDiv);
    scrollToBottom(messagesContainer);
}

function showTypingIndicator() {
    const messagesContainer = document.getElementById('chat-messages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message typing-indicator';
    typingDiv.innerHTML = `
        <div class="message-content">
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    messagesContainer.appendChild(typingDiv);
    scrollToBottom(messagesContainer);
}

function hideTypingIndicator() {
    const typingIndicator = document.querySelector('.typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

function generateBotResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    const responses = {
        'services': 'We offer comprehensive AI automation services including workflow automation, AI chatbots, predictive analytics, system integration, and custom AI solutions. Each service is tailored to your specific business needs.',
        
        'pricing': 'Our pricing is customized based on your specific requirements and project scope. We offer flexible packages starting from $2,500/month for basic automation, with enterprise solutions available. Contact us for a personalized quote!',
        
        'help': 'AI can help your business by automating repetitive tasks, improving decision-making with data insights, enhancing customer service, reducing operational costs, and scaling your operations efficiently.',
        
        'ai': 'Artificial Intelligence can transform your business operations by automating processes, providing intelligent insights from your data, and improving customer experiences through personalized interactions.',
        
        'automation': 'Automation streamlines your business processes, reduces manual work, minimizes errors, and frees up your team to focus on strategic initiatives that drive growth.',
        
        'contact': 'You can reach us at hello@aiautomation.com or call +1 (555) 123-4567. We\'re also available for a free consultation to discuss your automation needs!',
        
        'demo': 'Great choice! Our demos showcase real AI capabilities. You can see workflow automation, chatbot interactions, and analytics dashboards in action. Would you like me to explain any specific feature?',
        
        'time': 'Implementation time varies by project complexity. Simple automations can be deployed in 2-4 weeks, while comprehensive AI solutions typically take 6-12 weeks. We provide detailed timelines during consultation.',
        
        'default': [
            'That\'s an interesting question! Our AI specialists can provide detailed insights about that. Would you like to schedule a consultation?',
            'I\'d be happy to help you with that! For specific technical details, I recommend speaking with our AI experts. Shall I connect you?',
            'Great question! Our team has extensive experience with that. Would you like to learn more about our related services?',
            'I can certainly help with that! For the most accurate information, I\'d recommend a quick call with our specialists. Interested?'
        ]
    };
    
    // Find matching response
    for (const [key, response] of Object.entries(responses)) {
        if (key !== 'default' && message.includes(key)) {
            return response;
        }
    }
    
    // Return random default response
    const defaultResponses = responses.default;
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// =============================================
// ANALYTICS DEMO
// =============================================
function initAnalyticsDemo() {
    // Initialize with default metrics
    const metricCards = document.querySelectorAll('.metric-card .number');
    metricCards.forEach(card => {
        const target = parseInt(card.getAttribute('data-target'));
        if (target) {
            card.textContent = '0';
        }
    });
}

function activateAnalyticsDemo() {
    // Animate metrics with realistic data simulation
    animateMetrics();
    
    // Start real-time updates simulation
    startMetricsSimulation();
}

function animateMetrics() {
    const metrics = [
        { element: document.querySelector('.metric-card:nth-child(1) .number'), target: 1247, suffix: '' },
        { element: document.querySelector('.metric-card:nth-child(2) .number'), target: 99.7, suffix: '' },
        { element: document.querySelector('.metric-card:nth-child(3) .number'), target: 67, suffix: '' }
    ];
    
    metrics.forEach((metric, index) => {
        if (!metric.element) return;
        
        setTimeout(() => {
            animateCounter(metric.element, metric.target, 2000, metric.suffix);
        }, index * 300);
    });
}

function animateCounter(element, target, duration, suffix = '') {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            if (target < 100) {
                element.textContent = current.toFixed(1) + suffix;
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
        }
    }, 16);
}

function startMetricsSimulation() {
    const metrics = document.querySelectorAll('.metric-card .number');
    
    // Update metrics every 3 seconds with slight variations
    setInterval(() => {
        metrics.forEach((metric, index) => {
            const currentValue = parseFloat(metric.textContent);
            let newValue;
            
            switch(index) {
                case 0: // Processing speed
                    newValue = Math.floor(currentValue + (Math.random() - 0.5) * 50);
                    newValue = Math.max(1200, Math.min(1300, newValue));
                    break;
                case 1: // Accuracy rate
                    newValue = (currentValue + (Math.random() - 0.5) * 0.2).toFixed(1);
                    newValue = Math.max(99.5, Math.min(99.9, parseFloat(newValue)));
                    break;
                case 2: // Cost savings
                    newValue = Math.floor(currentValue + (Math.random() - 0.5) * 2);
                    newValue = Math.max(65, Math.min(70, newValue));
                    break;
            }
            
            // Smooth transition to new value
            const currentText = metric.textContent;
            metric.style.opacity = '0.7';
            
            setTimeout(() => {
                metric.textContent = newValue;
                metric.style.opacity = '1';
            }, 200);
        });
    }, 3000);
}

// =============================================
// UTILITY FUNCTIONS
// =============================================

function scrollToBottom(container) {
    container.scrollTop = container.scrollHeight;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showDemoNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `demo-notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === 'success' ? '#43e97b' : '#4facfe'};
        color: white;
        padding: 15px 25px;
        border-radius: 25px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 500;
        opacity: 0;
        transform: translateX(-50%) translateY(-20px);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(-50%) translateY(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(-50%) translateY(-20px)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add demo-specific CSS
const demoStyles = document.createElement('style');
demoStyles.textContent = `
    .processing-indicator {
        position: absolute;
        bottom: -35px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0,0,0,0.8);
        padding: 5px 10px;
        border-radius: 15px;
        font-size: 0.8rem;
        color: white;
    }
    
    .completion-check {
        position: absolute;
        top: -10px;
        right: -10px;
        background: #43e97b;
        color: white;
        border-radius: 50%;
        width: 25px;
        height: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.8rem;
        animation: checkmarkPop 0.3s ease;
    }
    
    @keyframes checkmarkPop {
        0% { transform: scale(0); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
    
    .typing-dots {
        display: flex;
        gap: 4px;
        padding: 5px 0;
    }
    
    .typing-dots span {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: rgba(255,255,255,0.6);
        animation: typingDots 1.4s ease-in-out infinite;
    }
    
    .typing-dots span:nth-child(1) { animation-delay: 0s; }
    .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
    .typing-dots span:nth-child(3) { animation-delay: 0.4s; }
    
    @keyframes typingDots {
        0%, 60%, 100% {
            opacity: 0.3;
            transform: scale(0.8);
        }
        30% {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    .user-message {
        text-align: right;
    }
    
    .user-message .message-content {
        background: rgba(255,255,255,0.1);
        margin-left: auto;
    }
    
    .metric-card .number {
        transition: opacity 0.3s ease;
    }
    
    .demo-notification {
        font-family: 'Inter', sans-serif;
    }
`;

document.head.appendChild(demoStyles);