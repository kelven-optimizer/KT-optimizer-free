// =====================================================
// HARDWARE DETECTOR - v6.0
// Detects system hardware for smart recommendations
// Simplified and robust - no external dependencies
// =====================================================

class HardwareDetector {
    constructor() {
        this.systemInfo = null;
        this.detected = false;
        this.gpuInfo = null;

        // Cache for performance
        this.cache = {
            systemInfo: null,
            gpuInfo: null,
            timestamp: 0,
            ttl: 30000 // 30 seconds
        };
    }

    // Detect system hardware - simple and robust
    async detect() {
        const maxRetries = 3;
        let lastError = null;
        
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                // Check cache first
                const now = Date.now();
                if (this.cache.systemInfo && (now - this.cache.timestamp) < this.cache.ttl) {
                    this.systemInfo = this.cache.systemInfo;
                    this.detected = true;
                    return this.systemInfo;
                }

                // Check if electron API is available
                if (!window.electronAPI || typeof window.electronAPI.getSystemInfo !== 'function') {
                    console.warn('Electron API not available, using defaults');
                    this.systemInfo = this.getDefaultSystemInfo();
                    this.detected = false;
                    this.updateUI();
                    return this.systemInfo;
                }

                // Call with timeout
                const timeoutMs = 5000;
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

                try {
                    const result = await window.electronAPI.getSystemInfo();
                    clearTimeout(timeoutId);
                    
                    if (!result || typeof result !== 'object') {
                        throw new Error('Invalid system info response');
                    }
                    
                    this.systemInfo = result;
                } catch (timeoutError) {
                    clearTimeout(timeoutId);
                    throw new Error('System info detection timed out');
                }

                // Ensure required fields exist
                if (!this.systemInfo.cpu) this.systemInfo.cpu = 'Desconhecido';
                if (typeof this.systemInfo.ramGB !== 'number' || this.systemInfo.ramGB <= 0) this.systemInfo.ramGB = 0;

                this.detected = true;

                // Update cache
                this.cache.systemInfo = this.systemInfo;
                this.cache.timestamp = now;

                console.log('✓ Hardware detected:', this.systemInfo);
                this.updateUI();
                return this.systemInfo;

            } catch (error) {
                console.warn(`Hardware detection attempt ${attempt}/${maxRetries} failed:`, error.message);
                lastError = error;
                
                // Wait before retry
                if (attempt < maxRetries) {
                    await new Promise(resolve => setTimeout(resolve, 500 * attempt));
                }
            }
        }
        
        // All retries failed
        console.error('Hardware detection error after retries:', lastError?.message);
        this.systemInfo = this.getDefaultSystemInfo();
        this.detected = false;
        this.updateUI();
        return this.systemInfo;
    }

    // Get GPU information - simple version with retry
    async detectGPU() {
        const maxRetries = 2;
        
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                if (!window.electronAPI || typeof window.electronAPI.getGpuInfo !== 'function') {
                    this.gpuInfo = 'Não detectado';
                    break;
                }

                const result = await window.electronAPI.getGpuInfo();
                
                if (result && result.success && result.gpu) {
                    this.gpuInfo = result.gpu;
                } else if (result && result.gpu) {
                    this.gpuInfo = result.gpu;
                } else {
                    this.gpuInfo = 'Não detectado';
                }

                // Only retry if not detected
                if (this.gpuInfo !== 'Não detectado' && !this.gpuInfo.includes('não detectada')) {
                    break;
                }
                
            } catch (error) {
                console.warn('GPU detection attempt failed:', error.message);
                this.gpuInfo = 'Não detectado';
                
                if (attempt < maxRetries) {
                    await new Promise(resolve => setTimeout(resolve, 300));
                }
            }
        }

        // Update GPU in UI
        const gpuEl = document.getElementById('gpu-info');
        if (gpuEl) {
            gpuEl.textContent = this.gpuInfo || 'Não detectado';
        }

        return this.gpuInfo;
    }

    // Get safe default system info
    getDefaultSystemInfo() {
        return {
            cpu: 'Desconhecido',
            cpuModel: 'Modelo não identificado',
            ramGB: 0,
            platform: 'Unknown',
            arch: 'Unknown'
        };
    }

    // Get CPU brand
    getCPUBrand() {
        return this.systemInfo?.cpu || 'Desconhecido';
    }

    // Get RAM amount
    getRAMAmount() {
        return this.systemInfo?.ramGB || 0;
    }

    // Check if Intel CPU
    isIntel() {
        const cpu = this.getCPUBrand().toLowerCase();
        return cpu.includes('intel');
    }

    // Check if AMD CPU
    isAMD() {
        const cpu = this.getCPUBrand().toLowerCase();
        return cpu.includes('amd');
    }

    // Get recommended RAM tweaks
    getRecommendedRAMTweaks() {
        const ramGB = this.getRAMAmount();
        if (ramGB <= 4) return ['4GB Ram'];
        if (ramGB <= 6) return ['6GB Ram'];
        if (ramGB <= 8) return ['8GB Ram'];
        if (ramGB <= 12) return ['12GB Ram'];
        if (ramGB <= 16) return ['16GB Ram'];
        return ['32GB Ram'];
    }

    // Get Quick Optimize tweaks
    getQuickOptimizeTweaks(categoryManager) {
        if (!categoryManager || !categoryManager.tweaks) {
            return [];
        }

        const quickTweaks = [];
        const allBat = Array.isArray(categoryManager.tweaks.bat) ? categoryManager.tweaks.bat : [];
        const allReg = Array.isArray(categoryManager.tweaks.reg) ? categoryManager.tweaks.reg : [];

        // Recommended keywords
        const keywords = [
            'ultra', 'performance', 'energia', 'input lag', 'mouse',
            'dns', 'tcp', 'latency', 'temp', 'cache', 'gpu priority'
        ];

        // Search for tweaks
        for (const keyword of keywords) {
            const batTweak = allBat.find(t => 
                t && t.name && t.name.toLowerCase().includes(keyword)
            );
            if (batTweak && !quickTweaks.find(qt => qt.name === batTweak.name)) {
                quickTweaks.push(batTweak);
            }

            const regTweak = allReg.find(t => 
                t && t.name && t.name.toLowerCase().includes(keyword)
            );
            if (regTweak && !quickTweaks.find(qt => qt.name === regTweak.name)) {
                quickTweaks.push(regTweak);
            }
        }

        // Add RAM tweaks
        const ramTweaks = this.getRecommendedRAMTweaks();
        for (const ramTweak of ramTweaks) {
            const tweak = allReg.find(t => 
                t && t.name && t.name.toLowerCase().includes(ramTweak.toLowerCase())
            );
            if (tweak && !quickTweaks.find(qt => qt.name === tweak.name)) {
                quickTweaks.push(tweak);
            }
        }

        // CPU-specific tweaks
        if (this.isIntel()) {
            const intelTweak = allBat.find(t => 
                t && t.name && t.name.toLowerCase().includes('intel') &&
                !t.name.toLowerCase().includes('revert')
            );
            if (intelTweak && !quickTweaks.find(qt => qt.name === intelTweak.name)) {
                quickTweaks.push(intelTweak);
            }
        } else if (this.isAMD()) {
            const amdTweak = allBat.find(t => 
                t && t.name && t.name.toLowerCase().includes('amd') &&
                !t.name.toLowerCase().includes('revert')
            );
            if (amdTweak && !quickTweaks.find(qt => qt.name === amdTweak.name)) {
                quickTweaks.push(amdTweak);
            }
        }

        return quickTweaks.slice(0, 15);
    }

    // Update UI with hardware info
    updateUI() {
        try {
            const cpuInfo = document.getElementById('cpu-info');
            const ramInfo = document.getElementById('ram-info');
            const gpuInfo = document.getElementById('gpu-info');

            if (cpuInfo) {
                cpuInfo.textContent = this.getCPUBrand();
                cpuInfo.classList.remove('error-state');
            }

            if (ramInfo) {
                ramInfo.textContent = `${this.getRAMAmount()}GB`;
                ramInfo.classList.remove('error-state');
            }

            if (gpuInfo && this.gpuInfo) {
                gpuInfo.textContent = this.gpuInfo;
                gpuInfo.classList.remove('error-state');
            }

        } catch (error) {
            console.error('Error updating UI:', error);
        }
    }
    
    // Get detailed system information for the Information tab
    async getDetailedSystemInfo() {
        try {
            // This will be called by Electron API if available
            if (window.electronAPI && typeof window.electronAPI.getDetailedSystemInfo === 'function') {
                return await window.electronAPI.getDetailedSystemInfo();
            } else {
                // Fallback with basic information
                return {
                    cpu: this.systemInfo?.cpu || 'Desconhecido',
                    cpuCores: this.systemInfo?.cpuCores || 'Desconhecido',
                    cpuSpeed: this.systemInfo?.cpuSpeed || 'Desconhecido',
                    ramTotal: this.systemInfo?.ramGB ? `${this.systemInfo.ramGB}GB` : 'Desconhecido',
                    ramSpeed: this.systemInfo?.ramSpeed || 'Desconhecido',
                    ramType: this.systemInfo?.ramType || 'Desconhecido',
                    gpu: this.gpuInfo || 'Desconhecido',
                    motherboard: this.systemInfo?.motherboard || 'Desconhecido',
                    os: this.systemInfo?.platform || 'Desconhecido',
                    osVersion: this.systemInfo?.osVersion || 'Desconhecido',
                    bios: this.systemInfo?.bios || 'Desconhecido',
                    diskType: this.systemInfo?.diskType || 'Desconhecido',
                    diskSize: this.systemInfo?.diskSize || 'Desconhecido',
                    networkAdapter: this.systemInfo?.networkAdapter || 'Desconhecido'
                };
            }
        } catch (error) {
            console.error('Error getting detailed system info:', error);
            return {
                cpu: 'Erro ao obter informação',
                cpuCores: 'Erro',
                cpuSpeed: 'Erro',
                ramTotal: 'Erro',
                ramSpeed: 'Erro',
                ramType: 'Erro',
                gpu: 'Erro',
                motherboard: 'Erro',
                os: 'Erro',
                osVersion: 'Erro',
                bios: 'Erro',
                diskType: 'Erro',
                diskSize: 'Erro',
                networkAdapter: 'Erro'
            };
        }
    }

    // Update UI with error state
    updateWithErrorState() {
        const elements = ['cpu-info', 'ram-info', 'gpu-info'];
        elements.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.textContent = 'Erro';
                el.classList.add('error-state');
            }
        });
    }

    // Refresh hardware detection
    async refresh() {
        // Clear cache
        this.cache = {
            systemInfo: null,
            gpuInfo: null,
            timestamp: 0,
            ttl: 30000
        };

        // Re-detect
        await this.detect();
        await this.detectGPU();

        // Show message
        if (window.tweakExecutor && typeof window.tweakExecutor.showToast === 'function') {
            window.tweakExecutor.showToast('success', 'Atualizado', 'Informações de hardware atualizadas');
        }
    }
}

// Export
window.HardwareDetector = HardwareDetector;
