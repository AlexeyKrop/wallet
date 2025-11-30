import {RiArrowDownSLine, RiCloseLargeLine, RiMoreLine} from "@remixicon/react";
import {Button} from "../ui";

import styles from './Header.module.scss';

export const Header = () => {
    const handleMenuClick = () => {
    };

    const handleCloseClick = () => {
    };

    return (
        <div className={styles.header}>
            <div className={styles.menuButton} onClick={handleMenuClick}>
                <Button variant="ghost" iconOnly disabled={true}>
                    <RiMoreLine size={36} />
                </Button>
                <Button variant="ghost" iconOnly disabled={true}>
                    <RiArrowDownSLine size={24} />
                </Button>
            </div>

            <h1 className={styles.title}>Mini App</h1>

            <Button variant="ghost" iconOnly onClick={handleCloseClick} disabled={true}>
                <RiCloseLargeLine size={20} />
            </Button>
        </div>
    );
};