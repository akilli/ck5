'use strict';

(function (document, BalloonEditor) {
    document.addEventListener('DOMContentLoaded', () => {
        BalloonEditor
            .create(document.querySelector('#rte'), {
                media: {
                    browser: 'https://akilli.github.io/demo-browser/media.html'
                }
            })
            .then(editor => document.getElementById('save').addEventListener('click', () => console.log(editor.getData())))
            .catch(error => console.error(error));
    });
})(document, BalloonEditor);
