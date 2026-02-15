// =====================================================
// TWEAK EXECUTOR - v6.0
// Handles execution of BAT, REG, and EXE files
// Simplified and robust
// =====================================================

class TweakExecutor {
    constructor() {
        this.executionQueue = [];
        this.isExecuting = false;

        // Execution statistics
        this.stats = {
            totalExecuted: 0,
            successes: 0,
            failures: 0,
            cancelled: 0
        };
    }

    // Execute a BAT file
    async executeBat(tweakPath, tweakName) {
        try {
            if (!tweakPath || typeof tweakPath !== 'string') {
                throw new Error('Invalid tweak path');
            }
            if (!tweakName || typeof tweakName !== 'string') {
                throw new Error('Invalid tweak name');
            }

            if (!window.electronAPI || typeof window.electronAPI.executeBat !== 'function') {
                throw new Error('Electron API not available');
            }

            const result = await window.electronAPI.executeBat(tweakPath);

            if (result && result.success) {
                this.stats.successes++;
                this.stats.totalExecuted++;
                this.showToast('success', 'Script Executado', `${tweakName} executado!`);

                if (window.historyManager && typeof window.historyManager.addEntry === 'function') {
                    window.historyManager.addEntry(tweakName, 'bat', 'success');
                }
                return true;
            } else if (result && result.cancelled) {
                this.stats.cancelled++;
                this.stats.totalExecuted++;
                this.showToast('info', 'Cancelado', 'Execução cancelada');
                return false;
            } else {
                this.stats.failures++;
                this.stats.totalExecuted++;
                const errorMsg = result?.error || 'Falha ao executar';
                this.showToast('error', 'Erro', errorMsg);

                if (window.historyManager && typeof window.historyManager.addEntry === 'function') {
                    window.historyManager.addEntry(tweakName, 'bat', 'error');
                }
                return false;
            }
        } catch (error) {
            console.error('Error executing BAT:', error);
            this.stats.failures++;
            this.stats.totalExecuted++;
            this.showToast('error', 'Erro', error.message || 'Erro desconhecido');
            return false;
        }
    }

    // Import a REG file
    async importReg(tweakPath, tweakName) {
        try {
            if (!tweakPath || typeof tweakPath !== 'string') {
                throw new Error('Invalid tweak path');
            }
            if (!tweakName || typeof tweakName !== 'string') {
                throw new Error('Invalid tweak name');
            }

            if (!window.electronAPI || typeof window.electronAPI.importReg !== 'function') {
                throw new Error('Electron API not available');
            }

            const result = await window.electronAPI.importReg(tweakPath);

            if (result && result.success) {
                this.stats.successes++;
                this.stats.totalExecuted++;
                this.showToast('success', 'Registro Importado', `${tweakName} aplicado!`);

                if (window.historyManager && typeof window.historyManager.addEntry === 'function') {
                    window.historyManager.addEntry(tweakName, 'reg', 'success');
                }
                return true;
            } else if (result && result.cancelled) {
                this.stats.cancelled++;
                this.stats.totalExecuted++;
                this.showToast('info', 'Cancelado', 'Importação cancelada');
                return false;
            } else {
                this.stats.failures++;
                this.stats.totalExecuted++;
                const errorMsg = result?.error || 'Falha ao importar';
                this.showToast('error', 'Erro', errorMsg);

                if (window.historyManager && typeof window.historyManager.addEntry === 'function') {
                    window.historyManager.addEntry(tweakName, 'reg', 'error');
                }
                return false;
            }
        } catch (error) {
            console.error('Error importing REG:', error);
            this.stats.failures++;
            this.stats.totalExecuted++;
            this.showToast('error', 'Erro', error.message || 'Erro desconhecido');
            return false;
        }
    }

