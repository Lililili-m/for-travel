# 文章组件系统

这是一个用于快速创建统一风格文章页面的组件系统，基于原有的 `shengri.html` 文件抽离而来。

## 文件结构

```
src/
├── styles/
│   ├── common.css          # 公共基础样式
│   └── theme.css           # 主题色彩变量
├── components/
│   ├── article-template.js # 文章模板组件
│   ├── article-generator.js # 文章生成器
│   ├── example-usage.js    # 使用示例
│   └── README.md          # 说明文档
└── pages/
    └── insights/
        └── shengri.html    # 重构后的示例页面
```

## 核心组件

### 1. ArticleTemplate 类

文章模板的核心类，负责生成HTML内容。

**基本用法：**
```javascript
const ArticleTemplate = require('./article-template.js');

const template = new ArticleTemplate({
    title: '文章标题',
    theme: 'default', // 主题：default, blue, green, purple, orange
    articleTitle: '文章标题',
    content: [
        '第一段内容',
        '第二段内容'
    ],
    navigation: {
        show: true,
        buttons: [
            { text: '返回列表', url: '../insights.html' },
            { text: '下一篇', url: 'next.html' }
        ]
    }
});

// 生成HTML
const html = template.generateHTML();

// 保存到文件
template.saveToFile('./my-article.html');
```

### 2. ArticleGenerator 类

提供链式API的文章生成器，使用更加便捷。

**基本用法：**
```javascript
const { ArticleGenerator } = require('./article-generator.js');

new ArticleGenerator()
    .createArticle({
        title: '我的文章',
        content: ['文章内容']
    })
    .setTheme('blue')
    .setTitle('新标题')
    .save('./my-article.html');
```

### 3. ArticleUtils 工具类

提供预设模板和快速创建方法。

**预设模板：**
- `insights` - 人生感悟类（默认主题）
- `youth` - 青春回忆类（蓝色主题）
- `serenity` - 宁静时光类（绿色主题）
- `preface` - 前言序言类（紫色主题）

**快速创建：**
```javascript
const { ArticleUtils } = require('./article-generator.js');

// 使用预设模板
ArticleUtils.createByType('insights', '文章标题', ['内容'])
    .save('./article.html');

// 批量创建
ArticleUtils.createBatch([
    { type: 'insights', title: '文章1', content: ['内容1'] },
    { type: 'youth', title: '文章2', content: ['内容2'] }
]);
```

## 主题系统

### 可用主题

1. **default** - 温暖粉色系（原 shengri.html 风格）
2. **blue** - 蓝色系
3. **green** - 绿色系
4. **purple** - 紫色系
5. **orange** - 橙色系

### 自定义主题

可以通过添加CSS变量来自定义主题：

```css
.theme-custom {
    --primary-color: #your-color;
    --primary-hover: #your-hover-color;
    --background-gradient: linear-gradient(135deg, #color1, #color2);
    --title-color: #your-title-color;
    --title-border: #your-border-color;
}
```

## 配置参数

### ArticleTemplate 配置

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | String | '文章标题' | 页面标题 |
| theme | String | 'default' | 主题名称 |
| backUrl | String | '../insights.html' | 返回链接 |
| backIcon | String | '../../assets/ic_arrow_left_bt.svg' | 返回图标 |
| articleTitle | String | '文章标题' | 文章标题 |
| content | Array/String | [] | 文章内容 |
| navigation | Object | { show: true, buttons: [] } | 导航配置 |
| customStyles | String | '' | 自定义CSS |

### 导航配置

```javascript
navigation: {
    show: true, // 是否显示导航
    buttons: [
        { text: '按钮文字', url: '链接地址' }
    ]
}
```

## 使用示例

### 1. 创建简单文章

```javascript
const { ArticleGenerator } = require('./article-generator.js');

new ArticleGenerator()
    .createArticle({
        title: '简单文章',
        content: ['这是文章内容。']
    })
    .save('./simple-article.html');
```

### 2. 使用预设模板

```javascript
const { ArticleUtils } = require('./article-generator.js');

ArticleUtils.createByType('youth', '青春回忆', [
    '这是青春回忆的内容。',
    '可以有多段内容。'
]).save('./youth-article.html');
```

### 3. 自定义主题

```javascript
new ArticleGenerator()
    .createArticle({
        title: '自定义主题文章',
        content: ['内容'],
        customStyles: `
            .article h2 {
                color: #ff6b6b;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            }
        `
    })
    .save('./custom-article.html');
```

### 4. 批量创建

```javascript
const articles = [
    { type: 'insights', title: '感悟1', content: ['内容1'] },
    { type: 'youth', title: '青春1', content: ['内容2'] },
    { type: 'serenity', title: '宁静1', content: ['内容3'] }
];

ArticleUtils.createBatch(articles).forEach((generator, index) => {
    generator.save(`./article-${index + 1}.html`);
});
```

## 运行示例

```bash
# 在 components 目录下运行
node example-usage.js
```

这将创建多个示例文章文件，展示不同的使用方式。

## 优势

1. **代码复用** - 避免重复的HTML和CSS代码
2. **主题统一** - 所有文章保持一致的视觉风格
3. **快速开发** - 通过配置快速生成文章页面
4. **易于维护** - 样式和结构集中管理
5. **灵活扩展** - 支持自定义主题和样式
6. **批量处理** - 支持批量创建文章

## 注意事项

1. 确保样式文件路径正确
2. 图片资源路径需要根据实际位置调整
3. 自定义样式会覆盖默认样式
4. 内容数组会自动转换为段落标签