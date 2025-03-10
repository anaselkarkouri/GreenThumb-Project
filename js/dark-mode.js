// Dark mode functionality
document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.querySelector('.theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Define theme variables
    const themeVariables = {
        light: {
            '--primary-color': '#2c8a4b',
            '--secondary-color': '#1a5c31',
            '--accent-color': '#ff6b6b',
            '--background-color': '#ffffff',
            '--background-alt': '#f5f7fa',
            '--card-background': '#ffffff',
            '--text-color': '#333333',
            '--text-light': '#666666',
            '--border-color': '#e1e1e1',
            '--footer-bg': '#2c2c2c',
            '--footer-text': '#ffffff',
            '--shadow-color': 'rgba(0,0,0,0.1)',
            '--success-color': '#4caf50',
            '--error-color': '#ff4444',
            '--warning-color': '#ff9800'
        },
        dark: {
            '--primary-color': '#3ca063',
            '--secondary-color': '#2c8a4b',
            '--accent-color': '#ff8585',
            '--background-color': '#1a1a1a',
            '--background-alt': '#2c2c2c',
            '--card-background': '#2c2c2c',
            '--text-color': '#e1e1e1',
            '--text-light': '#999999',
            '--border-color': '#404040',
            '--footer-bg': '#0f0f0f',
            '--footer-text': '#e1e1e1',
            '--shadow-color': 'rgba(0,0,0,0.3)',
            '--success-color': '#5dc264',
            '--error-color': '#ff6b6b',
            '--warning-color': '#ffb74d'
        }
    };

    // Function to set theme
    function setTheme(theme) {
        const root = document.documentElement;
        const variables = themeVariables[theme];
        
        for (const [property, value] of Object.entries(variables)) {
            root.style.setProperty(property, value);
        }
        
        // Update icon
        const icon = darkModeToggle.querySelector('i');
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        
        // Store preference
        localStorage.setItem('theme', theme);
        
        // Update body class
        document.body.classList.remove('light-mode', 'dark-mode');
        document.body.classList.add(`${theme}-mode`);
    }

    // Initialize theme
    const savedTheme = localStorage.getItem('theme') || 
                      (prefersDarkScheme.matches ? 'dark' : 'light');
    setTheme(savedTheme);

    // Toggle theme
    darkModeToggle.addEventListener('click', () => {
        const currentTheme = localStorage.getItem('theme') || 
                           (prefersDarkScheme.matches ? 'dark' : 'light');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        setTheme(newTheme);
        
        // Add animation
        darkModeToggle.classList.add('theme-toggle-spin');
        setTimeout(() => {
            darkModeToggle.classList.remove('theme-toggle-spin');
        }, 500);
    });

    // Listen for system theme changes
    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });
});
