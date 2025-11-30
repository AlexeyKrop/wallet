import {useState} from 'react';
import {useWallet} from '../../hooks';
import {Dropdown, Button, type IDropdownOption} from '../ui';
import UsdcIcon from '../../assets/svg/usdc.svg?react';
import WalletIcon from '../../assets/svg/wallet.svg?react';

import styles from './WalletConnect.module.scss';


const ErrorIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
        <path
            d="M12 8v4M12 16h.01"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
        />
    </svg>
);

export const WalletConnect = () => {
    const {connected, wallet, loading, error, connect, disconnect, clearError} = useWallet();
    const [selectedAction, setSelectedAction] = useState('balance');

    const formatBalance = (balance: number) => {
        return balance.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    };

    const walletActions: IDropdownOption[] = [
        {
            label: formatBalance(wallet?.balance || 0),
            value: 'balance',
            icon: <UsdcIcon/>,
        }
    ];

    const handleWalletAction = (action: string) => {
        if (action === 'disconnect') {
            disconnect();
            setSelectedAction('balance');
        } else {
            setSelectedAction(action);
        }
    };

    if (connected && wallet) {
        return (
            <div className={styles.walletConnected}>
                <Dropdown
                    value={selectedAction}
                    options={walletActions}
                    onChange={handleWalletAction}
                    icon={<UsdcIcon/>}
                    triggerClassName={styles.connectedDropdown}
                />

                <Button variant="warning" size={'sm'} iconOnly className={styles.actionConnected}>
                    <WalletIcon/>
                </Button>
            </div>
        );
    }

    return (
        <div className={styles.walletContainer}>
            <Button onClick={connect} loading={loading} className={styles.action} textClassName={styles.actionConnect}>
                Connect Wallet
            </Button>

            {error && (
                <div className={styles.errorMessage}>
                    <ErrorIcon/>
                    <span>{error}</span>
                    <button className={styles.closeError} onClick={clearError}>
                        ×
                    </button>
                </div>
            )}
        </div>
    );
};