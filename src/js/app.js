// =====================================================
// THUR & KELVEN OPTIMIZER - APLICAÇÃO PRINCIPAL v6.0
// FREE VERSION - OPTIMIZED & CLEANED
// =====================================================

let categoryManager, tweakExecutor, historyManager, hardwareDetector, registryEngine;
let currentCategory = 'sistema';
let currentSubcategory = null;
let currentSubTab = 'all';

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🚀 Iniciando THUR & KELVEN Optimizer v6.0 FREE...');

    // Fallback para browser (sem Electron)
    if (!window.electronAPI) {
        console.warn('⚠️ Executando em modo navegador (sem Electron)');
        window.electronAPI = {
            registryRead: async () => ({ success: false }),
            registryWrite: async () => ({ success: false }),
            registryDelete: async () => ({ success: false }),
            registryEnumValues: async () => ({ success: true, values: [] }),
            getSystemInfo: async () => ({ cpu: 'Intel', ram: '16GB', gpu: 'NVIDIA' }),
            getGpuInfo: async () => ({ name: 'NVIDIA' }),
            scanTweaks: async () => ({ bat: [], reg: [] }),
            invoke: async () => null
        };
    }

    try {
        // Initialize Managers
        categoryManager = new window.CategoryManager();
        tweakExecutor = new window.TweakExecutor();
        historyManager = new window.HistoryManager();
        hardwareDetector = new window.HardwareDetector();
        registryEngine = new window.RegistryEngine();

        // Handle tutorial manager separately (optional)
        if (window.TutorialManager) {
            window.tutorialManager = new window.TutorialManager();
        }

        // Global Access
        window.categoryManager = categoryManager;
        window.tweakExecutor = tweakExecutor;
        window.historyManager = historyManager;
        window.hardwareDetector = hardwareDetector;
        window.registryEngine = registryEngine;

        // Start hardware detection (non-blocking)
        hardwareDetector.detect().catch(e => console.warn('Hardware detection issue:', e));
        hardwareDetector.detectGPU().catch(e => console.warn('GPU detection issue:', e));

        // Load tweaks
        showLoadingState();

        try {
            console.log('Loading tweaks...');
            await categoryManager.loadTweaks();
            console.log('✓ Tweaks loaded.');
        } catch (loadError) {
            console.warn('Error loading tweaks:', loadError);
        }

        // Setup event listeners
        setupEventListeners();

        // Show default category
        showCategory('inicio');

        // Start Stats Loop
        updateStatsDashboard();
        setInterval(updateStatsDashboard, 5000);

        // Check for updates
        if (window.UpdateChecker) {
            const updateChecker = new window.UpdateChecker();
            setTimeout(() => updateChecker.init(), 3000);
        }

        // Check Terms of Use (First Launch)
        checkTermsOfUse();

        console.log('✓ Aplicação iniciada com sucesso!');

    } catch (error) {
        console.error("🔥 INIT ERROR:", error);
        showErrorScreen('Erro na Inicialização', error.message || 'Falha ao iniciar a aplicação');
    }
});

// Show error screen
function showErrorScreen(title, message) {
    const appContainer = document.getElementById('app-container');
    if (appContainer) {
        appContainer.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; padding: 2rem; background: #0d1117; color: #ff6b6b; text-align: center;">
                <div style="font-size: 4rem; margin-bottom: 1rem;">💥</div>
                <h1 style="font-size: 2rem; margin-bottom: 1rem;">${title}</h1>
                <p style="font-size: 1.1rem; margin-bottom: 2rem;">${message}</p>
                <button class="btn-primary" onclick="location.reload()" style="padding: 0.75rem 1.5rem;">Tentar Novamente</button>
            </div>`;
        appContainer.style.display = 'block';
    }
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category;
            if (!category) return;
            document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            showCategory(category);
        });
    });

    // Search
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => handleSearch(e.target.value), 300);
        });
    }

    // Quick Optimize
    document.getElementById('quick-optimize')?.addEventListener('click', handleQuickOptimize);

    // History
    document.getElementById('show-history')?.addEventListener('click', showHistory);

    // Modal
    const modal = document.getElementById('tweak-modal');
    if (modal) {
        document.getElementById('modal-close')?.addEventListener('click', () => modal.classList.remove('active'));
        document.getElementById('modal-cancel')?.addEventListener('click', () => modal.classList.remove('active'));
        window.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });
    }

    // Theme selector
    const themeSelect = document.getElementById('theme-select');
    if (themeSelect) {
        const savedTheme = localStorage.getItem('selectedTheme') || 'default';
        themeSelect.value = savedTheme;
        applyTheme(savedTheme);
        themeSelect.addEventListener('change', (e) => {
            const selectedTheme = e.target.value;
            applyTheme(selectedTheme);
            localStorage.setItem('selectedTheme', selectedTheme);
        });
    }

    // Refresh
    document.getElementById('refresh-btn')?.addEventListener('click', async () => {
        try {
            if (window.hardwareDetector) await window.hardwareDetector.refresh();
            if (window.categoryManager) await window.categoryManager.loadTweaks();
            showCategory(currentCategory);
            updateStatsDashboard();
            window.tweakExecutor?.showToast('success', 'Atualizado', 'Painel atualizado!');
        } catch (error) {
            console.error('Refresh error:', error);
            window.tweakExecutor?.showToast('error', 'Erro', 'Falha ao atualizar');
        }
    });

    // Tutorial
    document.getElementById('start-tutorial')?.addEventListener('click', () => {
        if (window.tutorialManager) window.tutorialManager.start();
    });
}

function applyTheme(theme) {
    const body = document.body;
    body.classList.remove('theme-purple', 'theme-red');
    if (theme === 'purple') body.classList.add('theme-purple');
    else if (theme === 'red') body.classList.add('theme-red');
}

function updateTitle(categoryName) {
    const titleEl = document.getElementById('category-title');
    const breadcrumb = document.getElementById('breadcrumb');
    if (titleEl) titleEl.textContent = categoryName;
    if (breadcrumb) {
        breadcrumb.innerHTML = `<span class="breadcrumb-item">Início</span><span class="breadcrumb-separator">›</span><span class="breadcrumb-item active">${categoryName}</span>`;
    }
}

function showLoadingState() {
    const contentArea = document.getElementById('content-area');
    if (contentArea) {
        contentArea.innerHTML = `<div class="loading-spinner"><div class="spinner"></div><p>Carregando tweaks...</p></div>`;
    }
}

// ===== SHOW CATEGORY =====
function showCategory(categoryId) {
    if (!categoryId) return;

    console.log('Showing category:', categoryId);

    currentCategory = categoryId;
    currentSubcategory = null;
    currentSubTab = 'all';

    // Router
    switch (categoryId) {
        case 'inicio': showHome(); return;
        case 'inicializacao': showStartup(); return;
        case 'limpeza': showCleaning(); return;
        case 'debloat': showDebloat(); return;
        case 'creator': showCreator(); return; // Added Creator tab
        case 'dev': showDev(); return;
        case 'license': showLicense(); return;
        case 'buy_vip': showBuyVip(); return;
    }

    const category = window.CATEGORIES[categoryId];
    // Check if category exists
    if (!category) {
        console.error('Category not found:', categoryId);
        const contentArea = document.getElementById('content-area');
        if (contentArea) {
            contentArea.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">❌</div>
                    <h3>Categoria não encontrada</h3>
                    <p>A categoria "${categoryId}" não existe.</p>
                </div>`;
        }
        return;
    }

    console.log('Rendering standard category:', category.name);

    updateTitle(category.name);
    renderSubTabs(categoryId, category);
    renderCategoryContent(categoryId);
}

