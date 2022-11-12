/**
 * @module media/mediatextalternative
 */
import MediaTextAlternativeEditing from './mediatextalternative/mediatextalternativeediting';
import MediaTextAlternativeUI from './mediatextalternative/mediatextalternativeui';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

/**
 * Media Text Alternative Plugin
 *
 * @extends module:core/plugin~Plugin
 */
export default class MediaTextAlternative extends Plugin {
    /**
     * @inheritDoc
     */
    static get requires() {
        return [MediaTextAlternativeEditing, MediaTextAlternativeUI];
    }

    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'MediaTextAlternative';
    }
}
