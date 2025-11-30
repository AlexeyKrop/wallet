import {type ReactNode, type ButtonHTMLAttributes} from 'react';

import styles from './Button.module.scss';

type ButtonVariant = 'primary' | 'success' | 'danger' | 'warning' | 'ghost' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    fullWidth?: boolean;
    loading?: boolean;
    icon?: ReactNode;
    iconPosition?: 'left' | 'right';
    iconOnly?: boolean;
    textClassName?: string;
    disableContentWrapper?: boolean;
}

export const Button = ({
                           children,
                           variant = 'primary',
                           size = 'md',
                           fullWidth = false,
                           loading = false,
                           icon,
                           iconPosition = 'left',
                           disabled,
                           className = '',
                           iconOnly,
                           textClassName,
                           disableContentWrapper = false,
                           ...props
                       }: ButtonProps) => {
    const classes = [
        styles.button,
        styles[variant],
        styles[size],
        fullWidth && styles.fullWidth,
        loading && styles.loading,
        className,
    ]
        .filter(Boolean)
        .join(' ');

    const renderContent = () => {
        if (loading) {
            return <span className={styles.spinner}/>;
        }

        if (iconOnly) {
            return children;
        }


        if (disableContentWrapper) {
            return children;
        }

        return (
            <>
                {icon && iconPosition === 'left' && (
                    <span className={styles.icon}>{icon}</span>
                )}
                <span className={`${styles.content} ${textClassName}`}>{children}</span>
                {icon && iconPosition === 'right' && (
                    <span className={styles.icon}>{icon}</span>
                )}
            </>
        );
    };

    return (
        <button className={classes} disabled={disabled || loading} {...props}>
            {renderContent()}
        </button>
    );
};
