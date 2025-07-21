// https://umijs.org/config/
import { defineConfig } from '@umijs/max';
import { join } from 'node:path';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';

const { REACT_APP_ENV = 'dev' } = process.env;

function getAntdSerials(color: string) {
  const lightNum = '0'.repeat(6);
  const reg = new RegExp(`^${color}${lightNum}`);
  return Array.from({ length: 10 }, (_, i) => {
    const num = Math.round((i + 1) * 10)
      .toString(16)
      .padStart(2, '0');
    return color + num + lightNum;
  });
}

// Ant Design 主题色算法，算法详见：https://ant.design/docs/spec/colors-cn
const generateTheme = () => {
  return {
    token: {
      // 主题色
      colorPrimary: '#1677ff',
    },
  };
};

const config = defineConfig({
  hash: true,
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    // https://umijs.org/docs/max/layout-menu
    locale: true,
    ...defaultSettings,
  },
  routes,
  theme: generateTheme(),
  esbuild: false,
  ignoreMomentLocale: true,
  manifest: {
    basePath: '/',
  },
  // Fast Refresh 热更新
  fastRefresh: true,
  presets: ['umi-presets-pro'],
  mfsu: {
    strategy: 'normal',
  },
  requestRecord: {},
  ...(REACT_APP_ENV === 'test'
    ? {
        define: {
          'process.env.UMI_ENV': 'test',
        },
      }
    : {}),
  ...(REACT_APP_ENV === 'dev' && {
    define: {
      'process.env.UMI_ENV': 'development',
    },
  }),
  ...(REACT_APP_ENV === 'pre' && {
    define: {
      'process.env.UMI_ENV': 'pre',
    },
  }),
  ...(REACT_APP_ENV === 'prod' && {
    define: {
      'process.env.UMI_ENV': 'production',
    },
  }),
  //============== 以下都是max的插件配置 ===============
  dataLoader: {},
  // 添加一个全局的 less 变量文件
  extraBabelPlugins: ['react-activation/babel'],
  lessLoader: {
    modifyVars: {
      // 在这里自定义主题色等样式
      '@primary-color': '#1677ff',
    },
    javascriptEnabled: true,
  },
  //配置代理
  proxy: proxy[REACT_APP_ENV as keyof typeof proxy],
  showUnusedFiles: true,
  metas: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1' },
    { name: 'description', content: 'Magic Admin - 企业级权限管理平台' },
    { name: 'keywords', content: 'Magic Admin, 权限管理, 企业级' },
    { name: 'author', content: 'Magic Admin Team' },
  ],
  headScripts: [
    // 解决首次加载时白屏的问题
    { src: '/scripts/loading.js', async: true },
  ],
  // 配置 external
  externals: {
    '@ant-design/icons': 'window.icons',
  },
  // 配置 scripts
  scripts: [
    // 如果没有 CDN，可以注释掉
    // { src: 'https://unpkg.com/@ant-design/icons@5.0.1/dist/index.umd.js' },
  ],
  npmClient: 'npm',
});

export default config;
