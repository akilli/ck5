/**
 * @module media/mediacaption
 */
import MediaCaptionEditing from './mediacaption/mediacaptionediting';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import '../theme/mediacaption.css';

/**
 * Media Caption Plugin
 *
 * @extends module:core/plugin~Plugin
 */
export default class MediaCaption extends Plugin {
    /**
     * @inheritDoc
     */
    static get requires() {
        return [MediaCaptionEditing];
    }

    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'MediaCaption';
    }
}
