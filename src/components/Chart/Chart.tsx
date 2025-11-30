import type {FC} from "react";
import {type IPricePoint} from '../../hooks';
import {PriceChart} from './PriceChart';
import {Timeframes, type TTimeframeType} from './Timeframes';


import styles from './Chart.module.scss';

interface IChartProps {
    data: IPricePoint[];
    currentPrice: number;
    timeframe: TTimeframeType;
    setTimeframe: (tf: TTimeframeType) => void;
}

export const Chart: FC<IChartProps> = (props) => {
    const {data, setTimeframe, timeframe} = props;

    return (
        <div className={styles.chartWrapper}>
            <PriceChart data={data}/>
            <Timeframes active={timeframe} onChange={setTimeframe}/>
            <div className={styles.pagination}>
                <span className={styles.dot}/>
                <span className={`${styles.dot} ${styles.active}`}/>
                <span className={styles.dot}/>
                <span className={styles.dot}/>
                <span className={styles.dot}/>
            </div>
        </div>
    );
};