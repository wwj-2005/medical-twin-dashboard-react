# 数字孪生 · 医疗大屏（React 模板）

本模板演示了一个手术/监护场景的大屏原型：
- Vite + React + TS
- ECharts：KPI、ECG/血压波形
- three.js：3D 心脏占位（可替换为真实器官/人体 GLTF 或医学体渲染）
- Orthanc（DICOM）+ OHIF Viewer（可选；无 Docker 模式下默认关闭）
- Mock WebSocket（实时生命体征和波形）

## 快速开始

### A) 无 Docker 模式（无需 Docker Desktop）
无需安装 Docker，先把左侧 KPI/波形 + 3D 心脏跑通，OHIF 默认关闭。

1. 安装 Node.js（建议 18 或 20）
2. 启动：
```bash
npm i
npm run dev:nodocker
```
这会并行启动：
- 前端开发服务（Vite）
- Mock WebSocket（自动为 mock-ws 安装依赖后运行）

3. 打开浏览器访问：
- 大屏前端：http://localhost:5173

如需显示 OHIF，请见"启用 OHIF（非 Docker）"。

### B) Docker 模式（一键起 Orthanc + OHIF + Mock WS）
```bash
docker compose up -d
npm i
npm run dev
```
- Orthanc：http://localhost:8042
- OHIF Viewer：http://localhost:3002
- 大屏前端：http://localhost:5173

## 环境变量（Vite）
复制一份 `.env.example` 为 `.env`，按需修改：
```ini
VITE_ENABLE_OHIF=false        # 无 Docker 模式默认关闭；改为 true 启用 OHIF 面板
VITE_WS_URL=ws://localhost:8081
VITE_OHIF_URL=http://localhost:3002
```

## 启用 OHIF（非 Docker）
如果你不使用 Docker，也可以本机运行 OHIF（或连接已有的 OHIF 服务）：
- 将 `.env` 中 `VITE_ENABLE_OHIF=true`，并把 `VITE_OHIF_URL` 指向可访问的 OHIF 地址。
- 右侧 OHIF 面板即会显示该地址的 Viewer。
- 若你本机安装了 Orthanc，请确保其 DICOMweb 可从浏览器访问（通常是 http://localhost:8042/dicom-web），并在 OHIF 的 app-config 中指向它。

## 上传 DICOM（Docker 模式）
- 浏览器打开 http://localhost:8042 使用 Orthanc Web 上传。
- 或用 `storescu`/`curl` 发送到 `localhost:4242`。

## 自定义
- 3D 模型：将 `Heart3D` 替换为 three.js 加载 GLTF/GLB（推荐 Z-Anatomy 模型）或改用 `vtk.js` 做医学体渲染。
- 波形：修改 `mock-ws/server.js`，前端从 `VitalsProvider` 读取。
- UI：在 `src/styles.css` 和 ECharts 主题上调整风格。

## 常见问题
- OHIF 面板为空：检查 `.env` 是否把 `VITE_ENABLE_OHIF` 设为 `true`，且 `VITE_OHIF_URL` 可访问；或使用 Docker 模式一键启动。
- WebSocket 连接失败：确认 `npm run dev:nodocker` 的终端日志里 mock-ws 是否在 8081 端口监听；或修改 `VITE_WS_URL`。

MIT License.