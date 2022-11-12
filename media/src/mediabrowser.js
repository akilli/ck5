/**
 * @module media/mediabrowser
 */
import MediaBrowserEditing from './mediabrowser/mediabrowserediting';
import MediaBrowserUI from './mediabrowser/mediabrowserui';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

/**
 * Media Browser Plugin
 *
 * @extends module:core/plugin~Plugin
 */
export default class MediaBrowser extends Plugin {
    /**
     * @inheritDoc
     */
    static get requires() {
        return [MediaBrowserEditing, MediaBrowserUI];
    }

    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'MediaBrowser';
    }
}
