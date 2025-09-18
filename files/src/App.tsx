import React from 'react';
import KPIs from './components/KPIs';
import WaveformChart from './components/WaveformChart';
import Heart3D from './components/Heart3D';
import OhifPanel from './components/OhifPanel';
import { VitalsProvider } from './vitals/VitalsProvider';

function App() {
  const enableOhif = String((import.meta as any).env?.VITE_ENABLE_OHIF || '').toLowerCase() === 'true';
  const wsUrl = (import.meta as any).env?.VITE_WS_URL || 'ws://localhost:8081';
  const ohifUrl = (import.meta as any).env?.VITE_OHIF_URL || 'http://localhost:3002';

  return (
    <VitalsProvider>
      <div className="layout">
        <header className="header"><h1>数字孪生 · 医疗可视化大屏</h1></header>

        <aside className="left">
          <div className="panel"><KPIs /></div>
          <div className="panel"><WaveformChart title="ECG 心电波形" topic="ecg" unit="mV" /></div>
          <div className="panel"><WaveformChart title="动脉压" topic="abp" unit="mmHg" /></div>
        </aside>

        <main className="center panel">
          <Heart3D />
        </main>

        <aside className="right panel">
          {enableOhif ? (
            <OhifPanel />
          ) : (
            <div className="ohif">
              <div className="panel-title">影像工作站（OHIF）</div>
              <div className="tip">已启用"无 Docker 模式"，OHIF 面板暂时隐藏。设置 VITE_ENABLE_OHIF=true 并启动 OHIF 服务后显示。</div>
            </div>
          )}
        </aside>

        <footer className="footer">
          WS: {wsUrl} · OHIF: {ohifUrl} · Orthanc: http://localhost:8042
        </footer>
      </div>
    </VitalsProvider>
  );
}

export default App;