// ===== HOME =====
function showHome() {
    const contentArea = document.getElementById('content-area');
    if (!contentArea) return;
    updateTitle('🏠 Início');
    document.getElementById('sub-tabs').innerHTML = '';

    // Count tweaks
    const allTweaks = window.BUILT_IN_TWEAKS || [];
    const freeTweaks = allTweaks.filter(t => t.warning !== 'premium');
    const premiumTweaks = allTweaks.filter(t => t.warning === 'premium');
    const appliedTweaks = window.registryEngine ? freeTweaks.filter(t => registryEngine.isApplied?.(t.id)).length : 0;

    // Hardware Info
    const hw = window.hardwareDetector;
    const cpuInfo = hw?.getCPUBrand?.() || 'Detectando...';
    const ramInfo = hw?.getRAMAmount?.() ? `${hw.getRAMAmount()}GB` : '--GB';
    const gpuInfo = hw?.gpuInfo || 'Detectando...';

    contentArea.innerHTML = `
        <div class="home-container">
            <div class="welcome-section">
                <div class="welcome-icon">⚡</div>
                <div class="welcome-text">
                    <h1>Bem-vindo ao KT Optimizer <span style="color: #ffd700; font-size: 0.8em; font-weight: 900;">FREE</span></h1>
                    <p>Versão Gratuita - Aumente sua performance hoje!</p>
                </div>
            </div>

            <div class="home-stats-grid">
                <div class="home-stat-card glass-card">
                    <div class="stat-icon">🆓</div>
                    <div class="stat-value">${freeTweaks.length}</div>
                    <div class="stat-label">Tweaks Free</div>
                </div>
                <div class="home-stat-card glass-card" style="border: 1px solid rgba(255, 215, 0, 0.3);">
                    <div class="stat-icon">👑</div>
                    <div class="stat-value" style="color: #ffd700;">${premiumTweaks.length}</div>
                    <div class="stat-label">Tweaks VIP</div>
                </div>
                <div class="home-stat-card glass-card">
                    <div class="stat-icon">✅</div>
                    <div class="stat-value">${appliedTweaks}</div>
                    <div class="stat-label">Aplicados</div>
                </div>
                <div class="home-stat-card glass-card">
                    <div class="stat-icon">💻</div>
                    <div class="stat-value" style="font-size: 1rem;">${cpuInfo}</div>
                    <div class="stat-label">CPU</div>
                </div>
                <div class="home-stat-card glass-card">
                    <div class="stat-icon">💾</div>
                    <div class="stat-value">${ramInfo}</div>
                    <div class="stat-label">RAM</div>
                </div>
                <div class="home-stat-card glass-card">
                    <div class="stat-icon">🎮</div>
                    <div class="stat-value" style="font-size: 0.9rem;">${gpuInfo}</div>
                    <div class="stat-label">GPU</div>
                </div>
            </div>

            <div class="quick-actions-section">
                <h2 class="section-header">⚡ Ações Rápidas</h2>
                <div class="quick-actions-grid">
                    <button class="quick-action-btn" onclick="createBackup()"><span class="action-icon">💾</span><span class="action-text">Backup</span></button>
                    <button class="quick-action-btn" onclick="showCategory('limpeza')"><span class="action-icon">🧹</span><span class="action-text">Limpeza</span></button>
                    <button class="quick-action-btn" onclick="showCategory('latencia')"><span class="action-icon">⚡</span><span class="action-text">Latência</span></button>
                    <button class="quick-action-btn" onclick="showBuyVip()" style="border: 1px solid #ffd700;"><span class="action-icon">👑</span><span class="action-text" style="color:#ffd700;">Comprar VIP</span></button>
                </div>
            </div>


            
            <div class="discord-section glass-card">
                <div class="discord-content">
                    <div class="discord-icon-large">💬</div>
                    <div class="discord-text">
                        <h3>Junte-se à nossa comunidade!</h3>
                        <p>Tire dúvidas, compartilhe experiências e fique por dentro das atualizações</p>
                    </div>
                    <a href="https://discord.gg/pSWSkzSUPs" target="_blank" class="discord-action-btn">
                        <span>Entrar no Discord</span>
                        <span>→</span>
                    </a>
                </div>
            </div>
        </div>
        
        <style>
            .home-container { padding: 20px; }
            .welcome-section { display: flex; align-items: center; gap: 20px; padding: 30px; background: linear-gradient(135deg, rgba(66, 153, 225, 0.1), rgba(160, 174, 192, 0.05)); border-radius: 16px; margin-bottom: 25px; border: 1px solid rgba(66, 153, 225, 0.2); }
            .welcome-icon { font-size: 48px; }
            .welcome-text h1 { font-size: 1.5rem; margin:0 0 5px 0; }
            .home-stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 15px; margin-bottom: 30px; }
            .home-stat-card { padding: 20px; text-align: center; background: var(--glass-bg); }
            .home-stat-card .stat-value { font-size: 1.4rem; font-weight: 700; color: var(--text-primary); word-break: break-word; }
            .home-stat-card .stat-icon { font-size: 2rem; margin-bottom: 8px; }
            .quick-actions-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 12px; }
            .quick-action-btn { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 15px; background: var(--glass-bg); border: 1px solid var(--glass-border); border-radius: 12px; cursor: pointer; color: var(--text-primary); transition: all 0.2s; }
            .quick-action-btn:hover { background: rgba(255, 255, 255, 0.1); transform: translateY(-2px); }
            .benchmark-section { margin: 30px 0; padding: 20px; background: rgba(0,0,0,0.3); border-radius:12px;}
            .benchmark-results { display: flex; gap: 20px; align-items: center; margin-top: 20px; }
            .score-value { font-size: 3rem; font-weight: 900; color: #ffd700; }
            .progress-bar { height: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden; margin-top: 15px; }
            .progress-fill { height: 100%; width: 0%; background: #ffd700; transition: width 0.3s; }
            .discord-section { background: linear-gradient(135deg, rgba(88, 101, 242, 0.15) 0%, rgba(88, 101, 242, 0.05) 100%); border: 1px solid rgba(88, 101, 242, 0.2); }
            .discord-content { display: flex; align-items: center; gap: 20px; padding: 20px; }
            .discord-icon-large { font-size: 40px; }
            .discord-text { flex: 1; }
            .discord-action-btn { display: flex; align-items: center; gap: 8px; padding: 12px 24px; background: linear-gradient(135deg, #5865F2 0%, #4752C4 100%); color: white; text-decoration: none; border-radius: 10px; font-weight: 600; }
        </style>
    `;


}

