/**
 * 章节预览组件
 * 用于显示章节标题和内容预览，支持点击跳转
 */
class ChapterPreview extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['title', 'preview', 'href', 'color'];
    }

    connectedCallback() {
        this.render();
        this.addEventListeners();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    render() {
        const title = this.getAttribute('title') || '';
        const preview = this.getAttribute('preview') || '';
        const href = this.getAttribute('href') || '#';
        const color = this.getAttribute('color') || '#D97974';

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                }

                .chapter-card {
                    background: rgba(255,255,255,0.9);
                    border-radius: 20px;
                    padding: 30px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                    cursor: pointer;
                    transition: all 0.3s ease;
                    border: 2px solid transparent;
                }

                .chapter-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.15);
                    border-color: ${color};
                }

                .chapter-title {
                    color: ${color};
                    font-size: 2.2rem;
                    margin: 0 0 1.5rem 0;
                    text-align: left;
                    font-weight: 400;
                }

                .chapter-preview {
                    line-height: 1.8;
                    font-size: 1.3rem;
                    color: #333;
                    text-indent: 2em;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    margin: 0;
                }


                @media (max-width: 480px) {
                    .chapter-card {
                        padding: 20px;
                    }
                    
                    .chapter-title {
                        font-size: 1.8rem;
                    }
                    
                    .chapter-preview {
                        font-size: 1.2rem;
                    }
                }
            </style>
            
            <div class="chapter-card">
                <h2 class="chapter-title">${title}</h2>
                <p class="chapter-preview">${preview}</p>
            </div>
        `;
    }

    addEventListeners() {
        const card = this.shadowRoot.querySelector('.chapter-card');
        card.addEventListener('click', () => {
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                window.location.href = href;
            }
        });
    }
}

// 注册自定义元素
customElements.define('chapter-preview', ChapterPreview);
