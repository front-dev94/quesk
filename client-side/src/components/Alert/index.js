import React, { useState } from 'react';
import * as cn from 'classnames';

import './style.scss';

const Alert = ({
    className,
    children,
    type,
    icon,
    hasExtraSpace,
    isDismissible,
    avatar,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onPointerEnter,
    onPointerLeave
 }) => {

    const [isDismissed, setIsDismissed] = useState(false);

    const handleOnDismissClick = () => {
        setIsDismissed(!isDismissed)
    }

    const classes = cn(
        "alert",
        `alert-${type}`,
        {
        "alert-icon": !!icon,
        "mt-5 mb-6": hasExtraSpace,
        "alert-dismissible": isDismissible,
        "alert-avatar": !!avatar,
        },
        className
    );

    const events = {
        onClick: onClick,
        onMouseEnter: onMouseEnter,
        onMouseLeave: onMouseLeave,
        onPointerEnter: onPointerEnter,
        onPointerLeave: onPointerLeave
    };

    return (
        !isDismissed && (
            <div {...events} className={classes} role="alert">
                {isDismissible && (
                    <button className="close" onClick={() => handleOnDismissClick()}></button>
                )}
                {children}
            </div>
        )
    )
}

export default Alert;