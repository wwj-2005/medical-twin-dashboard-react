import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { useVitals } from '../vitals/VitalsProvider';

export default function WaveformChart({ title, topic, unit }:{ title: string; topic: 'ecg' | 'abp'; unit?: string; }) {
  const ref = useRef<HTMLDivElement>(null);
  const chartRef = useRef<echarts.EChartsType>();
  const { ecgSeries, abpSeries } = useVitals();

  useEffect(() => {
    if (!ref.current) return;
    chartRef.current = echarts.init(ref.current, undefined, { renderer: 'canvas' });
    chartRef.current.setOption({
      backgroundColor: 'rgba(0,0,0,0)',
      title: { text: title, textStyle: { color: '#8ef' }, left: '2%' },
      grid: { left: 40, right: 10, top: 28, bottom: 20 },
      xAxis: { type: 'category', boundaryGap: false, axisLine: { lineStyle: { color: '#0a3b5e' } }, axisLabel: { show: false }, data: new Array(1000).fill('') },
      yAxis: { type: 'value', axisLine: { lineStyle: { color: '#0a3b5e' } }, axisLabel: { color: '#88b' }, splitLine: { lineStyle: { color: '#08263a' } }, name: unit || '', nameTextStyle: { color: '#88b' } },
      series: [{ type: 'line', data: new Array(1000).fill(0), showSymbol: false, smooth: true, lineStyle: { color: '#1bd' } }]
    });

    const loop = () => {
      const data = topic === 'ecg' ? ecgSeries.current : abpSeries.current;
      chartRef.current?.setOption({ series: [{ data }] });
      req = requestAnimationFrame(loop);
    };
    let req = requestAnimationFrame(loop);

    const onResize = () => chartRef.current?.resize();
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(req); window.removeEventListener('resize', onResize); chartRef.current?.dispose(); };
  }, [topic, title, unit]);

  return <div ref={ref} className="chart" />;
}