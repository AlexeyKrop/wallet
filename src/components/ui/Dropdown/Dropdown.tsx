import {type ReactNode, useState, useRef, useEffect} from 'react';
import {RiArrowDropDownLine} from "@remixicon/react";

import styles from './Dropdown.module.scss';

export interface IDropdownOption {
    label: string;
    value: string;
    icon?: ReactNode;
    disabled?: boolean;
    secondaryLabel?: string;
}

interface DropdownProps {
    value: string;
    options: IDropdownOption[];
    onChange?: (value: string) => void;
    placeholder?: string;
    icon?: ReactNode;
    disabled?: boolean;
    className?: string;
    triggerClassName?: string;
}

export const Dropdown = ({
                             value,
                             options,
                             onChange,
                             placeholder = 'Select',
                             icon,
                             disabled = false,
                             className = '',
                             triggerClassName = '',
                         }: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find(opt => opt.value === value);

    const toggleDropdown = () => {
        if (!disabled) {
            setIsOpen(!isOpen);
        }
    };

    const handleSelect = (optionValue: string) => {
        if (onChange) {
            onChange(optionValue);
        }
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const classes = [
        styles.dropdown,
        disabled && styles.disabled,
        className,
    ]
        .filter(Boolean)
        .join(' ');

    const triggerClasses = [
        styles.trigger,
        triggerClassName,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <div ref={dropdownRef} className={classes}>
            <div className={triggerClasses} onClick={toggleDropdown}>
                {icon && <span className={styles.icon}>{icon}</span>}
                <span className={styles.label}>
                    {selectedOption?.label || placeholder}
                    {selectedOption?.secondaryLabel && (
                        <span className={styles.secondaryLabel}>{selectedOption.secondaryLabel}</span>
                    )}
                </span>
                <RiArrowDropDownLine size={24} className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`}/>
            </div>

            {isOpen && (
                <div className={styles.menu}>
                    {options.map((option) => {
                        const optionClasses = [
                            styles.option,
                            option.value === value && styles.selected,
                            option.disabled && styles.optionDisabled,
                        ]
                            .filter(Boolean)
                            .join(' ');

                        return (
                            <div
                                key={option.value}
                                className={optionClasses}
                                onClick={() => !option.disabled && handleSelect(option.value)}
                            >
                                {option.icon && <span className={styles.optionIcon}>{option.icon}</span>}
                                <span>{option.label}</span>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};