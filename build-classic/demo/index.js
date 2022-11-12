'use strict';

(function (document, ClassicEditor) {
    document.addEventListener('DOMContentLoaded', () => {
        ClassicEditor
            .create(document.querySelector('#rte'), {
                media: {
                    browser: 'https://akilli.github.io/demo-browser/media.html'
                }
            })
            .then(editor => document.getElementById('save').addEventListener('click', () => console.log(editor.getData())))
            .catch(error => console.error(error));
    });
})(document, ClassicEditor);
