// =====================================================
// CATEGORY MANAGER - v5.0
// Gerencia categorias, subcategorias e tweaks integrados
// =====================================================

const CATEGORIES = {
    inicio: {
        name: '🏠 Início',
        subcategories: {},
        keywords: []
    },
    inicializacao: {
        name: '🚀 Inicialização',
        subcategories: {},
        keywords: []
    },
    sistema: {
        name: '⚙️ Sistema',
        subcategories: { core: 'Core / CPU', power: 'Energia', intel: 'Intel Específico', amd: 'AMD Específico', qol: 'Qualidade de Vida' },
        keywords: ['power', 'energia', 'performance', 'system', 'sistema', 'cpu', 'processador', 'disco', 'disk', 'ssd', 'hdd']
    },
    latencia: {
        name: '⚡ Latência',
        subcategories: { sistema: 'Sistema', hardware: 'Hardware', dpc: 'DPC/ISR' },
        keywords: ['latency', 'latencia', 'input lag', 'delay', 'dpc', 'isr', 'timer', 'response']
    },
    gpu: {
        name: '🎨 GPU / Vídeo',
        subcategories: { driver: 'Driver Geral', nvidia: 'NVIDIA', amd: 'AMD Radeon', intel: 'Intel HD/Iris' },
        keywords: ['gpu', 'nvidia', 'video', 'placa', 'graphics', 'directx', 'vulkan', 'shader']
    },
    ram: {
        name: '💾 Memória & RAM',
        subcategories: { otimizacao: 'Otimização', cache: 'Cache e Pool', diagnostico: 'Diagnóstico' },
        keywords: ['ram', 'memory', 'memoria', 'standby', 'cache', 'virtual', 'page', 'swap', '4gb', '8gb', '16gb', '32gb']
    },
    input: {
        name: '⌨️ Input & Periféricos',
        subcategories: { mouse: 'Mouse', teclado: 'Teclado', usb: 'USB e Periféricos' },
        keywords: ['input', 'lag', 'mouse', 'keyboard', 'teclado', 'monitor', 'delay', 'acceleration', 'aceleração', 'hover', 'usb']
    },
    rede: {
        name: '🌐 Rede',
        subcategories: { tcp: 'TCP/IP e Otimizações', dns: 'DNS e Resolução', firewall: 'Firewall e QoS' },
        keywords: ['net', 'network', 'rede', 'dns', 'tcp', 'ping', 'latency', 'latencia', 'bandwidth']
    },
    jogos: {
        name: '🎮 Jogos',
        subcategories: { geral: 'Otimizações Gerais', especifico: 'Jogos Específicos', streaming: 'Streaming' },
        keywords: ['game', 'jogo', 'fps', 'gaming', 'jogar', 'player', 'steam', 'epic', 'origin', 'battle', 'fps', 'latency', 'optimize']
    },
    win10: {
        name: '🪟 Windows 10',
        subcategories: { performance: 'Performance', telemetry: 'Telemetria', update: 'Updates', visual: 'Visual' },
        keywords: ['windows 10', 'w10', 'superfetch', 'readyboost', 'defrag', 'windows search']
    },
    win11: {
        name: '🪟 Windows 11',
        subcategories: { interface: 'Interface', visual: 'Visual', seguranca: 'Segurança' },
        keywords: ['windows 11', 'w11', 'widgets', 'snap', 'copilot', 'teams', 'taskbar', 'context menu']
    },
    seguranca: {
        name: '🛡️ Segurança',
        subcategories: { acesso: 'Controle de Acesso', rede: 'Segurança de Rede', sistema: 'Segurança do Sistema' },
        keywords: ['security', 'seguranca', 'smb', 'firewall', 'remote', 'autorun', 'netbios']
    },
    servicos: {
        name: '🔄 Serviços',
        subcategories: { telemetria: 'Telemetria', sistema: 'Sistema', xbox: 'Xbox' },
        keywords: ['service', 'servico', 'diagtrack', 'dmwappush', 'wersvc']
    },
    privacidade: {
        name: '🔒 Privacidade',
        subcategories: { telemetria: 'Telemetria e Diagnóstico', tracking: 'Rastreamento e Coleta', coleta: 'Coleta de Dados' },
        keywords: ['privacy', 'privacidade', 'telemetry', 'telemetria', 'tracking', 'cortana', 'advertising']
    },
    visual: {
        name: '🎨 Visual & UI',
        subcategories: { animacoes: 'Animações', visual: 'Visual', efeitos: 'Efeitos' },
        keywords: ['visual', 'animation', 'animacao', 'effect', 'efeito', 'transparency', 'fade']
    },
    explorer: {
        name: '📂 Explorer',
        subcategories: { comportamento: 'Comportamento', visual: 'Visual', privacidade: 'Privacidade' },
        keywords: ['explorer', 'shell', 'folder', 'pasta', 'file', 'arquivo', 'extension']
    },
    storage: {
        name: '💿 Storage / SSD',
        subcategories: { ssd: 'SSD e TRIM', ntfs: 'NTFS e Sistema de Arquivos', hdd: 'HDD e Disco' },
        keywords: ['storage', 'ssd', 'hdd', 'nvme', 'ntfs', 'trim', 'defrag', 'disk', 'disco', 'file system']
    },
    drivers: {
        name: '🔧 Drivers',
        subcategories: { system: 'Drivers de Sistema', devices: 'Dispositivos' },
        keywords: ['driver', 'device', 'dispositivo', 'signature', 'update driver', 'verifier']
    },
    energia: {
        name: '🔋 Energia',
        subcategories: { powerplan: 'Planos de Energia', sleep: 'Sleep e Hibernação' },
        keywords: ['power plan', 'sleep', 'hibernation', 'standby', 'screen off', 'battery']
    },
    desativar: {
        name: '🚫 Desativar',
        subcategories: {
            seguranca: 'Segurança do Windows',
            servicos: 'Serviços do Sistema',
            recursos: 'Recursos do Windows',
            busca: 'Busca e Pesquisa',
            telemetria: 'Telemetria'
        },
        keywords: ['disable', 'desativar', 'desabilitar', 'service', 'servico', 'serviço', 'processo', 'process', 'uac', 'search', 'update', 'telemetry', 'defender', 'firewall', 'windows defender', 'smart screen']
    },
    limpeza: {
        name: '🧹 Limpeza',
        subcategories: { sistema: 'Limpeza de Sistema', ram: 'Limpeza de RAM', navegadores: 'Limpeza de Navegadores' },
        keywords: ['clean', 'limpar', 'limpeza', 'temp', 'cache', 'prefetch', 'superfetch', 'clear']
    },
    fixes: {
        name: '🛠️ Correções',
        subcategories: {
            reverter: 'Reverter Otimizações',
            fixes: 'Fixes de Sistema',
            network: 'Problemas de Rede',
            audio: 'Problemas de Áudio',
            performance: 'Problemas de Performance',
            system: 'Problemas de Sistema',
            peripherals: 'Problemas de Periféricos',
            store: 'Problemas da Loja'
        },
        keywords: ['fix', 'revert', 'reverter', 'voltar', 'restore', 'reset', 'rollback', 'undo', 'default', 'padrão', 'corrigir', 'problema', 'erro', 'bug']
    },
    appopt: {
        name: '📱 Otimizar Apps',
        subcategories: {
            discord: 'Discord',
            streaming: 'Streaming',
            jogos: 'Jogos',
            chrome: 'Chrome',
            edge: 'Edge',
            firefox: 'Firefox',
            brave: 'Brave'
        },
        keywords: []
    },
    info: {
        name: '📊 Informações',
        subcategories: { diagnostico: 'Diagnóstico', sistema: 'Sistema' },
        keywords: ['info', 'information', 'informação', 'diagnostico', 'diagnostic', 'verify', 'verificar', 'check']
    },
    apps: {
        name: '📦 Aplicativos',
        subcategories: { essenciais: 'Apps Essenciais', otimizacao: 'Apps de Otimização' },
        keywords: []
    },
    dev: {
        name: '👨‍💻 Desenvolvedores',
        subcategories: { ide: 'IDEs', runtime: 'Runtimes', compilers: 'Compiladores', databases: 'Bancos de Dados', containers: 'Containers', tools: 'Ferramentas de Desenvolvimento' },
        keywords: ['dev', 'developer', 'ide', 'vscode', 'intellij', 'eclipse', 'docker', 'node', 'python', 'java', 'go', 'rust', 'compiler', 'database', 'mongodb', 'mysql', 'postgresql', 'git']
    },
    debloat: {
        name: '🗑️ Remover Apps',
        subcategories: {
            microsoft: 'Apps Microsoft',
            gaming: 'Apps Gaming',
            social: 'Apps Social',
            bloatware: 'Bloatware',
            sistema: 'Sistema Windows',
            utilitarios: 'Utilitários',
            onedrive: 'OneDrive',
            teams: 'Teams e Office'
        },
        keywords: ['debloat', 'remove', 'uninstall', 'app', 'application', 'microsoft', 'gaming', 'social', 'bloatware', 'onedrive', 'teams', 'zune', 'xbox', 'solitaire', 'mahjong', 'paint', '3d', 'camera', 'alarms', 'weather', 'news', 'sports', 'store', 'get help', 'tips', 'feedback', 'get started']
    },
};