    // Launch an EXE file
    async launchExe(exePath, exeName) {
        try {
            if (!exePath || typeof exePath !== 'string') {
                throw new Error('Invalid exe path');
            }
            if (!exeName || typeof exeName !== 'string') {
                throw new Error('Invalid exe name');
            }

            if (!window.electronAPI || typeof window.electronAPI.launchExe !== 'function') {
                throw new Error('Electron API not available');
            }

            const result = await window.electronAPI.launchExe(exePath);

            if (result && result.success) {
                this.stats.successes++;
                this.stats.totalExecuted++;
                this.showToast('success', 'Aplicativo Iniciado', `${exeName} iniciado!`);

                if (window.historyManager && typeof window.historyManager.addEntry === 'function') {
                    window.historyManager.addEntry(exeName, 'exe', 'success');
                }
                return true;
            } else {
                this.stats.failures++;
                this.stats.totalExecuted++;
                const errorMsg = result?.error || 'Falha ao iniciar';
                this.showToast('error', 'Erro', errorMsg);

                if (window.historyManager && typeof window.historyManager.addEntry === 'function') {
                    window.historyManager.addEntry(exeName, 'exe', 'error');
                }
                return false;
            }
        } catch (error) {
            console.error('Error launching EXE:', error);
            this.stats.failures++;
            this.stats.totalExecuted++;
            this.showToast('error', 'Erro', error.message || 'Erro desconhecido');
            return false;
        }
    }

    // Execute a shell command (Debloat/Winget)
    async executeCommand(tweak) {
        try {
            if (!tweak.cmd) {
                throw new Error('Comando não definido');
            }

            if (!window.electronAPI || typeof window.electronAPI.executeCommand !== 'function') {
                throw new Error('Electron API não disponível');
            }

            this.showToast('info', 'Executando', `Executando: ${tweak.name}...`);
            const result = await window.electronAPI.executeCommand(tweak.cmd);

            if (result && result.success) {
                this.stats.successes++;
                this.stats.totalExecuted++;
                this.showToast('success', 'Sucesso', `${tweak.name} executado!`);

                if (window.historyManager && typeof window.historyManager.addEntry === 'function') {
                    window.historyManager.addEntry(tweak.name, 'command', 'success');
                }
                return true;
            } else {
                this.stats.failures++;
                this.stats.totalExecuted++;
                const errorMsg = result?.error || 'Falha na execução';
                this.showToast('error', 'Erro', errorMsg);

                if (window.historyManager && typeof window.historyManager.addEntry === 'function') {
                    window.historyManager.addEntry(tweak.name, 'command', 'error');
                }
                return false;
            }
        } catch (error) {
            console.error('Error executing command:', error);
            this.stats.failures++;
            this.stats.totalExecuted++;
            this.showToast('error', 'Erro', error.message || 'Erro desconhecido');
            return false;
        }
    }

    // Execute a tweak (auto-detect type)
    async execute(tweak) {
        if (!tweak || typeof tweak !== 'object' || !tweak.name) {
            this.showToast('error', 'Erro', 'Tweak inválido');
            return false;
        }

        // Check if it's a command-based tweak (Debloat/Winget)
        if (tweak.type === 'command' || tweak.cmd) {
            return await this.executeCommand(tweak);
        }

        // Check if it's a built-in tweak (has 'reg' property)
        if (tweak.reg && Array.isArray(tweak.reg) && tweak.reg.length > 0) {
            return await this.executeRegistryTweak(tweak);
        }

        // Check if it's a file-based tweak
        const fileName = tweak.name.toLowerCase();

        if (fileName.endsWith('.bat') || fileName.endsWith('.cmd')) {
            return await this.executeBat(tweak.path, tweak.name);
        } else if (fileName.endsWith('.reg')) {
            return await this.importReg(tweak.path, tweak.name);
        } else if (fileName.endsWith('.exe')) {
            return await this.launchExe(tweak.path, tweak.name);
        } else {
            this.showToast('error', 'Erro', 'Tipo de arquivo não suportado');
            return false;
        }
    }

