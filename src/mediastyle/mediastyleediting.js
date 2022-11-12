/**
 * @module media/mediastyle/mediastyleediting
 */
import MediaEditing from '../media/mediaediting';
import MediaStyleCommand from './mediastylecommand';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import {modelToViewStyleAttribute, viewToModelStyleAttribute} from './converters';
import {normalizeMediaStyles} from './utils';

/**
 * Media Style Edting Plugin
 *
 * @extends module:core/plugin~Plugin
 */
export default class MediaStyleEditing extends Plugin {
    /**
     * @inheritDoc
     */
    static get requires() {
        return [MediaEditing];
    }

    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'MediaStyleEditing';
    }

    /**
     * @inheritDoc
     */
    init() {
        const editor = this.editor;
        const schema = editor.model.schema;
        const data = editor.data;
        const editing = editor.editing;

        editor.config.define('media.styles', ['full', 'left', 'right']);
        const styles = normalizeMediaStyles(editor.config.get('media.styles'));
        schema.extend('media', {allowAttributes: 'mediaStyle'});
        const modelToViewConverter = modelToViewStyleAttribute(styles);

        editing.downcastDispatcher.on('attribute:mediaStyle:media', modelToViewConverter);
        data.downcastDispatcher.on('attribute:mediaStyle:media', modelToViewConverter);
        data.upcastDispatcher.on('element:figure', viewToModelStyleAttribute(styles), {priority: 'low'});
        editor.commands.add('mediaStyle', new MediaStyleCommand(editor, styles));
    }
}

/**
 * The media style format descriptor
 *
 *     import fullSizeIcon from 'path/to/icon.svg';
 *
 *     const mediaStyleFormat = {
 *         name: 'fullSize',
 *         icon: fullSizeIcon,
 *         title: 'Full size media',
 *         className: 'media-full-size'
 *     }
 *
 * @typedef {Object} module:media/mediastyle/mediastyleediting~MediaStyleFormat
 *
 * @property {String} name The unique name of the style
 * @property {String} icon An SVG icon source (as an XML string)
 * @property {String} title The style's title.
 * @property {String} className The CSS class used to represent the style in the view
 * @property {Boolean} [isDefault] When set, the style will be used as the default one
 */
