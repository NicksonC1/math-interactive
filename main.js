/**
 * Stretch It Out! - Interactive Math Learning App
 * Main JavaScript file for shared functionality
 */

// Global application state
const AppState = {
    currentUser: {
        level: 3,
        xp: 230,
        xpRequired: 300,
        questionsAnswered: 12,
        accuracyRate: 85,
        bestStreak: 7,
        badgesEarned: 2,
        functionsMastered: 3,
        timeStudied: '2h 15m'
    },
    achievements: [
        { id: 'stretch-master', name: 'Stretch Master', icon: '⭐', unlocked: true, progress: 8, total: 10 },
        { id: 'shrink-pro', name: 'Shrink Pro', icon: '💫', unlocked: true, progress: 15, total: 15 },
        { id: 'hint-explorer', name: 'Hint Explorer', icon: '🧩', unlocked: false, progress: 3, total: 4 },
        { id: 'quiz-champion', name: 'Quiz Champion', icon: '🎯', unlocked: false, progress: 85, total: 100 },
        { id: 'speed-demon', name: 'Speed Demon', icon: '⚡', unlocked: false, progress: 443, total: 300 },
        { id: 'equation-architect', name: 'Equation Architect', icon: '🔧', unlocked: false, progress: 18, total: 30 }
    ],
    settings: {
        language: 'en',
        difficulty: 'normal',
        soundEnabled: true,
        animationsEnabled: true
    }
};

// Question bank data
const QuestionBank = [
    {
        id: 1,
        question: "Which equation represents a vertical stretch by a factor of 3 of the parent function y = f(x)?",
        options: ["y = f(3x)", "y = 3f(x)", "y = f(x/3)", "y = ⅓ f(x)"],
        correct: 1,
        explanation: "A vertical stretch by factor 3 means multiplying the function output by 3: y = 3f(x)",
        category: "vertical"
    },
    {
        id: 2,
        question: "Which equation represents a horizontal shrink by a factor of ½ of the parent function y = f(x)?",
        options: ["y = f(½x)", "y = ½ f(x)", "y = f(2x)", "y = 2f(x)"],
        correct: 2,
        explanation: "A horizontal shrink by factor ½ means multiplying the input by 2: y = f(2x)",
        category: "horizontal"
    },
    // ... (all 30 questions would be here)
];

// Utility functions
const Utils = {
    // Generate random number between min and max
    random: (min, max) => Math.random() * (max - min) + min,
    
    // Generate random integer between min and max
    randomInt: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
    
    // Shuffle array
    shuffle: (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    },
    
    // Format time
    formatTime: (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    },
    
    // Debounce function
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Local storage helpers
    saveToStorage: (key, data) => {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (e) {
            console.warn('Failed to save to localStorage:', e);
        }
    },
    
    loadFromStorage: (key, defaultValue = null) => {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : defaultValue;
        } catch (e) {
            console.warn('Failed to load from localStorage:', e);
            return defaultValue;
        }
    }
};

