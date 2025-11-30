import {TradingPair} from '../TradingPair/TradingPair.tsx';
import {WalletConnect} from '../WalletConnect/WalletConnect.tsx';

import styles from './TopBar.module.scss';

export const TopBar = () => {
    return (
        <div className={styles.topBar}>
            <TradingPair/>
            <WalletConnect/>
        </div>
    );
};