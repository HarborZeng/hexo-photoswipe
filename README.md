# hexo-photoswipe

## What is hexo-photoswipe

When you use hexo to build a vanilla blog, you might want a good gallery to exhibit photos you uploaded. `Hexo-photoswipe` is the one that would power you and your photos up.

## How to use

Note that, this is not a **Out of the box** plugin, because it's built for me personal. I'll be thrilled if it inspired you in some ways.

Note that, hexo-photoswipe is based on [hexo-lazyload-image](https://www.npmjs.com/package/hexo-lazyload-image), which will generate the `data-original` attr in `img` tag.

So, first you install `hexo-lazyload-image`:

```shell
npm install hexo-lazyload-image --save
```

or my version, which killed some annoying console.log(...)

```shell
npm install hexo-lazyload-image-modified --save
```

Additionally, install `hexo-photoswipe`:

```shell
npm install hexo-photoswipe --save
```

and boom, you have a `div`-contained `img` tag which also contains something like `class="image-container" data-type="content-image" data-size=100x100` in you final render result.

Finally, you write some code using [photoswipe](https://photoswipe.com/) in your `somefilename.js`

> If you have no idea what to do, please open an issue at github: <https://github.com/HarborZeng/hexo-photoswipe/issues>
