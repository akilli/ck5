/**
 * @module media/mediastyle/mediastylecommand
 */
import Command from '@ckeditor/ckeditor5-core/src/command';
import {isMedia} from '../media/utils';

/**
 * Media Style Command
 *
 * @extends module:core/command~Command
 */
export default class MediaStyleCommand extends Command {
    /**
     * Creates an instance of the media style command
     *
     * @param {module:core/editor/editor~Editor} editor.
     * @param {Array.<module:media/mediastyle/mediastyleediting~MediaStyleFormat>} styles
     */
    constructor(editor, styles) {
        super(editor);

        /**
         * The cached name of the default style
         *
         * @private
         *
         * @type {Boolean|String}
         */
        this._defaultStyle = false;

        /**
         * A style handled by this command
         *
         * @readonly
         *
         * @member {Array.<module:media/mediastyle/mediastyleediting~MediaStyleFormat>} #styles
         */
        this.styles = styles.reduce((styles, style) => {
            styles[style.name] = style;

            if (style.isDefault) {
                this._defaultStyle = style.name;
            }

            return styles;
        }, {});
    }

    /**
     * @inheritDoc
     */
    refresh() {
        const element = this.editor.model.document.selection.getSelectedElement();

        this.isEnabled = isMedia(element);

        if (!element) {
            this.value = false;
        } else if (element.hasAttribute('mediaStyle')) {
            const attributeValue = element.getAttribute('mediaStyle');
            this.value = this.styles[attributeValue] ? attributeValue : false;
        } else {
            this.value = this._defaultStyle;
        }
    }

    /**
     * @inheritDoc
     */
    execute(options) {
        const styleName = options.value;
        const model = this.editor.model;
        const element = model.document.selection.getSelectedElement();

        model.change(writer => {
            if (this.styles[styleName].isDefault) {
                writer.removeAttribute('mediaStyle', element);
            } else {
                writer.setAttribute('mediaStyle', styleName, element);
            }
        });
    }
}
