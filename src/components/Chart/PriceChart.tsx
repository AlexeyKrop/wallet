import {useEffect, useRef} from 'react';
import {
    AreaSeries,
    ColorType,
    createChart,
    type IChartApi,
    type ISeriesApi,
    type LineData,
    type Time
} from 'lightweight-charts';
import {type IPricePoint} from '../../hooks';

import styles from './Chart.module.scss';

interface PriceChartProps {
    data: IPricePoint[];
}

export const PriceChart = ({data}: PriceChartProps) => {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<IChartApi | null>(null);
    const seriesRef = useRef<ISeriesApi<'Area'> | null>(null);

    useEffect(() => {
        if (!chartContainerRef.current) return;

        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: {type: ColorType.Solid, color: 'transparent'},
                textColor: '#999999',
                attributionLogo: false,
            },
            grid: {
                vertLines: {visible: false},
                horzLines: {visible: false},
            },
            timeScale: {
                borderColor: '#2a2a2a',
                timeVisible: true,
                secondsVisible: false,
                barSpacing: 8,
                minBarSpacing: 0.5,
                fixLeftEdge: true,
                fixRightEdge: true,
            },

            rightPriceScale: {
                borderColor: '#2a2a2a',
            },
            autoSize: true,
        });

        const areaSeries = chart.addSeries(AreaSeries, {
            lineColor: '#ECBD75',
            topColor: 'rgba(236, 189, 117, 0.1)',
            lineWidth: 2,
            bottomColor: 'rgba(236, 189, 117, 0.001)',
            crosshairMarkerBorderColor: '#fff',
            crosshairMarkerBackgroundColor: '#fff',
            priceLineColor: '#4ade80',
        });

        chartRef.current = chart;
        seriesRef.current = areaSeries;

        return () => {
            chart.remove();
        };
    }, []);

    useEffect(() => {
        if (seriesRef.current && data.length > 0) {
            const formattedData: LineData[] = data.map(point => ({
                time: point.time as Time,
                value: point.value,
            }));

            seriesRef.current.setData(formattedData);
            requestAnimationFrame(() => {
                chartRef.current?.timeScale().fitContent();
            });

        }
    }, [data]);

    return <div ref={chartContainerRef} className={styles.chartContainer}/>;
};