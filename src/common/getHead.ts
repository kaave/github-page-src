export type OptionValues = { content: string; force?: boolean };
export type OptionKeys = 'title' | 'description' | 'image' | 'url';
export type Options = { [key in OptionKeys]?: OptionValues };
export type OptionContents = { [key in keyof Options]-?: string };
export type OG = { property: string; content: string };

/*
 * common
 */
const host = process.env.HOST || 'localhost';
const port = parseInt(process.env.PORT || '3000', 10);
// const url = process.env.BASE_URL || `http://${host}:${port}`;
const url = 'https://kaave.github.io' || `http://${host}:${port}`;
const polyfills = ['default', 'es2015', 'es2016', 'es2017', 'IntersectionObserver'];
const common: OptionContents = {
  url,
  title: 'kaave.github.io',
  description: '愛知県在住ソフトウェアエンジニアの@kaaveこと安部亨佑のWebサイトです。',
  image: `${url}/images/ogp.jpg`,
};

function getOg(options: OptionContents, isInit: boolean = false): OG[] {
  const og = [
    { property: 'og:title', content: options.title },
    { property: 'og:description', content: options.description },
    { property: 'og:image', content: options.image },
    { property: 'og:url', content: options.url },
    { property: 'og:site_name', content: options.title },
  ];

  if (isInit) {
    og.push({ property: 'og:type', content: 'website' });
  }

  return og;
}

function getMeta(options: OptionContents, isInit: boolean = false) {
  const meta: {
    vmid?: string;
    charset?: string;
    content?: string;
    'http-equiv'?: 'content-security-policy' | 'refresh';
    name?: string;
    [key: string]: any;
  }[] = [
    { hid: 'description', name: 'description', content: options.description },
    { hid: 'itempropName', itemprop: 'name', content: options.title },
    { hid: 'itempropDesc', itemprop: 'description', content: options.description },
    { hid: 'itempropImage', itemprop: 'image', content: options.image },
    ...getOg(options, isInit),
  ];

  if (isInit) {
    meta.push({ charset: 'utf-8' });
    meta.push({ name: 'viewport', content: 'width=device-width, initial-scale=1' });
    meta.push({ hid: 'format-detection', name: 'format-detection', content: 'email=no,telephone=no,address=no' });
    meta.push({ hid: 'robots', name: 'robots', content: 'noindex' }); // TODO: 完成まで隠す;
    /*
     * twitter
     */
    meta.push({ property: 'twitter:card', content: 'summary_large_image' });
    // meta.push({ property: 'twitter:site', content: '@BarackObama' });
  }

  return meta;
}

function getUseContents({ title, description, image, url: targetUrl }: Options): OptionContents {
  const result: OptionContents = { ...common };

  if (title) {
    result.title = title.force ? title.content : `${title.content}${common.title}`;
  }

  if (description) {
    result.description = description.force ? description.content : `${common.description}${description.content}`;
  }

  if (image) {
    result.image = image.force ? image.content : `${common.image}${image.content}`;
  }

  if (targetUrl) {
    result.url = targetUrl.force ? targetUrl.content : `${common.url}${targetUrl.content}`;
  }

  return result;
}

export function getHead(options: Options = {}, isInit: boolean = false) {
  const contents = getUseContents(options);

  return {
    title: contents.title,
    ...(isInit
      ? {
          title: contents.title,
          meta: getMeta(contents, true),
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
        }
      : {
          title: contents.title,
          meta: getMeta(contents),
        }),
  };
}
