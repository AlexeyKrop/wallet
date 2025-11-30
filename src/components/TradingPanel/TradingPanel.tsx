import {useState} from 'react';
import {Button, Dropdown, type IDropdownOption} from '../ui';
import GiftIcon from '../../assets/svg/navigation.svg?react';
import ChartIcon from '../../assets/svg/stats.svg?react';
import RewardIcon from '../../assets/svg/egg.svg?react';
import UserIcon from '../../assets/svg/user.svg?react';

import styles from './TradingPanel.module.scss';

type TabType = 'trade' | 'positions' | 'rewards' | 'profile';

export const TradingPanel = () => {
    const [activeTab, setActiveTab] = useState<TabType>('trade');
    const [positionType, setPositionType] = useState<'long' | 'short'>('long');
    const [margin, setMargin] = useState('10');
    const [leverage, setLeverage] = useState('10');

    const marginOptions: IDropdownOption[] = [
        {label: 'Margin $5', value: '5'},
        {label: 'Margin $10', value: '10'},
        {label: 'Margin $25', value: '25'},
        {label: 'Margin $50', value: '50'},
    ];

    const leverageOptions: IDropdownOption[] = [
        {label: 'Leverage 5x', value: '5'},
        {label: 'Leverage 10x', value: '10'},
        {label: 'Leverage 25x', value: '25'},
        {label: 'Leverage 50x', value: '50'},
    ];

    return (
        <div className={styles.tradingPanel}>
            <div className={styles.controls}>
                <div className={styles.positionDetails}>Position details</div>

                <div className={styles.dropdowns}>
                    <Dropdown
                        value={margin}
                        options={marginOptions}
                        onChange={setMargin}
                        className={styles.dropdown}
                    />
                    <Dropdown
                        value={leverage}
                        options={leverageOptions}
                        onChange={setLeverage}
                        className={styles.dropdown}
                    />
                </div>
            </div>

            <div className={styles.positionButtons}>
                <Button
                    variant={positionType === 'long' ? 'success' : 'outline'}
                    onClick={() => setPositionType('long')}
                    disabled={true}
                >
                    Long
                </Button>
                <Button variant={'danger'} disabled={true} onClick={() => setPositionType('short')}>
                    Short
                </Button>
            </div>

            <div className={styles.tabs}>
                <Button
                    className={`${styles.tab} ${activeTab === 'trade' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('trade')}
                    disableContentWrapper
                >
                    <GiftIcon/>
                    <span>Trade</span>
                </Button>
                <Button
                    className={`${styles.tab} ${activeTab === 'positions' ? styles.activeTab : ''}`}
                    disableContentWrapper
                    disabled={true}
                >
                    <ChartIcon/>
                    <span>Positions</span>
                </Button>
                <Button
                    className={`${styles.tab} ${activeTab === 'rewards' ? styles.activeTab : ''}`}
                    disableContentWrapper
                    disabled={true}
                >
                    <span className={styles.badge}>345.29k</span>
                    <RewardIcon/>
                    <span>Rewards</span>
                </Button>
                <Button
                    className={`${styles.tab} ${activeTab === 'profile' ? styles.activeTab : ''}`}
                    disableContentWrapper
                    disabled={true}
                >
                    <UserIcon/>
                    <span>Profile</span>
                </Button>
            </div>
        </div>
    );
};