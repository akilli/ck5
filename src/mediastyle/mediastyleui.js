/**
 * @module media/mediastyle/mediastyleui
 */
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import {normalizeMediaStyles} from './utils';
import '../../theme/mediastyle.css';

/**
 * Media Style UI Plugin
 *
 * @extends module:core/plugin~Plugin
 */
export default class MediaStyleUI extends Plugin {
    /**
     * Returns the default localized style titles
     *
     * @see media/mediastyle/utils
     *
     * @returns {Object.<String,String>}
     */
    get localizedDefaultStylesTitles() {
        const t = this.editor.t;

        return {
            'Full size media': t('Full size media'),
            'Side media': t('Side media'),
            'Left aligned media': t('Left aligned media'),
            'Centered media': t('Centered media'),
            'Right aligned media': t('Right aligned media')
        };
    }

    /**
     * @inheritDoc
     */
    init() {
        const editor = this.editor;
        const configuredStyles = editor.config.get('media.styles');
        const translatedStyles = translateStyles(normalizeMediaStyles(configuredStyles), this.localizedDefaultStylesTitles);

        for (const style of translatedStyles) {
            this._createButton(style);
        }
    }

    /**
     * Creates a button for each style and stores it in the editor component factory
     *
     * @private
     *
     * @param {module:media/mediastyle/mediastyleediting~MediaStyleFormat} style
     */
    _createButton(style) {
        const editor = this.editor;
        const componentName = `mediaStyle:${style.name}`;

        editor.ui.componentFactory.add(componentName, locale => {
            const command = editor.commands.get('mediaStyle');
            const view = new ButtonView(locale);

            view.set({
                label: style.title,
                icon: style.icon,
                tooltip: true
            });
            view.bind('isEnabled').to(command, 'isEnabled');
            view.bind('isOn').to(command, 'value', value => value === style.name);

            this.listenTo(view, 'execute', () => editor.execute('mediaStyle', {value: style.name}));

            return view;
        });
    }
}

/**
 * Returns the translated `title` from the passed styles array
 *
 * @param {Array.<module:media/mediastyle/mediastyleediting~MediaStyleFormat>} styles
 * @param {Object.<String,String>} titles
 *
 * @returns {Array.<module:media/mediastyle/mediastyleediting~MediaStyleFormat>}
 */
function translateStyles(styles, titles) {
    for (const style of styles) {
        if (titles[style.title]) {
            style.title = titles[style.title];
        }
    }

    return styles;
}
