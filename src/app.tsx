// React 19 兼容性补丁 - 必须在其他导入之前
import '@ant-design/v5-patch-for-react-19';

import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { SettingDrawer } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history } from '@umijs/max';
import type { MenuDataItem } from '@umijs/route-utils';
import { Modal } from 'antd';
import React from 'react';
import { AvatarDropdown, AvatarName, Footer } from '@/components';
import { permissionServiceGetMenu } from '@/services/auth/permissionService';
import { userServiceGet } from '@/services/auth/userService';
import { APPCODE } from '@/utils/const';
import fixMenuItemIcon from '@/utils/icon';
import { getToken, getUserId } from '@/utils/store';
import defaultSettings from '../config/defaultSettings';
import { errorConfig } from './requestErrorConfig';

// 配置Modal全局设置
Modal.config({
  rootPrefixCls: 'ant',
});

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: USER.UserInfo;
  loading?: boolean;
  fetchUserInfo?: () => Promise<USER.UserInfo | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const token = getToken();
      const userId = getUserId();

      // 如果没有token或userId，直接跳转登录页
      if (!token || !userId) {
        history.push(loginPath);
        return undefined;
      }

      // 验证token有效性
      const msg = await userServiceGet({
        id: userId,
        app_code: APPCODE,
      });

      if (msg.code !== 0) {
        // token无效，清除本地存储并跳转登录页
        localStorage.removeItem('MAGIC_PLAT-token');
        localStorage.removeItem('MAGIC_PLAT-userId');
        history.push(loginPath);
        return undefined;
      }

      // 返回用户信息
      return {
        userId: msg?.item?.id,
        userName: msg?.item?.account,
        nickName: msg?.item?.nick_name,
        avatar:
          'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
        phone: msg?.item?.phone,
        email: msg?.item?.email,
      };
    } catch (error) {
      console.error('获取用户信息失败:', error);
      // 发生错误时清除本地存储并跳转登录页
      localStorage.removeItem('MAGIC_PLAT-token');
      localStorage.removeItem('MAGIC_PLAT-userId');
      history.push(loginPath);
      return undefined;
    }
  };

  // 检查当前路径
  const { location } = history;

  // 如果是登录页面，不执行用户信息获取
  if (location.pathname === loginPath) {
    return {
      fetchUserInfo,
      settings: defaultSettings as Partial<LayoutSettings>,
    };
  }

  // 其他页面需要验证用户登录状态
  const currentUser = await fetchUserInfo();

  // 如果用户信息获取成功，直接跳转到用户管理页面
  if (currentUser && location.pathname === '/') {
    history.push('/system/user');
  }

  return {
    fetchUserInfo,
    currentUser,
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({
  initialState,
  setInitialState,
}) => {
  return {
    avatarProps: {
      src: initialState?.currentUser?.avatar,
      title: <AvatarName />,
      render: (_, avatarChildren) => {
        return <AvatarDropdown menu={false}>{avatarChildren}</AvatarDropdown>;
      },
    },
    waterMarkProps: {
      content: initialState?.currentUser?.nickName,
    },
    footerRender: () => <Footer />,
    // menu: {
    //   request: async () => {
    //     try {
    //       const msg = await permissionServiceGetMenu({
    //         app_code: APPCODE,
    //       });

    //       if (msg.code === 0 && msg.menu) {
    //         let menuData: MenuDataItem[] = JSON.parse(
    //           msg.menu as string,
    //         ) as MenuDataItem[];
    //         menuData = menuData.map((item: MenuDataItem) => {
    //           item.icon = fixMenuItemIcon(item.icon);
    //           return item;
    //         });
    //         return menuData;
    //       }

    //       // 如果API失败，返回默认菜单
    //       const defaultMenu = [
    //         {
    //           path: '/welcome',
    //           name: '欢迎',
    //           icon: 'smile',
    //         },
    //         {
    //           path: '/system',
    //           name: '系统管理',
    //           icon: 'setting',
    //           children: [
    //             {
    //               path: '/system/user',
    //               name: '用户管理',
    //               icon: 'user',
    //             },
    //             {
    //               path: '/system/role',
    //               name: '角色管理',
    //               icon: 'team',
    //             },
    //             {
    //               path: '/system/permission',
    //               name: '权限管理',
    //               icon: 'key',
    //             },
    //             {
    //               path: '/system/resource',
    //               name: '资源管理',
    //               icon: 'database',
    //             },
    //             {
    //               path: '/system/app',
    //               name: '应用管理',
    //               icon: 'appstore',
    //             },
    //             {
    //               path: '/system/whitelist',
    //               name: '白名单管理',
    //               icon: 'safety-certificate',
    //             },
    //           ],
    //         },
    //       ];

    //       // 处理默认菜单的图标
    //       const processMenuIcons = (menuItems: MenuDataItem[]): MenuDataItem[] => {
    //         return menuItems.map((item) => {
    //           if (item.icon) {
    //             item.icon = fixMenuItemIcon(item.icon);
    //           }
    //           if (item.children) {
    //             item.children = processMenuIcons(item.children);
    //           }
    //           return item;
    //         });
    //       };

    //       return processMenuIcons(defaultMenu);
    //     } catch (error) {
    //       console.error('获取菜单失败:', error);
    //       return [];
    //     }
    //   },
    // },
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },

    menuHeaderRender: undefined,
    // 增加一个 loading 的状态
    childrenRender: (children) => {
      return (
        <>
          {children}
          {isDev && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = errorConfig;
