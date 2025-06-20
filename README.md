# 小依 AI 女友聊天系统

这是一个使用 **Next.js** 构建的网页端 AI 女友聊天示例。页面位于 `/pages/index.tsx`，后端接口位于 `/pages/api/chat.ts`，使用 OpenAI `gpt-3.5-turbo` 模型模拟软萌撒娇的“小依”。

## 本地运行

1. **安装依赖**
   ```bash
   npm install
   ```
2. **配置环境变量**
   ```bash
   cp .env.example .env
   # 编辑 .env 文件，填入你的 OpenAI API Key
   ```
3. **启动开发服务器**
   ```bash
   npm run dev
   ```

访问 <http://localhost:3000> 即可开始与小依聊天。

项目无需数据库和登录，部署简单。仅包含最基本的聊天界面与接口实现，便于学习和扩展。
