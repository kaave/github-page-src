/* eslint-disable import/no-extraneous-dependencies */
import { RuleSetLoader } from 'webpack';
import NuxtConfiguration from '@nuxt/config';
import Dotenv from 'dotenv';
import Fibers from 'fibers';
import Sass from 'sass';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import imageminWebp from 'imagemin-webp';
// import imageminGif2Webp from 'imagemin-gif2webp';
import axios from 'axios';
import format from 'date-fns/format';

Dotenv.config();

const graphCMSEndPoint = 'https://api-apeast.graphcms.com/v1/cjtk95ol51hpr01dnf53vq3ji/master';
const isDevelopment = process.env.NODE_ENV === 'development';

async function getPublishedEntries(): Promise<string[]> {
  const {
    data: {
      data: { entries },
    },
  } = await axios.post(
    graphCMSEndPoint,
    { query: 'query { entries { publish } }', variables: { orderBy: 'publish_DESC' } },
    { headers: { 'Content-Type': 'application/json' } },
  );

  return entries.map(({ publish }) => format(new Date(publish), 'YYYY-MM-DD'));
}

/*
 * common
 */
const host = process.env.HOST || 'localhost';
const port = parseInt(process.env.PORT || '3000', 10);
const baseUrl = process.env.BASE_URL || `http://${host}:${port}`;
const polyfills = ['default', 'es2015', 'es2016', 'es2017', 'IntersectionObserver'];

/*
 * meta
 */
const title = 'kaave.github.io';
const description = '愛知県在住ソフトウェアエンジニアの@kaaveこと安部亨佑のWebサイトです。';
const metaImage = 'https://dummyimage.com/300x200/3b8070/fff.png&text=Nuxt.js+template';

