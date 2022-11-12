/**
 * @module media/media/utils
 */
import BalloonPanelView from '@ckeditor/ckeditor5-ui/src/panel/balloon/balloonpanelview';
import {isWidget, toWidget} from '@ckeditor/ckeditor5-widget/src/utils';

/**
 * Media types
 *
 * @type {Object}
 */
const mediaTypes = {
    audio: {
        id: 'audio',
        element: 'audio',
        mime: [
            'audio/aac', 'audio/flac', 'audio/mp3', 'audio/mpeg', 'audio/mpeg3', 'audio/ogg', 'audio/wav', 'audio/wave', 'audio/webm',
            'audio/x-aac', 'audio/x-flac', 'audio/x-mp3', 'audio/x-mpeg', 'audio/x-mpeg3', 'audio/x-pn-wav', 'audio/x-wav'
        ]
    },
    iframe: {
        id: 'iframe',
        element: 'iframe',
        mime: ['text/html']
    },
    image: {
        id: 'image',
        element: 'img',
        mime: ['image/gif', 'image/jpeg', 'image/png', 'image/svg+xml', 'image/webp']
    },
    video: {
        id: 'video',
        element: 'video',
        mime: ['video/mp4', 'video/ogg', 'video/webm']
    }
};

/**
 * Converts a given view element to a media widget
 *
 * @param {module:engine/view/element~Element} element
 * @param {module:engine/view/downcastwriter~DowncastWriter} writer
 * @param {String} label
 *
 * @returns {module:engine/view/element~Element}
 */
export function toMediaWidget(element, writer, label) {
    writer.setCustomProperty('media', true, element);

    return toWidget(element, writer, {
        label: () => {
            const media = element.getChild(0);
            const alt = media.getAttribute('alt');

            return alt ? `${alt} ${label}` : label;
        }
    });
}

/**
 * Checks if a given view element is a media widget
 *
 * @param {module:engine/view/element~Element} element
 *
 * @returns {Boolean}
 */
export function isMediaWidget(element) {
    return !!element.getCustomProperty('media') && isWidget(element);
}

/**
 * Returns an media widget editing view element if one is selected
 *
 * @param {module:engine/view/selection~Selection|module:engine/view/documentselection~DocumentSelection} selection
 * @returns {module:engine/view/element~Element|null}
 */
export function getSelectedMediaWidget(selection) {
    const element = selection.getSelectedElement();

    return element && isMediaWidget(element) ? element : null;
}

/**
 * Checks if provided model element is a media element
 *
 * @param {module:engine/model/element~Element} element
 *
 * @returns {Boolean}
 */
export function isMedia(element) {
    return element && element.is('media');
}

/**
 * Checks if a given element is a `<figure>` element with the media type class set
 *
 * @param {module:engine/view/element~Element} element
 *
 * @returns {Boolean}
 */
export function isMediaElement(element) {
    return element && element.is('figure') && Array.from(element.getClassNames()).some(item => mediaTypes.hasOwnProperty(item));
}

/**
 * Returns all media types IDs
 *
 * @return {string[]}
 */
export function getTypeIds() {
    return Object.getOwnPropertyNames(mediaTypes);
}

/**
 * Returns given media type
 *
 * @param {String} type
 *
 * @return {?Object}
 */
export function getType(type) {
    return mediaTypes[type] || null;
}

/**
 * Returns given media type from given element
 *
 * @param {String} element
 *
 * @return {?Object}
 */
export function getTypeFromElement(element) {
    const ids = getTypeIds();

    for (let i = 0; i < ids.length; ++i) {
        if (mediaTypes[ids[i]].element === element) {
            return mediaTypes[ids[i]];
        }
    }

    return null;
}

/**
 * Returns media type from given URL
 *
 * @param {String} url
 *
 * @return {?Object}
 */
export function getTypeFromUrl(url) {
    const xhr = new XMLHttpRequest();

    try {
        xhr.open('HEAD', url, false);
        xhr.send();
    } catch (e) {
        console.log(e);
        return null;
    }

    if (xhr.readyState === xhr.DONE && xhr.status >= 200 && xhr.status < 300) {
        const mime = xhr.getResponseHeader('Content-Type').split(';')[0].trim();
        const ids = getTypeIds();

        for (let i = 0; i < ids.length; ++i) {
            if (mediaTypes[ids[i]].mime.includes(mime)) {
                return mediaTypes[ids[i]];
            }
        }
    }

    return null;
}

/**
 * Returns the positioning options that control the geometry of the contextual balloon with respect to the selected
 * element in the editor content.
 *
 * @param {module:core/editor/editor~Editor} editor
 *
 * @returns {module:utils/dom/position~Options}
 */
export function getBalloonPositionData(editor) {
    const editingView = editor.editing.view;
    const defaultPositions = BalloonPanelView.defaultPositions;

    return {
        target: editingView.domConverter.viewToDom(editingView.document.selection.getSelectedElement()),
        positions: [
            defaultPositions.northArrowSouth,
            defaultPositions.northArrowSouthWest,
            defaultPositions.northArrowSouthEast,
            defaultPositions.southArrowNorth,
            defaultPositions.southArrowNorthWest,
            defaultPositions.southArrowNorthEast
        ]
    };
}

/**
 * A helper utility that positions the contextual balloon with respect to the media in the editor content
 *
 * @param {module:core/editor/editor~Editor} editor
 */
export function repositionContextualBalloon(editor) {
    const balloon = editor.plugins.get('ContextualBalloon');

    if (getSelectedMediaWidget(editor.editing.view.document.selection)) {
        balloon.updatePosition(getBalloonPositionData(editor));
    }
}
