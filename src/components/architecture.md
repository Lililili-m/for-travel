# 文章组件系统架构图

## 系统架构

```mermaid
graph TB
    A[用户配置] --> B[ArticleGenerator]
    B --> C[ArticleTemplate]
    C --> D[HTML生成]
    D --> E[文章页面]
    
    F[预设模板] --> B
    G[主题系统] --> C
    H[样式文件] --> E
    
    subgraph "样式层"
        I[common.css<br/>基础样式]
        J[theme.css<br/>主题变量]
    end
    
    subgraph "组件层"
        K[ArticleTemplate<br/>核心模板类]
        L[ArticleGenerator<br/>生成器类]
        M[ArticleUtils<br/>工具类]
    end
    
    subgraph "预设层"
        N[insights<br/>人生感悟]
        O[youth<br/>青春回忆]
        P[serenity<br/>宁静时光]
        Q[preface<br/>前言序言]
    end
    
    H --> I
    H --> J
    B --> K
    B --> L
    B --> M
    M --> N
    M --> O
    M --> P
    M --> Q
```

## 组件关系图

```mermaid
classDiagram
    class ArticleTemplate {
        +config: Object
        +generateHTML() String
        +generateContent() String
        +generateNavigation() String
        +saveToFile(path) void
        +createArticle(options) ArticleTemplate
    }
    
    class ArticleGenerator {
        -template: ArticleTemplate
        +createArticle(config) ArticleGenerator
        +setTheme(theme) ArticleGenerator
        +setTitle(title) ArticleGenerator
        +setContent(content) ArticleGenerator
        +setNavigation(nav) ArticleGenerator
        +save(filePath) ArticleGenerator
        +getHTML() String
    }
    
    class ArticleUtils {
        +createByType(type, title, content) ArticleGenerator
        +createBatch(articles) Array
    }
    
    class ArticlePresets {
        +insights: Object
        +youth: Object
        +serenity: Object
        +preface: Object
    }
    
    ArticleGenerator --> ArticleTemplate : uses
    ArticleUtils --> ArticleGenerator : creates
    ArticleUtils --> ArticlePresets : references
```

## 主题系统架构

```mermaid
graph LR
    A[CSS变量系统] --> B[主题类]
    B --> C[默认主题]
    B --> D[蓝色主题]
    B --> E[绿色主题]
    B --> F[紫色主题]
    B --> G[橙色主题]
    
    H[HTML页面] --> I[theme-*类名]
    I --> B
    
    subgraph "CSS变量"
        J[--primary-color]
        K[--primary-hover]
        L[--background-gradient]
        M[--title-color]
        N[--title-border]
    end
    
    B --> J
    B --> K
    B --> L
    B --> M
    B --> N
```

## 文件结构图

```mermaid
graph TD
    A[src/] --> B[styles/]
    A --> C[components/]
    A --> D[pages/]
    
    B --> E[common.css<br/>基础样式]
    B --> F[theme.css<br/>主题变量]
    
    C --> G[article-template.js<br/>核心模板]
    C --> H[article-generator.js<br/>生成器]
    C --> I[example-usage.js<br/>使用示例]
    C --> J[README.md<br/>文档]
    
    D --> K[insights/<br/>人生感悟页面]
    D --> L[youth/<br/>青春回忆页面]
    D --> M[serenity/<br/>宁静时光页面]
    D --> N[preface/<br/>前言页面]
```

## 使用流程

```mermaid
sequenceDiagram
    participant U as 用户
    participant AG as ArticleGenerator
    participant AT as ArticleTemplate
    participant F as 文件系统
    
    U->>AG: 创建文章配置
    AG->>AT: 初始化模板
    AT->>AT: 生成HTML内容
    AT->>AG: 返回HTML
    AG->>F: 保存到文件
    F->>U: 返回文件路径
```

## 扩展点

1. **新主题添加** - 在 `theme.css` 中添加新的主题类
2. **预设模板扩展** - 在 `ArticlePresets` 中添加新的文章类型
3. **自定义样式** - 通过 `customStyles` 参数添加额外样式
4. **组件功能扩展** - 在 `ArticleTemplate` 中添加新的生成方法
