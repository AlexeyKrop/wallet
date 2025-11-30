export interface IWallet {
    address: string;
    balance: number;
    name?: string;
}

export interface IUser {
    id: string;
    name: string;
    avatar?: string;
}

export interface IPosition {
    id: string;
    user: IUser;
    type: 'long' | 'short';
    leverage: string;
    timestamp: number;
    entry: number;
}

export const wallets: IWallet[] = [
    {
        address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
        balance: 15000.00,
        name: 'Main Wallet',
    },
    {
        address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
        balance: 25430.50,
        name: 'Trading Wallet',
    },
    {
        address: '0x1c4d4c2e5b8c9e8f7a3b2c1d0e9f8a7b6c5d4e3f',
        balance: 8750.25,
        name: 'Savings Wallet',
    },
];

export const users: IUser[] = [
    {
        id: '1',
        name: 'Gabriel',
    },
    {
        id: '2',
        name: 'Dany',
    },
    {
        id: '3',
        name: 'Alex',
    },
    {
        id: '4',
        name: 'Sarah',
    },
];

export const positions: IPosition[] = [
    {
        id: '1',
        user: users[1],
        type: 'long',
        leverage: '10',
        timestamp: Date.now() - 3600000,
        entry: 15040.00,
    },
    {
        id: '2',
        user: users[0],
        type: 'short',
        leverage: '100',
        timestamp: Date.now() - 1800000,
        entry: 15050.00,
    },
];

export const getRandomWallet = (): IWallet => {
    const randomIndex = Math.floor(Math.random() * wallets.length);
    return wallets[randomIndex];
};

export const getRandomUser = (): IUser => {
    const randomIndex = Math.floor(Math.random() * users.length);
    return users[randomIndex];
};