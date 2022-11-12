/**
 * @module media/mediastyle/utils
 */
import fullIcon from '@ckeditor/ckeditor5-core/theme/icons/object-full-width.svg';
import leftIcon from '@ckeditor/ckeditor5-core/theme/icons/object-left.svg';
import rightIcon from '@ckeditor/ckeditor5-core/theme/icons/object-right.svg';

/**
 * Default media styles provided by the plugin
 *
 * @member {Object.<String, Object>}
 */
const defaultStyles = {
    full: {
        name: 'full',
        title: 'Full size media',
        icon: fullIcon,
        isDefault: true
    },
    left: {
        name: 'left',
        title: 'Left aligned media',
        icon: leftIcon,
        className: 'left'
    },
    right: {
        name: 'right',
        title: 'Right aligned media',
        icon: rightIcon,
        className: 'right'
    }
};

/**
 * Default media style icons provided by the plugin
 *
 * @member {Object.<String, String>}
 */
const defaultIcons = {
    full: fullIcon,
    left: leftIcon,
    right: rightIcon
};

/**
 * Returns an array with items normalized in the mediastyleediting format and a complete `icon` markup for each style
 *
 * @returns {Array.<module:media/mediastyle/mediastyleediting~MediaStyleFormat>}
 */
export function normalizeMediaStyles(configuredStyles = []) {
    return configuredStyles
        .map(_normalizeStyle)
        .map(style => Object.assign({}, style));
}

/**
 * Normalizes an media style provided in the media config and returns it in a mediastyleediting format
 *
 * @private
 *
 * @param {Object} style
 *
 * @returns {module:media/mediastyle/mediastyleediting~MediaStyleFormat}
 */
function _normalizeStyle(style) {
    if (typeof style === 'string') {
        const styleName = style;

        if (defaultStyles[styleName]) {
            style = Object.assign({}, defaultStyles[styleName]);
        } else {
            console.warn('There is no such media style of given name.', {name: styleName});
            style = {name: styleName};
        }
    } else if (defaultStyles[style.name]) {
        const defaultStyle = defaultStyles[style.name];
        const extendedStyle = Object.assign({}, style);

        for (const prop in defaultStyle) {
            if (!style.hasOwnProperty(prop)) {
                extendedStyle[prop] = defaultStyle[prop];
            }
        }

        style = extendedStyle;
    }

    if (typeof style.icon === 'string' && defaultIcons[style.icon]) {
        style.icon = defaultIcons[style.icon];
    }

    return style;
}