const og = [
  { property: 'og:title', content: title },
  { property: 'og:description', content: description },
  { property: 'og:image', content: metaImage },
  { property: 'og:type', content: 'website' },
  { property: 'og:url', content: baseUrl },
  { property: 'og:site_name', content: title },
];
const twitter = [
  { property: 'twitter:card', content: 'summary_large_image' },
  // { property: "twitter:site", content: "@BarackObama" }
];
const meta = [
  { charset: 'utf-8' },
  { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  { hid: 'description', name: 'description', content: description },
  { hid: 'itempropName', itemprop: 'name', content: title },
  { hid: 'itempropDesc', itemprop: 'description', content: description },
  { hid: 'itempropImage', itemprop: 'image', content: metaImage },
  {
    hid: 'format-detection',
    name: 'format-detection',
    content: 'email=no,telephone=no,address=no',
  },
  { hid: 'robots', name: 'robots', content: 'noindex' }, // TODO: 完成まで隠す
  ...og,
  ...twitter,
];

async function getNuxtConfig(isDev: boolean) {
  const config: NuxtConfiguration = {
    mode: 'universal',
    srcDir: './src',
    head: {
      title,
      meta,
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
      script: [
        {
          src: `https://polyfill.io/v3/polyfill.min.js?features=${polyfills.join('%2C')}&flags=gated`,
          type: 'text/javascript',
          body: true,
          defer: true,
          crossorigin: 'anonymous',
        },
      ],
    },
    loading: { color: '#fff' },
    css: ['sanitize.css', '~/styles/global.scss'],
    plugins: ['~/plugins/isMobile.ts', '~/plugins/observeVisibility.ts'],
    modules: [
      '@nuxtjs/axios',
      '@nuxtjs/dotenv',
      '@nuxtjs/style-resources',
      'nuxt-webfontloader',
      '@nuxtjs/apollo',
      '@nuxtjs/markdownit',
    ],
    apollo: {
      clientConfigs: {
        default: {
          httpEndpoint: graphCMSEndPoint,
          // wsEndpoint: 'ws://localhost:4000/graphql',
          // websocketsOnly: true,
        },
      },
    },
    axios: {},
    styleResources: {
      scss: ['~/styles/_variables.scss', '~/styles/_mixins.scss'],
    },
    markdownit: {
      preset: 'default',
      injected: true,
      linkify: true,
      breaks: true,
      use: ['markdown-it-attrs', 'markdown-it-prism'],
    },
    webfontloader: {
      google: {
        families: ['Crimson+Text:400,700'], // set your favorite fonts
      },
    },
    build: {
      postcss: {
        plugins: {
          'postcss-custom-properties': {},
          'postcss-color-hex-alpha': {},
          'postcss-calc': {},
          'postcss-flexbugs-fixes': {},
          'postcss-url': {},
          '@fullhuman/postcss-purgecss': {
            content: ['./src/pages/**/*.vue', './src/layouts/**/*.vue', './src/components/**/*.vue'],
            whitelist: ['html', 'body'],
          },
          cssnano: {
            safe: true,
            calc: false,
          },
        },
        preset: {
          autoprefixer: {
            grid: true,
          },
        },
      },
      loaders: {
        scss: {
          implementation: Sass,
          fiber: Fibers,
        },
      },
      extend(nuxtConfig, ctx) {
        if (!ctx.isDev && nuxtConfig.module) {
          /*
           * set production tsconfig
           */
          const tsconfigPath = `${process.cwd()}/tsconfig.production.json`;

          const tsRules = nuxtConfig.module.rules
            .filter(rule => rule.test instanceof RegExp && (rule.test.test('.ts') || rule.test.test('.tsx')))
            .map(rule => (rule.use as RuleSetLoader[]).filter(use => use.loader === 'ts-loader'))
            .reduce((tmp, ary) => [...ary, ...tmp], []);

          tsRules.forEach(rule => {
            if (rule.options) {
              // eslint-disable-next-line no-param-reassign,dot-notation
              rule.options['configFile'] = tsconfigPath;
            }
          });
        }

        if (ctx.isDev && ctx.isClient) {
          // eslint-disable-next-line no-param-reassign
          nuxtConfig.devtool = 'inline-source-map';
        }
      },
      html: {
        minify: {
          minifyCSS: false,
        },
      },
      terser: {
        extractComments: {
          condition: /^\**!|@preserve|@license|@cc_on/i,
          filename: 'licenses.txt',
        },
      },
    },
    server: { host, port },
  };

  if (!isDev) {
    const entries = await getPublishedEntries();
    const entryRoutes = entries.map(entry => `/entries/${entry}`);

    if (config.modules) {
      config.modules.push('@nuxtjs/sitemap');
      config.modules.push([
        'nuxt-imagemin',
        {
          gifsicle: { optimizationLevel: 3 },
          plugins: [
            // https://www.npmjs.com/package/imagemin-mozjpeg
            imageminMozjpeg({
              // クオリティ 0(やり過ぎ) ~ 100(ほぼそのまま)
              quality: 80,
              // プログレッシブjpegを作成するか falseにするとベースラインjpeg
              progressive: true,
            }),
            // https://www.npmjs.com/package/imagemin-pngquant
            imageminPngquant({
              // クオリティ 0(やり過ぎ) ~ 100(ほぼそのまま) -で繋いで2つ書くとmin-maxという意味合いらしいがよくわかりません
              quality: [0.65, 0.8],
              // 処理速度を指定 1(じっくり) ~ 10(最速) 5％くらい質に違いが出るらしい
              speed: 1,
              // ディザリングを設定 0(無効) ~ 1(最大) | false
              dithering: false,
            }),
            // https://github.com/imagemin/imagemin-webp#imagemin-webp-
            imageminWebp({ quality: 80 }),
            // imageminGif2Webp({ quality: 80 }),
          ],
        },
      ]);
    }

    config.generate = { routes: entryRoutes };
    config.sitemap = {
      path: './sitemap.xml',
      hostname: 'https://kaave.github.io',
      cacheTime: 1000 * 60 * 15,
      // exclude: [],
      routes: entryRoutes,
    };
  }

  return config;
}

export default () => getNuxtConfig(isDevelopment);
