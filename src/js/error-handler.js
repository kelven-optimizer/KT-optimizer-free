// =====================================================
// ERROR HANDLER - v6.0
// Lightweight error handling and logging
// =====================================================

class ErrorHandler {
    constructor() {
        this.errorLog = [];
        this.maxLogSize = 50;
        this.isInitialized = false;
    }

    initialize() {
        if (this.isInitialized) return;

        // Capture unhandled errors
        window.addEventListener('error', (event) => {
            console.error('Unhandled error:', event.message);
            this.log(event.message, 'error');
        });

        // Capture unhandled promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            console.error('Unhandled rejection:', event.reason);
            this.log(event.reason?.message || 'Unhandled Promise Rejection', 'error');
            event.preventDefault();
        });

        this.isInitialized = true;
        console.log('✓ Error handler initialized');
    }

    log(message, level = 'info') {
        const entry = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            message: String(message),
            level: level
        };

        this.errorLog.unshift(entry);
        if (this.errorLog.length > this.maxLogSize) {
            this.errorLog.pop();
        }

        return entry;
    }

    getLog() {
        return [...this.errorLog];
    }

    exportLog() {
        return JSON.stringify(this.errorLog, null, 2);
    }

    clear() {
        this.errorLog = [];
    }
}

// Create global instance
const errorHandler = new ErrorHandler();

// Export
window.ErrorHandler = ErrorHandler;
window.errorHandler = errorHandler;

// Auto-initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => errorHandler.initialize());
} else {
    errorHandler.initialize();
}