// ===== CLEANING =====
function showCleaning() {
    console.log('🧹 Showing Cleaning Tab');
    const contentArea = document.getElementById('content-area');
    contentArea.innerHTML = '';

    // Create Cleaning Header
    const header = document.createElement('div');
    header.className = 'section-title';
    header.innerHTML = '🧹 Limpeza do Sistema';
    contentArea.appendChild(header);

    const grid = document.createElement('div');
    grid.className = 'tweaks-grid';

    // Get cleaning tweaks
    const cleaningTweaks = window.BUILT_IN_TWEAKS.filter(t => t.category === 'limpeza');

    if (cleaningTweaks.length === 0) {
        contentArea.innerHTML += '<div class="empty-state">Nenhum tweak de limpeza encontrado.</div>';
        return;
    }

    cleaningTweaks.forEach(tweak => {
        const card = document.createElement('div');
        card.className = 'builtin-card'; // Reuse builtin card style for consistency

        card.innerHTML = `
            <div class="builtin-card-header">
                <div class="builtin-card-info">
                    <div class="builtin-card-name">${tweak.name}</div>
                    <div class="builtin-card-desc">${tweak.desc || 'Limpa arquivos temporários do sistema.'}</div>
                </div>
                <button class="btn-primary" style="padding: 0.5rem 1rem; font-size: 0.8rem;" id="btn-${tweak.id}">
                    Limpar
                </button>
            </div>
            <div class="builtin-card-footer">
                <span style="font-size:0.688rem; color:var(--text-muted);">${(tweak.sub || 'Geral').toUpperCase()}</span>
            </div>`;

        // Add execute listener
        const btn = card.querySelector('button');
        btn.addEventListener('click', async () => {
            btn.disabled = true;
            btn.textContent = 'Limpando...';

            try {
                console.log('Executing cleanup command:', tweak.cmd);

                if (window.electronAPI && tweak.type === 'command' && tweak.cmd) {
                    const result = await window.electronAPI.invoke('execute-command', tweak.cmd);
                    if (!result.success) throw new Error(result.error);
                } else {
                    // Simulate delay if no API
                    await new Promise(r => setTimeout(r, 1500));
                }

                btn.textContent = 'Concluído!';
                btn.style.background = 'var(--success)';
                tweakExecutor.showToast('success', 'Limpeza', `${tweak.name} concluída!`);

                setTimeout(() => {
                    btn.disabled = false;
                    btn.textContent = 'Limpar';
                    btn.style.background = '';
                }, 3000);
            } catch (e) {
                btn.textContent = 'Erro';
                btn.style.background = 'var(--error)';
                tweakExecutor.showToast('error', 'Erro', 'Falha na limpeza.');
            }
        });

        grid.appendChild(card);
    });

    contentArea.appendChild(grid);
}

