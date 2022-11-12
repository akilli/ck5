/**
 * @module media/media
 */
import MediaEditing from './media/mediaediting';
import MediaTextAlternative from './mediatextalternative';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';
import '../theme/media.css';

/**
 * Media Plugin
 *
 * @extends module:core/plugin~Plugin
 */
export default class Media extends Plugin {
    /**
     * @inheritDoc
     */
    static get requires() {
        return [MediaEditing, MediaTextAlternative, Widget];
    }

    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'Media';
    }
}
