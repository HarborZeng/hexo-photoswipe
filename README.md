# hexo-photoswipe

[![npm version](https://badge.fury.io/js/hexo-photoswipe.svg)](https://badge.fury.io/js/hexo-photoswipe)
[![Known Vulnerabilities](https://snyk.io/test/github/HarborZeng/hexo-photoswipe/badge.svg?targetFile=package.json)](https://snyk.io/test/github/HarborZeng/hexo-photoswipe?targetFile=package.json)
[![CircleCI](https://circleci.com/gh/HarborZeng/hexo-photoswipe.svg?style=svg)](https://circleci.com/gh/HarborZeng/hexo-photoswipe)

[中文文档](https://github.com/HarborZeng/hexo-photoswipe/blob/master/README_CN.md)

## What is hexo-photoswipe

When you use hexo to build an vanilla blog, you might want a fine gallery to exhibit photos you uploaded.

`Hexo-photoswipe` is the one that would power you and your photos up.

 [photoswipe](https://photoswipe.com) is a beautiful and easy-to-use gallery, but limited to the working theory of which, it require the `width` and `height` attributes to exhibit the images/photos, in which case, most iamges do not have these attributes natrually.

This plugin is built for [photoswipe](https://photoswipe.com), and it would generate `width` and `height` attributes when you run `hexo s` or `hexo g`.

## How to use

Note that, this is not an **Out of the box** plugin. To avoid adding another `js` file in your final website (which makes your website load slow), you are required to copy and modify some code to your somejs file manually. I'll be thrilled if it inspired you some kind.

We'll get there later.

Note that, [hexo-lazyload-image](https://www.npmjs.com/package/hexo-lazyload-image) is recommanded to install, which will generate the `data-original` attr in `img` tag. However you can config not to use it if you don't need it.

Note that, this plugin detect the image size/resolution two ways.

1. One is that images are stored in `yourTitle/someImage.format` which means images are introduced in {% asset_img foo.bar "foobar some text" %} way.

> for these local images, just calculate the width and height

2. The other is that images are quoted as http(s), which means images are introduced in \!\[foobar some text\](http(s)://www.john.doe/foo.bar) way

> for these online images, download synchronously first time, and cache them in your disk, and then calculate the width and height one by one

### install

So, first you install `hexo-lazyload-image`, or omit if you don't want lazyload feature.

```shell
$ npm install hexo-lazyload-image --save
```

Below are how you can config `hexo-lazyload-image`

------

> First add configuration in _config.yml from your hexo project.

```yaml
lazyload:
  enable: true 
  onlypost: false
  loadingImg: # eg /images/loading.gif 
```

> ### onlypost

> If true, only the images from post or page will support lazy-load.
> If false, the whole images of your site will use lazy-load, including > the images dist from your theme, but not including the background images >from CSS style.

> ### loadingImg

> If you keep the value nothing (by default), then it will use the default >loading image.
> If you want to customize the image, then you need to copy your loading > image to your current theme image folder and then change this path to > find it.
> Run hexo command.

```shell 
$ hexo clean
```

------

Additionally, install `hexo-photoswipe`:

```shell
$ npm install hexo-photoswipe --save
```

and boom, you have a `div`-wrapped `img` tag which also contains something like `class="image-container" data-type="content-image" data-size="100x100"` in you final render result.

Finally, you write some code using [photoswipe](https://photoswipe.com/) in your `somefilename.js`

> If you have no idea what to do, please open an issue at github: <https://github.com/HarborZeng/hexo-photoswipe/issues>

## Demo

![https://github.com/HarborZeng/hexo-photoswipe/blob/master/phone.gif](https://github.com/HarborZeng/hexo-photoswipe/blob/master/phone.gif)
![https://github.com/HarborZeng/hexo-photoswipe/blob/master/desktop.gif](https://github.com/HarborZeng/hexo-photoswipe/blob/master/desktop.gif)

for online preview, visit <https://tellyouwhat.cn> for details.

## LICENSE

[MIT](https://github.com/HarborZeng/hexo-photoswipe/blob/master/LICENSE)

## Tutorial

Suppose you have installed the dependencies above. Then you may proceed.

### 0. Enable the plugin

in your hexo blog's `_config.yml`:

```yaml
# <div class="image-container" data-type="content-image" data-size="100x100"><img src="xxx" data-original="yyy"></img></div>'
# imgSrcIn: dataOriginal if you install hexo-lazyload-image, or src as default
# dataType is a presered attr. It is usless now but you can custum in your own js with this unique selector.
# className you can custom the class for div, in your own css file as you want.
# imageFileBaseDir is the base directory where hexo-photoswipe would find images, eg, source/_posts/my-first-post/cover.jpg. The final pattern is {imageFileBaseDir}/{YourPostTitle}/{imageName}.{imageFormat}.
photoswipe:
  enable: true
  imageFileBaseDir: source/_posts
  imgSrcIn: dataOriginal
  className: image-container
  dataType: content-image
```

### 1. include JS and CSS files

You can find them in [dist/](https://github.com/dimsemenov/PhotoSwipe/tree/master/dist) folder of [GitHub](https://github.com/dimsemenov/PhotoSwipe) repository. Sass and uncompiled JS files are in folder [src/](https://github.com/dimsemenov/PhotoSwipe/tree/master/src).

It doesn't matter how and where will you include JS and CSS files. Code is executed only when you call new PhotoSwipe(). So feel free to defer loading of files if you don't need PhotoSwipe to be opened initially.

or

It's highly recommended to use cdn

```html
<script src="https://cdn.bootcss.com/photoswipe/4.1.3/photoswipe.min.js"></script>
<script src="https://cdn.bootcss.com/photoswipe/4.1.3/photoswipe-ui-default.min.js"></script>

<link href="https://cdn.bootcss.com/photoswipe/4.1.3/photoswipe.min.css" rel="stylesheet">
<link href="https://cdn.bootcss.com/photoswipe/4.1.3/default-skin/default-skin.min.css" rel="stylesheet">
```

### 2. add `pswp` codes into your layout page

you can add the code below to your theme's `main page` or `layout.ejs` code

This code can be appended anywhere, but ideally before the closing `</body>`. You may reuse it across multiple galleries (as long as you use same UI class). You can just copy the following code in case you make a typo or something.

```html
<!-- Root element of PhotoSwipe. Must have class pswp. -->
<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">

    <!-- Background of PhotoSwipe.
         It's a separate element as animating opacity is faster than rgba(). -->
    <div class="pswp__bg"></div>

    <!-- Slides wrapper with overflow:hidden. -->
    <div class="pswp__scroll-wrap">

        <!-- Container that holds slides.
            PhotoSwipe keeps only 3 of them in the DOM to save memory.
            Don't modify these 3 pswp__item elements, data is added later on. -->
        <div class="pswp__container">
            <div class="pswp__item"></div>
            <div class="pswp__item"></div>
            <div class="pswp__item"></div>
        </div>

        <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
        <div class="pswp__ui pswp__ui--hidden">

            <div class="pswp__top-bar">

                <!--  Controls are self-explanatory. Order can be changed. -->

                <div class="pswp__counter"></div>

                <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>

                <button class="pswp__button pswp__button--share" title="Share"></button>

                <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>

                <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>

                <div class="pswp__preloader">
                    <div class="pswp__preloader__icn">
                        <div class="pswp__preloader__cut">
                            <div class="pswp__preloader__donut"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                <div class="pswp__share-tooltip"></div>
            </div>

            <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
            </button>

            <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
            </button>

            <div class="pswp__caption">
                <div class="pswp__caption__center"></div>
            </div>

        </div>

    </div>

</div>
```

### 3. Initialize in your own js file

```javascript
let pswpElement = document.querySelector('.pswp')
let imgSrcItem = []
$('someSelectorToYourImage').each(function (index) {
  // data-original is generated by hexo-lazyload-image,
  // which represent the src of the image
  let imgPath = this.getAttribute('data-original')
  // or let imgPath = this.src if you don't install hexo-lazyload-image
  
  $(this).addClass("some class if you want")
  
  // caption text
  let alt = $(this).attr('alt')
  let title = $(this).attr('title')
  let captionText = alt || title
  if (captionText) {
    let captionDiv = document.createElement('div')
    captionDiv.className += ' caption'
    let captionEle = document.createElement('b')
    captionEle.className += ' center-caption'
    captionEle.innerText = captionText
    captionDiv.appendChild(captionEle)

    // insert where appropriate
    this.parentElement.insertAdjacentElement('afterend', captionDiv)
  }
  
  if (this.parentNode.getAttribute('data-size')) {
    let resolution = this.parentNode.getAttribute('data-size').split('x')
    imgSrcItem.push({
      src: imgPath,
      w: resolution[0],
      h: resolution[1],
      title: captionText
    })
  } else {
    imgSrcItem.push({
        src: imgPath,
        w: this.naturalWidth || window.innerWidth,
        h: this.naturalHeight || window.innerHeight,
        title: captionText
    })
  }
})

$('someSelectorToYourImage').each(function (i) {
  $(this).click(function (e) {
    let options = {
      // more options at https://photoswipe.com/documentation/options.html
      // optionName: 'option value'
      // for example:
      index: i, // start at index 
      barsSize: {top: 0, bottom: 0},
      captionEl: true,
      fullscreenEl: false,
      shareEl: false,
      bgOpacity: 0.5,
      tapToClose: true,
      tapToToggleControls: true,
      showHideOpacity: false,
      counterEl: true,
      preloaderEl: true,
      history: false,
      getThumbBoundsFn: function (index) {
        // find thumbnail element
        var thumbnail = document.querySelectorAll('#articleContent img')[index];
        // get window scroll Y
        var pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
        // optionally get horizontal scroll
        // get position of element relative to viewport
        var rect = thumbnail.getBoundingClientRect();
        // w = width
        return {x: rect.left, y: rect.top + pageYScroll, w: rect.width};
      }
    }
    let gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, imgSrcItem, options)
    gallery.listen('imageLoadComplete', function (index, item) {
      // index - index of a slide that was loaded
      // item - slide object
      // update src of images in web page when their view are not reached by browser,
      // while photoswipe has completely load the image 
        // if you don't install hexo-lazyload-image, then the code below is unnessary
      $('someSelectorToYourImage')[index].src = item.src
    })
    gallery.init()
  })
})
```

### 4. Add css into your project (optional)

```css
.image-container {
  text-align: center;
  /*...more style...*/
}
```
