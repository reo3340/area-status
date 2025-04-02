// 區域狀態管理
class AreaManager {
    constructor() {
        this.dataUrl = 'data/areas.json';
        this.areas = [];
        this.setupEventListeners();
    }

    async fetchAreas() {
        try {
            document.getElementById('loading').style.display = 'block';
            const response = await fetch(this.dataUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            this.areas = data.areas;
            this.updateUI();
        } catch (error) {
            console.error('Error fetching areas:', error);
        } finally {
            document.getElementById('loading').style.display = 'none';
        }
    }

    updateUI() {
        this.areas.forEach(area => {
            const element = document.getElementById(area.id);
            if (element) {
                if (area.completed) {
                    element.classList.add('completed');
                } else {
                    element.classList.remove('completed');
                }
                element.setAttribute('data-name', area.name);
            }
        });
    }

    setupEventListeners() {
        const tooltip = document.getElementById('tooltip');
        const areas = document.querySelectorAll('.area');

        // 工具提示
        areas.forEach(area => {
            area.addEventListener('mousemove', (e) => {
                const name = area.getAttribute('data-name');
                tooltip.textContent = name;
                tooltip.style.display = 'block';
                tooltip.style.left = (e.pageX + 10) + 'px';
                tooltip.style.top = (e.pageY + 10) + 'px';
            });

            area.addEventListener('mouseleave', () => {
                tooltip.style.display = 'none';
            });
        });
    }

    startPeriodicUpdates() {
        this.fetchAreas();
        setInterval(() => this.fetchAreas(), 60000);
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    const manager = new AreaManager();
    manager.startPeriodicUpdates();
});