class CategoryManager {
    constructor() {
        this.tweaks = { bat: [], reg: [] };
        this.builtInTweaks = [];
        this.basePath = 'c:\\kelthurx';
    }

    classifyTweak(name, directory) {
        const lowerName = name.toLowerCase();
        const lowerDir = directory.toLowerCase();
        const combined = `${lowerName} ${lowerDir}`;

        for (const [categoryId, category] of Object.entries(CATEGORIES)) {
            if (categoryId === 'apps' || categoryId === 'appopt') continue;
            for (const keyword of category.keywords) {
                if (combined.includes(keyword.toLowerCase())) return categoryId;
            }
        }
        return 'sistema';
    }

    determineSubcategory(categoryId, name, directory) {
        const category = CATEGORIES[categoryId];
        if (!category || !category.subcategories) return null;
        const ln = name.toLowerCase();

        switch (categoryId) {
            case 'sistema':
                if (ln.includes('energia') || ln.includes('power')) return 'power';
                if (ln.includes('cpu') || ln.includes('processador')) return 'core';
                return 'core';
            case 'gpu':
                if (ln.includes('nvidia')) return 'nvidia';
                return 'driver';
            case 'ram':
                if (ln.includes('cache') || ln.includes('standby')) return 'cache';
                return 'otimizacao';
            case 'jogos':
                const gameKw = ['fivem', 'gta', 'battlefield', 'cod', 'warzone', 'fortnite', 'valorant', 'cs2', 'rdr', 'roblox', 'minecraft', 'apex', 'overwatch', 'league', 'lol', 'dota', 'r6', 'rocket'];
                if (gameKw.some(kw => ln.includes(kw))) return 'especifico';
                if (ln.includes('stream') || ln.includes('obs') || ln.includes('twitch')) return 'streaming';
                return 'geral';
            case 'input':
                if (ln.includes('mouse')) return 'mouse';
                if (ln.includes('teclado') || ln.includes('keyboard')) return 'teclado';
                return 'usb';
            case 'rede':
                if (ln.includes('dns')) return 'dns';
                if (ln.includes('firewall') || ln.includes('qos')) return 'firewall';
                return 'tcp';
            case 'privacidade':
                if (ln.includes('track') || ln.includes('location') || ln.includes('advertising')) return 'tracking';
                return 'telemetria';
            case 'storage':
                if (ln.includes('ssd') || ln.includes('trim')) return 'ssd';
                if (ln.includes('hdd')) return 'hdd';
                return 'ntfs';
            case 'drivers':
                return 'system';
            case 'energia':
                if (ln.includes('sleep') || ln.includes('hibernat')) return 'sleep';
                return 'powerplan';
            case 'limpeza':
                if (ln.includes('ram') || ln.includes('memory')) return 'ram';
                if (ln.includes('navegador') || ln.includes('browser') || ln.includes('chrome')) return 'navegadores';
                return 'sistema';
            case 'desativar':
                if (ln.includes('defender') || ln.includes('security') || ln.includes('seguranca') || ln.includes('firewall') || ln.includes('uac') || ln.includes('smart screen')) return 'seguranca';
                if (ln.includes('service') || ln.includes('serviço') || ln.includes('servico')) return 'servicos';
                if (ln.includes('busca') || ln.includes('search') || ln.includes('cortana')) return 'busca';
                if (ln.includes('telemetry') || ln.includes('telemetria') || ln.includes('diag')) return 'telemetria';
                return 'recursos';
            case 'fixes':
                if (ln.includes('revert') || ln.includes('reverter') || ln.includes('voltar')) return 'reverter';
                if (ln.includes('network') || ln.includes('rede') || ln.includes('tcp') || ln.includes('ip')) return 'network';
                if (ln.includes('audio') || ln.includes('áudio') || ln.includes('som') || ln.includes('distortion')) return 'audio';
                if (ln.includes('cpu') || ln.includes('performance') || ln.includes('lentidão') || ln.includes('slow') || ln.includes('boot')) return 'performance';
                if (ln.includes('printer') || ln.includes('impressora') || ln.includes('bluetooth') || ln.includes('peripheral')) return 'peripherals';
                if (ln.includes('store') || ln.includes('loja') || ln.includes('windows store')) return 'store';
                if (ln.includes('blue') || ln.includes('tela azul') || ln.includes('crash') || ln.includes('bsod')) return 'system';
                if (ln.includes('file association') || ln.includes('associação')) return 'system';
                return 'fixes';
            case 'info':
                if (ln.includes('diagnostico') || ln.includes('diagnostic')) return 'diagnostico';
                return 'sistema';
            case 'dev':
                if (ln.includes('ide') || ln.includes('jetbrains') || ln.includes('vscode')) return 'ide';
                if (ln.includes('node') || ln.includes('python') || ln.includes('java')) return 'runtime';
                if (ln.includes('docker') || ln.includes('container')) return 'containers';
                return 'tools';
            case 'debloat':
                if (ln.includes('onedrive')) return 'onedrive';
                if (ln.includes('teams') || ln.includes('office')) return 'teams';
                if (ln.includes('xbox') || ln.includes('game')) return 'gaming';
                if (ln.includes('discord') || ln.includes('telegram') || ln.includes('whatsapp') || ln.includes('social')) return 'social';
                if (ln.includes('microsoft') || ln.includes('edge') || ln.includes('store')) return 'microsoft';
                return 'bloatware';
            default:
                return Object.keys(category.subcategories)[0];
        }
    }