// Mathematical functions
const MathUtils = {
    // Generate function data for plotting
    generateFunctionData: (funcName, a = 1, b = 1, xMin = -10, xMax = 10, step = 0.1) => {
        const data = [];
        
        for (let x = xMin; x <= xMax; x += step) {
            let y;
            
            switch(funcName) {
                case 'sin(x)':
                    y = a * Math.sin(b * x);
                    break;
                case 'cos(x)':
                    y = a * Math.cos(b * x);
                    break;
                case 'x²':
                    y = a * (b * x) * (b * x);
                    break;
                case '√x':
                    y = x >= 0 ? a * Math.sqrt(b * x) : NaN;
                    break;
                case '|x|':
                    y = a * Math.abs(b * x);
                    break;
                case '1/x':
                    y = x !== 0 ? a * (1 / (b * x)) : NaN;
                    break;
                case 'x³':
                    y = a * (b * x) * (b * x) * (b * x);
                    break;
                case 'tan(x)':
                    y = a * Math.tan(b * x);
                    if (Math.abs(y) > 10) y = NaN; // Limit tangent values
                    break;
                default:
                    y = a * Math.sin(b * x);
            }
            
            if (!isNaN(y) && Math.abs(y) < 50) {
                data.push([x, y]);
            }
        }
        
        return data;
    },
    
    // Parse equation string and extract transformation parameters
    parseEquation: (equation) => {
        let a = 1, b = 1;
        let funcName = 'sin(x)';
        
        // Extract vertical factor (a)
        const aMatch = equation.match(/^(\d*\.?\d*)\s*[a-zA-Z\(]/);
        if (aMatch && aMatch[1]) {
            a = parseFloat(aMatch[1]);
        }
        
        // Extract horizontal factor (b)
        const bMatch = equation.match(/[a-zA-Z]\((\d*\.?\d*)[xX]/);
        if (bMatch && bMatch[1]) {
            b = parseFloat(bMatch[1]);
        }
        
        // Extract function name
        if (equation.includes('sin')) funcName = 'sin(x)';
        else if (equation.includes('cos')) funcName = 'cos(x)';
        else if (equation.includes('x²') || equation.includes('x^2')) funcName = 'x²';
        else if (equation.includes('√x')) funcName = '√x';
        else if (equation.includes('|x|')) funcName = '|x|';
        else if (equation.includes('1/x')) funcName = '1/x';
        else if (equation.includes('x³') || equation.includes('x^3')) funcName = 'x³';
        else if (equation.includes('tan')) funcName = 'tan(x)';
        
        return { a, b, funcName };
    },
    
    // Calculate transformation type
    getTransformationType: (a, b) => {
        let verticalType = 'none';
        let horizontalType = 'none';
        
        if (a > 1) verticalType = 'stretch';
        else if (a > 0 && a < 1) verticalType = 'shrink';
        
        if (b > 1) horizontalType = 'shrink';
        else if (b > 0 && b < 1) horizontalType = 'stretch';
        
        return { verticalType, horizontalType };
    }
};

// Animation helpers
const AnimationHelpers = {
    // Page transition animation
    pageTransition: (callback) => {
        anime({
            targets: 'body',
            opacity: [1, 0.8],
            duration: 300,
            complete: callback
        });
    },
    
    // Success animation
    successAnimation: (element) => {
        anime({
            targets: element,
            scale: [1, 1.1, 1],
            duration: 600,
            easing: 'easeOutBack'
        });
    },
    
    // Error animation
    errorAnimation: (element) => {
        anime({
            targets: element,
            translateX: [-10, 10, -10, 10, 0],
            duration: 500,
            easing: 'easeInOutQuad'
        });
    },
    
    // Confetti animation
    triggerConfetti: (container = document.body) => {
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#FFB6C1'];
        
        for (let i = 0; i < 30; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.borderRadius = '50%';
            confetti.style.zIndex = '9999';
            confetti.style.pointerEvents = 'none';
            container.appendChild(confetti);
            
            anime({
                targets: confetti,
                translateY: window.innerHeight + 100,
                translateX: (Math.random() - 0.5) * 200,
                rotate: Math.random() * 360,
                duration: 3000 + Math.random() * 2000,
                easing: 'easeInQuad',
                complete: () => {
                    confetti.remove();
                }
            });
        }
    }
};

// Progress tracking
const ProgressTracker = {
    // Update user progress
    updateProgress: (type, value) => {
        switch(type) {
            case 'questionCorrect':
                AppState.currentUser.questionsAnswered++;
                AppState.currentUser.xp += 10;
                break;
            case 'questionIncorrect':
                AppState.currentUser.questionsAnswered++;
                break;
            case 'quizCompleted':
                AppState.currentUser.xp += value * 5; // 5 XP per correct answer
                break;
            case 'achievementUnlocked':
                AppState.currentUser.badgesEarned++;
                AppState.currentUser.xp += 50; // 50 XP for achievement
                break;
        }
        
        // Check for level up
        ProgressTracker.checkLevelUp();
        
        // Save progress
        Utils.saveToStorage('userProgress', AppState.currentUser);
    },
    
    // Check for level up
    checkLevelUp: () => {
        while (AppState.currentUser.xp >= AppState.currentUser.xpRequired) {
            AppState.currentUser.xp -= AppState.currentUser.xpRequired;
            AppState.currentUser.level++;
            AppState.currentUser.xpRequired = Math.floor(AppState.currentUser.xpRequired * 1.2);
            
            // Trigger level up animation
            if (typeof showLevelUpAnimation === 'function') {
                showLevelUpAnimation(AppState.currentUser.level);
            }
        }
    },
    
    // Get progress percentage
    getProgressPercentage: () => {
        return (AppState.currentUser.xp / AppState.currentUser.xpRequired) * 100;
    },
    
    // Load saved progress
    loadProgress: () => {
        const saved = Utils.loadFromStorage('userProgress');
        if (saved) {
            Object.assign(AppState.currentUser, saved);
        }
    }
};

// Navigation helpers
const Navigation = {
    // Navigate to page with animation
    navigate: (page) => {
        AnimationHelpers.pageTransition(() => {
            window.location.href = page;
        });
    },
    
    // Update navigation state
    updateNavigation: (currentPage) => {
        const navItems = document.querySelectorAll('[data-nav]');
        navItems.forEach(item => {
            if (item.dataset.nav === currentPage) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
};

// Sound effects (if enabled)
const SoundManager = {
    sounds: {},
    
    // Load sound
    loadSound: (name, url) => {
        if (AppState.settings.soundEnabled) {
            const audio = new Audio(url);
            audio.preload = 'auto';
            SoundManager.sounds[name] = audio;
        }
    },
    
    // Play sound
    play: (name, volume = 1) => {
        if (AppState.settings.soundEnabled && SoundManager.sounds[name]) {
            SoundManager.sounds[name].volume = volume;
            SoundManager.sounds[name].play().catch(e => {
                console.warn('Failed to play sound:', e);
            });
        }
    }
};

// Initialize app on page load
document.addEventListener('DOMContentLoaded', function() {
    // Load saved progress
    ProgressTracker.loadProgress();
    
    // Setup global event listeners
    setupGlobalEventListeners();
    
    // Initialize page-specific functionality
    const currentPage = getCurrentPage();
    initializePage(currentPage);
});

// Global event listeners
function setupGlobalEventListeners() {
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Escape key to close modals
        if (e.key === 'Escape') {
            const modals = document.querySelectorAll('.modal-overlay:not(.hidden)');
            modals.forEach(modal => {
                if (typeof closeModal === 'function') {
                    closeModal(modal.id);
                }
            });
        }
        
        // Ctrl/Cmd + K for search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.querySelector('input[type="text"]');
            if (searchInput) {
                searchInput.focus();
            }
        }
    });
    
    // Handle window resize for charts
    window.addEventListener('resize', Utils.debounce(() => {
        const charts = document.querySelectorAll('[id$="Graph"]');
        charts.forEach(chartElement => {
            if (typeof echarts !== 'undefined' && echarts.getInstanceByDom(chartElement)) {
                echarts.getInstanceByDom(chartElement).resize();
            }
        });
    }, 250));
}

// Get current page name
function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop().replace('.html', '') || 'index';
    return page;
}

// Initialize page-specific functionality
function initializePage(page) {
    switch(page) {
        case 'index':
            initHomePage();
            break;
        case 'graph-lab':
            initGraphLab();
            break;

        case 'achievements':
            initAchievements();
            break;
        case 'quiz':
            initQuiz();
            break;
        case 'study-guide':
            initStudyGuide();
            break;
        case 'concepts':
            initConcepts();
            break;
    }
}

// Page-specific initialization functions
function initHomePage() {
    // Home page specific initialization
    console.log('Initializing home page...');
}

function initGraphLab() {
    // Graph lab specific initialization
    console.log('Initializing graph lab...');
}



function initAchievements() {
    // Achievements page specific initialization
    console.log('Initializing achievements page...');
}

function initQuiz() {
    // Quiz specific initialization
    console.log('Initializing quiz...');
}

function initStudyGuide() {
    // Study guide specific initialization
    console.log('Initializing study guide...');
}

function initConcepts() {
    // Concepts page specific initialization
    console.log('Initializing concepts page...');
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        AppState,
        QuestionBank,
        Utils,
        MathUtils,
        AnimationHelpers,
        ProgressTracker,
        Navigation,
        SoundManager
    };
}

// Global navigation function
function navigateTo(page) {
    Navigation.navigate(page);
}

// Global utility functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 px-6 py-4 rounded-xl shadow-lg text-white font-semibold transform translate-x-full transition-transform duration-300`;
    
    // Set color based on type
    switch(type) {
        case 'success':
            notification.classList.add('bg-green-500');
            break;
        case 'error':
            notification.classList.add('bg-red-500');
            break;
        case 'warning':
            notification.classList.add('bg-yellow-500');
            break;
        default:
            notification.classList.add('bg-blue-500');
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Console welcome message
console.log(`
🎉 Welcome to Stretch It Out! 🎉
Interactive Math Learning Application

Features:
- Real-time function graphing
- Interactive sliders and controls
- Comprehensive question bank
- Achievement system
- Step-by-step learning

Happy learning! 📚✨
`);