    // Execute a registry-based built-in tweak
    async executeRegistryTweak(tweak) {
        try {
            if (!window.electronAPI || typeof window.electronAPI.registryWrite !== 'function') {
                throw new Error('Electron API não disponível');
            }

            let successCount = 0;
            let failCount = 0;

            // Apply all registry changes in the tweak
            for (const regOp of tweak.reg) {
                try {
                    const result = await window.electronAPI.registryWrite(
                        regOp.path,
                        regOp.name,
                        regOp.type,
                        regOp.value
                    );

                    if (result && result.success) {
                        successCount++;
                    } else {
                        failCount++;
                        console.warn(`Registro não aplicado: ${regOp.path}\\${regOp.name}`);
                    }
                } catch (regError) {
                    console.warn(`Erro no registro ${regOp.path}\\${regOp.name}:`, regError);
                    failCount++;
                }
            }

            // Update stats
            if (failCount === 0) {
                this.stats.successes++;
                this.stats.totalExecuted++;
                this.showToast('success', 'Tweak Aplicado', `${tweak.name} aplicado!`);

                if (window.registryEngine) {
                    window.registryEngine.appliedTweaks[tweak.id] = true;
                    window.registryEngine.saveAppliedState();
                }

                if (window.historyManager && typeof window.historyManager.addEntry === 'function') {
                    window.historyManager.addEntry(tweak.name, 'registry', 'success');
                }
                return true;
            } else if (successCount > 0) {
                // Partial success
                this.stats.successes++;
                this.stats.totalExecuted++;
                this.showToast('warning', 'Parcial', `${tweak.name}: ${successCount} aplicado(s), ${failCount} falhou(s)`);
                return true;
            } else {
                this.stats.failures++;
                this.stats.totalExecuted++;
                this.showToast('error', 'Erro', `Falha ao aplicar ${tweak.name}`);
                return false;
            }
        } catch (error) {
            console.error('Error executing registry tweak:', error);
            this.stats.failures++;
            this.stats.totalExecuted++;
            this.showToast('error', 'Erro', error.message || 'Erro desconhecido');
            return false;
        }
    }

    // Execute multiple tweaks in sequence
    async executeBatch(tweaks) {
        if (!Array.isArray(tweaks) || tweaks.length === 0) {
            this.showToast('warning', 'Aviso', 'Nenhum tweak selecionado');
            return false;
        }

        if (this.isExecuting) {
            this.showToast('warning', 'Aguarde', 'Já há uma execução em andamento');
            return false;
        }

        this.executionQueue = [...tweaks];
        this.isExecuting = true;

        let successCount = 0;
        let failCount = 0;

        this.showToast('info', 'Iniciando', `Executando ${tweaks.length} tweaks...`);

        for (let i = 0; i < this.executionQueue.length; i++) {
            const tweak = this.executionQueue[i];

            try {
                const success = await this.execute(tweak);
                if (success) successCount++;
                else failCount++;

                // Delay between executions
                if (i < this.executionQueue.length - 1) {
                    await new Promise(resolve => setTimeout(resolve, 800));
                }
            } catch (error) {
                console.error(`Error executing tweak ${i + 1}:`, error);
                failCount++;
            }
        }

        this.isExecuting = false;
        this.executionQueue = [];

        // Summary
        if (failCount === 0) {
            this.showToast('success', 'Concluído', `${successCount} tweaks executados!`);
        } else {
            this.showToast('warning', 'Parcial', `${successCount} sucesso, ${failCount} falhas`);
        }

        return successCount > 0;
    }

    // Show toast notification
    showToast(type, title, message) {
        try {
            const container = document.getElementById('toast-container');
            if (!container) {
                console.log(`[Toast ${type}] ${title}: ${message}`);
                return;
            }

            const toast = document.createElement('div');
            toast.className = `toast ${type}`;

            const icons = {
                success: '✓',
                error: '✗',
                warning: '⚠',
                info: 'ℹ'
            };

            // Escape HTML to prevent XSS
            const escapeHtml = (text) => {
                const div = document.createElement('div');
                div.textContent = text;
                return div.innerHTML;
            };

            toast.innerHTML = `
                <div class="toast-icon">${icons[type] || 'ℹ'}</div>
                <div class="toast-content">
                    <div class="toast-title">${escapeHtml(title)}</div>
                    <div class="toast-message">${escapeHtml(message)}</div>
                </div>
                <button class="toast-close" aria-label="Fechar">×</button>
            `;

            // Close button
            const closeBtn = toast.querySelector('.toast-close');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    toast.classList.add('removing');
                    setTimeout(() => toast.remove(), 300);
                });
            }

            container.appendChild(toast);

            // Auto-remove after 5 seconds
            setTimeout(() => {
                if (toast.parentElement) {
                    toast.classList.add('removing');
                    setTimeout(() => toast.remove(), 300);
                }
            }, 5000);

        } catch (error) {
            console.error('Error showing toast:', error);
        }
    }

    // Get statistics
    getStats() {
        return { ...this.stats };
    }

    // Reset statistics
    resetStats() {
        this.stats = {
            totalExecuted: 0,
            successes: 0,
            failures: 0,
            cancelled: 0
        };
    }
}

// Export
window.TweakExecutor = TweakExecutor;
