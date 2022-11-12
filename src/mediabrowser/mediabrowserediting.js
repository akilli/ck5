/**
 * @module media/mediabrowser/mediabrowserediting
 */
import MediaBrowserCommand from './mediabrowsercommand';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

/**
 * Media Browser Editing Plugin
 *
 * @extends module:core/plugin~Plugin
 */
export default class MediaBrowserEditing extends Plugin {
    /**
     * @inheritDoc
     */
    init() {
        const editor = this.editor;
        editor.commands.add('mediaBrowser', new MediaBrowserCommand(editor));
    }
}
