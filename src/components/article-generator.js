/**
 * 文章生成器 - 用于快速创建文章页面
 * 提供简单的API来生成文章HTML文件
 */

const ArticleTemplate = require('./article-template.js');

class ArticleGenerator {
    constructor() {
        this.template = null;
    }

    /**
     * 创建新文章
     */
    createArticle(config) {
        this.template = new ArticleTemplate(config);
        return this;
    }

    /**
     * 设置主题
     */
    setTheme(theme) {
        if (this.template) {
            this.template.config.theme = theme;
        }
        return this;
    }

    /**
     * 设置标题
     */
    setTitle(title) {
        if (this.template) {
            this.template.config.title = title;
            this.template.config.articleTitle = title;
        }
        return this;
    }

    /**
     * 设置内容
     */
    setContent(content) {
        if (this.template) {
            this.template.config.content = Array.isArray(content) ? content : [content];
        }
        return this;
    }

    /**
     * 设置导航
     */
    setNavigation(navigation) {
        if (this.template) {
            this.template.config.navigation = navigation;
        }
        return this;
    }

    /**
     * 生成并保存文件
     */
    save(filePath) {
        if (this.template) {
            this.template.saveToFile(filePath);
        }
        return this;
    }

    /**
     * 获取HTML内容
     */
    getHTML() {
        return this.template ? this.template.generateHTML() : '';
    }

    /**
     * 快速创建文章页面的静态方法
     */
    static quickCreate(config) {
        const generator = new ArticleGenerator();
        return generator.createArticle(config);
    }
}

// 预设的文章配置模板
const ArticlePresets = {
    // 人生感悟类文章
    insights: {
        theme: 'default',
        backUrl: '../insights.html',
        navigation: {
            show: true,
            buttons: [
                { text: '返回人生感悟', url: '../insights.html' },
                { text: '下一篇', url: 'next.html' }
            ]
        }
    },

    // 青春回忆类文章
    youth: {
        theme: 'blue',
        backUrl: '../youth.html',
        navigation: {
            show: true,
            buttons: [
                { text: '返回青春回忆', url: '../youth.html' },
                { text: '下一篇', url: 'next.html' }
            ]
        }
    },

    // 宁静时光类文章
    serenity: {
        theme: 'green',
        backUrl: '../serenity.html',
        navigation: {
            show: true,
            buttons: [
                { text: '返回宁静时光', url: '../serenity.html' },
                { text: '下一篇', url: 'next.html' }
            ]
        }
    },

    // 前言序言类文章
    preface: {
        theme: 'purple',
        backUrl: '../preface.html',
        navigation: {
            show: true,
            buttons: [
                { text: '返回前言', url: '../preface.html' },
                { text: '下一篇', url: 'next.html' }
            ]
        }
    }
};

// 使用示例和工具函数
const ArticleUtils = {
    /**
     * 根据文章类型快速创建
     */
    createByType(type, title, content, customConfig = {}) {
        const preset = ArticlePresets[type] || ArticlePresets.insights;
        const config = {
            ...preset,
            ...customConfig,
            title,
            articleTitle: title,
            content: Array.isArray(content) ? content : [content]
        };
        
        return ArticleGenerator.quickCreate(config);
    },

    /**
     * 批量创建文章
     */
    createBatch(articles) {
        return articles.map(article => {
            const { type, title, content, ...customConfig } = article;
            return ArticleUtils.createByType(type, title, content, customConfig);
        });
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ArticleGenerator, ArticlePresets, ArticleUtils };
}

if (typeof window !== 'undefined') {
    window.ArticleGenerator = ArticleGenerator;
    window.ArticlePresets = ArticlePresets;
    window.ArticleUtils = ArticleUtils;
}
