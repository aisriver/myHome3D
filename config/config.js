import routeConfig from './route.config';

export default {
  routes: routeConfig,
  targets: {
    ie: 11,
  },
  block: {
    defaultGitUrl: 'https://github.com/aisriver/gl-blocks',
  },
  history: 'hash',
  outputPath: './build',
  publicPath: './',
  runtimePublicPath: true,
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: false,
        dva: false,
        dynamicImport: {
          webpackChunkName: true,
          loadingComponent: './components/Loading.tsx',
        },
        title: 'old 3D house',
        locale: {
          enable: true,
          default: 'zh-CN',
          baseNavigator: true,
        },
        library: 'react',
        dll: true,
        pwa: false,
        hardSource: false,
        fastClick: true,
      },
    ],
  ],
  minimizer: 'terserjs',
  exportStatic: {
    htmlSuffix: false,
  },
  treeShaking: true,
  autoprefixer: {
    browsers: ['> 1%', 'last 2 versions', 'not ie <= 10'],
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  define: {
    'process.env.PROD': JSON.stringify(false),
  },
};
