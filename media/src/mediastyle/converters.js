/**
 * @module media/mediastyle/converters
 */
import first from '@ckeditor/ckeditor5-utils/src/first';

/**
 * Returns a converter for adding, changing and removing the `mediaStyle` attribute
 *
 * @param {Array.<module:media/mediastyle/mediastyleediting~MediaStyleFormat>} styles
 *
 * @returns {Function}
 */
export function modelToViewStyleAttribute(styles) {
    return (evt, data, conversionApi) => {
        if (!conversionApi.consumable.consume(data.item, evt.name)) {
            return;
        }

        const newStyle = getStyleByName(data.attributeNewValue, styles);
        const oldStyle = getStyleByName(data.attributeOldValue, styles);
        const element = conversionApi.mapper.toViewElement(data.item);
        const writer = conversionApi.writer;

        if (oldStyle) {
            writer.removeClass(oldStyle.className, element);
        }

        if (newStyle) {
            writer.addClass(newStyle.className, element);
        }
    };
}

/**
 * Returns a view-to-model converter converting media CSS classes to a proper value in the model
 *
 * @param {Array.<module:media/mediastyle/mediastyleediting~MediaStyleFormat>} styles
 *
 * @returns {Function}
 */
export function viewToModelStyleAttribute(styles) {
    const filteredStyles = styles.filter(style => !style.isDefault);

    return (evt, data, conversionApi) => {
        if (!data.modelRange) {
            return;
        }

        const viewFigureElement = data.viewItem;
        const modelMediaElement = first(data.modelRange.getItems());

        if (!conversionApi.schema.checkAttribute(modelMediaElement, 'mediaStyle')) {
            return;
        }

        for (const style of filteredStyles) {
            if (conversionApi.consumable.consume(viewFigureElement, {classes: style.className})) {
                conversionApi.writer.setAttribute('mediaStyle', style.name, modelMediaElement);
            }
        }
    };
}

/**
 * Returns the style with a given `name` from an array of styles.
 *
 * @param {String} name
 * @param {Array.<module:media/mediastyle/mediastyleediting~MediaStyleFormat>} styles
 *
 * @returns {module:media/mediastyle/mediastyleediting~MediaStyleFormat|null}
 */
function getStyleByName(name, styles) {
    for (const style of styles) {
        if (style.name === name) {
            return style;
        }
    }

    return null;
}
