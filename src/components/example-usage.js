/**
 * 组件使用示例
 * 展示如何使用 ArticleTemplate 和 ArticleGenerator 快速创建文章页面
 */

const { ArticleGenerator, ArticlePresets, ArticleUtils } = require('./article-generator.js');

// 示例1：使用 ArticleGenerator 创建文章
function createExampleArticle() {
    const generator = new ArticleGenerator();
    
    generator
        .createArticle({
            title: '测试文章 - 组件化示例',
            theme: 'blue',
            backUrl: '../insights.html',
            content: [
                '这是使用组件化方式创建的文章示例。',
                '通过配置不同的参数，我们可以快速生成各种风格的文章页面。',
                '组件化设计让代码更加模块化和可维护。'
            ],
            navigation: {
                show: true,
                buttons: [
                    { text: '返回列表', url: '../insights.html' },
                    { text: '下一篇', url: 'next.html' }
                ]
            }
        })
        .save('./example-article.html');
}

// 示例2：使用预设模板快速创建
function createWithPreset() {
    ArticleUtils.createByType('insights', '人生感悟示例', [
        '这是使用预设模板创建的文章。',
        '预设模板提供了不同文章类型的默认配置。',
        '大大简化了文章创建的过程。'
    ]).save('./preset-article.html');
}

// 示例3：批量创建文章
function createBatchArticles() {
    const articles = [
        {
            type: 'insights',
            title: '人生感悟1',
            content: '这是第一篇人生感悟文章。'
        },
        {
            type: 'youth',
            title: '青春回忆1',
            content: '这是第一篇青春回忆文章。',
            theme: 'green' // 覆盖预设主题
        },
        {
            type: 'serenity',
            title: '宁静时光1',
            content: '这是第一篇宁静时光文章。'
        }
    ];

    ArticleUtils.createBatch(articles).forEach((generator, index) => {
        generator.save(`./batch-article-${index + 1}.html`);
    });
}

// 示例4：自定义主题创建
function createCustomThemeArticle() {
    const customStyles = `
        .article h2 {
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
    `;

    new ArticleGenerator()
        .createArticle({
            title: '自定义主题文章',
            theme: 'default',
            content: [
                '这篇文章使用了自定义样式。',
                '通过 customStyles 参数可以添加额外的CSS样式。',
                '标题使用了渐变色效果。'
            ],
            customStyles: customStyles
        })
        .save('./custom-theme-article.html');
}

// 导出示例函数
module.exports = {
    createExampleArticle,
    createWithPreset,
    createBatchArticles,
    createCustomThemeArticle
};

// 如果直接运行此文件，执行示例
if (require.main === module) {
    console.log('开始创建示例文章...');
    
    try {
        createExampleArticle();
        console.log('✓ 基础示例文章创建完成');
        
        createWithPreset();
        console.log('✓ 预设模板文章创建完成');
        
        createBatchArticles();
        console.log('✓ 批量文章创建完成');
        
        createCustomThemeArticle();
        console.log('✓ 自定义主题文章创建完成');
        
        console.log('\n所有示例文章创建完成！');
    } catch (error) {
        console.error('创建示例文章时出错:', error);
    }
}
