/**
 * @module media/media/converters
 */
import first from '@ckeditor/ckeditor5-utils/src/first';
import {getTypeFromElement} from './utils';

/**
 * Returns a function that converts the media view representation:
 *
 *     <figure class="media"><img src="..." alt="...">...</figure>
 *
 * to the model representation:
 *
 *     <media type="..." src="..." alt="...">...</media>
 *
 * The entire content of the `<figure>` element except the media view element is being converted as children of the
 * `<media>` model element.
 *
 * @returns {Function}
 */
export function viewToModel() {
    return dispatcher => {
        dispatcher.on('element:figure', (evt, data, conversionApi) => {
            const media = data.viewItem.getChild(0);

            if (!media || !media.hasAttribute('src') || !conversionApi.consumable.test(media, {name: true})) {
                return;
            }

            const type = getTypeFromElement(media.name);

            if (!type || !conversionApi.consumable.test(data.viewItem, {name: true, classes: type.id})) {
                return;
            }

            const result = conversionApi.convertItem(media, data.modelCursor);
            const model = first(result.modelRange.getItems());

            if (!model) {
                return;
            }

            conversionApi.writer.setAttribute('type', type.id, model);
            conversionApi.convertChildren(data.viewItem, conversionApi.writer.createPositionAt(model, 0));
            data.modelRange = result.modelRange;
            data.modelCursor = result.modelCursor;
        });
    };
}

/**
 * Converts model to view attributes
 *
 * @param {String} key
 *
 * @returns {Function}
 */
export function modelToViewAttribute(key) {
    return dispatcher => {
        dispatcher.on(`attribute:${key}:media`, (evt, data, conversionApi) => {
            if (!conversionApi.consumable.consume(data.item, evt.name)) {
                return;
            }

            const figure = conversionApi.mapper.toViewElement(data.item);
            const media = figure.getChild(0);

            if (data.attributeNewValue !== null) {
                conversionApi.writer.setAttribute(data.attributeKey, data.attributeNewValue, media);
            } else {
                conversionApi.writer.removeAttribute(data.attributeKey, media);
            }
        });
    }
}