    getBuiltInTweaksForCategory(categoryId) {
        if (!window.BUILT_IN_TWEAKS) {
            console.warn('⚠️ BUILT_IN_TWEAKS not available!');
            return [];
        }
        const tweaks = window.BUILT_IN_TWEAKS.filter(t => t.category === categoryId);
        console.log(`📊 getBuiltInTweaksForCategory('${categoryId}'): found ${tweaks.length} tweaks`);
        return tweaks;
    }

    getBuiltInTweaksForSubcategory(categoryId, subcategoryId) {
        if (!window.BUILT_IN_TWEAKS) return [];
        return window.BUILT_IN_TWEAKS.filter(t => t.category === categoryId && t.sub === subcategoryId);
    }

    getTweaksForCategory(categoryId) {
        return {
            bat: this.tweaks.bat.filter(t => t.category === categoryId),
            reg: this.tweaks.reg.filter(t => t.category === categoryId)
        };
    }

    getTweaksForSubcategory(categoryId, subcategoryId) {
        const ct = this.getTweaksForCategory(categoryId);
        return {
            bat: ct.bat.filter(t => t.subcategory === subcategoryId),
            reg: ct.reg.filter(t => t.subcategory === subcategoryId)
        };
    }

    async loadTweaks() {
        try {
            // Load file-based tweaks
            if (window.electronAPI && typeof window.electronAPI.scanTweaks === 'function') {
                try {
                    const basePath = 'c:\\kelthurx'; // Default path
                    const scannedTweaks = await window.electronAPI.scanTweaks(basePath);
                    this.tweaks = scannedTweaks || { bat: [], reg: [] };
                } catch (err) {
                    console.warn('Failed to load file tweaks:', err);
                    this.tweaks = { bat: [], reg: [] };
                }
            } else {
                console.warn('Electron API not available for scanning tweaks');
                this.tweaks = { bat: [], reg: [] };
            }

            // Categorize file tweaks
            this.tweaks.bat = this.categorizeFileTweaks(this.tweaks.bat, 'bat');
            this.tweaks.reg = this.categorizeFileTweaks(this.tweaks.reg, 'reg');

            console.log('Tweaks loaded:', {
                bat: this.tweaks.bat.length,
                reg: this.tweaks.reg.length,
                builtIn: window.BUILT_IN_TWEAKS ? window.BUILT_IN_TWEAKS.length : 0,
                total: this.tweaks.bat.length + this.tweaks.reg.length + (window.BUILT_IN_TWEAKS ? window.BUILT_IN_TWEAKS.length : 0)
            });
            return true;
        } catch (error) {
            console.error('Critical error loading tweaks:', error);
            // Ensure app doesn't crash
            this.tweaks = { bat: [], reg: [] };
            return false;
        }
    }

