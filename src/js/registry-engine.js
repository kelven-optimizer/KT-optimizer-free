// =====================================================
// REGISTRY ENGINE - Motor de Tweaks via Registro
// Aplica/reverte tweaks diretamente no registro Windows
// =====================================================

class RegistryEngine {
    constructor() {
        this.appliedTweaks = this.loadAppliedState();
    }

    loadAppliedState() {
        try {
            const stored = localStorage.getItem('applied_tweaks');
            return stored ? JSON.parse(stored) : {};
        } catch { return {}; }
    }

    saveAppliedState() {
        try {
            localStorage.setItem('applied_tweaks', JSON.stringify(this.appliedTweaks));
        } catch (e) { console.error('Erro salvando estado:', e); }
    }

    isApplied(tweakId) {
        return this.appliedTweaks[tweakId] === true;
    }

    async applyTweak(tweak) {
        try {
            // Handle command-based tweaks
            if (tweak.type === 'command' && tweak.cmd) {
                const result = await window.electronAPI.invoke('execute-command', tweak.cmd);
                if (!result || !result.success) {
                    throw new Error(result?.error || 'Falha ao executar comando');
                }
                this.appliedTweaks[tweak.id] = true;
                this.saveAppliedState();
                return { success: true, type: 'command' };
            }
            // Handle registry-based tweaks
            if (!tweak.reg || !Array.isArray(tweak.reg) || tweak.reg.length === 0) {
                return { success: false, error: 'Este tweak não possui operações de registro' };
            }
            for (const op of tweak.reg) {
                const result = await window.electronAPI.registryWrite(op.path, op.name, op.type, op.value);
                if (!result.success) {
                    throw new Error(result.error || 'Falha ao escrever no registro');
                }
            }
            this.appliedTweaks[tweak.id] = true;
            this.saveAppliedState();
            return { success: true, type: 'registry' };
        } catch (error) {
            console.error('Erro aplicando tweak:', error);
            return { success: false, error: error.message };
        }
    }

    async revertTweak(tweak) {
        try {
            // Handle command-based revert
            if (tweak.type === 'command' && tweak.revertCmd) {
                const result = await window.electronAPI.invoke('execute-command', tweak.revertCmd);
                if (!result || !result.success) {
                    throw new Error(result?.error || 'Falha ao reverter comando');
                }
                this.appliedTweaks[tweak.id] = false;
                this.saveAppliedState();
                return { success: true, type: 'command' };
            }
            // Handle registry-based revert
            if (!tweak.revert || tweak.revert.length === 0) {
                throw new Error('Este tweak não possui opção de reversão');
            }
            for (const op of tweak.revert) {
                const result = await window.electronAPI.registryWrite(op.path, op.name, op.type, op.value);
                if (!result.success) {
                    throw new Error(result.error || 'Falha ao reverter registro');
                }
            }
            this.appliedTweaks[tweak.id] = false;
            this.saveAppliedState();
            return { success: true, type: 'registry' };
        } catch (error) {
            console.error('Erro revertendo tweak:', error);
            return { success: false, error: error.message };
        }
    }

    async toggleTweak(tweak) {
        // If it's a command tweak, we might not have a revert command.
        // For registry tweaks, we check if applied.

        const isApplied = this.isApplied(tweak.id);

        if (isApplied) {
            console.log(`Reverting tweak: ${tweak.name}`);
            return await this.revertTweak(tweak);
        } else {
            console.log(`Applying tweak: ${tweak.name}`);
            return await this.applyTweak(tweak);
        }
    }

    async checkTweakStatus(tweak) {
        try {
            if (!tweak.reg || !Array.isArray(tweak.reg) || tweak.reg.length === 0) return false;
            const firstOp = tweak.reg[0];
            const result = await window.electronAPI.registryRead(firstOp.path, firstOp.name);
            if (result.success && result.value !== undefined) {
                return String(result.value) === String(firstOp.value);
            }
            return false;
        } catch {
            return false;
        }
    }
}

window.RegistryEngine = RegistryEngine;
console.log('✓ Registry Engine carregado');
