/**
 * @module media/mediatextalternative/mediatextalternativeediting
 */
import MediaTextAlternativeCommand from './mediatextalternativecommand';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

/**
 * Media Text Alternative Editing Plugin
 *
 * @extends module:core/plugin~Plugin
 */
export default class MediaTextAlternativeEditing extends Plugin {
    /**
     * @inheritDoc
     */
    init() {
        this.editor.commands.add('mediaTextAlternative', new MediaTextAlternativeCommand(this.editor));
    }
}
