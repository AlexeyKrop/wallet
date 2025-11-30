import type {FC} from "react";
import {RiHeartFill, RiSettings2Line} from '@remixicon/react'
import {Button} from '../ui';

import styles from './PriceDisplay.module.scss';


interface IPriceDisplayProps {
    price: number;
    change: number;
}

export const PriceDisplay: FC<IPriceDisplayProps> = (props) => {
    const {price, change} = props
    const formatPrice = (price: number) => {
        const [integer, decimal] = price.toFixed(2).split('.');
        return {integer, decimal};
    };

    const {integer, decimal} = formatPrice(price);
    const isPositive = change >= 0;

    return (
        <div className={styles.priceDisplay}>
            <div className={styles.priceSection}>
                <div className={styles.price}>
                    <span className={styles.integer}>{parseInt(integer)}</span>
                    <span className={styles.decimal}>.{decimal}</span>
                </div>
                <span className={`${styles.change} ${isPositive ? styles.positive : styles.negative}`}>
                    {isPositive ? '+' : '-'}{Math.abs(change).toFixed(1)}%
                </span>
            </div>

            <div className={styles.actions}>
                <Button variant="ghost" iconOnly>
                    <RiHeartFill size={20}/>
                </Button>
                <Button variant="ghost" iconOnly>
                    <RiSettings2Line size={20}/>
                </Button>
            </div>
        </div>
    );
};