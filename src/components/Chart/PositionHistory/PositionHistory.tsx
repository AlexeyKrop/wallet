import {positions} from "../../../services";

import styles from './PositionHistory.module.scss';




export const PositionHistory = () => {
    return (
        <div className={styles.positionHistory}>
            {positions.map((position) => (
                <div key={position.id} className={styles.position}>
                    <div className={styles.user}>{position.user.name}</div>
                    <div className={styles.time}>{position.timestamp}</div>
                    <div className={styles.action}>
                        Opened {position.leverage === 'long' ? 'Long' : 'Short'} {position.leverage}
                    </div>
                </div>
            ))}
        </div>
    );
};