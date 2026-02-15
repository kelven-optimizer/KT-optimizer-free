// Update Checker - GitHub Releases
class UpdateChecker {
    constructor() {
        this.currentVersion = '1.0.0';
        this.repoOwner = 'kelvenapk';
        this.repoName = 'kt-optimizer-free';
        this.checkInterval = 24 * 60 * 60 * 1000; // 24 hours
    }

    async checkForUpdates() {
        try {
            const lastCheck = localStorage.getItem('last_update_check');
            const now = Date.now();

            if (lastCheck && (now - parseInt(lastCheck)) < this.checkInterval) {
                return null;
            }

            const response = await fetch(`https://api.github.com/repos/${this.repoOwner}/${this.repoName}/releases/latest`);
            
            if (!response.ok) return null;

            const data = await response.json();
            const latestVersion = data.tag_name.replace('v', '');

            localStorage.setItem('last_update_check', now.toString());

            if (this.compareVersions(latestVersion, this.currentVersion) > 0) {
                return {
                    version: latestVersion,
                    downloadUrl: data.html_url,
                    releaseNotes: data.body || 'Sem notas de versão',
                    publishedAt: new Date(data.published_at).toLocaleDateString('pt-BR')
                };
            }

            return null;
        } catch (error) {
            console.error('Update check failed:', error);
            return null;
        }
    }

    compareVersions(v1, v2) {
        const parts1 = v1.split('.').map(Number);
        const parts2 = v2.split('.').map(Number);

        for (let i = 0; i < 3; i++) {
            if (parts1[i] > parts2[i]) return 1;
            if (parts1[i] < parts2[i]) return -1;
        }
        return 0;
    }

    showUpdateNotification(updateInfo) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #a855f7, #ec4899);
            color: white;
            padding: 20px 25px;
            border-radius: 15px;
            box-shadow: 0 10px 40px rgba(168, 85, 247, 0.4);
            z-index: 9999;
            max-width: 350px;
            animation: slideInRight 0.5s ease-out;
        `;

        notification.innerHTML = `
            <div style="display: flex; align-items: start; gap: 15px;">
                <div style="font-size: 2rem;">🎉</div>
                <div style="flex: 1;">
                    <h3 style="margin: 0 0 8px 0; font-size: 1.1rem;">Nova Versão Disponível!</h3>
                    <p style="margin: 0 0 8px 0; font-size: 0.9rem; opacity: 0.9;">
                        Versão ${updateInfo.version} lançada em ${updateInfo.publishedAt}
                    </p>
                    <div style="display: flex; gap: 10px; margin-top: 12px;">
                        <button id="update-download" style="flex: 1; padding: 8px; background: white; color: #a855f7; border: none; border-radius: 8px; font-weight: 600; cursor: pointer;">
                            Baixar
                        </button>
                        <button id="update-dismiss" style="padding: 8px 15px; background: rgba(255,255,255,0.2); color: white; border: none; border-radius: 8px; cursor: pointer;">
                            Depois
                        </button>
                    </div>
                </div>
                <button id="update-close" style="background: none; border: none; color: white; font-size: 1.5rem; cursor: pointer; padding: 0; line-height: 1;">×</button>
            </div>
        `;

        document.body.appendChild(notification);

        document.getElementById('update-download').onclick = () => {
            window.open(updateInfo.downloadUrl, '_blank');
            notification.remove();
        };

        document.getElementById('update-dismiss').onclick = () => notification.remove();
        document.getElementById('update-close').onclick = () => notification.remove();

        setTimeout(() => notification.remove(), 30000);
    }

    async init() {
        const updateInfo = await this.checkForUpdates();
        if (updateInfo) {
            this.showUpdateNotification(updateInfo);
        }
    }
}

window.UpdateChecker = UpdateChecker;
