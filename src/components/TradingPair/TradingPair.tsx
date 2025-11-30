import {useState} from 'react';
import {Dropdown, type IDropdownOption} from '../ui';
import BitcoinIcon from '../../assets/svg/btc.svg?react';



const tradingPairs: IDropdownOption[] = [
    {
        label: 'BTCDEGEN/USDC',
        value: 'BTCDEGEN/USDC',
        secondaryLabel: '100x',
        icon: <BitcoinIcon />,
    },
];

export const TradingPair = () => {
    const [selectedPair, setSelectedPair] = useState(tradingPairs[0].value);

    const currentPair = tradingPairs.find(p => p.value === selectedPair);

    return (
        <Dropdown
            value={selectedPair}
            options={tradingPairs}
            onChange={setSelectedPair}
            icon={currentPair?.icon}
        />
    );
};