// ===== STARTUP =====
async function showStartup() {
    console.log('🚀 Showing Startup Tab');
    const contentArea = document.getElementById('content-area');
    contentArea.innerHTML = `
        <div class="section-title">🚀 Gerenciador de Inicialização</div>
        <div class="startup-list">
            <div class="loading-spinner"><div class="spinner"></div><p>Lendo itens de inicialização...</p></div>
        </div>
    `;

    try {
        const list = contentArea.querySelector('.startup-list');
        const items = [];

        // HKLM Run
        const hklmRes = await window.electronAPI.invoke('registry-enum-values', 'HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run');
        if (hklmRes && hklmRes.success && hklmRes.values) {
            hklmRes.values.forEach(v => items.push({ ...v, hive: 'HKLM' }));
        }

        // HKCU Run
        const hkcuRes = await window.electronAPI.invoke('registry-enum-values', 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run');
        if (hkcuRes && hkcuRes.success && hkcuRes.values) {
            hkcuRes.values.forEach(v => items.push({ ...v, hive: 'HKCU' }));
        }

        list.innerHTML = '';
        if (items.length === 0) {
            list.innerHTML = '<div class="empty-state">Nenhum item de inicialização encontrado.</div>';
            return;
        }

        items.forEach(item => {
            const row = document.createElement('div');
            row.className = 'builtin-card';
            row.innerHTML = `
                <div class="builtin-card-header">
                     <div class="builtin-card-info">
                        <div class="builtin-card-name">${item.name}</div>
                        <div class="builtin-card-desc" style="font-size:0.7rem; opacity:0.7; word-break:break-all;">${item.data}</div>
                    </div>
                    <div style="display:flex; align-items:center; gap:10px;">
                        <span class="badge" style="background:var(--bg-tertiary); font-size:0.6rem;">${item.hive}</span>
                        <button class="btn-secondary" style="background:var(--error); color:white; padding: 5px 10px; font-size: 0.7rem;">Remover</button>
                    </div>
                </div>
            `;

            // Delete handler
            const btn = row.querySelector('button');
            btn.addEventListener('click', async () => {
                if (!confirm(`Tem certeza que deseja remover "${item.name}" da inicialização?`)) return;

                const key = item.hive === 'HKLM'
                    ? 'HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run'
                    : 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run';

                btn.textContent = '...';
                const result = await window.electronAPI.registryDelete(key, item.name);

                if (result.success) {
                    row.remove();
                    window.tweakExecutor?.showToast('success', 'Startup', 'Item removido com sucesso!');
                } else {
                    btn.textContent = 'Erro';
                    alert('Erro ao remover: ' + (result.error || 'Desconhecido'));
                }
            });

            list.appendChild(row);
        });

    } catch (error) {
        console.error('Startup Error:', error);
        const list = contentArea.querySelector('.startup-list');
        if (list) list.innerHTML = `<div class="error-state">Erro ao carregar inicialização: ${error.message}</div>`;
    }
}

// Friendly names for common bloatware
const bloatwareNames = {
    'Microsoft.Windows.Photos': 'Fotos',
    'Microsoft.WindowsCamera': 'Câmera',
    'Microsoft.WindowsMaps': 'Mapas',
    'Microsoft.XboxApp': 'Xbox App',
    'Microsoft.Xbox.TCUI': 'Xbox UI',
    'Microsoft.XboxGameOverlay': 'Xbox Overlay',
    'Microsoft.XboxGamingOverlay': 'Game Bar',
    'Microsoft.XboxIdentityProvider': 'Xbox Identity',
    'Microsoft.XboxSpeechToTextOverlay': 'Xbox Speech',
    'Microsoft.GamingApp': 'Xbox Gaming App',
    'Microsoft.ZuneVideo': 'Filmes e TV',
    'Microsoft.ZuneMusic': 'Groove Música',
    'Microsoft.GetHelp': 'Ajuda',
    'Microsoft.MicrosoftOfficeHub': 'Office Mob',
    'Microsoft.Office.OneNote': 'OneNote',
    'Microsoft.People': 'Pessoas',
    'Microsoft.Wallet': 'Carteira',
    'Microsoft.WindowsAlarms': 'Alarmes',
    'Microsoft.WindowsCalculator': 'Calculadora',
    'Microsoft.WindowsSoundRecorder': 'Gravador',
    'Microsoft.BingWeather': 'Clima',
    'Microsoft.BingNews': 'Notícias',
    'Microsoft.MicrosoftStickyNotes': 'Notas Adesivas',
    'Microsoft.WindowsTerminal': 'Terminal',
    'Microsoft.Paint3D': 'Paint 3D',
    'Microsoft.SkypeApp': 'Skype',
    'Microsoft.YourPhone': 'Vincular Celular',
    'Microsoft.Microsoft3DViewer': 'Visualizador 3D',
    'Microsoft.Getstarted': 'Dicas',
    'Microsoft.WindowsFeedbackHub': 'Feedback Hub',
    'Microsoft.Todos': 'Microsoft To Do',
    'Microsoft.PowerAutomateDesktop': 'Power Automate',
    'Microsoft.BingFinance': 'Dinheiro',
    'Microsoft.BingSports': 'Esportes'
};

async function showDebloat() {
    console.log('🗑️ Showing Debloat Tab');
    const contentArea = document.getElementById('content-area');
    contentArea.innerHTML = `
        <div class="section-title">🗑️ Removedor de Apps (Bloatware)</div>
        <p style="color: var(--text-secondary); margin-bottom: 20px;">Remova aplicativos pré-instalados do Windows com segurança.</p>
        
        <div class="debloat-controls" style="margin-bottom: 20px;">
            <button class="btn-primary" id="scan-apps-btn">
                <i class="fas fa-sync"></i> Escanear Apps Instalados
            </button>
        </div>
        
        <div class="apps-list">
            <div class="empty-state">
                <div class="empty-state-icon">📱</div>
                <h3>Lista de Aplicativos</h3>
                <p>Clique em "Escanear" para carregar a lista.</p>
            </div>
        </div>
    `;

    document.getElementById('scan-apps-btn').addEventListener('click', async () => {
        const list = contentArea.querySelector('.apps-list');
        list.innerHTML = '<div class="loading-spinner"><div class="spinner"></div><p>Listando aplicativos (pode demorar)...</p></div>';

        try {
            // PowerShell command to get Appx packages (NonRemovable=false)
            const cmd = 'powershell -Command "Get-AppxPackage | Where-Object {$_.NonRemovable -eq $false} | Select-Object Name, PackageFullName | ConvertTo-Json"';

            console.log('Executing debloat scan...');
            const result = await window.electronAPI.invoke('execute-command', cmd);

            if (!result.success) {
                console.error('Scan failed:', result.error);
                throw new Error('Falha ao executar comando PowerShell.');
            }

            let apps = [];
            try {
                const output = result.output.trim();
                if (output) {
                    apps = JSON.parse(output);
                    if (!Array.isArray(apps)) apps = [apps];
                }
            } catch (jsonError) {
                console.error("JSON Parse Error:", jsonError, "Output:", result.output);
                throw new Error('Erro ao processar lista de aplicativos.');
            }

            // sort by name
            apps.sort((a, b) => (a.Name || '').localeCompare(b.Name || ''));

            if (apps.length === 0) {
                list.innerHTML = `
                    <div class="empty-state">
                        <div class="empty-state-icon">✅</div>
                        <h3>Nenhum Bloatware Encontrado</h3>
                        <p>Não foram encontrados aplicativos removíveis.</p>
                    </div>`;
                return;
            }

            // Render List
            list.innerHTML = `<div class="section-title">Encontrados: ${apps.length} aplicativos</div>`;
            const grid = document.createElement('div');
            grid.className = 'tweaks-grid';

            apps.forEach(app => {
                if (!app.Name) return;

                const safeName = app.Name.toLowerCase();
                if (safeName.includes('microsoft.windows.startmenu') ||
                    safeName.includes('microsoft.windows.cortana') ||
                    safeName.includes('microsoft.windows.shell') ||
                    safeName.includes('immersivecontrolpanel')) {
                    return;
                }

                // Friendly Name Logic
                const friendlyName = bloatwareNames[app.Name] || app.Name;

                const card = document.createElement('div');
                card.className = 'builtin-card';
                card.innerHTML = `
                    <div class="builtin-card-header" style="justify-content: space-between; gap: 10px;">
                        <div class="builtin-card-info" style="flex: 1; min-width: 0;">
                            <div class="builtin-card-name" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${friendlyName}</div>
                            <div class="builtin-card-desc" style="font-size: 0.65rem; opacity: 0.6; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${app.PackageFullName}">${app.Name}</div>
                        </div>
                        <button class="btn-secondary" style="background: rgba(239, 68, 68, 0.2); color: #fca5a5; border: 1px solid rgba(239, 68, 68, 0.3); padding: 6px 12px; font-size: 0.75rem; transition: all 0.2s; white-space: nowrap;">
                            <i class="fas fa-trash"></i> Remover
                        </button>
                    </div>
                `;

                const btn = card.querySelector('button');
                btn.addEventListener('click', async () => {
                    if (!confirm(`Tem certeza que deseja remover permanentemente:\n${friendlyName} (${app.Name})?`)) return;

                    btn.textContent = 'Removendo...';
                    btn.disabled = true;

                    const rmCmd = `powershell -Command "Remove-AppxPackage -Package '${app.PackageFullName}'"`;
                    const res = await window.electronAPI.invoke('execute-command', rmCmd);

                    if (res.success) {
                        card.style.opacity = '0.5';
                        card.style.pointerEvents = 'none';
                        btn.textContent = 'Removido';
                        btn.style.background = 'transparent';
                        btn.style.color = '#10b981';
                        btn.style.border = '1px solid #10b981';
                        window.tweakExecutor?.showToast('success', 'Debloat', `${friendlyName} removido com sucesso!`);
                    } else {
                        btn.textContent = 'Erro';
                        btn.disabled = false;
                        alert('Falha ao remover: ' + res.error);
                    }
                });

                grid.appendChild(card);
            });

            list.appendChild(grid);

        } catch (error) {
            console.error('Debloat error:', error);
            list.innerHTML = `<div class="error-state">
                <h3>Erro ao listar aplicativos</h3>
                <p>${error.message}</p>
             </div>`;
        }
    });
}

// ===== BUY VIP =====
function showBuyVip() {
    const contentArea = document.getElementById('content-area');
    contentArea.innerHTML = `
        <div class="section-title">👑 Seja VIP - Desbloqueie o Poder Total!</div>
        <div class="vip-promo-container" style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 80%; text-align: center; color: white;">
            <div style="font-size: 4rem; margin-bottom: 20px; filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.6));">👑</div>
            <h2 style="font-size: 2.5rem; background: linear-gradient(135deg, #ffd700, #ffa500); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 10px;">KT OPTIMIZER VIP</h2>
            <p style="font-size: 1.2rem; max-width: 600px; color: #e2e8f0; margin-bottom: 30px;">Leve seu PC para o próximo nível com a versão completa.</p>

            <div class="vip-features" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; text-align: left; margin-bottom: 30px; background: rgba(0,0,0,0.3); padding: 20px; border-radius: 12px; border: 1px solid rgba(255, 215, 0, 0.2);">
                <div>✅ 200+ Tweaks Exclusivos</div>
                <div>✅ FPS Boost Extremo</div>
                <div>✅ Otimizações de Rede</div>
                <div>✅ Latência Ultra Baixa</div>
                <div>✅ Debloat Avançado</div>
                <div>✅ Suporte Prioritário</div>
            </div>

            <div class="price-tag" style="font-size: 2rem; font-weight: 800; color: #ffd700; margin-bottom: 20px;">Apenas R$ 20,00</div>
            <a href="https://discord.gg/8Wq8Wq8Wq8" target="_blank" class="btn-primary" style="font-size: 1.2rem; padding: 15px 40px; background: linear-gradient(135deg, #ffd700, #ff8c00); color: black; font-weight: 800; box-shadow: 0 0 20px rgba(255, 215, 0, 0.4); text-decoration: none;">
                COMPRAR AGORA NO DISCORD
            </a>
            <p style="margin-top: 15px; font-size: 0.9rem; opacity: 0.7;">Entregue via Discord automaticamente.</p>
        </div>`;
}

// ===== GENERIC RENDER FUNCTIONS =====
function renderSubTabs(categoryId, category) {
    const container = document.getElementById('sub-tabs');
    if (!container) return;
    container.innerHTML = '';

    if (!category.subcategories || Object.keys(category.subcategories).length === 0) return;

    // All
    const allBtn = document.createElement('button');
    allBtn.className = `sub-tab ${currentSubTab === 'all' ? 'active' : ''}`;
    allBtn.textContent = 'Todos';
    allBtn.onclick = () => { currentSubTab = 'all'; renderCategoryContent(categoryId); updateSubTabsActiveState(); };
    container.appendChild(allBtn);

    // Subs
    Object.entries(category.subcategories).forEach(([key, name]) => {
        const btn = document.createElement('button');
        btn.className = `sub-tab ${currentSubTab === key ? 'active' : ''}`;
        btn.textContent = name;
        btn.onclick = () => { currentSubTab = key; renderCategoryContent(categoryId); updateSubTabsActiveState(); };
        container.appendChild(btn);
    });
}

function updateSubTabsActiveState() {
    document.querySelectorAll('.sub-tab').forEach(btn => {
        // Simple heuristic for active state
        let isActive = false;
        if (currentSubTab === 'all' && btn.textContent === 'Todos') isActive = true;
        else if (window.CATEGORIES[currentCategory]?.subcategories?.[currentSubTab] === btn.textContent) isActive = true;

        if (isActive) btn.classList.add('active');
        else btn.classList.remove('active');
    });
}

function renderCategoryContent(categoryId) {
    const contentArea = document.getElementById('content-area');
    contentArea.innerHTML = `<div class="section-title">${window.CATEGORIES[categoryId]?.name || 'Categoria'} <span class="section-count" id="tweak-count">0</span></div><div class="tweaks-grid"></div>`;
    const grid = contentArea.querySelector('.tweaks-grid');

    const tweaks = categoryManager.getBuiltInTweaksForCategory(categoryId);
    const filtered = currentSubTab === 'all' ? tweaks : tweaks.filter(t => t.sub === currentSubTab);

    document.getElementById('tweak-count').textContent = filtered.length;

    if (filtered.length === 0) {
        grid.innerHTML = '<div class="empty-state">Nenhum tweak encontrado.</div>';
        return;
    }

    filtered.forEach(tweak => {
        grid.appendChild(createBuiltInCard(tweak));
    });
}

function createBuiltInCard(tweak) {
    const card = document.createElement('div');
    card.className = 'builtin-card';

    // Check if premium logic for Free version
    const isPremium = tweak.warning === 'premium';
    const isApplied = registryEngine.isApplied(tweak.id);

    let badge = isPremium ? '<span class="tweak-badge-warning badge-premium">🔒 VIP</span>' : '<span class="tweak-badge-warning badge-safe">✅ FREE</span>';

    card.innerHTML = `
        <div class="builtin-card-header">
            <div class="builtin-card-info">
                <div class="builtin-card-name">${tweak.name}</div>
                <div class="builtin-card-desc">${tweak.desc || ''}</div>
            </div>
            ${!isPremium ? `
            <label class="toggle-switch">
                <input type="checkbox" ${isApplied ? 'checked' : ''}>
                <span class="toggle-slider"></span>
            </label>` : '<button class="btn-secondary" style="font-size:0.7rem; background:#ffd700; color:black; border:none;">VIP</button>'}
        </div>
        <div class="builtin-card-footer">
            ${badge}
            <span style="font-size:0.6rem; color:var(--text-muted);">${tweak.type || 'REG'}</span>
        </div>`;

    if (isPremium) {
        card.style.opacity = '0.7';
        card.addEventListener('click', () => {
            if (confirm('Este tweak é exclusivo para VIPs. Deseja comprar o VIP?')) {
                showBuyVip();
            }
        });
    } else {
        const toggle = card.querySelector('input');
        if (toggle) {
            toggle.addEventListener('change', async (e) => {
                // Determine intended state
                const isApplying = toggle.checked;

                // Visual feedback - optimistic
                const originalColor = card.style.borderColor;
                card.style.borderColor = isApplying ? 'var(--success)' : 'var(--warning)';

                try {
                    console.log(`Toggling tweak ${tweak.name}: ${isApplying}`);

                    // Execute basic or registry tweak
                    let success = false;

                    if (window.registryEngine && typeof window.registryEngine.toggleTweak === 'function') {
                        const res = await window.registryEngine.toggleTweak(tweak);
                        success = res.success;
                        if (!success) throw new Error(res.error || 'Falha no registro');
                    } else if (window.tweakExecutor) {
                        success = await window.tweakExecutor.execute(tweak);
                    }

                    if (!success) {
                        throw new Error('Execução falhou');
                    }

                    // Success
                    tweakExecutor.showToast('success', isApplying ? 'Aplicado' : 'Revertido', tweak.name);

                    // Update stats
                    updateStatsDashboard();

                    // Animation
                    card.style.transform = 'scale(1.02)';
                    setTimeout(() => card.style.transform = 'scale(1)', 200);

                } catch (err) {
                    console.error('Tweak execution error:', err);

                    // Revert state on error
                    toggle.checked = !isApplying;
                    card.style.borderColor = 'var(--error)';
                    tweakExecutor.showToast('error', 'Erro', err.message || 'Falha ao aplicar tweak');
                } finally {
                    setTimeout(() => card.style.borderColor = originalColor, 1000);
                }
            });
        }
    }
    return card;
}

// ===== UTILS =====
function updateStatsDashboard() {
    const total = document.getElementById('total-tweaks');
    const applied = document.getElementById('applied-tweaks');
    if (total && window.BUILT_IN_TWEAKS) total.textContent = window.BUILT_IN_TWEAKS.length;
    if (applied && window.registryEngine && window.BUILT_IN_TWEAKS) {
        applied.textContent = window.BUILT_IN_TWEAKS.filter(t => registryEngine.isApplied(t.id)).length;
    }
}

function handleSearch(query) {
    // Simple search impl
    const term = query.toLowerCase();
    const cards = document.querySelectorAll('.builtin-card');
    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(term) ? 'flex' : 'none';
    });
}

