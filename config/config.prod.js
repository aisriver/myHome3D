import pageRoutes from './route.config';

export default {
  routes: pageRoutes,
  targets: {
    ie: 11,
  },
  history: 'hash',
  outputPath: './build',
  publicPath: './',
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
        pwa: false,
        fastClick: true,
      },
    ],
  ],
  exportStatic: true, // 如果有动态路由，这个地方改成false
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  define: {
    'process.env.PROD': JSON.stringify(true),
  },
  chainWebpack(config) {
    config.output
      .filename('[name].[chunkhash].bundle.js')
      .chunkFilename('[name].[chunkhash].bundle.js')
      .hashFunction('sha256')
      .hashDigest('hex')
      .hashDigestLength(20);
    config.optimization.splitChunks({
      chunks: 'all',
      minSize: 20000,
      minChunks: 4,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
      },
    });
  },
};
