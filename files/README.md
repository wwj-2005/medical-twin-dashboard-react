# 数字孪生 · 医疗大屏（React 模板）

本模板演示了一个手术/监护场景的大屏原型：
- Vite + React + TS
- ECharts：KPI、ECG/血压波形
- three.js：3D 心脏占位（可替换为真实器官/人体 GLTF 或医学体渲染）
- Orthanc（DICOM）+ OHIF Viewer（容器，内嵌到右侧面板）
- Mock WebSocket（容器）：实时生命体征和波形

## 快速开始

1. 安装依赖
```bash
npm i
```

2. 启动基础服务（Orthanc / OHIF / Mock WS）
```bash
docker compose up -d
```

3. 启动前端
```bash
npm run dev
```

4. 打开
- 大屏前端：http://localhost:5173
- Orthanc（上传 DICOM）：http://localhost:8042
- OHIF Viewer（独立访问）：http://localhost:3002

> 提示：当前 OHIF 已配置直连 `orthanc`（容器网络）。在大屏右侧面板中以 iframe 方式内嵌。

## 上传 DICOM

- 方法一：浏览器打开 http://localhost:8042 使用 Orthanc Web 上传。
- 方法二：用 `storescu` 或 curl 发送到 `localhost:4242`（DICOM C-STORE）。

## 自定义

- 3D 模型：将 `Heart3D` 替换为 three.js 加载 GLTF/GLB（推荐 Z-Anatomy 模型）或改用 `vtk.js` 做医学体渲染。
- 波形：在 `mock-ws/server.js` 中改造数据结构，前端从 `VitalsProvider` 中读取。
- UI：在 `src/styles.css` 和 ECharts 主题上调整成你参考图的“工业黑/荧光”风格。

## 生产化建议

- 设备数据接入：对接 OpenICE / 医疗网关，统一成 WebSocket/HTTP 流。
- 影像：将 Orthanc 挂载持久卷、配置鉴权（生产环境不要禁用认证）。
- 临床数据：用 FHIR 服务器（如 HAPI FHIR）承载病历、检验、用药等结构化数据。

MIT License.