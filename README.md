# akilli/ckeditor5-media

This media widget for CKEditor 5 can embed image, audio, video and iframe elements wrapped within a figure optionally with a caption. It also provides a minimal API to integrate a media browser by the use of the [window.postMessage()](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) function.

This widget will add the CSS class `image`, `audio`, `video` or `iframe` to the figure element. It also supports alignment by setting an appropriate CSS class (`left` or `right`), and the attributes `width`, `height` and `alt`. The `controls`(audio and video) and `allowfullscreen` (iframe) are automatically set.

## Media Browser

You can implement your media browser as you wish, the only two requirements are that you configure the URL to your media browser as `media.browser` p.e.

    const editorConfig = {
        ...
        media: {
            ...
            browser: '/url/to/mediabrowser',
            ...
        },
        ...
    })

and that your media browser notifies the editor by posting a message p.e. like

    window.opener.postMessage({
        alt: 'Optional alternative text',
        src: '/url/to/media'
    }, origin);

## Demo

- [Balloon Editor](https://akilli.github.io/ckeditor5-build-balloon/demo)
- [Classic Editor](https://akilli.github.io/ckeditor5-build-classic/demo)
- [Inline Editor](https://akilli.github.io/ckeditor5-build-inline/demo)
- [Minimalistic Browser](https://github.com/akilli/demo-browser)
