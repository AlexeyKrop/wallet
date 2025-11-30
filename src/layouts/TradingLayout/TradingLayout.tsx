import {Chart, Header, PriceDisplay, TopBar, TradingPanel} from "../../components";
import {usePriceData} from "../../hooks";

import styles from './TradingLayout.module.scss';


export const TradingLayout = () => {
    const priceData = usePriceData();
    return (
        <div className={styles.layout}>
            <Header/>
            <TopBar/>
            <PriceDisplay
                price={priceData.currentPrice}
                change={priceData.change24h}
            />
            <Chart
                data={priceData.data}
                currentPrice={priceData.currentPrice}
                timeframe={priceData.timeframe}
                setTimeframe={priceData.setTimeframe}
            />
            <TradingPanel />
        </div>
    )
}