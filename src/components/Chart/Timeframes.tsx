import { Button } from '../ui';


import styles from './Chart.module.scss';

export type TTimeframeType = '15S' | '1M' | '1H' | '1D';

interface TimeframesProps {
    active: TTimeframeType;
    onChange: (timeframe: TTimeframeType) => void;
}

const timeframeList: TTimeframeType[] = ['15S', '1M', '1H', '1D'];

export const Timeframes = ({ active, onChange }: TimeframesProps) => {
    return (
        <div className={styles.timeframes}>
            {timeframeList.map((tf) => (
                <Button
                    key={tf}
                    variant={active === tf ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => onChange(tf)}
                    className={styles.timeframeButton}
                >
                    {tf}
                </Button>
            ))}
        </div>
    );
};