// =====================================================
// TUTORIAL SYSTEM - Interactive Onboarding
// =====================================================

class TutorialManager {
    constructor() {
        this.steps = [
            {
                element: null,
                title: "🚀 Bem-vindo ao KT Optimizer Free!",
                text: "Vamos fazer um tour rápido de 2 minutos para você aproveitar ao máximo o otimizador. Pronto?",
                position: "center"
            },
            {
                element: "#quick-optimize",
                title: "⚡ Otimização Rápida",
                text: "Clique aqui para aplicar 7 tweaks básicos recomendados instantaneamente. Perfeito para iniciantes!",
                position: "right"
            },
            {
                element: ".nav-menu",
                title: "🗂️ Menu de Categorias",
                text: "Explore categorias específicas: Limpeza, Jogos, GPU, Rede e muito mais. Cada categoria tem dezenas de tweaks.",
                position: "right"
            },
            {
                element: "#search-input",
                title: "🔍 Busca Inteligente",
                text: "Digite palavras-chave como 'FPS', 'Mouse', 'Latency' para encontrar tweaks específicos rapidamente.",
                position: "bottom"
            },
            {
                element: ".sidebar-footer",
                title: "🎨 Temas e Ajuda",
                text: "Personalize o tema do app e acesse este tutorial novamente clicando em 'Ajuda'.",
                position: "right"
            },
            {
                element: null,
                title: "✅ Tudo Pronto!",
                text: "Dica importante: Sempre crie um ponto de restauração antes de aplicar tweaks. Boa otimização!",
                position: "center"
            }
        ];
        this.currentStep = 0;
        this.isActive = false;
    }

    start() {
        if (this.isActive) return;
        this.isActive = true;
        this.currentStep = 0;
        this.createOverlay();
        this.showStep();
    }

    createOverlay() {
        // Overlay
        this.overlay = document.createElement("div");
        this.overlay.className = "tutorial-overlay";
        document.body.appendChild(this.overlay);

        // Tooltip
        this.tooltip = document.createElement("div");
        this.tooltip.className = "tutorial-tooltip";
        this.tooltip.innerHTML = `
            <h3 id="tut-title">Title</h3>
            <p id="tut-text">Text</p>
            <div class="tut-buttons">
                <button id="tut-skip" class="btn-secondary">Pular</button>
                <button id="tut-next" class="btn-primary">Próximo</button>
            </div>
        `;
        document.body.appendChild(this.tooltip);

        // Events
        document.getElementById("tut-next").onclick = () => this.next();
        document.getElementById("tut-skip").onclick = () => this.end();
    }

    showStep() {
        const step = this.steps[this.currentStep];
        if (!step) { this.end(); return; }

        // Remove old highlights
        document.querySelectorAll(".tutorial-highlight").forEach(el => el.classList.remove("tutorial-highlight"));

        // Helper vars
        const titleEl = document.getElementById("tut-title");
        const textEl = document.getElementById("tut-text");
        const nextBtn = document.getElementById("tut-next");

        titleEl.textContent = step.title;
        textEl.textContent = step.text;
        nextBtn.textContent = this.currentStep === this.steps.length - 1 ? "Concluir" : "Próximo";

        // Positioning
        if (step.element) {
            const target = document.querySelector(step.element);
            if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "center" });
                target.classList.add("tutorial-highlight");

                const rect = target.getBoundingClientRect();
                const tooltipRect = this.tooltip.getBoundingClientRect();

                let top, left;

                // Simple positioning logic
                if (step.position === "bottom") {
                    top = rect.bottom + 15;
                    left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
                } else if (step.position === "right") {
                    top = rect.top + (rect.height / 2) - (tooltipRect.height / 2);
                    left = rect.right + 15;
                } else if (step.position === "left") {
                    top = rect.top + (rect.height / 2) - (tooltipRect.height / 2);
                    left = rect.left - tooltipRect.width - 15;
                } else { // Top
                    top = rect.top - tooltipRect.height - 15;
                    left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
                }

                // Bounds check
                if (left < 10) left = 10;
                if (top < 10) top = 10;
                if (left + tooltipRect.width > window.innerWidth) left = window.innerWidth - tooltipRect.width - 10;
                if (top + tooltipRect.height > window.innerHeight) top = window.innerHeight - tooltipRect.height - 10;

                this.tooltip.style.top = `${top}px`;
                this.tooltip.style.left = `${left}px`;
                this.tooltip.style.transform = "none";
            } else {
                // Formatting fallback if element not found
                this.centerTooltip();
            }
        } else {
            this.centerTooltip();
        }

        this.tooltip.classList.add("visible");
    }

    centerTooltip() {
        this.tooltip.style.top = "50%";
        this.tooltip.style.left = "50%";
        this.tooltip.style.transform = "translate(-50%, -50%)";
    }

    next() {
        this.currentStep++;
        if (this.currentStep >= this.steps.length) {
            this.end();
        } else {
            this.showStep();
        }
    }

    end() {
        this.isActive = false;
        if (this.overlay) this.overlay.remove();
        if (this.tooltip) this.tooltip.remove();
        document.querySelectorAll(".tutorial-highlight").forEach(el => el.classList.remove("tutorial-highlight"));
        localStorage.setItem("tutorial_seen", "true");
    }
}

window.TutorialManager = TutorialManager;
