/**
 * @module media/mediastyle
 */
import MediaStyleEditing from './mediastyle/mediastyleediting';
import MediaStyleUI from './mediastyle/mediastyleui';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

/**
 * Media Style Plugin
 *
 * @extends module:core/plugin~Plugin
 */
export default class MediaStyle extends Plugin {
    /**
     * @inheritDoc
     */
    static get requires() {
        return [MediaStyleEditing, MediaStyleUI];
    }

    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'MediaStyle';
    }
}
