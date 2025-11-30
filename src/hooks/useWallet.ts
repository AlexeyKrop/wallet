import { useState } from 'react';
import {type IWallet, getRandomWallet } from '../services';

interface IWalletState {
    connected: boolean;
    wallet: IWallet | null;
    loading: boolean;
    error: string | null;
}

export const useWallet = () => {
    const [state, setState] = useState<IWalletState>({
        connected: false,
        wallet: null,
        loading: false,
        error: null,
    });

    const connect = async () => {
        setState(prev => ({ ...prev, loading: true, error: null }));

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            const shouldFail = Math.random() < 0.1;

            if (shouldFail) {
                throw new Error('Failed to connect wallet. Please try again.');
            }

            const wallet = getRandomWallet();

            setState({
                connected: true,
                wallet,
                loading: false,
                error: null,
            });
        } catch (error) {
            setState({
                connected: false,
                wallet: null,
                loading: false,
                error: error instanceof Error ? error.message : 'Unknown error occurred',
            });
        }
    };

    const disconnect = () => {
        setState({
            connected: false,
            wallet: null,
            loading: false,
            error: null,
        });
    };

    const clearError = () => {
        setState(prev => ({ ...prev, error: null }));
    };

    return {
        connected: state.connected,
        wallet: state.wallet,
        loading: state.loading,
        error: state.error,
        connect,
        disconnect,
        clearError,
    };
};