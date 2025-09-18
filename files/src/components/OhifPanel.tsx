import React from 'react';

export default function OhifPanel() {
  const url = (import.meta as any).env?.VITE_OHIF_URL || 'http://localhost:3002';
  return (
    <div className="ohif">
      <div className="panel-title">影像工作站（OHIF）</div>
      <iframe title="OHIF Viewer" src={url} className="ohif-iframe" />
      <div className="tip">如未加载，请确保 OHIF 服务已启动，并且 app-config 指向本机 Orthanc。</div>
    </div>
  );
}