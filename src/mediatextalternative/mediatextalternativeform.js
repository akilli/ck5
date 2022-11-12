/**
 * @module media/mediatextalternative/mediatextalternativeform
 */
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import FocusCycler from '@ckeditor/ckeditor5-ui/src/focuscycler';
import FocusTracker from '@ckeditor/ckeditor5-utils/src/focustracker';
import InputTextView from '@ckeditor/ckeditor5-ui/src/inputtext/inputtextview';
import KeystrokeHandler from '@ckeditor/ckeditor5-utils/src/keystrokehandler';
import LabeledInputView from '@ckeditor/ckeditor5-ui/src/labeledinput/labeledinputview';
import View from '@ckeditor/ckeditor5-ui/src/view';
import ViewCollection from '@ckeditor/ckeditor5-ui/src/viewcollection';
import submitHandler from '@ckeditor/ckeditor5-ui/src/bindings/submithandler';
import cancelIcon from '@ckeditor/ckeditor5-core/theme/icons/cancel.svg';
import checkIcon from '@ckeditor/ckeditor5-core/theme/icons/check.svg';
import '../../theme/mediatextalternativeform.css';

/**
 * Media Text Alternative Form
 *
 * @extends module:ui/view~View
 */
export default class MediaTextAlternativeForm extends View {
    /**
     * @inheritDoc
     */
    constructor(locale) {
        super(locale);

        const t = this.locale.t;

        /**
         * Tracks information about the DOM focus in the form
         *
         * @readonly
         *
         * @member {module:utils/focustracker~FocusTracker}
         */
        this.focusTracker = new FocusTracker();

        /**
         * An instance of the keystroke handler
         *
         * @readonly
         *
         * @member {module:utils/keystrokehandler~KeystrokeHandler}
         */
        this.keystrokes = new KeystrokeHandler();

        /**
         * A textarea with a label
         *
         * @member {module:ui/labeledinput/labeledinputview~LabeledInputView} #labeledTextarea
         */
        this.labeledInput = this._createLabeledInputView();

        /**
         * A button used to submit the form
         *
         * @member {module:ui/button/buttonview~ButtonView} #saveButtonView
         */
        this.saveButtonView = this._createButton(t('Save'), checkIcon, 'ck-button-save');
        this.saveButtonView.type = 'submit';

        /**
         * A button used to cancel the form
         *
         * @member {module:ui/button/buttonview~ButtonView} #cancelButtonView
         */
        this.cancelButtonView = this._createButton(t('Cancel'), cancelIcon, 'ck-button-cancel', 'cancel');

        /**
         * A collection of views which can be focused in the form
         *
         * @readonly
         * @protected
         *
         * @member {module:ui/viewcollection~ViewCollection}
         */
        this._focusables = new ViewCollection();

        /**
         * Helps cycling over focusables in the form
         *
         * @readonly
         * @protected
         *
         * @member {module:ui/focuscycler~FocusCycler}
         */
        this._focusCycler = new FocusCycler({
            focusables: this._focusables,
            focusTracker: this.focusTracker,
            keystrokeHandler: this.keystrokes,
            actions: {
                focusPrevious: 'shift + tab',
                focusNext: 'tab'
            }
        });

        this.setTemplate({
            tag: 'form',
            attributes: {
                class: ['ck', 'ck-text-alternative-form'],
                tabindex: '-1'
            },
            children: [
                this.labeledInput,
                this.saveButtonView,
                this.cancelButtonView
            ]
        });
    }

    /**
     * @inheritDoc
     */
    render() {
        super.render();

        this.keystrokes.listenTo(this.element);

        submitHandler({view: this});

        [this.labeledInput, this.saveButtonView, this.cancelButtonView]
            .forEach(v => {
                this._focusables.add(v);
                this.focusTracker.add(v.element);
            });
    }

    /**
     * Creates the button view
     *
     * @private
     *
     * @param {String} label
     * @param {String} icon
     * @param {String} className
     * @param {String} eventName
     *
     * @returns {module:ui/button/buttonview~ButtonView}
     */
    _createButton(label, icon, className, eventName) {
        const button = new ButtonView(this.locale);

        button.set({
            label,
            icon,
            tooltip: true
        });

        button.extendTemplate({
            attributes: {
                class: className
            }
        });

        if (eventName) {
            button.delegate('execute').to(this, eventName);
        }

        return button;
    }

    /**
     * Creates an input with a label
     *
     * @private
     *
     * @returns {module:ui/labeledinput/labeledinputview~LabeledInputView}
     */
    _createLabeledInputView() {
        const t = this.locale.t;
        const labeledInput = new LabeledInputView(this.locale, InputTextView);

        labeledInput.label = t('Text alternative');
        labeledInput.inputView.placeholder = t('Text alternative');

        return labeledInput;
    }
}
