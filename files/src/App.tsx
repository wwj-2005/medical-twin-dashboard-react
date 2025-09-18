import React from 'react';
import KPIs from './components/KPIs';
import WaveformChart from './components/WaveformChart';
import Heart3D from './components/Heart3D';
import OhifPanel from './components/OhifPanel';
import { VitalsProvider } from './vitals/VitalsProvider';

function App() {
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
          <OhifPanel />
        </aside>

        <footer className="footer">
          WS: ws://localhost:8081 · OHIF: http://localhost:3002 · Orthanc: http://localhost:8042
        </footer>
      </div>
    </VitalsProvider>
  );
}

export default App;