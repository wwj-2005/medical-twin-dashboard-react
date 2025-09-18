import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';

type Ctx = {
  hr?: number;
  spo2?: number;
  resp?: number;
  temp?: number;
  sys?: number;
  dia?: number;
  map?: number;
  ecgSeries: React.MutableRefObject<number[]>;
  abpSeries: React.MutableRefObject<number[]>;
};

const VitalsContext = createContext<Ctx | null>(null);

export const VitalsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hr, setHr] = useState<number>();
  const [spo2, setSpo2] = useState<number>();
  const [resp, setResp] = useState<number>();
  const [temp, setTemp] = useState<number>();
  const [sys, setSys] = useState<number>();
  const [dia, setDia] = useState<number>();
  const [map, setMap] = useState<number>();

  const ecgSeries = useRef<number[]>(new Array(1000).fill(0));
  const abpSeries = useRef<number[]>(new Array(1000).fill(80));

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8081');
    ws.onmessage = (ev) => {
      try {
        const m = JSON.parse(ev.data);
        if (typeof m.hr === 'number') setHr(m.hr);
        if (typeof m.spo2 === 'number') setSpo2(m.spo2);
        if (typeof m.resp === 'number') setResp(m.resp);
        if (typeof m.temp === 'number') setTemp(m.temp);
        if (typeof m.sys === 'number') setSys(m.sys);
        if (typeof m.dia === 'number') setDia(m.dia);
        if (typeof m.map === 'number') setMap(m.map);
        if (typeof m.ecg === 'number') {
          ecgSeries.current.push(m.ecg);
          if (ecgSeries.current.length > 1000) ecgSeries.current.splice(0, ecgSeries.current.length - 1000);
        }
        if (typeof m.abp === 'number') {
          abpSeries.current.push(m.abp);
          if (abpSeries.current.length > 1000) abpSeries.current.splice(0, abpSeries.current.length - 1000);
        }
      } catch {}
    };
    return () => ws.close();
  }, []);

  const value = useMemo(() => ({ hr, spo2, resp, temp, sys, dia, map, ecgSeries, abpSeries }), [hr, spo2, resp, temp, sys, dia, map]);

  return <VitalsContext.Provider value={value}>{children}</VitalsContext.Provider>;
};

export const useVitals = () => {
  const ctx = useContext(VitalsContext);
  if (!ctx) throw new Error('useVitals must be used within VitalsProvider');
  return ctx;
};