function handleQuickOptimize() {
    // Create custom modal
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); backdrop-filter: blur(10px); display: flex; align-items: center; justify-content: center; z-index: 10000; animation: fadeIn 0.3s;';
    
    modal.innerHTML = `
        <div class="quick-optimize-modal" style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 20px; padding: 40px; max-width: 500px; width: 90%; box-shadow: 0 20px 60px rgba(0,0,0,0.5); border: 1px solid rgba(168, 85, 247, 0.3); animation: slideUp 0.4s;">
            <div style="text-align: center; margin-bottom: 30px;">
                <div style="font-size: 4rem; margin-bottom: 15px; animation: pulse 2s infinite;">⚡</div>
                <h2 style="color: #a855f7; font-size: 2rem; margin-bottom: 10px;">Otimização Rápida</h2>
                <p style="color: #94a3b8; font-size: 0.9rem;">Aplica tweaks básicos para melhor performance</p>
            </div>
            
            <div style="background: rgba(0,0,0,0.3); border-radius: 15px; padding: 20px; margin-bottom: 25px;">
                <h3 style="color: #fff; font-size: 1.1rem; margin-bottom: 15px;">🛠️ Tweaks que serão aplicados:</h3>
                <div style="display: grid; gap: 10px;">
                    <div style="display: flex; align-items: center; gap: 10px; padding: 8px; background: rgba(168, 85, 247, 0.1); border-radius: 8px;">
                        <span style="color: #10b981; font-size: 1.2rem;">✅</span>
                        <span style="color: #e2e8f0; font-size: 0.9rem;">Desativar Hibernação</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px; padding: 8px; background: rgba(168, 85, 247, 0.1); border-radius: 8px;">
                        <span style="color: #10b981; font-size: 1.2rem;">✅</span>
                        <span style="color: #e2e8f0; font-size: 0.9rem;">Plano de Energia Alto Desempenho</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px; padding: 8px; background: rgba(168, 85, 247, 0.1); border-radius: 8px;">
                        <span style="color: #10b981; font-size: 1.2rem;">✅</span>
                        <span style="color: #e2e8f0; font-size: 0.9rem;">Desativar Efeitos Visuais</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px; padding: 8px; background: rgba(168, 85, 247, 0.1); border-radius: 8px;">
                        <span style="color: #10b981; font-size: 1.2rem;">✅</span>
                        <span style="color: #e2e8f0; font-size: 0.9rem;">Otimizar Superfetch</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px; padding: 8px; background: rgba(168, 85, 247, 0.1); border-radius: 8px;">
                        <span style="color: #10b981; font-size: 1.2rem;">✅</span>
                        <span style="color: #e2e8f0; font-size: 0.9rem;">Game Mode Ativado</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px; padding: 8px; background: rgba(168, 85, 247, 0.1); border-radius: 8px;">
                        <span style="color: #10b981; font-size: 1.2rem;">✅</span>
                        <span style="color: #e2e8f0; font-size: 0.9rem;">Hardware GPU Scheduling</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px; padding: 8px; background: rgba(168, 85, 247, 0.1); border-radius: 8px;">
                        <span style="color: #10b981; font-size: 1.2rem;">✅</span>
                        <span style="color: #e2e8f0; font-size: 0.9rem;">Desativar Mouse Acceleration</span>
                    </div>
                </div>
            </div>
            
            <div style="background: rgba(255, 68, 68, 0.1); border-left: 4px solid #ef4444; padding: 15px; border-radius: 8px; margin-bottom: 25px;">
                <p style="color: #fca5a5; font-size: 0.85rem; margin: 0;">⚠️ <strong>Atenção:</strong> Certifique-se de ter criado um ponto de restauração antes de continuar.</p>
            </div>
            
            <div style="display: flex; gap: 15px; justify-content: center;">
                <button id="cancel-optimize" style="flex: 1; padding: 15px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 10px; color: #fff; font-weight: 600; cursor: pointer; transition: all 0.3s;">
                    Cancelar
                </button>
                <button id="confirm-optimize" style="flex: 1; padding: 15px; background: linear-gradient(135deg, #a855f7, #ec4899); border: none; border-radius: 10px; color: #fff; font-weight: 600; cursor: pointer; transition: all 0.3s; box-shadow: 0 5px 20px rgba(168, 85, 247, 0.4);">
                    ⚡ Aplicar Agora
                </button>
            </div>
        </div>
        
        <style>
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes slideUp { from { transform: translateY(50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
            @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }
            #cancel-optimize:hover { background: rgba(255,255,255,0.2); transform: translateY(-2px); }
            #confirm-optimize:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(168, 85, 247, 0.6); }
        </style>
    `;
    
    document.body.appendChild(modal);
    
    document.getElementById('cancel-optimize').onclick = () => modal.remove();
    document.getElementById('confirm-optimize').onclick = async () => {
        modal.remove();
        
        const quickTweaks = ['sys_hiber', 'sys_perf', 'vis_anim', 'ram_superfetch', 'game_mode', 'gaming_hags', 'inp_accel'];
        let applied = 0, failed = 0;
        
        tweakExecutor.showToast('info', 'Otimização Rápida', 'Aplicando tweaks...');
        
        for (const tweakId of quickTweaks) {
            const tweak = window.BUILT_IN_TWEAKS.find(t => t.id === tweakId);
            if (!tweak) continue;
            
            try {
                if (tweak.type === 'command' && tweak.cmd) {
                    const result = await window.electronAPI.invoke('execute-command', tweak.cmd);
                    if (result.success) applied++; else failed++;
                } else if (tweak.reg) {
                    const result = await window.registryEngine.toggleTweak(tweak);
                    if (result.success) applied++; else failed++;
                }
                await new Promise(r => setTimeout(r, 500));
            } catch (e) { failed++; }
        }
        
        tweakExecutor.showToast('success', 'Concluído!', `${applied} tweaks aplicados, ${failed} falharam`);
        updateStatsDashboard();
    };
}