    categorizeFileTweaks(tweaks, type) {
        if (!tweaks || !Array.isArray(tweaks)) return [];
        return tweaks.map(tweak => {
            if (tweak.category) return tweak;
            // Auto-categorize based on name/directory
            const category = this.classifyTweak(tweak.name, tweak.directory || '');
            const subcategory = this.determineSubcategory(category, tweak.name, tweak.directory || '');
            return { ...tweak, category, subcategory };
        });
    }

    searchTweaks(query) {
        if (!query) return this.tweaks;
        const lq = query.toLowerCase();
        return {
            bat: this.tweaks.bat.filter(t => t.name.toLowerCase().includes(lq) || t.directory.toLowerCase().includes(lq)),
            reg: this.tweaks.reg.filter(t => t.name.toLowerCase().includes(lq) || t.directory.toLowerCase().includes(lq))
        };
    }

    searchBuiltInTweaks(query) {
        if (!query || !window.BUILT_IN_TWEAKS) return [];
        const lq = query.toLowerCase();
        return window.BUILT_IN_TWEAKS.filter(t =>
            t.name.toLowerCase().includes(lq) || t.desc.toLowerCase().includes(lq)
        );
    }
}

window.CategoryManager = CategoryManager;
window.CATEGORIES = CATEGORIES;
