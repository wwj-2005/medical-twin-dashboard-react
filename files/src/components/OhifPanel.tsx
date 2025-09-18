import React from 'react';

export default function OhifPanel() {
  const url = 'http://localhost:3002';
  return (
    <div className="ohif">
      <div className="panel-title">影像工作站（OHIF）</div>
      <iframe title="OHIF Viewer" src={url} className="ohif-iframe" />
      <div className="tip">如未加载，请先启动 docker compose 并上传 DICOM 至 Orthanc。</div>
    </div>
  );
}