function showDev() { showBuyVip(); }
// ===== LICENSE =====
function showLicense() {
    const contentArea = document.getElementById('content-area');
    contentArea.innerHTML = `
        <div class="license-container" style="padding: 30px;">
            <div class="section-title">📄 Licença de Uso</div>
            <div class="glass-card" style="padding: 25px; line-height: 1.6; color: var(--text-secondary); white-space: pre-wrap; font-family: monospace; font-size: 0.9rem;">
MIT License

Copyright (c) 2026 KelvenAPK

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
            </div>
            
            <div style="margin-top: 20px; text-align: center;">
                <p>KT Optimizer Free v1.0</p>
                <p style="font-size: 0.8rem; opacity: 0.6;">Desenvolvido por KelvenAPK</p>
            </div>
        </div>
    `;
}

function showInfo() {
    showLicense();
}

// ===== TERMS OF USE =====
function checkTermsOfUse() {
    const accepted = localStorage.getItem('KT_OPTIMIZER_TERMS_ACCEPTED');

    if (accepted === 'true') {
        // If accepted, check if tutorial was seen
        if (localStorage.getItem('tutorial_seen') !== 'true') {
            setTimeout(() => {
                if (window.tutorialManager) window.tutorialManager.start();
            }, 2000);
        }
        return;
    }

    // Create and show modal
    const modal = document.createElement('div');
    modal.className = 'modal-overlay first-launch';
    modal.style.display = 'flex'; // Force display
    modal.innerHTML = `
        <div class="modal-content first-launch-content">
            <div class="first-launch-header">
                <h2>Bem-vindo ao KT Optimizer</h2>
            </div>
            <div class="first-launch-body">
                <p>Obrigado por escolher o <strong>KT Optimizer Free</strong>. Antes de começar, por favor leia e aceita nossos termos:</p>
                
                <div style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 8px; padding: 15px; margin: 15px 0;">
                    <h3 style="color: #ef4444; margin-top: 0; font-size: 1rem;">⚠️ USO POR SUA CONTA E RISCO</h3>
                    <p style="margin-bottom: 0; font-size: 0.9rem; color: #ffadad;">
                        Este software realiza modificações profundas no sistema. Embora testadas, alterações no Registro do Windows e em Serviços podem causar instabilidade.
                        <br><br>
                        <strong>O usuário assume total responsabilidade por quaisquer danos ou perda de dados.</strong>
                    </p>
                </div>

                <h3>🛡️ Recomendações</h3>
                <ul>
                    <li>Crie um Ponto de Restauração antes de usar.</li>
                    <li>Não remova drivers ou serviços essenciais.</li>
                </ul>
            </div>
            <div class="first-launch-footer">
                <button class="modal-btn modal-btn-primary" id="accept-terms-btn">
                    <span>Li e Aceito os Riscos</span>
                </button>
            </div>
        </div>
        <style>
            .first-launch { z-index: 9999; backdrop-filter: blur(5px); }
            .first-launch-content { width: 90%; max-width: 500px; border: 1px solid var(--gold-primary); box-shadow: 0 0 50px rgba(255, 215, 0, 0.1); }
            .first-launch-header h2 { color: var(--gold-primary); margin: 0; }
            .first-launch-body { padding: 20px; color: var(--text-secondary); line-height: 1.6; }
            .first-launch-body h3 { color: var(--text-primary); margin-top: 15px; font-size: 1.1rem; }
            .first-launch-footer { padding: 20px; border-top: 1px solid var(--glass-border); display: flex; justify-content: flex-end; }
        </style>
    `;

    document.body.appendChild(modal);

    const btn = modal.querySelector('#accept-terms-btn');
    btn.addEventListener('click', () => {
        localStorage.setItem('KT_OPTIMIZER_TERMS_ACCEPTED', 'true');
        modal.style.transition = 'opacity 0.5s';
        modal.style.opacity = '0';
        setTimeout(() => modal.remove(), 500);

        // Show welcome toast
        if (window.tweakExecutor) {
            tweakExecutor.showToast('success', 'Bem-vindo!', 'KT Optimizer pronto para uso.');
        }

        // Trigger Tutorial automatically after acceptance
        setTimeout(() => {
            if (window.tutorialManager) window.tutorialManager.start();
        }, 1000);
    });
}

