/**
 * 文章模板组件
 * 用于快速生成统一风格的文章页面
 */

class ArticleTemplate {
    constructor(config) {
        this.config = {
            // 页面基础配置
            title: '文章标题',
            theme: 'default', // 主题：default, blue, green, purple, orange
            backUrl: '../insights.html',
            backIcon: '../../assets/ic_arrow_left_bt.svg',
            
            // 文章内容
            articleTitle: '文章标题',
            content: [], // 文章段落数组
            
            // 导航配置
            navigation: {
                show: true,
                buttons: [
                    { text: '返回列表', url: '../insights.html' },
                    { text: '下一篇', url: 'next.html' }
                ]
            },
            
            // 样式配置
            customStyles: '',
            
            // 合并用户配置
            ...config
        };
    }

    /**
     * 生成HTML内容
     */
    generateHTML() {
        return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${this.config.title}</title>
    <link rel="stylesheet" href="../../styles/common.css">
    <link rel="stylesheet" href="../../styles/theme.css">
    ${this.config.customStyles ? `<style>${this.config.customStyles}</style>` : ''}
</head>
<body class="theme-${this.config.theme}">
    <a href="${this.config.backUrl}" class="back-btn">
        <img src="${this.config.backIcon}" alt="返回" class="back-icon">
    </a>

    <div class="content-container">
        <div class="article">
            <h2>${this.config.articleTitle}</h2>
            ${this.generateContent()}
        </div>
    </div>

    ${this.generateNavigation()}
</body>
</html>`;
    }

    /**
     * 生成文章内容
     */
    generateContent() {
        if (Array.isArray(this.config.content)) {
            return this.config.content.map(paragraph => 
                `<p>${paragraph}</p>`
            ).join('\n            ');
        }
        return `<p>${this.config.content}</p>`;
    }

    /**
     * 生成导航部分
     */
    generateNavigation() {
        if (!this.config.navigation.show) {
            return '';
        }

        const buttons = this.config.navigation.buttons.map(button => 
            `<a href="${button.url}" class="nav-btn">${button.text}</a>`
        ).join('\n        ');

        return `
    <div class="navigation">
        ${buttons}
    </div>`;
    }

    /**
     * 保存HTML文件
     */
    saveToFile(filePath) {
        const fs = require('fs');
        const path = require('path');
        
        // 确保目录存在
        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        
        fs.writeFileSync(filePath, this.generateHTML(), 'utf8');
        console.log(`文章已保存到: ${filePath}`);
    }

    /**
     * 快速创建文章页面的静态方法
     */
    static createArticle(options) {
        const template = new ArticleTemplate(options);
        return template;
    }

    /**
     * 批量创建文章页面
     */
    static createMultipleArticles(articlesConfig) {
        return articlesConfig.map(config => new ArticleTemplate(config));
    }
}

// 使用示例
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ArticleTemplate;
}

// 浏览器环境下的全局变量
if (typeof window !== 'undefined') {
    window.ArticleTemplate = ArticleTemplate;
}
