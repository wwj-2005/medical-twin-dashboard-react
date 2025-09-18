import React from 'react';
import { useVitals } from '../vitals/VitalsProvider';

const KPI = ({ label, value, unit }: { label: string; value: number | undefined; unit?: string }) => (
  <div className="kpi">
    <div className="kpi-label">{label}</div>
    <div className="kpi-value">{value !== undefined ? value.toFixed(0) : '--'} {unit}</div>
  </div>
);

export default function KPIs() {
  const { hr, spo2, resp, temp, sys, dia, map } = useVitals();
  return (
    <div className="kpis">
      <KPI label="HR" value={hr} unit="bpm" />
      <KPI label="SpO2" value={spo2} unit="%" />
      <KPI label="RESP" value={resp} unit="rpm" />
      <KPI label="TEMP" value={temp} unit="°C" />
      <KPI label="SYS" value={sys} unit="mmHg" />
      <KPI label="DIA" value={dia} unit="mmHg" />
      <KPI label="MAP" value={map} unit="mmHg" />
    </div>
  );
}