// ===== CREATOR =====
function showCreator() {
    const contentArea = document.getElementById('content-area');
    contentArea.innerHTML = `
        <div class="creator-container" style="display: flex; flex-direction: column; align-items: center; padding: 40px; text-align: center;">
            <div class="creator-card glass-card" style="max-width: 600px; padding: 40px; border-radius: 20px; border: 1px solid var(--gold-primary); box-shadow: 0 0 30px rgba(255, 215, 0, 0.1);">
                <div class="creator-avatar" style="font-size: 60px; margin-bottom: 20px; color: var(--gold-primary);">
                    <i class="fas fa-user-astronaut"></i>
                </div>
                <h2 style="color: var(--gold-primary); font-size: 2.5rem; margin-bottom: 10px;">KelvenAPK</h2>
                <h3 style="color: var(--text-secondary); margin-bottom: 30px; font-weight: 400;">Developer & Optimizer</h3>
                
                <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 30px;">
                    Desenvolvido com paixão para trazer a melhor performance para o seu PC.
                    Junte-se à nossa comunidade para suporte, updates e conteúdo exclusivo!
                </p>

                <div class="creator-links" style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                    <a href="https://discord.gg/pSWSkzSUPs" target="_blank" class="btn-primary" style="display: flex; align-items: center; gap: 10px; background: #5865F2; border-color: #5865F2;">
                        <i class="fab fa-discord"></i> Discord Oficial
                    </a>
                    <a href="https://github.com/kelvenapk" target="_blank" class="btn-secondary" style="display: flex; align-items: center; gap: 10px;">
                        <i class="fab fa-github"></i> GitHub
                    </a>
                </div>
            </div>
            
             <div class="vip-promo glass-card" style="margin-top: 30px; padding: 20px; max-width: 600px; width: 100%;">
                <h3>🚀 Quer apoiar o projeto?</h3>
                <p>Adquira a versão VIP e desbloqueie todo o potencial do otimizador!</p>
                <button onclick="showBuyVip()" class="btn-primary" style="margin-top: 10px; background: linear-gradient(135deg, #ffd700 0%, #ff8c00 100%); color: black; font-weight: bold;">
                    Ver Benefícios VIP
                </button>
            </div>
        </div>
    `;
}

