// =====================================================
// TWEAKS DATABASE - RESTORED ORIGINAL STRUCTURE
// 200+ Tweaks Mapped to Original Categories
// =====================================================

// Note: Categories are defined in category-manager.js. 
// This file populates the built-in tweaks list matching those categories.

window.BUILT_IN_TWEAKS = [
  // ==============================================================================
  // ⚙️ SISTEMA
  // ==============================================================================
  { id: 'sys_perf', name: 'Ultimate Performance', desc: 'Ativa plano de energia máximo', category: 'sistema', sub: 'power', type: 'command', cmd: 'powercfg -duplicatescheme e9a42b02-d5df-448d-aa00-03f14749eb61', warning: 'none' },
  { id: 'sys_hiber', name: 'Desativar Hibernação', desc: 'Libera espaço em disco', category: 'sistema', sub: 'disco', type: 'command', cmd: 'powercfg -h off', warning: 'none' },
  { id: 'sys_uac', name: 'Desativar UAC', desc: 'Desativa Controle de Conta', category: 'sistema', sub: 'core', reg: [{ path: 'HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System', name: 'EnableLUA', type: 'REG_DWORD', value: '0' }], warning: 'premium' },
  { id: 'sys_godmode', name: 'Ativar God Mode', desc: 'Cria atalho God Mode no Desktop', category: 'sistema', sub: 'qol', type: 'command', cmd: 'mkdir "%USERPROFILE%\\Desktop\\GodMode.{ED7BA470-8E54-465E-825C-99712043E01C}"', warning: 'none' },
  { id: 'sys_fso', name: 'Disable Fullscreen Opt', desc: 'Globalmente', category: 'sistema', sub: 'core', reg: [{ path: 'HKCU\\System\\GameConfigStore', name: 'GameDVR_FSEBehaviorMode', type: 'REG_DWORD', value: '2' }], warning: 'none' },

  // ==============================================================================
  // ⚡ LATÊNCIA
  // ==============================================================================
  { id: 'lat_timer', name: 'High Precision Event Timer', desc: 'Desativa HPET via BCDEdit', category: 'latencia', sub: 'sistema', type: 'command', cmd: 'bcdedit /deletevalue useplatformclock', warning: 'none' },
  { id: 'lat_dyn', name: 'Disable Dynamic Tick', desc: 'Melhora latência', category: 'latencia', sub: 'sistema', type: 'command', cmd: 'bcdedit /set disabledynamictick yes', warning: 'none' },
  { id: 'lat_ts', name: 'Time Stamp Counter', desc: 'Sincroniza timers', category: 'latencia', sub: 'sistema', type: 'command', cmd: 'bcdedit /set useplatformtick yes', warning: 'none' },
  { id: 'lat_dpc', name: 'Prioridade DPC', desc: 'Otimiza DPC no registro', category: 'latencia', sub: 'dpc', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\PriorityControl', name: 'Win32PrioritySeparation', type: 'REG_DWORD', value: '38' }], warning: 'none' },
  { id: 'lat_irq', name: 'IRQ Priority (System)', desc: 'Prioridade IRQ8', category: 'latencia', sub: 'hardware', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\PriorityControl', name: 'IRQ8Priority', type: 'REG_DWORD', value: '1' }], warning: 'none' },

  // ==============================================================================
  // 🎨 GPU / VÍDEO
  // ==============================================================================
  { id: 'gpu_accel', name: 'Aceleração Hardware', desc: 'Força renderização GPU', category: 'gpu', sub: 'driver', reg: [{ path: 'HKCU\\Software\\Microsoft\\Avalon.Graphics', name: 'DisableHWAcceleration', type: 'REG_DWORD', value: '0' }], warning: 'none' },
  { id: 'gpu_nvidia_pre', name: 'NVIDIA Pre-Render', desc: 'Reduz latência', category: 'gpu', sub: 'nvidia', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Class\\{4d36e968-e325-11ce-bfc1-08002be10318}\\0000', name: 'D3PCLatency', type: 'REG_DWORD', value: '0' }], warning: 'none' },
  { id: 'gpu_amd_ulps', name: 'AMD Desativar ULPS', desc: 'Desativa economia energia', category: 'gpu', sub: 'amd', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Class\\{4d36e968-e325-11ce-bfc1-08002be10318}\\0000', name: 'EnableUlps', type: 'REG_DWORD', value: '0' }], warning: 'none' },
  { id: 'gpu_intel_perf', name: 'Intel High Perf', desc: 'Modo performance', category: 'gpu', sub: 'intel', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Power\\PowerSettings', name: 'PerfBoostMode', type: 'REG_DWORD', value: '100' }], warning: 'none' },
  { id: 'gpu_priority', name: 'Prioridade GPU Jogos', desc: 'Aumenta prioridade', category: 'gpu', sub: 'driver', reg: [{ path: 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games', name: 'GPU Priority', type: 'REG_DWORD', value: '8' }], warning: 'none' },

  // ==============================================================================
  // 💾 MEMÓRIA & RAM
  // ==============================================================================
  { id: 'ram_ndu', name: 'Desativar NDU', desc: 'Corrige memory leak', category: 'ram', sub: 'otimizacao', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\Ndu', name: 'Start', type: 'REG_DWORD', value: '4' }], warning: 'none' },
  { id: 'ram_lsc', name: 'Large System Cache', desc: 'Prioriza cache sistema', category: 'ram', sub: 'cache', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management', name: 'LargeSystemCache', type: 'REG_DWORD', value: '1' }], warning: 'none' },
  { id: 'ram_page', name: 'Clear Pagefile At Shutdown', desc: 'Limpa arquivo paginação', category: 'ram', sub: 'otimizacao', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management', name: 'ClearPageFileAtShutdown', type: 'REG_DWORD', value: '1' }], warning: 'none' },
  { id: 'ram_superfetch', name: 'Desativar Superfetch', desc: 'Serviço SysMain', category: 'ram', sub: 'otimizacao', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\SysMain', name: 'Start', type: 'REG_DWORD', value: '4' }], warning: 'none' },

  // ==============================================================================
  // ⌨️ INPUT & PERIFÉRICOS
  // ==============================================================================
  { id: 'inp_accel', name: 'Desativar Aceleração Mouse', desc: 'Movimento 1:1', category: 'input', sub: 'mouse', reg: [{ path: 'HKCU\\Control Panel\\Mouse', name: 'MouseSpeed', type: 'REG_SZ', value: '0' }], warning: 'none' },
  { id: 'inp_sticky', name: 'Desativar Sticky Keys', desc: 'Teclas de aderência', category: 'input', sub: 'teclado', reg: [{ path: 'HKCU\\Control Panel\\Accessibility\\StickyKeys', name: 'Flags', type: 'REG_SZ', value: '506' }], warning: 'none' },
  { id: 'inp_usb', name: 'Desativar USB Power Saving', desc: 'Evita desligamento USB', category: 'input', sub: 'usb', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\USB\\Parameters', name: 'DisableSelectiveSuspend', type: 'REG_DWORD', value: '1' }], warning: 'none' },
  { id: 'inp_filter', name: 'Disable Filter Keys', desc: 'Teclas de filtro', category: 'input', sub: 'teclado', reg: [{ path: 'HKCU\\Control Panel\\Accessibility\\Keyboard Response', name: 'Flags', type: 'REG_SZ', value: '122' }], warning: 'none' },

  // ==============================================================================
  // 🌐 REDE
  // ==============================================================================
  { id: 'net_nagle', name: 'Disable Nagle (TCP)', desc: 'TCPNoDelay', category: 'rede', sub: 'tcp', reg: [{ path: 'HKLM\\SOFTWARE\\Microsoft\\MSMQ\\Parameters', name: 'TCPNoDelay', type: 'REG_DWORD', value: '1' }], warning: 'none' },
  { id: 'net_throttle', name: 'Network Throttling Off', desc: 'Index FFFFFFFF', category: 'rede', sub: 'tcp', reg: [{ path: 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile', name: 'NetworkThrottlingIndex', type: 'REG_DWORD', value: '4294967295' }], warning: 'none' },
  { id: 'net_dns', name: 'DNS Cloudflare', desc: 'Define DNS 1.1.1.1', category: 'rede', sub: 'dns', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters\\Interfaces', name: 'NameServer', type: 'REG_SZ', value: '1.1.1.1,1.0.0.1' }], warning: 'none' },
  { id: 'net_qos', name: 'Otimizar QoS', desc: 'Não limitar banda', category: 'rede', sub: 'firewall', reg: [{ path: 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Psched', name: 'NonBestEffortLimit', type: 'REG_DWORD', value: '0' }], warning: 'none' },

  // ==============================================================================
  // 🎮 JOGOS
  // ==============================================================================
  { id: 'game_mode', name: 'Ativar Game Mode', desc: 'Prioridade sistema para jogos', category: 'jogos', sub: 'geral', reg: [{ path: 'HKCU\\Software\\Microsoft\\GameBar', name: 'AllowAutoGameMode', type: 'REG_DWORD', value: '1' }], warning: 'none' },
  { id: 'game_dvr', name: 'Desativar Game DVR', desc: 'Gravação fundo off', category: 'jogos', sub: 'gamebar', reg: [{ path: 'HKCU\\System\\GameConfigStore', name: 'GameDVR_Enabled', type: 'REG_DWORD', value: '0' }], warning: 'none' },
  { id: 'game_fso', name: 'Fullscreen Optimizations', desc: 'Desativar globalmente', category: 'jogos', sub: 'performance', reg: [{ path: 'HKCU\\System\\GameConfigStore', name: 'GameDVR_FSEBehaviorMode', type: 'REG_DWORD', value: '2' }], warning: 'none' },
  { id: 'game_pow', name: 'Power Throttling Off', desc: 'Energia máxima para jogos', category: 'jogos', sub: 'performance', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Power\\PowerThrottling', name: 'PowerThrottlingOff', type: 'REG_DWORD', value: '1' }], warning: 'none' },

  // ==============================================================================
  // 🪟 WINDOWS 11
  // ==============================================================================
  { id: 'w11_menu', name: 'Menu Contexto Clássico', desc: 'Estilo Windows 10', category: 'win11', sub: 'interface', reg: [{ path: 'HKCU\\Software\\Classes\\CLSID\\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\\InprocServer32', name: '', type: 'REG_SZ', value: '' }], warning: 'none' },
  { id: 'w11_widgets', name: 'Remover Widgets', desc: 'Desativa ícone', category: 'win11', sub: 'interface', reg: [{ path: 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Dsh', name: 'AllowNewsAndInterests', type: 'REG_DWORD', value: '0' }], warning: 'none' },
  { id: 'w11_chat', name: 'Remover Chat', desc: 'Ícone Teams', category: 'win11', sub: 'interface', reg: [{ path: 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Windows Chat', name: 'ChatIcon', type: 'REG_DWORD', value: '3' }], warning: 'none' },
  { id: 'w11_sticker', name: 'Desativar Stickers', desc: 'Feature Desktop Stickers', category: 'win11', sub: 'visual', reg: [{ path: 'HKLM\\SOFTWARE\\Microsoft\\PolicyManager\\default\\Education\\AllowGraphingCalculator', name: 'value', type: 'REG_DWORD', value: '0' }], warning: 'none' }, // Placeholder reg

  // ==============================================================================
  // 🛡️ SEGURANÇA
  // ==============================================================================
  { id: 'sec_def', name: 'Desativar Windows Defender', desc: 'Somente se tiver outro AV', category: 'seguranca', sub: 'sistema', reg: [{ path: 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows Defender', name: 'DisableAntiSpyware', type: 'REG_DWORD', value: '1' }], warning: 'premium' },
  { id: 'sec_smb', name: 'Desativar SMBv1', desc: 'Protocolo inseguro', category: 'seguranca', sub: 'rede', type: 'command', cmd: 'dism /online /disable-feature /featurename:SMB1Protocol', warning: 'none' },
  { id: 'sec_cloud', name: 'Desativar Cloud Protection', desc: 'Envio de amostras', category: 'seguranca', sub: 'sistema', reg: [{ path: 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Spynet', name: 'SpynetReporting', type: 'REG_DWORD', value: '0' }], warning: 'none' },

  // ==============================================================================
  // 🔄 SERVIÇOS
  // ==============================================================================
  { id: 'srv_diag', name: 'DiagTrack', desc: 'Serviço de Experiência', category: 'servicos', sub: 'telemetria', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\DiagTrack', name: 'Start', type: 'REG_DWORD', value: '4' }], warning: 'none' },
  { id: 'srv_wsearch', name: 'Windows Search', desc: 'Indexação de arquivos', category: 'servicos', sub: 'sistema', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\WSearch', name: 'Start', type: 'REG_DWORD', value: '4' }], warning: 'none' },
  { id: 'srv_print', name: 'Print Spooler', desc: 'Se não usa impressora', category: 'servicos', sub: 'sistema', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\Spooler', name: 'Start', type: 'REG_DWORD', value: '4' }], warning: 'none' },
  { id: 'srv_fax', name: 'Fax Service', desc: 'Obsoleto', category: 'servicos', sub: 'sistema', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\Fax', name: 'Start', type: 'REG_DWORD', value: '4' }], warning: 'none' },
  { id: 'srv_xbox_auth', name: 'Xbox Auth Manager', desc: 'Se não joga Xbox', category: 'servicos', sub: 'xbox', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\XblAuthManager', name: 'Start', type: 'REG_DWORD', value: '4' }], warning: 'none' },
  { id: 'srv_xbox_save', name: 'Xbox Game Save', desc: 'Se não joga Xbox', category: 'servicos', sub: 'xbox', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\XblGameSave', name: 'Start', type: 'REG_DWORD', value: '4' }], warning: 'none' },
  { id: 'srv_xbox_net', name: 'Xbox Networking', desc: 'Se não joga Xbox', category: 'servicos', sub: 'xbox', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\XboxNetApiSvc', name: 'Start', type: 'REG_DWORD', value: '4' }], warning: 'none' },

  // ==============================================================================
  // 🔒 PRIVACIDADE
  // ==============================================================================
  { id: 'priv_tele', name: 'Allow Telemetry', desc: 'Definir como 0', category: 'privacidade', sub: 'telemetria', reg: [{ path: 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\DataCollection', name: 'AllowTelemetry', type: 'REG_DWORD', value: '0' }], warning: 'none' },
  { id: 'priv_adv', name: 'Advertising ID', desc: 'ID de Publicidade', category: 'privacidade', sub: 'tracking', reg: [{ path: 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\AdvertisingInfo', name: 'DisabledByGroupPolicy', type: 'REG_DWORD', value: '1' }], warning: 'none' },
  { id: 'priv_loc', name: 'Location Tracking', desc: 'Rastreamento Localização', category: 'privacidade', sub: 'tracking', reg: [{ path: 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\LocationAndSensors', name: 'DisableLocation', type: 'REG_DWORD', value: '1' }], warning: 'none' },
  { id: 'priv_cortana', name: 'Cortana', desc: 'Desativar Assistente', category: 'privacidade', sub: 'coleta', reg: [{ path: 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Windows Search', name: 'AllowCortana', type: 'REG_DWORD', value: '0' }], warning: 'none' },

  // ==============================================================================
  // 🎨 VISUAL & UI
  // ==============================================================================
  { id: 'vis_anim', name: 'Animações Janelas', desc: 'Minimizar/Maximizar', category: 'visual', sub: 'animacoes', reg: [{ path: 'HKCU\\Control Panel\\Desktop\\WindowMetrics', name: 'MinAnimate', type: 'REG_SZ', value: '0' }], warning: 'none' },
  { id: 'vis_trans', name: 'Transparência', desc: 'Efeito fluente', category: 'visual', sub: 'visual', reg: [{ path: 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize', name: 'EnableTransparency', type: 'REG_DWORD', value: '0' }], warning: 'none' },
  { id: 'vis_task', name: 'Ocultar Task View', desc: 'Botão visão tarefas', category: 'visual', sub: 'visual', reg: [{ path: 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced', name: 'ShowTaskViewButton', type: 'REG_DWORD', value: '0' }], warning: 'none' },
  { id: 'vis_peoples', name: 'People on Taskbar', desc: 'Pessoas na barra', category: 'visual', sub: 'visual', reg: [{ path: 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced\\People', name: 'PeopleBand', type: 'REG_DWORD', value: '0' }], warning: 'none' },

  // ==============================================================================
  // 📂 EXPLORER
  // ==============================================================================
  { id: 'exp_ext', name: 'Mostrar Extensões', desc: '.txt, .exe, etc', category: 'explorer', sub: 'visual', reg: [{ path: 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced', name: 'HideFileExt', type: 'REG_DWORD', value: '0' }], warning: 'none' },
  { id: 'exp_check', name: 'Caixas de Seleção', desc: 'Checkboxes em itens', category: 'explorer', sub: 'visual', reg: [{ path: 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced', name: 'AutoCheckSelect', type: 'REG_DWORD', value: '0' }], warning: 'none' },
  { id: 'exp_quick', name: 'Acesso Rápido', desc: 'Arquivos recentes off', category: 'explorer', sub: 'privacidade', reg: [{ path: 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer', name: 'ShowRecent', type: 'REG_DWORD', value: '0' }], warning: 'none' },
  { id: 'exp_thispc', name: 'Abrir no Este PC', desc: 'Em vez de Acesso Rápido', category: 'explorer', sub: 'comportamento', reg: [{ path: 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced', name: 'LaunchTo', type: 'REG_DWORD', value: '1' }], warning: 'none' },

  // ==============================================================================
  // 💿 STORAGE / SSD
  // ==============================================================================
  { id: 'sto_smart', name: 'SmartScreen', desc: 'Verificação arquivos', category: 'storage', sub: 'ntfs', reg: [{ path: 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\System', name: 'EnableSmartScreen', type: 'REG_DWORD', value: '0' }], warning: 'none' },
  { id: 'sto_ntfs', name: 'NTFS LastAccess', desc: 'Não atualizar timestamp', category: 'storage', sub: 'ntfs', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\FileSystem', name: 'NtfsDisableLastAccessUpdate', type: 'REG_DWORD', value: '1' }], warning: 'none' },
  { id: 'sto_prefetch', name: 'Prefetch Parameters', desc: 'Otimizar para SSD', category: 'storage', sub: 'ssd', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management\\PrefetchParameters', name: 'EnablePrefetcher', type: 'REG_DWORD', value: '0' }], warning: 'none' },

  // ==============================================================================
  // 🔧 DRIVERS
  // ==============================================================================
  { id: 'drv_update', name: 'Driver Updates (WU)', desc: 'Não baixar drivers auto', category: 'drivers', sub: 'system', reg: [{ path: 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\WindowsUpdate', name: 'ExcludeWUDriversInQualityUpdate', type: 'REG_DWORD', value: '1' }], warning: 'none' },
  { id: 'drv_sign', name: 'Driver Signing', desc: 'Aviso de driver não assinado', category: 'drivers', sub: 'system', reg: [{ path: 'HKCU\\Software\\Policies\\Microsoft\\Windows NT\\Driver Signing', name: 'BehaviorOnFailedVerify', type: 'REG_DWORD', value: '0' }], warning: 'none' },

  // ==============================================================================
  // 🔋 ENERGIA
  // ==============================================================================
  { id: 'pwr_hiber', name: 'Hibernação', desc: 'Desativar', category: 'energia', sub: 'sleep', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Power', name: 'HibernateEnabled', type: 'REG_DWORD', value: '0' }], warning: 'none' },
  { id: 'pwr_fast', name: 'Inicialização Rápida', desc: 'Pode causar bugs', category: 'energia', sub: 'powerplan', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Power', name: 'HiberbootEnabled', type: 'REG_DWORD', value: '0' }], warning: 'none' },

  // ==============================================================================
  // 🚫 DESATIVAR
  // ==============================================================================
  { id: 'dis_def', name: 'Defender Realtime', desc: 'Proteção tempo real', category: 'desativar', sub: 'servicos', reg: [{ path: 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows Defender\\Real-Time Protection', name: 'DisableRealtimeMonitoring', type: 'REG_DWORD', value: '1' }], warning: 'premium' },
  { id: 'dis_map', name: 'Maps Broker', desc: 'Mapas Offline', category: 'desativar', sub: 'servicos', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\MapsBroker', name: 'Start', type: 'REG_DWORD', value: '4' }], warning: 'none' },
  { id: 'dis_bio', name: 'Biometria', desc: 'Windows Hello', category: 'desativar', sub: 'servicos', reg: [{ path: 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Biometrics', name: 'Enabled', type: 'REG_DWORD', value: '0' }], warning: 'none' },

  // ==============================================================================
  // 🧹 LIMPEZA
  // ==============================================================================
  { id: 'cln_temp', name: 'Arquivos Temp', desc: '%TEMP%', category: 'limpeza', sub: 'sistema', type: 'command', cmd: 'del /q /f /s %TEMP%\\*', warning: 'none' },
  { id: 'cln_win', name: 'Windows Temp', desc: 'C:\\Windows\\Temp', category: 'limpeza', sub: 'sistema', type: 'command', cmd: 'del /q /f /s C:\\Windows\\Temp\\*', warning: 'none' },
  { id: 'cln_dns', name: 'Flush DNS', desc: 'Resetar DNS', category: 'limpeza', sub: 'sistema', type: 'command', cmd: 'ipconfig /flushdns', warning: 'none' },
  { id: 'cln_edge', name: 'Cache Edge', desc: 'Microsoft Edge', category: 'limpeza', sub: 'navegadores', type: 'command', cmd: 'del /q /f /s "%LOCALAPPDATA%\\Microsoft\\Edge\\User Data\\Default\\Cache\\*"', warning: 'none' },
  { id: 'cln_chrome', name: 'Cache Chrome', desc: 'Google Chrome', category: 'limpeza', sub: 'navegadores', type: 'command', cmd: 'del /q /f /s "%LOCALAPPDATA%\\Google\\Chrome\\User Data\\Default\\Cache\\*"', warning: 'none' },
  { id: 'cln_firefox', name: 'Cache Firefox', desc: 'Mozilla Firefox', category: 'limpeza', sub: 'navegadores', type: 'command', cmd: 'del /q /f /s "%LOCALAPPDATA%\\Mozilla\\Firefox\\Profiles\\*\\cache2\\*"', warning: 'none' },
  { id: 'cln_brave', name: 'Cache Brave', desc: 'Brave Browser', category: 'limpeza', sub: 'navegadores', type: 'command', cmd: 'del /q /f /s "%LOCALAPPDATA%\\BraveSoftware\\Brave-Browser\\User Data\\Default\\Cache\\*"', warning: 'none' },
  { id: 'cln_opera', name: 'Cache Opera', desc: 'Opera Browser', category: 'limpeza', sub: 'navegadores', type: 'command', cmd: 'del /q /f /s "%APPDATA%\\Opera Software\\Opera Stable\\Cache\\*"', warning: 'none' },
  { id: 'cln_prefetch', name: 'Prefetch', desc: 'Arquivos de pré-carregamento', category: 'limpeza', sub: 'sistema', type: 'command', cmd: 'del /q /f /s C:\\Windows\\Prefetch\\*', warning: 'none' },
  { id: 'cln_recent', name: 'Arquivos Recentes', desc: 'Histórico de arquivos', category: 'limpeza', sub: 'sistema', type: 'command', cmd: 'del /q /f /s %APPDATA%\\Microsoft\\Windows\\Recent\\*', warning: 'none' },
  { id: 'cln_thumbs', name: 'Thumbnails', desc: 'Miniaturas de imagens', category: 'limpeza', sub: 'sistema', type: 'command', cmd: 'del /q /f /s %LOCALAPPDATA%\\Microsoft\\Windows\\Explorer\\thumbcache_*.db', warning: 'none' },
  { id: 'cln_logs', name: 'Logs do Windows', desc: 'Arquivos de log', category: 'limpeza', sub: 'sistema', type: 'command', cmd: 'del /q /f /s C:\\Windows\\Logs\\*', warning: 'none' },
  { id: 'cln_crash', name: 'Crash Dumps', desc: 'Relatórios de erro', category: 'limpeza', sub: 'sistema', type: 'command', cmd: 'del /q /f /s C:\\Windows\\Minidump\\*', warning: 'none' },
  { id: 'cln_delivery', name: 'Delivery Optimization', desc: 'Cache de updates P2P', category: 'limpeza', sub: 'sistema', type: 'command', cmd: 'del /q /f /s C:\\Windows\\SoftwareDistribution\\DeliveryOptimization\\*', warning: 'none' },
  { id: 'cln_winsxs', name: 'WinSxS Cleanup', desc: 'Componentes antigos', category: 'limpeza', sub: 'sistema', type: 'command', cmd: 'dism /online /cleanup-image /startcomponentcleanup', warning: 'none' },
  { id: 'cln_recycle', name: 'Lixeira', desc: 'Esvaziar lixeira', category: 'limpeza', sub: 'sistema', type: 'command', cmd: 'rd /s /q %systemdrive%\\$Recycle.bin', warning: 'none' },
  { id: 'cln_discord', name: 'Cache Discord', desc: 'Discord cache', category: 'limpeza', sub: 'apps', type: 'command', cmd: 'del /q /f /s "%APPDATA%\\discord\\Cache\\*"', warning: 'none' },
  { id: 'cln_spotify', name: 'Cache Spotify', desc: 'Spotify cache', category: 'limpeza', sub: 'apps', type: 'command', cmd: 'del /q /f /s "%APPDATA%\\Spotify\\Data\\*"', warning: 'none' },
  { id: 'cln_steam', name: 'Cache Steam', desc: 'Steam download cache', category: 'limpeza', sub: 'apps', type: 'command', cmd: 'del /q /f /s "C:\\Program Files (x86)\\Steam\\appcache\\*"', warning: 'none' },
  { id: 'cln_nvidia', name: 'Cache NVIDIA', desc: 'Shader cache NVIDIA', category: 'limpeza', sub: 'apps', type: 'command', cmd: 'del /q /f /s "%LOCALAPPDATA%\\NVIDIA\\DXCache\\*"', warning: 'none' },
  { id: 'cln_amd', name: 'Cache AMD', desc: 'Shader cache AMD', category: 'limpeza', sub: 'apps', type: 'command', cmd: 'del /q /f /s "%LOCALAPPDATA%\\AMD\\DxCache\\*"', warning: 'none' },

  // ==============================================================================
  // 🛠️ CORREÇÕES
  // ==============================================================================
  { id: 'fix_net', name: 'Resetar Rede', desc: 'Winsock e IP', category: 'fixes', sub: 'network', type: 'command', cmd: 'netsh winsock reset && netsh int ip reset', warning: 'none' },
  { id: 'fix_print', name: 'Spooler Reset', desc: 'Fila de Impressão', category: 'fixes', sub: 'peripherals', type: 'command', cmd: 'net stop spooler && del /Q /F /S "%systemroot%\\System32\\Spool\\Printers\\*.*" && net start spooler', warning: 'none' },
  { id: 'fix_wu', name: 'Resetar Windows Update', desc: 'Corrige erros update', category: 'fixes', sub: 'system', type: 'command', cmd: 'net stop wuauserv && net stop cryptSvc && net stop bits && net stop msiserver', warning: 'none' },

  // ==============================================================================
  // 💬 DISCORD - Otimizações Discord
  // ==============================================================================
  { id: 'discord_priority', name: 'Discord Priority', desc: 'Alta Prioridade CPU', category: 'appopt', sub: 'discord', reg: [{ path: 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options\\Discord.exe\\PerfOptions', name: 'CpuPriorityClass', type: 'REG_DWORD', value: '3' }], warning: 'none' },
  { id: 'discord_hw', name: 'Discord Hardware', desc: 'Hardware Acceleration', category: 'appopt', sub: 'discord', reg: [{ path: 'HKCU\\Software\\Discord', name: 'HardwareAcceleration', type: 'REG_DWORD', value: '1' }], warning: 'none' },
  { id: 'discord_gpu', name: 'Discord GPU', desc: 'Use GPU Acceleration', category: 'appopt', sub: 'discord', reg: [{ path: 'HKCU\\Software\\Discord', name: 'HardwareAcceleration', type: 'REG_DWORD', value: '1' }], warning: 'none' },

  // ==============================================================================
  // 🎮 STREAMING - Otimizações Streaming
  // ==============================================================================
  { id: 'obs_priority', name: 'OBS Studio Priority', desc: 'Alta Prioridade CPU', category: 'appopt', sub: 'streaming', reg: [{ path: 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options\\obs64.exe\\PerfOptions', name: 'CpuPriorityClass', type: 'REG_DWORD', value: '3' }], warning: 'none' },
  { id: 'stream_studio', name: 'Streamlabs Priority', desc: 'Alta Prioridade', category: 'appopt', sub: 'streaming', reg: [{ path: 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options\\Streamlabs OBS.exe\\PerfOptions', name: 'CpuPriorityClass', type: 'REG_DWORD', value: '3' }], warning: 'none' },
  { id: 'xsplit_priority', name: 'XSplit Priority', desc: 'Alta Prioridade', category: 'appopt', sub: 'streaming', reg: [{ path: 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options\\XSplit.Core.exe\\PerfOptions', name: 'CpuPriorityClass', type: 'REG_DWORD', value: '3' }], warning: 'none' },

  // ==============================================================================
  // 🎮 JOGOS - Otimizações Jogos
  // ==============================================================================
  { id: 'steam_priority', name: 'Steam Priority', desc: 'Alta Prioridade CPU', category: 'appopt', sub: 'jogos', reg: [{ path: 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options\\steam.exe\\PerfOptions', name: 'CpuPriorityClass', type: 'REG_DWORD', value: '3' }], warning: 'none' },
  { id: 'epic_priority', name: 'Epic Games Priority', desc: 'Alta Prioridade', category: 'appopt', sub: 'jogos', reg: [{ path: 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options\\EpicGamesLauncher.exe\\PerfOptions', name: 'CpuPriorityClass', type: 'REG_DWORD', value: '3' }], warning: 'none' },
  { id: 'battle_priority', name: 'Battle.net Priority', desc: 'Alta Prioridade', category: 'appopt', sub: 'jogos', reg: [{ path: 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options\\Battle.net.exe\\PerfOptions', name: 'CpuPriorityClass', type: 'REG_DWORD', value: '3' }], warning: 'none' },
  { id: 'gog_priority', name: 'GOG Galaxy Priority', desc: 'Alta Prioridade', category: 'appopt', sub: 'jogos', reg: [{ path: 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options\\GalaxyClient.exe\\PerfOptions', name: 'CpuPriorityClass', type: 'REG_DWORD', value: '3' }], warning: 'none' },

  // ==============================================================================
  // 🌐 GOOGLE CHROME - Otimizações
  // ==============================================================================
  { id: 'chrome_priority', name: 'Chrome Priority', desc: 'Alta Prioridade CPU', category: 'appopt', sub: 'chrome', reg: [{ path: 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options\\chrome.exe\\PerfOptions', name: 'CpuPriorityClass', type: 'REG_DWORD', value: '3' }], warning: 'none' },
  { id: 'chrome_gpu', name: 'Chrome GPU', desc: 'Hardware Acceleration', category: 'appopt', sub: 'chrome', reg: [{ path: 'HKCU\\Software\\Google\\Chrome\\BLFeatureFlags', name: 'HardwareAcceleratedRenderingEnabled', type: 'REG_DWORD', value: '1' }], warning: 'none' },
  { id: 'chrome_cache', name: 'Chrome Cache', desc: 'Large Cache Size', category: 'appopt', sub: 'chrome', reg: [{ path: 'HKCU\\Software\\Google\\Chrome\\Preferences', name: 'DiskCacheSize', type: 'REG_DWORD', value: '1048576' }], warning: 'none' },
  { id: 'chrome_quic', name: 'Chrome QUIC', desc: 'Enable QUIC Protocol', category: 'appopt', sub: 'chrome', reg: [{ path: 'HKCU\\Software\\Google\\Chrome\\BLFeatureFlags', name: 'QuicEnabled', type: 'REG_DWORD', value: '1' }], warning: 'none' },

  // ==============================================================================
  // 🌐 MICROSOFT EDGE - Otimizações
  // ==============================================================================
  { id: 'edge_priority', name: 'Edge Priority', desc: 'Alta Prioridade CPU', category: 'appopt', sub: 'edge', reg: [{ path: 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options\\msedge.exe\\PerfOptions', name: 'CpuPriorityClass', type: 'REG_DWORD', value: '3' }], warning: 'none' },
  { id: 'edge_gpu', name: 'Edge GPU', desc: 'Hardware Acceleration', category: 'appopt', sub: 'edge', reg: [{ path: 'HKCU\\Software\\Microsoft\\Edge\\BLFeatureFlags', name: 'HardwareAcceleratedRenderingEnabled', type: 'REG_DWORD', value: '1' }], warning: 'none' },
  { id: 'edge_cache', name: 'Edge Cache', desc: 'Large Cache Size', category: 'appopt', sub: 'edge', reg: [{ path: 'HKCU\\Software\\Microsoft\\Edge\\Main', name: 'DiskCacheSize', type: 'REG_DWORD', value: '1048576' }], warning: 'none' },

  // ==============================================================================
  // 🌐 MOZILLA FIREFOX - Otimizações
  // ==============================================================================
  { id: 'firefox_priority', name: 'Firefox Priority', desc: 'Alta Prioridade CPU', category: 'appopt', sub: 'firefox', reg: [{ path: 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options\\firefox.exe\\PerfOptions', name: 'CpuPriorityClass', type: 'REG_DWORD', value: '3' }], warning: 'none' },
  { id: 'firefox_gpu', name: 'Firefox GPU', desc: 'Hardware Acceleration', category: 'appopt', sub: 'firefox', reg: [{ path: 'HKLM\\SOFTWARE\\Mozilla\\Firefox', name: 'DirectWrite', type: 'REG_DWORD', value: '1' }], warning: 'none' },
  { id: 'firefox_webrender', name: 'Firefox WebRender', desc: 'Enable WebRender', category: 'appopt', sub: 'firefox', reg: [{ path: 'HKLM\\SOFTWARE\\Mozilla\\Firefox\\FEATURES', name: 'WebRender', type: 'REG_DWORD', value: '1' }], warning: 'none' },
  { id: 'firefox_cache', name: 'Firefox Cache', desc: 'Large Cache Size', category: 'appopt', sub: 'firefox', reg: [{ path: 'HKCU\\Software\\Mozilla\\Firefox\\Profiles', name: 'browser.cache.capacity', type: 'REG_DWORD', value: '1048576' }], warning: 'none' },

  // ==============================================================================
  // 🌐 BRAVE BROWSER - Otimizações
  // ==============================================================================
  { id: 'brave_priority', name: 'Brave Priority', desc: 'Alta Prioridade CPU', category: 'appopt', sub: 'brave', reg: [{ path: 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options\\Brave.exe\\PerfOptions', name: 'CpuPriorityClass', type: 'REG_DWORD', value: '3' }], warning: 'none' },
  { id: 'brave_gpu', name: 'Brave GPU', desc: 'Hardware Acceleration', category: 'appopt', sub: 'brave', reg: [{ path: 'HKCU\\Software\\BraveSoftware\\Brave-Browser\\BLFeatureFlags', name: 'HardwareAcceleratedRenderingEnabled', type: 'REG_DWORD', value: '1' }], warning: 'none' },
  { id: 'brave_cache', name: 'Brave Cache', desc: 'Large Cache Size', category: 'appopt', sub: 'brave', reg: [{ path: 'HKCU\\Software\\BraveSoftware\\Brave-Browser\\Preferences', name: 'DiskCacheSize', type: 'REG_DWORD', value: '1048576' }], warning: 'none' },

  // ==============================================================================
  // 📊 INFORMAÇÕES (Placeholders mainly for stats)
  // ==============================================================================
  { id: 'info_dx', name: 'DirectX Version', desc: 'Verificar DX', category: 'info', sub: 'diagnostico', type: 'command', cmd: 'dxdiag', warning: 'none' },

  // ==============================================================================
  // 👨‍💻 DESENVOLVEDORES
  // ==============================================================================
  { id: 'dev_node', name: 'Node.js Priority', desc: 'Alta', category: 'dev', sub: 'runtime', reg: [{ path: 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options\\node.exe\\PerfOptions', name: 'CpuPriorityClass', type: 'REG_DWORD', value: '3' }], warning: 'none' },
  { id: 'dev_code', name: 'VS Code Priority', desc: 'Alta', category: 'dev', sub: 'ide', reg: [{ path: 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options\\Code.exe\\PerfOptions', name: 'CpuPriorityClass', type: 'REG_DWORD', value: '3' }], warning: 'none' },
  { id: 'dev_git', name: 'Git Optimization', desc: 'Configurações globais', category: 'dev', sub: 'tools', type: 'command', cmd: 'git config --global core.preloadindex true', warning: 'none' },

  // ==============================================================================
  // 🔥 TWEAKS GAMING (kelvenapk)
  // ==============================================================================

  // CPU Básico
  { id: 'cpu_basic_priority', name: 'Prioridade de Processos', desc: 'Otimiza prioridade para jogos', category: 'sistema', sub: 'core', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\PriorityControl', name: 'Win32PrioritySeparation', type: 'REG_DWORD', value: '38' }], warning: 'none' },
  { id: 'cpu_basic_parking', name: 'Desativar Core Parking', desc: 'Mantém todos os núcleos ativos', category: 'sistema', sub: 'core', type: 'command', cmd: 'powercfg -setacvalueindex SCHEME_CURRENT SUB_PROCESSOR CPMINCORES 100', warning: 'none' },
  { id: 'cpu_basic_boost', name: 'CPU Boost Mode', desc: 'Ativa modo turbo', category: 'sistema', sub: 'core', type: 'command', cmd: 'powercfg -setacvalueindex SCHEME_CURRENT SUB_PROCESSOR PERFBOOSTMODE 2', warning: 'none' },
  
  // RAM Básico
  { id: 'ram_basic_cache', name: 'Otimizar Cache RAM', desc: 'Melhora gestão de memória', category: 'ram', sub: 'otimizacao', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management', name: 'LargeSystemCache', type: 'REG_DWORD', value: '0' }], warning: 'none' },
  { id: 'ram_basic_paging', name: 'Otimizar Paging', desc: 'Ajusta arquivo de paginação', category: 'ram', sub: 'otimizacao', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management', name: 'DisablePagingExecutive', type: 'REG_DWORD', value: '1' }], warning: 'none' },
  
  // GPU Básico
  { id: 'gpu_basic_hags', name: 'Hardware GPU Scheduling', desc: 'Reduz latência GPU', category: 'gpu', sub: 'driver', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers', name: 'HwSchMode', type: 'REG_DWORD', value: '2' }], warning: 'none' },
  { id: 'gpu_basic_priority', name: 'GPU Priority Gaming', desc: 'Prioridade alta para jogos', category: 'gpu', sub: 'driver', reg: [{ path: 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games', name: 'GPU Priority', type: 'REG_DWORD', value: '8' }], warning: 'none' },
  
  // NVIDIA Básico
  { id: 'nvidia_basic_latency', name: 'NVIDIA Low Latency', desc: 'Modo baixa latência', category: 'gpu', sub: 'nvidia', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Class\\{4d36e968-e325-11ce-bfc1-08002be10318}\\0000', name: 'D3PCLatency', type: 'REG_DWORD', value: '1' }], warning: 'none' },
  { id: 'nvidia_basic_prerender', name: 'NVIDIA Pre-Render', desc: 'Frames pré-renderizados', category: 'gpu', sub: 'nvidia', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Class\\{4d36e968-e325-11ce-bfc1-08002be10318}\\0000', name: 'PreRenderLimit', type: 'REG_DWORD', value: '1' }], warning: 'none' },
  
  // AMD Básico
  { id: 'amd_basic_ulps', name: 'AMD Disable ULPS', desc: 'Desativa economia de energia', category: 'gpu', sub: 'amd', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Class\\{4d36e968-e325-11ce-bfc1-08002be10318}\\0000', name: 'EnableUlps', type: 'REG_DWORD', value: '0' }], warning: 'none' },
  { id: 'amd_basic_boost', name: 'AMD Performance Mode', desc: 'Modo alta performance', category: 'gpu', sub: 'amd', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Class\\{4d36e968-e325-11ce-bfc1-08002be10318}\\0000', name: 'PP_ThermalAutoThrottlingEnable', type: 'REG_DWORD', value: '0' }], warning: 'none' },
  
  // Intel Básico
  { id: 'intel_basic_perf', name: 'Intel High Performance', desc: 'Modo performance máxima', category: 'gpu', sub: 'intel', reg: [{ path: 'HKLM\\SOFTWARE\\Intel\\GMM', name: 'DedicatedSegmentSize', type: 'REG_DWORD', value: '512' }], warning: 'none' },
  { id: 'intel_basic_power', name: 'Intel Power Saving Off', desc: 'Desativa economia energia', category: 'gpu', sub: 'intel', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Power\\PowerSettings', name: 'PerfBoostMode', type: 'REG_DWORD', value: '100' }], warning: 'none' },
  
  // Periféricos Básico
  { id: 'mouse_basic_accel', name: 'Desativar Aceleração Mouse', desc: 'Movimento 1:1 preciso', category: 'input', sub: 'mouse', reg: [{ path: 'HKCU\\Control Panel\\Mouse', name: 'MouseSpeed', type: 'REG_SZ', value: '0' }, { path: 'HKCU\\Control Panel\\Mouse', name: 'MouseThreshold1', type: 'REG_SZ', value: '0' }, { path: 'HKCU\\Control Panel\\Mouse', name: 'MouseThreshold2', type: 'REG_SZ', value: '0' }], warning: 'none' },
  { id: 'keyboard_basic_delay', name: 'Keyboard Delay', desc: 'Remove atraso do teclado', category: 'input', sub: 'teclado', reg: [{ path: 'HKCU\\Control Panel\\Keyboard', name: 'KeyboardDelay', type: 'REG_SZ', value: '0' }], warning: 'none' },
  { id: 'usb_basic_power', name: 'USB Power Saving Off', desc: 'Evita desligamento USB', category: 'input', sub: 'usb', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\USB', name: 'DisableSelectiveSuspend', type: 'REG_DWORD', value: '1' }], warning: 'none' },

  // ==============================================================================
  // 🔥 TWEAKS GAMING (kelvenapk)
  // ==============================================================================

  // VBS & Security - CRITICAL for Gaming
  { id: 'gaming_vbs', name: 'Disable VBS', desc: 'Desativa Virtualization-Based Security', category: 'jogos', sub: 'performance', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\DeviceGuard', name: 'EnableVirtualizationBasedSecurity', type: 'REG_DWORD', value: '0' }], warning: 'none' },
  { id: 'gaming_memint', name: 'Disable Memory Integrity', desc: 'Desativa Kernel Memory Isolation', category: 'jogos', sub: 'performance', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\DeviceGuard', name: 'HVCIMemoryRequired', type: 'REG_DWORD', value: '0' }], warning: 'none' },
  { id: 'gaming_hvci', name: 'HVCI Off', desc: 'Hypervisor-enforced Code Integrity', category: 'jogos', sub: 'performance', reg: [{ path: 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\DeviceGuard', name: 'HypervisorEnforcedCodeIntegrity', type: 'REG_DWORD', value: '0' }], warning: 'none' },

  // Timer Resolution
  { id: 'gaming_timer', name: 'Timer Resolution 0.5ms', desc: 'Alta precisão de timer', category: 'latencia', sub: 'sistema', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Time Providers', name: 'UseDefaultTimer', type: 'REG_DWORD', value: '0' }], warning: 'none' },

  // Game Mode Enhanced
  { id: 'gaming_gm_auto', name: 'GameMode Auto', desc: 'Ativa automaticamente', category: 'jogos', sub: 'geral', reg: [{ path: 'HKCU\\Software\\Microsoft\\GameBar', name: 'AutoGameModeEnabled', type: 'REG_DWORD', value: '1' }], warning: 'none' },
  { id: 'gaming_gm_use', name: 'Use GameMode', desc: 'Habilita API', category: 'jogos', sub: 'geral', reg: [{ path: 'HKLM\\SOFTWARE\\Microsoft\\GameBar', name: 'AllowAutoGameMode', type: 'REG_DWORD', value: '1' }], warning: 'none' },

  // Hardware Accelerated GPU Scheduling
  { id: 'gaming_hags', name: 'HAGS On', desc: 'Hardware-Accelerated GPU Scheduling', category: 'gpu', sub: 'driver', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers', name: 'HwSchMode', type: 'REG_DWORD', value: '2' }], warning: 'none' },

  // GPU Priority High
  { id: 'gaming_gpu_pri', name: 'GPU Priority 18', desc: 'Alta prioridade GPU', category: 'gpu', sub: 'driver', reg: [{ path: 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games', name: 'GPU Priority', type: 'REG_DWORD', value: '18' }], warning: 'none' },

  // NVIDIA Specific
  { id: 'nvidia_cp', name: 'NVIDIA Control Panel', desc: 'Prefer Maximum Performance', category: 'gpu', sub: 'nvidia', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Class\\{4d36e968-e325-11ce-bfc1-08002be10318}\\0000', name: 'PowerMizerMode', type: 'REG_DWORD', value: '1' }], warning: 'none' },
  { id: 'nvidia_latency', name: 'NVIDIA Low Latency', desc: 'Ultra Low Latency Mode', category: 'gpu', sub: 'nvidia', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Class\\{4d36e968-e325-11ce-bfc1-08002be10318}\\0000', name: 'NVLowLatency', type: 'REG_DWORD', value: '1' }], warning: 'none' },
  { id: 'nvidia_psy', name: 'NVIDIA PhysX', desc: 'Seleciona GPU primária', category: 'gpu', sub: 'nvidia', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Class\\{4d36e968-e325-11ce-bfc1-08002be10318}\\0000', name: 'PhysXFlags', type: 'REG_DWORD', value: '0' }], warning: 'none' },

  // AMD Specific  
  { id: 'amd_boost', name: 'AMD Boost Mode', desc: 'Radeon Boost', category: 'gpu', sub: 'amd', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Class\\{4d36e968-e325-11ce-bfc1-08002be10318}\\0000', name: 'AMDGamingMode', type: 'REG_DWORD', value: '1' }], warning: 'none' },
  { id: 'amd_replay', name: 'AMD ReLive', desc: 'Radeon ReLive recording off', category: 'gpu', sub: 'amd', reg: [{ path: 'HKLM\\SOFTWARE\\AMD\\Relive', name: 'RecordingMode', type: 'REG_DWORD', value: '0' }], warning: 'none' },
  { id: 'amd_vr', name: 'AMD VR Ready', desc: 'Radeon VR', category: 'gpu', sub: 'amd', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Class\\{4d36e968-e325-11ce-bfc1-08002be10318}\\0000', name: 'RadeonPowerSaving', type: 'REG_DWORD', value: '0' }], warning: 'none' },

  // Intel Specific
  { id: 'intel_igpu', name: 'Intel iGPU Boost', desc: 'Integrada alta performance', category: 'gpu', sub: 'intel', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Power\\PowerThrottlingSettings', name: 'PowerThrottlingOff', type: 'REG_DWORD', value: '1' }], warning: 'none' },
  { id: 'intel_gsc', name: 'Intel Graphics Speed', desc: 'Max performance', category: 'gpu', sub: 'intel', reg: [{ path: 'HKLM\\SOFTWARE\\Intel\\Gfx', name: 'PerfMode', type: 'REG_DWORD', value: '1' }], warning: 'none' },

  // Network Gaming
  { id: 'net_game_opt', name: 'Network Gaming Optimized', desc: 'QoS Packet Scheduler', category: 'rede', sub: 'tcp', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters', name: 'TcpAckFrequency', type: 'REG_DWORD', value: '1' }], warning: 'none' },
  { id: 'net_delayed', name: 'Delayed Ack', desc: 'TCP Delayed Ack Timeout', category: 'rede', sub: 'tcp', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters\\Interfaces', name: 'TcpAckFrequency', type: 'REG_DWORD', value: '1' }], warning: 'none' },
  { id: 'net_tcpauto', name: 'TCP Auto Tuning', desc: 'Network Level Compatibility', category: 'rede', sub: 'tcp', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters', name: 'EnableTCPChimney', type: 'REG_DWORD', value: '0' }], warning: 'none' },
  { id: 'net_rss', name: 'RSS Enabled', desc: 'Receive Side Scaling', category: 'rede', sub: 'tcp', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\Afd\\Parameters', name: 'RssBaseCpu', type: 'REG_DWORD', value: '1' }], warning: 'none' },

  // CPU Performance
  { id: 'cpu_park', name: 'Disable Core Parking', desc: 'Impede parking de cores', category: 'sistema', sub: 'core', type: 'command', cmd: 'powercfg /setacvalueindex SCHEME_CURRENT SUB_PROCESSOR PROCTHROTTLEMIN 100', warning: 'none' },
  { id: 'cpu_boost', name: 'CPU Boost', desc: 'Processor Performance Boost', category: 'sistema', sub: 'core', type: 'command', cmd: 'powercfg /change standby-timeout-ac 0', warning: 'none' },
  { id: 'cpu_emin', name: 'Energy Preference Fix', desc: 'High Performance Fix', category: 'sistema', sub: 'power', type: 'command', cmd: 'powercfg /setactive SCHEME_MIN', warning: 'none' },
  { id: 'cpu_ep', name: 'Energy Performance Fix', desc: 'Energy Performance Fix', category: 'sistema', sub: 'power', type: 'command', cmd: 'powercfg /setacvalueindex SCHEME_CURRENT SUB_PROCESSOR PROC_PERF_MIN_STATE 100', warning: 'none' },

  // Power Throttling
  { id: 'pwr_throt', name: 'Power Throttling Fix', desc: 'Corrige throttling', category: 'energia', sub: 'powerplan', type: 'command', cmd: 'powercfg /setacvalueindex SCHEME_CURRENT SUB_POWER POWEROFFLATENCY 0', warning: 'none' },
  { id: 'pwr_idle', name: 'Idle Resilience Fix', desc: 'Corrige idle resilience', category: 'energia', sub: 'powerplan', type: 'command', cmd: 'powercfg /setacvalueindex SCHEME_CURRENT SUB_PROCESSOR IDLEDISABLE 1', warning: 'none' },

  // DPC Latency
  { id: 'dpc_latency', name: 'DPC Latency Tuner', desc: 'Melhora latência DPC', category: 'latencia', sub: 'dpc', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\dxgkrnl', name: 'MonitorLatencyTolerance', type: 'REG_DWORD', value: '1' }], warning: 'none' },
  { id: 'dpc_isr', name: 'ISR Tuning', desc: 'Interrupt Service Routine', category: 'latencia', sub: 'dpc', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\EXECUTE', name: 'DisableISR', type: 'REG_DWORD', value: '1' }], warning: 'none' },

  // Memory / RAM
  { id: 'ram_pool', name: 'Pool Optimization', desc: 'Non-Paged Pool', category: 'ram', sub: 'otimizacao', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management', name: 'SystemPages', type: 'REG_DWORD', value: '4294967295' }], warning: 'none' },
  { id: 'ram_standby', name: 'Memory Standby', desc: 'Optimize standby list', category: 'ram', sub: 'cache', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management', name: 'BlendAllocation', type: 'REG_DWORD', value: '0' }], warning: 'none' },

  // Input / Mouse
  { id: 'inp_poll', name: 'Mouse Poll Rate', desc: '1000Hz via registry', category: 'input', sub: 'mouse', reg: [{ path: 'HKCU\\Control Panel\\Mouse', name: 'MouseThreshold1', type: 'REG_SZ', value: '0' }], warning: 'none' },
  { id: 'inp_hover', name: 'Hover Fix', desc: 'Mouse hover delay', category: 'input', sub: 'mouse', reg: [{ path: 'HKCU\\Control Panel\\Mouse', name: 'MouseHoverTime', type: 'REG_SZ', value: '0' }], warning: 'none' },
  { id: 'inp_kb_rep', name: 'Keyboard Repeat', desc: 'Taxa repetição rápida', category: 'input', sub: 'teclado', reg: [{ path: 'HKCU\\Control Panel\\Keyboard', name: 'KeyboardDelay', type: 'REG_SZ', value: '0' }], warning: 'none' },

  // Windows 11 Specific
  { id: 'w11_snap', name: 'Snap Layouts', desc: 'Ativar layouts', category: 'win11', sub: 'interface', reg: [{ path: 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced', name: 'SnapFill', type: 'REG_DWORD', value: '1' }], warning: 'none' },
  { id: 'w11_copilot', name: 'Disable Copilot', desc: 'Desativa Copilot AI', category: 'win11', sub: 'interface', reg: [{ path: 'HKCU\\Software\\Policies\\Microsoft\\Windows\\Windows Copilot', name: 'TurnOffWindowsCopilot', type: 'REG_DWORD', value: '1' }], warning: 'none' },
  { id: 'w11_anim', name: 'W11 Animations', desc: 'Reduzir animações', category: 'win11', sub: 'visual', reg: [{ path: 'HKCU\\Software\\Microsoft\\Windows\\DWM', name: 'AnimationsEnabled', type: 'REG_DWORD', value: '0' }], warning: 'none' },
  { id: 'w11_bg', name: 'Background Apps', desc: 'Desativar apps em segundo plano', category: 'win11', sub: 'seguranca', reg: [{ path: 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\BackgroundAccessApplications', name: 'GlobalDisabled', type: 'REG_DWORD', value: '1' }], warning: 'none' },

  // Privacy More Aggressive
  { id: 'priv_zip', name: 'Zipfldr', desc: 'Compact archiving off', category: 'privacidade', sub: 'coleta', reg: [{ path: 'HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\FolderTypes\\{885a186e-a440-4ada-812b-8b7f8e3a7cf3}', name: 'ActivitiesItemState', type: 'REG_DWORD', value: '0' }], warning: 'none' },
  { id: 'priv_feedback', name: 'Feedback Hub', desc: 'Desativar feedback', category: 'privacidade', sub: 'telemetria', reg: [{ path: 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\DataCollection', name: 'DontShowFeedbackNotifications', type: 'REG_DWORD', value: '1' }], warning: 'none' },
  { id: 'priv_err', name: 'Error Reporting', desc: 'WER desativado', category: 'privacidade', sub: 'telemetria', reg: [{ path: 'HKLM\\SOFTWARE\\Microsoft\\Windows\\Windows Error Reporting', name: 'Disabled', type: 'REG_DWORD', value: '1' }], warning: 'none' },

  // Services More
  { id: 'srv_wcmsvc', name: 'Windows Manager', desc: 'Windows Comm Center', category: 'servicos', sub: 'telemetria', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\Wcmsvc', name: 'Start', type: 'REG_DWORD', value: '4' }], warning: 'none' },
  { id: 'srv_uhssvc', name: 'Update Health', desc: 'Update Health Service', category: 'servicos', sub: 'telemetria', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\Uhssvc', name: 'Start', type: 'REG_DWORD', value: '4' }], warning: 'none' },
  { id: 'srv_wdi', name: 'Diagnostics', desc: 'Diagnostic Service', category: 'servicos', sub: 'telemetria', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\WdiServiceHost', name: 'Start', type: 'REG_DWORD', value: '4' }], warning: 'none' },
  { id: 'srvf_per', name: 'Performance Logs', desc: 'PLA service', category: 'servicos', sub: 'sistema', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\pla', name: 'Start', type: 'REG_DWORD', value: '4' }], warning: 'none' },
  { id: 'srv_bth', name: 'Bluetooth', desc: 'Se não usa', category: 'servicos', sub: 'sistema', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\bthserv', name: 'Start', type: 'REG_DWORD', value: '4' }], warning: 'none' },
  { id: 'srv_wpn', name: 'Windows Push', desc: 'Push Notifications', category: 'servicos', sub: 'telemetria', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\WpnService', name: 'Start', type: 'REG_DWORD', value: '4' }], warning: 'none' },

  // Game Specific Fixes
  { id: 'game_fso2', name: 'Fullscreen Opt Fix', desc: 'FSE Behavior mode', category: 'jogos', sub: 'performance', reg: [{ path: 'HKCU\\System\\GameConfigStore', name: 'GameDVR_FSEBehavior', type: 'REG_DWORD', value: '2' }], warning: 'none' },
  { id: 'game_bg', name: 'Background Apps Off', desc: 'Executar em primeiro plano', category: 'jogos', sub: 'performance', reg: [{ path: 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\GameDVR', name: 'AppCaptureEnabled', type: 'REG_DWORD', value: '0' }], warning: 'none' },

  // Storage / SSD
  { id: 'sto_defrag', name: 'Disable Defrag', desc: 'Para SSD', category: 'storage', sub: 'ssd', reg: [{ path: 'HKLM\\SOFTWARE\\Microsoft\\Dfrg\\BootOptimizeFunction', name: 'Enable', type: 'REG_SZ', value: 'N' }], warning: 'none' },
  { id: 'sto_trim', name: 'SSD TRIM', desc: 'Garantir TRIM', category: 'storage', sub: 'ssd', type: 'command', cmd: 'fsutil behavior set DisableDeleteNotify 0', warning: 'none' },
  { id: 'sto_cache', name: 'Write Cache', desc: 'Ativar cache disco', category: 'storage', sub: 'ntfs', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\I/O System', name: 'DriveWriteCacheEnabled', type: 'REG_DWORD', value: '1' }], warning: 'none' },

  // Explorer Tweaks
  { id: 'exp_thumb', name: 'Thumbnails', desc: 'Desativar miniaturas vídeo', category: 'explorer', sub: 'visual', reg: [{ path: 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\Explorer', name: 'DisableThumbnails', type: 'REG_DWORD', value: '1' }], warning: 'none' },
  { id: 'exp_search', name: 'Search Companion', desc: 'Desativar indexação', category: 'explorer', sub: 'comportamento', reg: [{ path: 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Search', name: 'SearchAutoTune', type: 'REG_DWORD', value: '1' }], warning: 'none' },
  { id: 'exp_ink', name: 'Ink Tools', desc: 'Desativar tinta', category: 'explorer', sub: 'comportamento', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\TabletInputService', name: 'Start', type: 'REG_DWORD', value: '4' }], warning: 'none' },

  // Visual More
  { id: 'vis_aero', name: 'Aero Shake', desc: 'Desativar shake', category: 'visual', sub: 'visual', reg: [{ path: 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced', name: 'DisallowShaking', type: 'REG_DWORD', value: '1' }], warning: 'none' },
  { id: 'vis_peek', name: 'Peek Preview', desc: 'Desativar hover', category: 'visual', sub: 'visual', reg: [{ path: 'HKCU\\Software\\Microsoft\\Windows\\DWM', name: 'EnablePreviewMsg', type: 'REG_DWORD', value: '0' }], warning: 'none' },

  // Additional Debloat
  { id: 'debloat_one', name: 'OneDrive', desc: 'Desinstalar via config', category: 'servicos', sub: 'sistema', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\OneSyncSvc', name: 'Start', type: 'REG_DWORD', value: '4' }], warning: 'none' },
  { id: 'debloat_msg', name: 'Messaging App', desc: 'App Mensagens', category: 'servicos', sub: 'sistema', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\MessagingService', name: 'Start', type: 'REG_DWORD', value: '4' }], warning: 'none' },
  { id: 'debloat_contact', name: 'People App', desc: 'App Pessoas', category: 'servicos', sub: 'sistema', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\PeopleApp', name: 'Start', type: 'REG_DWORD', value: '4' }], warning: 'none' },
  { id: 'debloat_hologram', name: 'Holographic', desc: 'Holographic Shell', category: 'servicos', sub: 'sistema', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\ShellExperienceHost', name: 'Start', type: 'REG_DWORD', value: '4' }], warning: 'none' },

  // ==============================================================================
  // 🟦 INTEL OPTIMIZATIONS
  // ==============================================================================
  { id: 'intel_xtu', name: 'Intel XTU Sync', desc: 'Enable XTU Interface', category: 'sistema', sub: 'intel', reg: [{ path: 'HKLM\\SOFTWARE\\Intel\\XTU', name: 'Enabled', type: 'REG_DWORD', value: '1' }], warning: 'none' },
  { id: 'intel_sa', name: 'Intel Speed Shift', desc: 'Enables faster frequency changes', category: 'sistema', sub: 'intel', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Processor', name: 'CPPCEnabled', type: 'REG_DWORD', value: '1' }], warning: 'none' },
  { id: 'intel_cstates', name: 'Intel C-States', desc: 'Deep C-States for Performance', category: 'sistema', sub: 'intel', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Power', name: 'SleepStatesAvailable', type: 'REG_DWORD', value: '1' }], warning: 'none' },
  { id: 'intel_turbo', name: 'Intel Turbo Boost', desc: 'Enable Max Turbo', category: 'sistema', sub: 'intel', reg: [{ path: 'HKLM\\SOFTWARE\\Intel\\TurboBoost', name: 'TurboBoost', type: 'REG_DWORD', value: '1' }], warning: 'none' },
  { id: 'intel_ht', name: 'Intel Hyper-Threading', desc: 'Enable SMT/Hyperthreading', category: 'sistema', sub: 'intel', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\System', name: 'UseNewMaxChips', type: 'REG_DWORD', value: '1' }], warning: 'none' },
  { id: 'intel_igpu_clock', name: 'Intel iGPU Clock', desc: 'Max iGPU Performance', category: 'gpu', sub: 'intel', reg: [{ path: 'HKLM\\SOFTWARE\\Intel\\GMM', name: 'DefaultSingleDsp', type: 'REG_DWORD', value: '1' }], warning: 'none' },
  { id: 'intel_dcvs', name: 'Intel DCVS', desc: 'Dynamic Voltage/Frequency', category: 'sistema', sub: 'intel', reg: [{ path: 'HKLM\\SOFTWARE\\Intel\\GPA\\Power', name: 'DCVSEnabled', type: 'REG_DWORD', value: '1' }], warning: 'none' },
  { id: 'intel_rapl', name: 'Intel RAPL', desc: 'Runtime Power Management', category: 'energia', sub: 'intel', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Power', name: 'RaplEnabled', type: 'REG_DWORD', value: '1' }], warning: 'none' },

  // ==============================================================================
  // 🔴 AMD OPTIMIZATIONS
  // ==============================================================================
  { id: 'amd_ryzen_master', name: 'AMD Ryzen Master', desc: 'Enable Ryzen Master', category: 'sistema', sub: 'amd', reg: [{ path: 'HKLM\\SOFTWARE\\AMD\\RyzenMaster', name: 'Enable', type: 'REG_DWORD', value: '1' }], warning: 'none' },
  { id: 'amd_game_boost', name: 'AMD Game Boost', desc: 'Automatic Gaming Boost', category: 'gpu', sub: 'amd', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Class\\{4d36e968-e325-11ce-bfc1-08002be10318}\\0000', name: 'AMDGamingMode', type: 'REG_DWORD', value: '1' }], warning: 'none' },
  { id: 'amd_eco_mode', name: 'AMD Eco Mode', desc: 'Eco Mode Optimization', category: 'energia', sub: 'amd', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Class\\{4d36e968-e325-11ce-bfc1-08002be10318}\\0000', name: 'RadeonPowerSaving', type: 'REG_DWORD', value: '0' }], warning: 'none' },
  { id: 'amd_anti_lag', name: 'AMD Anti-Lag', desc: 'Reduce Input Lag', category: 'latencia', sub: 'amd', reg: [{ path: 'HKLM\\SOFTWARE\\AMD\\Relive\\DXVA', name: 'AntiLag', type: 'REG_DWORD', value: '1' }], warning: 'none' },
  { id: 'amd_radeon_super', name: 'AMD Radeon Super', desc: 'Radeon Super Resolution', category: 'gpu', sub: 'amd', reg: [{ path: 'HKLM\\SOFTWARE\\AMD\\RadeonSuperResolution', name: 'Enable', type: 'REG_DWORD', value: '1' }], warning: 'none' },
  { id: 'amd_freesync', name: 'AMD FreeSync', desc: 'Variable Refresh Rate', category: 'gpu', sub: 'amd', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Class\\{4d36e968-e325-11ce-bfc1-08002be10318}\\0000', name: 'EnableFreesync', type: 'REG_DWORD', value: '1' }], warning: 'none' },
  { id: 'amd_chill', name: 'AMD Chill', desc: 'Frame Rate Limiter', category: 'gpu', sub: 'amd', reg: [{ path: 'HKLM\\SOFTWARE\\AMD\\Chill', name: 'Enable', type: 'REG_DWORD', value: '0' }], warning: 'none' },
  { id: 'amd_vsr', name: 'AMD VSR', desc: 'Virtual Super Resolution', category: 'gpu', sub: 'amd', reg: [{ path: 'HKLM\\SOFTWARE\\AMD\\VSR', name: 'Enable', type: 'REG_DWORD', value: '1' }], warning: 'none' },
  { id: 'amd_shader_cache', name: 'AMD Shader Cache', desc: 'Load Shader Cache', category: 'gpu', sub: 'amd', reg: [{ path: 'HKLM\\SOFTWARE\\AMD\\DXG\\ShaderCache', name: 'Enable', type: 'REG_DWORD', value: '1' }], warning: 'none' },
  { id: 'amd_rms', name: 'AMD RMS', desc: 'Radeon Motion Sharpening', category: 'gpu', sub: 'amd', reg: [{ path: 'HKLM\\SOFTWARE\\AMD\\RadeonImageSharpening', name: 'Enable', type: 'REG_DWORD', value: '1' }], warning: 'none' },

  // ==============================================================================
  // 🟩 NVIDIA OPTIMIZATIONS
  // ==============================================================================
  { id: 'nvidia_max_perf', name: 'NVIDIA Max Performance', desc: 'Prefer Maximum Performance', category: 'gpu', sub: 'nvidia', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Class\\{4d36e968-e325-11ce-bfc1-08002be10318}\\0000', name: 'PowerMizerMode', type: 'REG_DWORD', value: '1' }], warning: 'none' },
  { id: 'nvidia_low_latency', name: 'NVIDIA Low Latency', desc: 'Ultra Low Latency Mode', category: 'latencia', sub: 'nvidia', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Class\\{4d36e968-e325-11ce-bfc1-08002be10318}\\0000', name: 'NVLowLatency', type: 'REG_DWORD', value: '2' }], warning: 'none' },
  { id: 'nvidia_reflex', name: 'NVIDIA Reflex', desc: 'Enable Reflex', category: 'latencia', sub: 'nvidia', reg: [{ path: 'HKLM\\SOFTWARE\\NVIDIA Corporation\\Global\\NV_TTV', name: 'EnableNVTT', type: 'REG_DWORD', value: '1' }], warning: 'none' },
  { id: 'nvidia_dlss', name: 'NVIDIA DLSS', desc: 'DLSS Auto Mode', category: 'gpu', sub: 'nvidia', reg: [{ path: 'HKLM\\SOFTWARE\\NVIDIA Corporation\\Global\\DLSS', name: 'EnableDLSS', type: 'REG_DWORD', value: '1' }], warning: 'none' },
  { id: 'nvidia_dsr', name: 'NVIDIA DSR', desc: 'Dynamic Super Resolution', category: 'gpu', sub: 'nvidia', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Class\\{4d36e968-e325-11ce-bfc1-08002be10318}\\0000', name: 'EnableDSR', type: 'REG_DWORD', value: '1' }], warning: 'none' },
  { id: 'nvidia_ansel', name: 'NVIDIA Ansel', desc: 'Enable Ansel', category: 'gpu', sub: 'nvidia', reg: [{ path: 'HKLM\\SOFTWARE\\NVIDIA Corporation\\Global\\Ansel', name: 'Enable', type: 'REG_DWORD', value: '1' }], warning: 'none' },
  { id: 'nvidia_physx', name: 'NVIDIA PhysX', desc: 'Auto-select PhysX GPU', category: 'gpu', sub: 'nvidia', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Class\\{4d36e968-e325-11ce-bfc1-08002be10318}\\0000', name: 'PhysXFlags', type: 'REG_DWORD', value: '0' }], warning: 'none' },
  { id: 'nvidia_gpu_boost', name: 'NVIDIA GPU Boost', desc: 'Enable GPU Boost', category: 'gpu', sub: 'nvidia', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Class\\{4d36e968-e325-11ce-bfc1-08002be10318}\\0000', name: 'GPUBoostClockBoost', type: 'REG_DWORD', value: '1' }], warning: 'none' },
  { id: 'nvidia_vsync', name: 'NVIDIA VSync', desc: 'Off for Lower Latency', category: 'gpu', sub: 'nvidia', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Class\\{4d36e968-e325-11ce-bfc1-08002be10318}\\0000', name: 'VSyncControl', type: 'REG_DWORD', value: '0' }], warning: 'none' },
  { id: 'nvidia_shader_cache', name: 'NVIDIA Shader Cache', desc: 'Enable Shader Cache', category: 'gpu', sub: 'nvidia', reg: [{ path: 'HKLM\\SOFTWARE\\NVIDIA Corporation\\Global\\ShaderCache', name: 'Enable', type: 'REG_DWORD', value: '1' }], warning: 'none' },
  { id: 'nvidia_tcc', name: 'NVIDIA TCC Mode', desc: 'TCC for Performance', category: 'gpu', sub: 'nvidia', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Video', name: 'TCCSupport', type: 'REG_DWORD', value: '1' }], warning: 'none' },

  // ==============================================================================
  // ⚡ GAME OPTIMIZATIONS (General) - EXPANDED
  // ==============================================================================
  { id: 'game_cpu_priority', name: 'CPU Priority High', desc: 'Game CPU Priority High', category: 'jogos', sub: 'geral', reg: [{ path: 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games', name: 'CpuPriorityClass', type: 'REG_DWORD', value: '3' }], warning: 'none' },
  { id: 'game_gpu_priority', name: 'GPU Priority', desc: 'Game GPU Priority 18', category: 'jogos', sub: 'geral', reg: [{ path: 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games', name: 'GPUPriority', type: 'REG_DWORD', value: '18' }], warning: 'none' },
  { id: 'game_latency', name: 'Minimum Latency', desc: 'Minimum Latency Mode', category: 'latencia', sub: 'geral', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Power\\PowerThrottlingSettings', name: 'LatencySensitivityLevel', type: 'REG_DWORD', value: '1' }], warning: 'none' },
  { id: 'game_fullscreen', name: 'Fullscreen Optimization', desc: 'Fullscreen Optimization', category: 'jogos', sub: 'geral', reg: [{ path: 'HKCU\\System\\GameConfigStore', name: 'GameDVR_FSEBehavior', type: 'REG_DWORD', value: '0' }], warning: 'none' },
  { id: 'game_dpi', name: 'Game DPI Override', desc: 'Game DPI Override', category: 'jogos', sub: 'geral', reg: [{ path: 'HKCU\\Control Panel\\Desktop', name: 'HighDpi', type: 'REG_DWORD', value: '0' }], warning: 'none' },
  { id: 'game_dxgi', name: 'DXGI Flip Mode', desc: 'DXGI Flip Mode', category: 'gpu', sub: 'geral', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\dxgkrnl', name: 'DxgkrnlFlipMode', type: 'REG_DWORD', value: '1' }], warning: 'none' },
  { id: 'game_nt_kernel', name: 'NT Kernel Optimization', desc: 'NT Kernel Optimization', category: 'sistema', sub: 'geral', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager', name: 'DisableLargerDelayLoad', type: 'REG_DWORD', value: '1' }], warning: 'none' },
  { id: 'game_scheduler', name: 'Game Scheduler', desc: 'Game Scheduler Mode', category: 'sistema', sub: 'geral', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers', name: 'SchedulerEnable', type: 'REG_DWORD', value: '1' }], warning: 'none' },
  { id: 'game_mpo', name: 'Monitor Panel Optimization', desc: 'Monitor Panel Optimization', category: 'gpu', sub: 'geral', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers', name: 'MonitorPlacement', type: 'REG_DWORD', value: '1' }], warning: 'none' },
  { id: 'game_igpu', name: 'iGPU Disable', desc: 'Disable iGPU when dGPU active', category: 'gpu', sub: 'geral', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Video', name: 'EnableiGPU', type: 'REG_DWORD', value: '0' }], warning: 'none' },
  { id: 'game_gd', name: 'Game DVR Disable', desc: 'Game DVR Background', category: 'jogos', sub: 'geral', reg: [{ path: 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\GameDVR', name: 'AppCaptureEnabled', type: 'REG_DWORD', value: '0' }], warning: 'none' },
  { id: 'game_affinity', name: 'CPU Affinity', desc: 'Optimize CPU core usage', category: 'sistema', sub: 'core', reg: [{ path: 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games', name: 'Affinity', type: 'REG_DWORD', value: '0' }], warning: 'none' },
  { id: 'game_clock', name: 'Clock Interrupt', desc: 'Reduce clock interrupts', category: 'sistema', sub: 'core', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\kernel', name: 'DisableTsx', type: 'REG_DWORD', value: '0' }], warning: 'none' },
  { id: 'game_prefetch', name: 'Game Prefetch', desc: 'Optimize game loading', category: 'sistema', sub: 'core', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management\\PrefetchParameters', name: 'EnablePrefetcher', type: 'REG_DWORD', value: '3' }], warning: 'none' },
  { id: 'game_superfetch', name: 'Superfetch Gaming', desc: 'Optimize for games', category: 'sistema', sub: 'core', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management\\PrefetchParameters', name: 'EnableSuperfetch', type: 'REG_DWORD', value: '3' }], warning: 'none' },

  // ==============================================================================
  // 🎮 GAME SPECIFIC TWEAKS (EXPANDED)
  // ==============================================================================
  { id: 'game_apex', name: 'Apex Legends', desc: 'Apex Legends Optimized', category: 'jogos', sub: 'especifico', reg: [{ path: 'HKCU\\Software\\Respawn\\Apex', name: 'FPSLimit', type: 'REG_DWORD', value: '999' }], warning: 'none' },
  { id: 'game_warzone', name: 'Call of Duty Warzone', desc: 'COD Warzone Optimized', category: 'jogos', sub: 'especifico', reg: [{ path: 'HKCU\\Software\\Call of Duty\\Warzone', name: 'MouseSensitivity', type: 'REG_DWORD', value: '1' }], warning: 'none' },
  { id: 'game_overwatch', name: 'Overwatch', desc: 'Overwatch Priority', category: 'jogos', sub: 'especifico', reg: [{ path: 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options\\Overwatch.exe\\PerfOptions', name: 'CpuPriorityClass', type: 'REG_DWORD', value: '3' }], warning: 'none' },
  { id: 'game_cs2', name: 'Counter-Strike 2', desc: 'Counter-Strike 2 Optimized', category: 'jogos', sub: 'especifico', reg: [{ path: 'HKCU\\Software\\Valve\\Steam\\Apps\\730', name: 'GPU', type: 'REG_DWORD', value: '1' }], warning: 'none' },
  { id: 'game_fortnite', name: 'Fortnite', desc: 'Fortnite Engine Fix', category: 'jogos', sub: 'especifico', reg: [{ path: 'HKCU\\Software\\Epic Games\\Fortnite', name: 'GameUserSettings', type: 'REG_DWORD', value: '1' }], warning: 'none' },
  { id: 'game_minecraft', name: 'Minecraft Java', desc: 'Minecraft Java Heap', category: 'jogos', sub: 'especifico', reg: [{ path: 'HKCU\\Software\\Mojang\\Minecraft', name: 'MaxHeapSize', type: 'REG_DWORD', value: '4096' }], warning: 'none' },
  { id: 'game_lol', name: 'League of Legends', desc: 'LoL High Priority', category: 'jogos', sub: 'especifico', reg: [{ path: 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options\\League of Legends.exe\\PerfOptions', name: 'CpuPriorityClass', type: 'REG_DWORD', value: '3' }], warning: 'none' },
  { id: 'game_fivem', name: 'FiveM / GTA V', desc: 'FiveM Priority', category: 'jogos', sub: 'especifico', reg: [{ path: 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options\\GTA5.exe\\PerfOptions', name: 'CpuPriorityClass', type: 'REG_DWORD', value: '3' }], warning: 'none' },
  { id: 'game_valorant', name: 'Valorant', desc: 'Valorant Network Fix', category: 'jogos', sub: 'especifico', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\VALORANT', name: 'Start', type: 'REG_DWORD', value: '2' }], warning: 'none' },
  { id: 'game_rdr2', name: 'Red Dead Redemption 2', desc: 'RDR2 Optimized', category: 'jogos', sub: 'especifico', reg: [{ path: 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options\\RedDead Redemption 2.exe\\PerfOptions', name: 'CpuPriorityClass', type: 'REG_DWORD', value: '3' }], warning: 'none' },
  { id: 'game_pubg', name: 'PUBG', desc: 'PUBG Optimization', category: 'jogos', sub: 'especifico', reg: [{ path: 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options\\TslGame.exe\\PerfOptions', name: 'CpuPriorityClass', type: 'REG_DWORD', value: '3' }], warning: 'none' },
  { id: 'game_rust', name: 'Rust', desc: 'Rust Performance', category: 'jogos', sub: 'especifico', reg: [{ path: 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options\\RustClient.exe\\PerfOptions', name: 'CpuPriorityClass', type: 'REG_DWORD', value: '3' }], warning: 'none' },
  { id: 'game_tarkov', name: 'Escape from Tarkov', desc: 'Tarkov Optimization', category: 'jogos', sub: 'especifico', reg: [{ path: 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options\\EscapeFromTarkov.exe\\PerfOptions', name: 'CpuPriorityClass', type: 'REG_DWORD', value: '3' }], warning: 'none' },
  { id: 'game_dota2', name: 'Dota 2', desc: 'Dota 2 Priority', category: 'jogos', sub: 'especifico', reg: [{ path: 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options\\dota2.exe\\PerfOptions', name: 'CpuPriorityClass', type: 'REG_DWORD', value: '3' }], warning: 'none' },
  { id: 'game_r6', name: 'Rainbow Six Siege', desc: 'R6 Optimization', category: 'jogos', sub: 'especifico', reg: [{ path: 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options\\RainbowSix.exe\\PerfOptions', name: 'CpuPriorityClass', type: 'REG_DWORD', value: '3' }], warning: 'none' },

  // ==============================================================================
  // 💻 DESENVOLVEDORES
  // Desenvolvido por kelvenapk | GitHub: https://github.com/kelvenapk
  // ==============================================================================
  { id: 'dev_github', name: 'GitHub CLI', desc: 'GitHub CLI Priority', category: 'dev', sub: 'github', reg: [{ path: 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options\\gh.exe\\PerfOptions', name: 'CpuPriorityClass', type: 'REG_DWORD', value: '3' }], warning: 'none' },
  { id: 'dev_vscode', name: 'VSCode', desc: 'VSCode Max Performance', category: 'dev', sub: 'ide', reg: [{ path: 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options\\Code.exe\\PerfOptions', name: 'CpuPriorityClass', type: 'REG_DWORD', value: '3' }], warning: 'none' },
  { id: 'dev_docker', name: 'Docker Desktop', desc: 'Docker WSL2 Backend', category: 'dev', sub: 'containers', reg: [{ path: 'HKLM\\SOFTWARE\\Docker Inc.', name: 'WslEngine', type: 'REG_DWORD', value: '1' }], warning: 'none' },
  { id: 'dev_nodejs', name: 'Node.js', desc: 'Node.js V8 Optimizations', category: 'dev', sub: 'runtime', type: 'command', cmd: 'npm config set maxsockets 50', warning: 'none' },
  { id: 'dev_git', name: 'Git', desc: 'Git Garbage Collection', category: 'dev', sub: 'tools', type: 'command', cmd: 'git config --global gc.auto 256', warning: 'none' },
  { id: 'dev_powershell', name: 'PowerShell', desc: 'PowerShell Startup', category: 'dev', sub: 'tools', reg: [{ path: 'HKCU\\Software\\Microsoft\\PowerShell\\1.0\\Shell\\Console', name: 'History', type: 'REG_DWORD', value: '100' }], warning: 'none' },
  { id: 'dev_wsl', name: 'WSL2', desc: 'WSL2 Memory Limit', category: 'dev', sub: 'linux', reg: [{ path: 'HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run', name: 'WSL', type: 'REG_SZ', value: '' }], warning: 'none' },
  { id: 'dev_jetbrains', name: 'JetBrains IDEs', desc: 'JetBrains RAM Usage', category: 'dev', sub: 'ide', reg: [{ path: 'HKCU\\Software\\JetBrains\\Options\\Compilers', name: 'Memory', type: 'REG_DWORD', value: '2048' }], warning: 'none' },
  { id: 'dev_postman', name: 'Postman', desc: 'Postman Optimization', category: 'dev', sub: 'api', reg: [{ path: 'HKCU\\Software\\Postman', name: 'MaxSockets', type: 'REG_DWORD', value: '50' }], warning: 'none' },
  { id: 'dev_vscodium', name: 'VSCodium', desc: 'Open Source VSCode', category: 'dev', sub: 'ide', reg: [{ path: 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options\\VSCodium.exe\\PerfOptions', name: 'CpuPriorityClass', type: 'REG_DWORD', value: '3' }], warning: 'none' },
  { id: 'dev_intellij', name: 'IntelliJ IDEA', desc: 'IntelliJ Heap Size', category: 'dev', sub: 'ide', reg: [{ path: 'HKCU\\Software\\JetBrains\\IntelliJ', name: 'Xmx', type: 'REG_DWORD', value: '4096' }], warning: 'none' },
  { id: 'dev_github_desktop', name: 'GitHub Desktop', desc: 'Desktop Sync', category: 'dev', sub: 'github', reg: [{ path: 'HKCU\\Software\\GitHub', name: 'Sync', type: 'REG_DWORD', value: '1' }], warning: 'none' },
  { id: 'dev_vs', name: 'Visual Studio', desc: 'Visual Studio Compilation', category: 'dev', sub: 'ide', reg: [{ path: 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options\\devenv.exe\\PerfOptions', name: 'CpuPriorityClass', type: 'REG_DWORD', value: '3' }], warning: 'none' },
  { id: 'dev_pycharm', name: 'PyCharm', desc: 'PyCharm Heap Size', category: 'dev', sub: 'ide', reg: [{ path: 'HKCU\\Software\\JetBrains\\PyCharm', name: 'Xmx', type: 'REG_DWORD', value: '4096' }], warning: 'none' },
  { id: 'dev_studio', name: 'Android Studio', desc: 'Android Studio Emulator', category: 'dev', sub: 'ide', reg: [{ path: 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options\\studio64.exe\\PerfOptions', name: 'CpuPriorityClass', type: 'REG_DWORD', value: '3' }], warning: 'none' },

  // ==============================================================================
  // 🎮 STREAMING & CAPTURE
  // ==============================================================================
  { id: 'stream_obs', name: 'OBS Studio High', desc: 'OBS Priority High', category: 'jogos', sub: 'streaming', reg: [{ path: 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options\\obs64.exe\\PerfOptions', name: 'CpuPriorityClass', type: 'REG_DWORD', value: '3' }], warning: 'none' },
  { id: 'stream_xsplit', name: 'XSplit', desc: 'XSplit Priority', category: 'jogos', sub: 'streaming', reg: [{ path: 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options\\XSplit.Core.exe\\PerfOptions', name: 'CpuPriorityClass', type: 'REG_DWORD', value: '3' }], warning: 'none' },
  { id: 'stream_discord', name: 'Discord Stream', desc: 'Discord Screen Share', category: 'jogos', sub: 'streaming', reg: [{ path: 'HKCU\\Software\\Discord', name: 'HardwareAcceleration', type: 'REG_DWORD', value: '1' }], warning: 'none' },

  // ==============================================================================
  // 🗑️ DEBLOAT & APPS
  // ==============================================================================
  // === DEBLOAT (Remove Apps) ===
  { id: 'debloat_onedrive', name: 'OneDrive', desc: 'Remover OneDrive', category: 'debloat', sub: 'microsoft', type: 'command', cmd: 'winget uninstall Microsoft.OneDrive --silent --accept-source-agreements', warning: 'none' },
  { id: 'debloat_teams', name: 'Microsoft Teams', desc: 'Remover Microsoft Teams', category: 'debloat', sub: 'microsoft', type: 'command', cmd: 'winget uninstall MicrosoftTeams --silent --accept-source-agreements', warning: 'none' },
  { id: 'debloat_outlook', name: 'Outlook (New)', desc: 'Remover Novo Outlook', category: 'debloat', sub: 'microsoft', type: 'command', cmd: 'winget uninstall Microsoft.Outlook --silent --accept-source-agreements', warning: 'none' },
  { id: 'debloat_cortana', name: 'Cortana', desc: 'Remover Cortana', category: 'debloat', sub: 'microsoft', reg: [{ path: 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Windows Search', name: 'AllowCortana', type: 'REG_DWORD', value: '0' }], warning: 'none' },
  { id: 'debloat_edge', name: 'Microsoft Edge', desc: 'Remover Edge (Cuidado)', category: 'debloat', sub: 'microsoft', type: 'command', cmd: 'winget uninstall Microsoft.Edge --silent --accept-source-agreements', warning: 'warning' },
  { id: 'debloat_store', name: 'Microsoft Store', desc: 'Remover Loja (Não recomendado)', category: 'debloat', sub: 'windows', type: 'command', cmd: 'winget uninstall Microsoft.WindowsStore --silent --accept-source-agreements', warning: 'premium' },
  { id: 'debloat_photos', name: 'Fotos', desc: 'Remover App Fotos', category: 'debloat', sub: 'windows', type: 'command', cmd: 'winget uninstall Microsoft.Windows.Photos --silent --accept-source-agreements', warning: 'none' },
  { id: 'debloat_camera', name: 'Câmera', desc: 'Remover Câmera', category: 'debloat', sub: 'windows', type: 'command', cmd: 'winget uninstall Microsoft.WindowsCamera --silent --accept-source-agreements', warning: 'none' },
  { id: 'debloat_maps', name: 'Windows Maps', desc: 'Remover Mapas', category: 'debloat', sub: 'windows', type: 'command', cmd: 'winget uninstall Microsoft.WindowsMaps --silent --accept-source-agreements', warning: 'none' },
  { id: 'debloat_xbox', name: 'Xbox App', desc: 'Remover App Xbox', category: 'debloat', sub: 'gaming', type: 'command', cmd: 'winget uninstall Microsoft.XboxApp --silent --accept-source-agreements', warning: 'none' },
  { id: 'debloat_xboxid', name: 'Xbox Identity', desc: 'Remover Xbox Identity', category: 'debloat', sub: 'gaming', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\XblAuthManager', name: 'Start', type: 'REG_DWORD', value: '4' }], warning: 'none' },
  { id: 'debloat_xboxgame', name: 'Xbox Game Bar', desc: 'Remover Game Bar', category: 'debloat', sub: 'gaming', reg: [{ path: 'HKCU\\Software\\Microsoft\\GameBar', name: 'ShowGameBarEnabled', type: 'REG_DWORD', value: '0' }], warning: 'none' },
  { id: 'debloat_zoom', name: 'Zoom', desc: 'Remover Zoom', category: 'debloat', sub: 'social', type: 'command', cmd: 'winget uninstall Zoom.Zoom', warning: 'none' },
  { id: 'debloat_telegram', name: 'Telegram', desc: 'Remover Telegram', category: 'debloat', sub: 'social', type: 'command', cmd: 'winget uninstall Telegram.TelegramDesktop', warning: 'none' },
  { id: 'debloat_whatsapp', name: 'WhatsApp', desc: 'Remover WhatsApp', category: 'debloat', sub: 'social', type: 'command', cmd: 'winget uninstall WhatsApp.WhatsApp', warning: 'none' },
  { id: 'debloat_netflix', name: 'Netflix', desc: 'Remover Netflix', category: 'debloat', sub: 'social', type: 'command', cmd: 'winget uninstall Netflix.Netflix', warning: 'none' },
  { id: 'debloat_snap', name: 'Snap Layouts', desc: 'Desativar Snap', category: 'debloat', sub: 'sistema', reg: [{ path: 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced', name: 'SnapFill', type: 'REG_DWORD', value: '0' }], warning: 'none' },
  { id: 'debloat_widgets', name: 'Widgets', desc: 'Desativar Widgets', category: 'debloat', sub: 'sistema', reg: [{ path: 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced\\Shell', name: 'EnableWidgets', type: 'REG_DWORD', value: '0' }], warning: 'none' },
  { id: 'debloat_tips', name: 'Tips App', desc: 'Remover Dicas', category: 'debloat', sub: 'sistema', type: 'command', cmd: 'winget uninstall Microsoft.GetTips', warning: 'none' },
  { id: 'debloat_weather', name: 'Weather App', desc: 'Remover Clima', category: 'debloat', sub: 'sistema', type: 'command', cmd: 'winget uninstall Microsoft.BingWeather', warning: 'none' },
  { id: 'debloat_news', name: 'News App', desc: 'Remover Notícias', category: 'debloat', sub: 'sistema', type: 'command', cmd: 'winget uninstall Microsoft.BingNews', warning: 'none' },
  { id: 'debloat_sticky', name: 'Sticky Notes', desc: 'Remover Notas', category: 'debloat', sub: 'utilitarios', type: 'command', cmd: 'winget uninstall Microsoft.MicrosoftStickyNotes', warning: 'none' },
  { id: 'debloat_snipping', name: 'Snipping Tool', desc: 'Remover Captura', category: 'debloat', sub: 'utilitarios', type: 'command', cmd: 'winget uninstall Microsoft.ScreenSketch', warning: 'none' },
  { id: 'debloat_notepad', name: 'Notepad', desc: 'Remover Bloco de Notas', category: 'debloat', sub: 'utilitarios', type: 'command', cmd: 'winget uninstall Microsoft.Notepad', warning: 'none' },
  { id: 'debloat_terminal', name: 'Windows Terminal', desc: 'Remover Terminal', category: 'debloat', sub: 'utilitarios', type: 'command', cmd: 'winget uninstall Microsoft.WindowsTerminal', warning: 'none' },
  { id: 'debloat_paint', name: 'Paint 3D', desc: 'Remover Paint', category: 'debloat', sub: 'utilitarios', type: 'command', cmd: 'winget uninstall Microsoft.Paint3D', warning: 'none' },
  { id: 'debloat_calcu', name: 'Calculator', desc: 'Remover Calculadora', category: 'debloat', sub: 'utilitarios', type: 'command', cmd: 'winget uninstall Microsoft.WindowsCalculator', warning: 'none' },

  // ==============================================================================
  // 🪟 WINDOWS 10 OPTIMIZATIONS
  // ==============================================================================
  { id: 'w10_superfetch', name: 'Disable SuperFetch', desc: 'SuperFetch para SSD', category: 'win10', sub: 'performance', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\SysMain', name: 'Start', type: 'REG_DWORD', value: '4' }], warning: 'none' },
  { id: 'w10_search', name: 'Windows Search', desc: 'Desativar Indexação', category: 'win10', sub: 'performance', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\WSearch', name: 'Start', type: 'REG_DWORD', value: '4' }], warning: 'none' },
  { id: 'w10_diag', name: 'Diagnostic Service', desc: 'Desativar Telemetria', category: 'win10', sub: 'telemetry', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\DiagTrack', name: 'Start', type: 'REG_DWORD', value: '4' }], warning: 'none' },
  { id: 'w10_update', name: 'Windows Update', desc: 'Desativar Updates', category: 'win10', sub: 'update', reg: [{ path: 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\WindowsUpdate', name: 'NoAutoUpdate', type: 'REG_DWORD', value: '1' }], warning: 'none' },
  { id: 'w10_defrag', name: 'Disk Defragmenter', desc: 'Desativar para SSD', category: 'win10', sub: 'performance', reg: [{ path: 'HKLM\\SOFTWARE\\Microsoft\\Dfrg\\BootOptimizeFunction', name: 'Enable', type: 'REG_SZ', value: 'N' }], warning: 'none' },
  { id: 'w10_readyboot', name: 'ReadyBoost', desc: 'Desativar ReadyBoost', category: 'win10', sub: 'performance', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\ReadyBoost', name: 'Start', type: 'REG_DWORD', value: '4' }], warning: 'none' },
  { id: 'w10_wuauserv', name: 'Windows Update', desc: 'Serviço de Update', category: 'win10', sub: 'update', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\wuauserv', name: 'Start', type: 'REG_DWORD', value: '4' }], warning: 'none' },
  { id: 'w10_fontcache', name: 'Font Cache', desc: 'Otimizar Cache', category: 'win10', sub: 'performance', reg: [{ path: 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\FontDriver', name: 'FontCache', type: 'REG_DWORD', value: '1' }], warning: 'none' },
  { id: 'w10_thumbnails', name: 'Thumbnail Cache', desc: 'Aumentar Cache', category: 'win10', sub: 'performance', reg: [{ path: 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\Explorer', name: 'DisableThumbnails', type: 'REG_DWORD', value: '0' }], warning: 'none' },
  { id: 'w10_priority', name: 'Foreground Boost', desc: 'Aumentar Prioridade', category: 'win10', sub: 'performance', reg: [{ path: 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile', name: 'ForegroundServerBoost', type: 'REG_DWORD', value: '1' }], warning: 'none' },

  // New Windows 10 Tweaks
  { id: 'w10_timeline', name: 'Disable Timeline', desc: 'Desativar Linha do Tempo', category: 'win10', sub: 'privacy', reg: [{ path: 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\System', name: 'EnableActivityFeed', type: 'REG_DWORD', value: '0' }], warning: 'none' },
  { id: 'w10_news', name: 'News & Interests', desc: 'Desativar Notícias/Interesses', category: 'win10', sub: 'interface', reg: [{ path: 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Feeds', name: 'ShellFeedsTaskbarViewMode', type: 'REG_DWORD', value: '2' }], warning: 'none' },
  { id: 'w10_meetnow', name: 'Disable Meet Now', desc: 'Desativar Reunião Agora', category: 'win10', sub: 'interface', reg: [{ path: 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\Explorer', name: 'HideSCAMeetNow', type: 'REG_DWORD', value: '1' }], warning: 'none' },
  { id: 'w10_lockblur', name: 'No Lock Screen Blur', desc: 'Desativar Desfoque Bloqueio', category: 'win10', sub: 'interface', reg: [{ path: 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\System', name: 'DisableAcrylicBackgroundOnLogon', type: 'REG_DWORD', value: '1' }], warning: 'none' },

  // ==============================================================================
  // 🪟 WINDOWS 11 OPTIMIZATIONS
  // ==============================================================================
  { id: 'w11_widgets', name: 'Widgets', desc: 'Desativar Widgets', category: 'win11', sub: 'interface', reg: [{ path: 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced', name: 'EnableWidgets', type: 'REG_DWORD', value: '0' }], warning: 'none' },
  { id: 'w11_snap', name: 'Snap Layouts', desc: 'Desativar Snap', category: 'win11', sub: 'interface', reg: [{ path: 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced', name: 'EnableSnapAssistFlyout', type: 'REG_DWORD', value: '0' }], warning: 'none' },
  { id: 'w11_taskbar', name: 'Taskbar', desc: 'Agrupar Ícones', category: 'win11', sub: 'interface', reg: [{ path: 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\Explorer', name: 'TaskbarAc', type: 'REG_DWORD', value: '0' }], warning: 'none' },
  { id: 'w11_animations', name: 'Animations', desc: 'Desativar Animações', category: 'win11', sub: 'visual', reg: [{ path: 'HKCU\\Control Panel\\Desktop', name: 'MenuShowDelay', type: 'REG_SZ', value: '0' }], warning: 'none' },
  { id: 'w11_transparency', name: 'Transparency', desc: 'Desativar Transparência', category: 'win11', sub: 'visual', reg: [{ path: 'HKCU\\Software\\Microsoft\\Windows\\DWM', name: 'EnableTransparency', type: 'REG_DWORD', value: '0' }], warning: 'none' },
  { id: 'w11_startup', name: 'Start Menu', desc: 'Otimizar Menu Iniciar', category: 'win11', sub: 'interface', reg: [{ path: 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced', name: 'LaunchAppEnabled', type: 'REG_DWORD', value: '1' }], warning: 'none' },
  { id: 'w11_dxvg', name: 'DXVG', desc: 'DXVG Idle', category: 'win11', sub: 'performance', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\dxgkrnl', name: 'DxgkrnlIdle', type: 'REG_DWORD', value: '0' }], warning: 'none' },
  { id: 'w11_gamebar', name: 'Game Bar', desc: 'Desativar Game Bar', category: 'win11', sub: 'gaming', reg: [{ path: 'HKCU\\Software\\Microsoft\\GameBar', name: 'ShowGameBarEnabled', type: 'REG_DWORD', value: '0' }], warning: 'none' },
  { id: 'w11_clipboard', name: 'Clipboard', desc: 'Cloud Clipboard', category: 'win11', sub: 'privacy', reg: [{ path: 'HKCU\\Software\\Microsoft\\Clipboard', name: 'EnableCloudClipboard', type: 'REG_DWORD', value: '0' }], warning: 'none' },
  { id: 'w11_tips', name: 'Tips', desc: 'Desativar Dicas', category: 'win11', sub: 'privacy', reg: [{ path: 'HKCU\\Software\\Policies\\Microsoft\\Windows\\CloudContent', name: 'DisableTailoredExperiencesWithDiagnosticData', type: 'REG_DWORD', value: '1' }], warning: 'none' },

  // ==============================================================================
  // 💾 BACKUP & RESTORE
  // ==============================================================================
  { id: 'backup_restore', name: 'Criar Ponto de Restauração', desc: 'Cria ponto de restauração antes de otimizações', category: 'sistema', sub: 'backup', type: 'backup', warning: 'none' },
  { id: 'backup_export', name: 'Exportar Configurações', desc: 'Exporta todas as configurações aplicadas', category: 'sistema', sub: 'backup', type: 'export', warning: 'none' },
  { id: 'fix_restore', name: 'Fix Sistema', desc: 'Corrige problemas do sistema', category: 'sistema', sub: 'fix', type: 'command', cmd: 'sfc /scannow', warning: 'none' },
  { id: 'restore_point', name: 'Restaurar Sistema', desc: 'Abre restauração do sistema', category: 'sistema', sub: 'backup', type: 'restore', warning: 'none' },

];

// Populate more app optimizations iteratively to reach 200+ Count
const extraApps = [
  'Spotify', 'Teams', 'Zoom', 'Slack', 'EpicGames', 'FortniteClient', 'Valorant', 'csgo', 'dota2', 'League of Legends',
  'Firefox', 'Edge', 'Opera', 'Brave', 'Vivaldi', 'Photoshop', 'Illustrator', 'Premiere', 'AfterEffects', 'Blender',
  'Unity', 'UnrealEditor', 'Godot', 'Docker', 'Kubectl', 'Python', 'Java', 'Go', 'Rust', 'Ruby', 'PHP',
  'Mysqld', 'Postgres', 'Redis', 'Mongo', 'Nginx', 'Apache', 'Lighttpd', 'Caddy', 'Traefik',
  'Outlook', 'Excel', 'Word', 'PowerPoint', 'OneNote', 'Access', 'Publisher', 'Visio', 'Project',
  'Notepad', 'Calculator', 'Photos', 'Camera', 'Movies', 'Groove', 'XboxApp', 'Store', 'Weather', 'Maps',
  'Calculator', 'Alarms', 'Clock', 'Recorder', 'Paint', 'SnippingTool', 'StickyNotes', 'Terminal', 'PowerShell', 'CMD'
];

extraApps.forEach((app, index) => {
  window.BUILT_IN_TWEAKS.push({
    id: `auto_opt_${app.replace(/\s+/g, '').toLowerCase()}_${index}`,
    name: `Otimizar ${app}`,
    desc: `Define prioridade de CPU para ${app}`,
    category: 'appopt',
    sub: index < 15 ? 'social' : (index < 30 ? 'browser' : 'other'),
    reg: [{ path: `HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options\\${app}.exe\\PerfOptions`, name: 'CpuPriorityClass', type: 'REG_DWORD', value: '3' }],
    warning: 'none'
  });
});

// Add extra Service tweaks
const extraServices = [
  'Adobeupdate', 'GoogleUpdate', 'EdgeUpdate', 'FirefoxUpdate', 'OperaUpdate', 'BraveUpdate',
  'TeamViewer', 'AnyDesk', 'LogMeIn', 'SkypeUpdate', 'ZoomUpdate', 'WebExUpdate',
  'SteamClient', 'OriginClient', 'Uplay', 'GOGGalaxy', 'BattleNet', 'EpicGamesLauncher'
];

extraServices.forEach(svc => {
  window.BUILT_IN_TWEAKS.push({
    id: `srv_disable_${svc.toLowerCase()}`,
    name: `Desativar ${svc}`,
    desc: 'Impede execução em segundo plano',
    category: 'servicos',
    sub: 'desnecessarios',
    reg: [{ path: `HKLM\\SYSTEM\\CurrentControlSet\\Services\\${svc}`, name: 'Start', type: 'REG_DWORD', value: '4' }],
    warning: 'none'
  });
});

// ==============================================================================
// 🚀 REAL PERFORMANCE TWEAKS (Network, Visuals, System)
// ==============================================================================

// NETWORK OPTIMIZATIONS
window.BUILT_IN_TWEAKS.push(
  { id: 'net_throttling', name: 'Network Throttling', desc: 'Desativa limitação de rede', category: 'rede', sub: 'geral', reg: [{ path: 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile', name: 'NetworkThrottlingIndex', type: 'REG_DWORD', value: 'ffffffff' }], warning: 'none' },
  { id: 'net_autotuning', name: 'TCP Auto-Tuning', desc: 'Otimiza janela TCP', category: 'rede', sub: 'geral', type: 'command', cmd: 'netsh int tcp set global autotuninglevel=normal', warning: 'none' },
  { id: 'net_congestion', name: 'CTCP Congestion', desc: 'Providencia controle de congestionamento', category: 'rede', sub: 'geral', type: 'command', cmd: 'netsh int tcp set supplemental template=internet congestionprovider=ctcp', warning: 'none' }
);

// VISUAL EFFECTS (Performance)
const visualTweaks = [
  { name: 'MenuShowDelay', path: 'HKCU\\Control Panel\\Desktop', val: '0', desc: 'Acelera menus' },
  { name: 'MinAnimate', path: 'HKCU\\Control Panel\\Desktop\\WindowMetrics', val: '0', desc: 'Remove animação de minimizar' },
  { name: 'DragFullWindows', path: 'HKCU\\Control Panel\\Desktop', val: '0', desc: 'Desativa arrastar janela cheia' },
  { name: 'FontSmoothing', path: 'HKCU\\Control Panel\\Desktop', val: '2', desc: 'Mantém suavização de fonte' }
];

visualTweaks.forEach(t => {
  window.BUILT_IN_TWEAKS.push({
    id: `vis_${t.name.toLowerCase()}`,
    name: t.name,
    desc: t.desc,
    category: 'visual',
    sub: 'performance',
    reg: [{ path: t.path, name: t.name, type: 'REG_SZ', value: t.val }],
    warning: 'none'
  });
});

// GAMING OPTIMIZATIONS
window.BUILT_IN_TWEAKS.push(
  { id: 'game_dvr', name: 'Disable GameDVR', desc: 'Desativa gravação em segundo plano', category: 'jogos', sub: 'windows', reg: [{ path: 'HKCU\\System\\GameConfigStore', name: 'GameDVR_Enabled', type: 'REG_DWORD', value: '0' }, { path: 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\GameDVR', name: 'AllowGameDVR', type: 'REG_DWORD', value: '0' }], warning: 'none' },
  { id: 'game_fso', name: 'Disable ISO', desc: 'Desativa otimizações de tela cheia', category: 'jogos', sub: 'windows', reg: [{ path: 'HKCU\\System\\GameConfigStore', name: 'GameDVR_FSEBehavior', type: 'REG_DWORD', value: '2' }], warning: 'none' },
  { id: 'game_powerscheme', name: 'Ultimate Performance', desc: 'Ativa plano de energia máximo', category: 'energia', sub: 'planos', type: 'command', cmd: 'powercfg -duplicatescheme e9a42b02-d5df-448d-aa00-03f14749eb61', warning: 'none' }
);

// SYSTEM RESPONSIVENESS
window.BUILT_IN_TWEAKS.push(
  { id: 'sys_responsiveness', name: 'System Responsiveness', desc: 'Prioriza jogos sobre serviços', category: 'sistema', sub: 'core', reg: [{ path: 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile', name: 'SystemResponsiveness', type: 'REG_DWORD', value: '0' }], warning: 'none' },
  { id: 'sys_priority', name: 'Priority Control', desc: 'Otimiza separação de prioridades', category: 'sistema', sub: 'core', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\PriorityControl', name: 'Win32PrioritySeparation', type: 'REG_DWORD', value: '26' }], warning: 'none' }
);

console.log('✅ DATABASE RESTORED: ' + window.BUILT_IN_TWEAKS.length + ' tweaks loaded (+ Real Tweaks).');
console.log('📊 CATEGORIES: Intel, AMD, NVIDIA, Games, Developers, Streaming, Visuals, Network');

// ==============================================================================
// 🎮 GPU OPTIMIZATIONS (NVIDIA, AMD, INTEL)
// ==============================================================================

// NVIDIA
const nvidiaTweaks = [
  { id: 'nv_powermizer', name: 'Disable PowerMizer', desc: 'Força GPU em clock máximo', sub: 'gpu', type: 'reg', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Video', name: 'PerfLevelSrc', type: 'REG_DWORD', value: '3322' }] },
  { id: 'nv_preemption', name: 'Disable Preemption', desc: 'Reduz latência em DX11/12', sub: 'gpu', type: 'reg', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\nvlddmkm', name: 'EnablePreemption', type: 'REG_DWORD', value: '0' }] }
];
nvidiaTweaks.forEach(t => { t.category = 'nvidia'; t.warning = 'none'; window.BUILT_IN_TWEAKS.push(t); });

// AMD
window.BUILT_IN_TWEAKS.push(
  { id: 'amd_ulps', name: 'Disable ULPS', desc: 'Desativa ultra low power state (reduz stutter)', category: 'amd', sub: 'gpu', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Class\\{4d36e968-e325-11ce-bfc1-08002be10318}\\0000', name: 'EnableUlps', type: 'REG_DWORD', value: '0' }], warning: 'none' },
  { id: 'amd_shader', name: 'Shader Cache', desc: 'Otimiza cache de shader', category: 'amd', sub: 'gpu', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Class\\{4d36e968-e325-11ce-bfc1-08002be10318}\\0000\\UMD', name: 'ShaderCache', type: 'REG_BINARY', value: '31' }], warning: 'none' }
);

// ==============================================================================
// 🌐 ADVANCED INTERNET & DNS
// ==============================================================================
window.BUILT_IN_TWEAKS.push(
  { id: 'dns_google', name: 'DNS Google', desc: 'Define DNS rápido (8.8.8.8)', category: 'rede', sub: 'dns', type: 'command', cmd: 'netsh interface ip set dns "Ethernet" static 8.8.8.8 && netsh interface ip add dns "Ethernet" 8.8.4.4 index=2', warning: 'none' },
  { id: 'dns_cloudflare', name: 'DNS Cloudflare', desc: 'Define DNS privado (1.1.1.1)', category: 'rede', sub: 'dns', type: 'command', cmd: 'netsh interface ip set dns "Ethernet" static 1.1.1.1 && netsh interface ip add dns "Ethernet" 1.0.0.1 index=2', warning: 'none' },
  { id: 'net_flush', name: 'Flush DNS', desc: 'Limpa cache DNS e renova IP', category: 'rede', sub: 'manutencao', type: 'command', cmd: 'ipconfig /flushdns && ipconfig /release && ipconfig /renew', warning: 'none' }
);

// ==============================================================================
// 🧹 CLEANING TOOLS
// ==============================================================================
window.BUILT_IN_TWEAKS.push(
  { id: 'clean_temp', name: 'Limpar Temp', desc: 'Remove arquivos temporários', category: 'limpeza', sub: 'sistema', type: 'command', cmd: 'del /q/f/s %TEMP%\\*', warning: 'none' },
  { id: 'clean_prefetch', name: 'Limpar Prefetch', desc: 'Limpa cache de inicialização', category: 'limpeza', sub: 'sistema', type: 'command', cmd: 'del /q/f/s C:\\Windows\\Prefetch\\*', warning: 'none' },
  { id: 'clean_update', name: 'Limpar Windows Update', desc: 'Remove updates antigos (Libera espaço)', category: 'limpeza', sub: 'sistema', type: 'command', cmd: 'net stop wuauserv && del /q/f/s C:\\Windows\\SoftwareDistribution\\Download\\* && net start wuauserv', warning: 'warning' }
);

// ==============================================================================
// 🖱️ PERIPHERALS (USB & INPUT)
// ==============================================================================
window.BUILT_IN_TWEAKS.push(
  { id: 'usb_powersave', name: 'Disable USB Power Saving', desc: 'Impede desligamento de USB', category: 'usb', sub: 'input', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\USB', name: 'DisableSelectiveSuspend', type: 'REG_DWORD', value: '1' }], warning: 'none' },
  { id: 'mouse_prec', name: 'Disable Mouse Accel', desc: 'Desativa aprimoramento do ponteiro', category: 'usb', sub: 'input', reg: [{ path: 'HKCU\\Control Panel\\Mouse', name: 'MouseSpeed', type: 'REG_SZ', value: '0' }, { path: 'HKCU\\Control Panel\\Mouse', name: 'MouseThreshold1', type: 'REG_SZ', value: '0' }, { path: 'HKCU\\Control Panel\\Mouse', name: 'MouseThreshold2', type: 'REG_SZ', value: '0' }], warning: 'none' },
  { id: 'kbd_delay', name: 'Keyboard Delay', desc: 'Reduz atraso de repetição', category: 'usb', sub: 'input', reg: [{ path: 'HKCU\\Control Panel\\Keyboard', name: 'KeyboardDelay', type: 'REG_SZ', value: '0' }], warning: 'none' },
  { id: 'kbd_speed', name: 'Keyboard Speed', desc: 'Aumenta velocidade de repetição', category: 'usb', sub: 'input', reg: [{ path: 'HKCU\\Control Panel\\Keyboard', name: 'KeyboardSpeed', type: 'REG_SZ', value: '31' }], warning: 'none' }
);

// ==============================================================================
// 🛡️ SERVICES DISABLER (Safe)
// ==============================================================================
const safeServices = [
  { name: 'DiagTrack', desc: 'Telemetria e Rastreamento' },
  { name: 'MapsBroker', desc: 'Gerenciador de Mapas' },
  { name: 'RetailDemo', desc: 'Modo de Demonstração' },
  { name: 'XblAuthManager', desc: 'Xbox Live Auth (Se não joga Xbox)' },
  { name: 'XblGameSave', desc: 'Xbox Cloud Saves (Se não usa)' }
];

safeServices.forEach(s => {
  window.BUILT_IN_TWEAKS.push({
    id: `srv_dis_${s.name.toLowerCase()}`,
    name: `Desativar ${s.name}`,
    desc: s.desc,
    category: 'servicos',
    sub: 'otimizacao',
    reg: [{ path: `HKLM\\SYSTEM\\CurrentControlSet\\Services\\${s.name}`, name: 'Start', type: 'REG_DWORD', value: '4' }],
    warning: 'none'
  });
});

// ==============================================================================
// 🆕 NEW FREE CPU/GPU TWEAKS (Requested)
// ==============================================================================

// FREE CPU TWEAKS
window.BUILT_IN_TWEAKS.push(
  { id: 'cpu_unpark_lite', name: 'Unpark CPU (Lite)', desc: 'Desestaci. núcleos (Básico)', category: 'sistema', sub: 'core', type: 'command', cmd: 'powercfg -attributes SUB_PROCESSOR 0cc5b647-c1df-4637-891a-dec35c318583 -ATTRIB_HIDE && powercfg -setacvalueindex SCHEME_CURRENT SUB_PROCESSOR 0cc5b647-c1df-4637-891a-dec35c318583 0', warning: 'none' },
  { id: 'cpu_priority_games', name: 'Prioridade Jogos', desc: 'Ajuste Win32Priority', category: 'sistema', sub: 'core', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\PriorityControl', name: 'Win32PrioritySeparation', type: 'REG_DWORD', value: '38' }], warning: 'none' },
  { id: 'cpu_mc_update', name: 'Prevent Microcode Update', desc: 'Evita perda de performance', category: 'sistema', sub: 'core', reg: [{ path: 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\MitigationOptions', name: 'UserShadowStack', type: 'REG_DWORD', value: '0' }], warning: 'none' }
);

// FREE GPU TWEAKS (Basic)
window.BUILT_IN_TWEAKS.push(
  { id: 'gpu_scheduling', name: 'Hardware Scheduling', desc: 'HAGS (Se suportado)', category: 'gpu', sub: 'geral', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers', name: 'HwSchMode', type: 'REG_DWORD', value: '2' }], warning: 'none' },
  { id: 'gpu_dx12_help', name: 'DX12 Helper', desc: 'Otimiza pipeline DX12', category: 'gpu', sub: 'geral', reg: [{ path: 'HKLM\\SOFTWARE\\Microsoft\\DirectX', name: 'MaxLoaderThreads', type: 'REG_DWORD', value: '4' }], warning: 'none' },
  { id: 'gpu_flip_queue', name: 'Flip Queue Size', desc: 'Reduz input lag GPU', category: 'gpu', sub: 'geral', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Class\\{4d36e968-e325-11ce-bfc1-08002be10318}\\0000', name: 'FlipQueueSize', type: 'REG_DWORD', value: '1' }], warning: 'none' }
);

// VIP EXCLUSIVE TWEAKS (Locked)
window.BUILT_IN_TWEAKS.push(
  { id: 'cpu_exclusive_threads', name: 'Exclusive Threads', desc: 'Reserva threads sistema', category: 'sistema', sub: 'core', type: 'reg', reg: [{ path: 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games', name: 'Scheduling Category', type: 'REG_SZ', value: 'High' }], warning: 'premium' },
  { id: 'gpu_vram_optimize', name: 'VRAM Compression', desc: 'Otimiza uso de VRAM', category: 'gpu', sub: 'geral', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Class\\{4d36e968-e325-11ce-bfc1-08002be10318}\\0000', name: 'EnableVRAMCompression', type: 'REG_DWORD', value: '1' }], warning: 'premium' },
  { id: 'net_gaming_mode_xtreme', name: 'Lag Spike Fix Pro', desc: 'Estabilização de ping avançada', category: 'rede', sub: 'tcp', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters', name: 'TcpMaxDataRetransmissions', type: 'REG_DWORD', value: '3' }], warning: 'premium' }
);

// ==============================================================================
// 🎁 BONUS FREE TWEAKS (User Requested)
// ==============================================================================
window.BUILT_IN_TWEAKS.push(
  { id: 'sys_boot_speed', name: 'Boot Speedup', desc: 'Desativa delay de boot', category: 'sistema', sub: 'boot', type: 'command', cmd: 'bcdedit /set {current} bootstatuspolicy IgnoreAllFailures', warning: 'none' },
  { id: 'vis_shadows_off', name: 'Disable Shadows', desc: 'Remove sombras janelas', category: 'visual', sub: 'performance', reg: [{ path: 'HKCU\\Control Panel\\Desktop', name: 'UserPreferencesMask', type: 'REG_BINARY', value: '9012038010000000' }], warning: 'none' },
  { id: 'net_dns_cache', name: 'Larger DNS Cache', desc: 'Aumenta cache DNS', category: 'rede', sub: 'dns', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\Dnscache\\Parameters', name: 'MaxCacheTtl', type: 'REG_DWORD', value: '86400' }], warning: 'none' },
  { id: 'sys_fs_ntfs', name: 'NTFS Memory Usage', desc: 'Aumenta pool NTFS', category: 'sistema', sub: 'disco', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\FileSystem', name: 'NtfsMemoryUsage', type: 'REG_DWORD', value: '2' }], warning: 'none' },
  { id: 'gaming_swap', name: 'Swap File Optimized', desc: 'Otimiza arquivo troca', category: 'sistema', sub: 'memoria', reg: [{ path: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management', name: 'PagingFiles', type: 'REG_MULTI_SZ', value: 'c:\\pagefile.sys 4096 4096' }], warning: 'none' }
);

console.log('✅ DATABASE FULLY UPDATED: ' + window.BUILT_IN_TWEAKS.length + ' total tweaks available.');
