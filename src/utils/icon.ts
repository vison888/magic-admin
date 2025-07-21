import React from 'react';
import * as allIcons from '@ant-design/icons';

const fixMenuItemIcon = (icon: string): any => {
  if (!icon) {
    return null;
  }

  try {
    // 尝试直接使用图标名称
    if ((allIcons as any)[icon]) {
      return React.createElement((allIcons as any)[icon]);
    }

    // 尝试添加Outlined后缀
    const outlinedIconName = icon.slice(0, 1).toLocaleUpperCase() + icon.slice(1) + "Outlined";
    if ((allIcons as any)[outlinedIconName]) {
      return React.createElement((allIcons as any)[outlinedIconName]);
    }

    // 尝试添加Filled后缀
    const filledIconName = icon.slice(0, 1).toLocaleUpperCase() + icon.slice(1) + "Filled";
    if ((allIcons as any)[filledIconName]) {
      return React.createElement((allIcons as any)[filledIconName]);
    }

    // 尝试添加TwoTone后缀
    const twoToneIconName = icon.slice(0, 1).toLocaleUpperCase() + icon.slice(1) + "TwoTone";
    if ((allIcons as any)[twoToneIconName]) {
      return React.createElement((allIcons as any)[twoToneIconName]);
    }

    // 如果都找不到，返回默认图标
    console.warn(`Icon not found: ${icon}, using default icon`);
    return React.createElement(allIcons['QuestionOutlined']);
  } catch (error) {
    console.error(`Error creating icon for ${icon}:`, error);
    return React.createElement(allIcons['QuestionOutlined']);
  }
};

export default fixMenuItemIcon;
