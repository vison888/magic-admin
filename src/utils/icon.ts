import React from 'react';
import * as allIcons from '@ant-design/icons';

const fixMenuItemIcon = (icon :string): any => {
    let fixIconName = icon.slice(0, 1).toLocaleUpperCase() + icon.slice(1) + "Outlined";
    const icon2 = React.createElement(allIcons[fixIconName] || allIcons[icon]);
    return icon2
};

export default fixMenuItemIcon;
