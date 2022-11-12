/**
 * @module media/mediatoolbar
 */
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import WidgetToolbarRepository from '@ckeditor/ckeditor5-widget/src/widgettoolbarrepository';
import {getSelectedMediaWidget} from './media/utils';

/**
 * Media Toolbar Plugin
 *
 * @extends module:core/plugin~Plugin
 */
export default class MediaToolbar extends Plugin {
    /**
     * @inheritDoc
     */
    static get requires() {
        return [WidgetToolbarRepository];
    }

    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'MediaToolbar';
    }

    /**
     * @inheritDoc
     */
    init() {
        const editor = this.editor;

        editor.config.define('media.toolbar', [
            'mediaStyle:left',
            'mediaStyle:full',
            'mediaStyle:right',
            '|',
            'mediaTextAlternative',
        ]);
    }

    /**
     * @inheritDoc
     */
    afterInit() {
        const editor = this.editor;
        const widgetToolbarRepository = editor.plugins.get(WidgetToolbarRepository);

        widgetToolbarRepository.register('media', {
            items: editor.config.get('media.toolbar') || [],
            getRelatedElement: getSelectedMediaWidget
        });
    }
}
