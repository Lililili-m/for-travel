# 章节预览组件使用说明

## 组件概述

`chapter-preview` 是一个可复用的自定义 Web 组件，用于显示章节标题和内容预览，支持点击跳转到详情页面。

## 使用方法

### 1. 引入组件脚本

在 HTML 页面中引入组件脚本：

```html
<script src="../../components/chapter-preview.js"></script>
```

### 2. 使用组件

在 HTML 中使用组件：

```html
<chapter-preview 
    title="章节标题" 
    preview="章节内容预览文本，超过两行会自动省略显示..."
    href="detail-page.html">
</chapter-preview>
```

### 3. 组件属性

| 属性名 | 类型 | 必需 | 说明 |
|--------|------|------|------|
| `title` | String | 是 | 章节标题 |
| `preview` | String | 是 | 内容预览文本 |
| `href` | String | 否 | 点击跳转的链接地址 |
| `color` | String | 否 | 主题颜色（默认：#D97974） |

### 4. 样式特性

- 响应式设计，支持移动端适配
- 悬停效果：卡片上浮、边框高亮
- 内容预览自动省略：超过两行显示省略号
- 标题左对齐，无横条装饰
- 组件间距：2rem
- 支持自定义主题颜色
- 与现有页面风格保持一致

### 5. 示例

```html
<div class="chapters-container">
    <chapter-preview 
        title="序" 
        preview="忘记从哪天起，开始帮伯伯编辑他的故事。以前，伯伯在我心中，就是一位遥远而又亲近的长辈..."
        href="xu.html"
        color="#D97974">
    </chapter-preview>
    
    <chapter-preview 
        title="前言" 
        preview="人生就是一场漫长的旅行，充满了未知与挑战，但也充满了美好与希望..."
        href="qianyan.html"
        color="#D97974">
    </chapter-preview>
</div>
```

## 注意事项

1. 确保组件脚本路径正确
2. 预览文本建议控制在合理长度，避免过长影响显示效果
3. 组件会自动处理点击跳转，无需额外 JavaScript 代码
4. 组件使用 Shadow DOM，样式隔离，不会影响页面其他元素
