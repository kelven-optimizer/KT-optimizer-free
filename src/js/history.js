// =====================================================
// HISTORY MANAGER
// Tracks and manages execution history
// =====================================================

class HistoryManager {
    constructor() {
        this.history = this.loadHistory();
        this.maxEntries = 500;
    }

    // Load history from localStorage
    loadHistory() {
        try {
            const stored = localStorage.getItem('tweak_history');
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Error loading history:', error);
            return [];
        }
    }

    // Save history to localStorage
    saveHistory() {
        try {
            localStorage.setItem('tweak_history', JSON.stringify(this.history));
        } catch (error) {
            console.error('Error saving history:', error);
        }
    }

    // Add new entry
    addEntry(name, type, status = 'success') {
        const entry = {
            name,
            type,
            status,
            timestamp: new Date().toISOString(),
            date: new Date().toLocaleDateString('pt-BR'),
            time: new Date().toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit'
            })
        };

        this.history.unshift(entry);

        // Keep only max entries
        if (this.history.length > this.maxEntries) {
            this.history = this.history.slice(0, this.maxEntries);
        }

        this.saveHistory();
    }

    // Get all history
    getHistory() {
        return this.history;
    }

    // Get all history (alias for getHistory)
    getEntries() {
        return this.history;
    }

    // Get history filtered by type
    getHistoryByType(type) {
        return this.history.filter(entry => entry.type === type);
    }

    // Get history filtered by status
    getHistoryByStatus(status) {
        return this.history.filter(entry => entry.status === status);
    }

    // Get statistics
    getStatistics() {
        const stats = {
            total: this.history.length,
            success: 0,
            error: 0,
            byType: {
                bat: 0,
                reg: 0,
                exe: 0
            },
            byCategory: {}
        };

        this.history.forEach(entry => {
            if (entry.status === 'success') stats.success++;
            if (entry.status === 'error') stats.error++;

            if (entry.type in stats.byType) {
                stats.byType[entry.type]++;
            }
        });

        return stats;
    }

    // Clear all history
    clearHistory() {
        if (confirm('Tem certeza que deseja limpar todo o histórico?')) {
            this.history = [];
            this.saveHistory();
            return true;
        }
        return false;
    }

    // Export history to JSON
    exportToJSON() {
        const dataStr = JSON.stringify(this.history, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `optimizer-history-${new Date().toISOString().split('T')[0]}.json`;
        link.click();

        URL.revokeObjectURL(url);
    }

    // Export history to CSV
    exportToCSV() {
        const headers = ['Nome', 'Tipo', 'Status', 'Data', 'Hora'];
        const rows = this.history.map(entry => [
            entry.name,
            entry.type.toUpperCase(),
            entry.status,
            entry.date,
            entry.time
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
        ].join('\n');

        const dataBlob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(dataBlob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `optimizer-history-${new Date().toISOString().split('T')[0]}.csv`;
        link.click();

        URL.revokeObjectURL(url);
    }
}

// Export
window.HistoryManager = HistoryManager;