// ===== VIP UPSELL =====
function showBuyVip() {
    const contentArea = document.getElementById('content-area');
    contentArea.innerHTML = `
        <div class="vip-container" style="padding: 20px;">
            <div class="vip-header" style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #ffd700; font-size: 3rem; text-shadow: 0 0 20px rgba(255, 215, 0, 0.3);">SEJA VIP 👑</h1>
                <p style="font-size: 1.2rem; color: var(--text-secondary);">Desbloqueie o poder máximo do seu hardware por apenas <span style="color: #fff; font-weight: bold;">R$ 20,00</span></p>
            </div>

            <div class="vip-comparison" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-bottom: 40px;">
                <!-- FREE CARD -->
                <div class="plan-card" style="background: rgba(255, 255, 255, 0.03); padding: 30px; border-radius: 16px; border: 1px solid var(--glass-border);">
                    <h3 style="color: var(--text-secondary);">Free</h3>
                    <div class="price" style="font-size: 2rem; font-weight: bold; margin: 15px 0;">R$ 0</div>
                    <ul style="list-style: none; padding: 0; text-align: left; margin-bottom: 20px;">
                        <li style="margin-bottom: 10px;">✅ Limpeza Básica</li>
                        <li style="margin-bottom: 10px;">✅ Debloat de Apps</li>
                        <li style="margin-bottom: 10px;">✅ Gerenciador de Inicialização</li>
                        <li style="margin-bottom: 10px; color: var(--text-muted);">❌ Otimizações de Rede (Ping)</li>
                        <li style="margin-bottom: 10px; color: var(--text-muted);">❌ Tweaks Avançados de GPU</li>
                        <li style="margin-bottom: 10px; color: var(--text-muted);">❌ FPS Unlockers</li>
                    </ul>
                </div>

                <!-- VIP CARD -->
                <div class="plan-card vip-card" style="background: linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 140, 0, 0.1)); padding: 30px; border-radius: 16px; border: 1px solid #ffd700; position: relative; overflow: hidden;">
                    <div class="badge" style="position: absolute; top: 15px; right: -30px; background: #ffd700; color: black; padding: 5px 30px; transform: rotate(45deg); font-weight: bold; font-size: 0.8rem;">MELHOR ESCOLHA</div>
                    <h3 style="color: #ffd700;">PRO VIP</h3>
                    <div class="price" style="font-size: 2rem; font-weight: bold; margin: 15px 0; color: #fff;">R$ 20</div>
                    <ul style="list-style: none; padding: 0; text-align: left; margin-bottom: 20px;">
                       <li style="margin-bottom: 10px;">👑 <strong>Tudo do Free +</strong></li>
                       <li style="margin-bottom: 10px;">🚀 Otimizações Profissionais de Latência</li>
                       <li style="margin-bottom: 10px;">🎮 Tweaks Exclusivos (NVIDIA/AMD)</li>
                       <li style="margin-bottom: 10px;">⚡ FPS Boost (Fortnite, Valorant, etc)</li>
                       <li style="margin-bottom: 10px;">🛡️ Suporte Prioritário</li>
                    </ul>
                    <a href="https://discord.gg/pSWSkzSUPs" target="_blank" class="btn-primary" style="display: block; width: 100%; text-align: center; background: #ffd700; color: black; font-weight: bold; text-decoration: none;">
                        COMPRAR AGORA
                    </a>
                </div>
            </div>
            
            <div style="text-align: center; font-size: 0.9rem; color: var(--text-muted);">
                Pagamento via PIX ou Cartão • Satisfação Garantida
            </div>
        </div>
    `;
}

// Global Exports
window.showCategory = showCategory;
window.renderCategoryContent = renderCategoryContent;
window.updateStatsDashboard = updateStatsDashboard;
window.handleSearch = handleSearch;
window.createBackup = createBackup;
window.handleQuickOptimize = handleQuickOptimize;
