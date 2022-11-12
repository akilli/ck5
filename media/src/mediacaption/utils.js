/**
 * @module media/mediacaption/utils
 */
import {enablePlaceholder} from '@ckeditor/ckeditor5-engine/src/view/placeholder';
import {isMediaElement} from '../media/utils';
import {toWidgetEditable} from '@ckeditor/ckeditor5-widget/src/utils';

/**
 * Returns a function that creates a caption editable element
 *
 * @param {module:engine/view/view~View} view
 * @param {String} placeholder
 *
 * @returns {Function}
 */
export function captionElementCreator(view, placeholder) {
    return writer => {
        const editable = writer.createEditableElement('figcaption');
        writer.setCustomProperty('mediaCaption', true, editable);
        enablePlaceholder({
            view,
            element: editable,
            text: placeholder
        });

        return toWidgetEditable(editable, writer);
    };
}

/**
 * Indicates if a given view element is a caption element
 *
 * @param {module:engine/view/element~Element} viewElement
 *
 * @returns {Boolean}
 */
export function isCaption(viewElement) {
    return !!viewElement.getCustomProperty('mediaCaption');
}

/**
 * Returns the caption model element from a given media element
 *
 * @param {module:engine/model/element~Element} media
 *
 * @returns {module:engine/model/element~Element|null}
 */
export function getCaptionFromMedia(media) {
    for (const node of media.getChildren()) {
        if (!!node && node.is('caption')) {
            return node;
        }
    }

    return null;
}

/**
 * Checks if a given element is a `<figcaption>` element that is placed inside the media `<figure>` element
 *
 * @param {module:engine/view/element~Element} element
 *
 * @returns {Object|null}
 */
export function matchMediaCaption(element) {
    return element.name === 'figcaption' && element.parent && isMediaElement(element.parent) ? {name: true} : null;
}
