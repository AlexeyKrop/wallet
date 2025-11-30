import {useEffect, useMemo, useRef, useState} from 'react';

export interface IPricePoint {
    time: number;
    value: number;
}

type Timeframe = '15S' | '1M' | '1H' | '1D';

const generateMockData = (timeframe: Timeframe): IPricePoint[] => {
    const now = Math.floor(Date.now() / 1000);
    const data: IPricePoint[] = [];
    let points: number;
    let interval: number;

    switch (timeframe) {
        case '15S':
            points = 60;
            interval = 15;
            break;
        case '1M':
            points = 60;
            interval = 60;
            break;
        case '1H':
            points = 24;
            interval = 3600;
            break;
        case '1D':
            points = 30;
            interval = 86400;
            break;
    }

    let price = 15000;

    for (let i = points; i >= 0; i--) {
        const change = (Math.random() - 0.5) * 100;
        price = Math.max(14500, Math.min(15500, price + change));

        data.push({
            time: now - (i * interval),
            value: parseFloat(price.toFixed(2)),
        });
    }

    return data;
};

export const usePriceData = () => {
    const [timeframe, setTimeframe] = useState<Timeframe>('1M');
    const [data, setData] = useState<IPricePoint[]>(() => generateMockData('1M'));
    const intervalRef = useRef<number | null>(null);

    const initialData = useMemo(() => generateMockData(timeframe), [timeframe]);

    useEffect(() => {
        setData(initialData);
    }, [initialData]);

    useEffect(() => {
        if (timeframe === '15S' || timeframe === '1M') {
            const updateInterval = timeframe === '15S' ? 2000 : 5000;

            intervalRef.current = setInterval(() => {
                setData(prevData => {
                    const lastPoint = prevData[prevData.length - 1];
                    const change = (Math.random() - 0.5) * 50;
                    const newPrice = parseFloat(
                        Math.max(14500, Math.min(15500, lastPoint.value + change)).toFixed(2)
                    );

                    const newPoint: IPricePoint = {
                        time: Math.floor(Date.now() / 1000),
                        value: newPrice,
                    };

                    return [...prevData.slice(-59), newPoint];
                });
            }, updateInterval);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [timeframe]);


    const currentPrice = data.length > 0 ? data[data.length - 1].value : 15069.12;
    const change24h = ((currentPrice - 15000) / 15000) * 100;

    return {
        data,
        currentPrice,
        change24h,
        timeframe,
        setTimeframe,
    };
};