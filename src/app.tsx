import {  AvatarDropdown, AvatarName,Footer } from '@/components';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { SettingDrawer } from '@ant-design/pro-components';
import type { MenuDataItem } from '@umijs/route-utils';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history } from '@umijs/max';
import defaultSettings from '../config/defaultSettings';
import { errorConfig } from './requestErrorConfig';
import { userServiceGet } from '@/services/auth/userService';
import { permissionServiceGetMenu } from '@/services/auth/permissionService';
import React from 'react';
import { APPCODE } from '@/utils/const';
import { getUserId,getToken } from '@/utils/store';
import fixMenuItemIcon from '@/utils/icon';
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
      if (!token || !userId) {
        history.push(loginPath);
        return {};
      }

      const msg = await userServiceGet({
        id: userId,
        app_code: APPCODE,
      });

      if (msg.code !== 0) {
        history.push(loginPath);
        return {};
      }

      return {
        userId: msg?.item?.id,
        userName: msg?.item?.account,
        nickName: msg?.item?.nick_name,
        avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      };
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果不是登录页面，执行
  const { location } = history;
  if (location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings as Partial<LayoutSettings>,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
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
    //     const msg = await permissionServiceGetMenu({
    //       app_code: APPCODE,
    //     });
        
    //     let menuData:MenuDataItem[] = JSON.parse(msg.menu as string) as MenuDataItem[];
    //     menuData.map((item:MenuDataItem) => {
    //       item.icon = fixMenuItemIcon(item.icon)
    //       return item
    //     });
    //     return menuData
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
export const request = {
  ...errorConfig,
};
