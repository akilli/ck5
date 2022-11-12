/**
 * @module media/mediabrowser/mediabrowsercommand
 */
import Command from '@ckeditor/ckeditor5-core/src/command';
import {getTypeFromUrl} from '../media/utils';

/**
 * Media Browser Command
 *
 * @extends module:core/command~Command
 */
export default class MediaBrowserCommand extends Command {
    /**
     * @inheritDoc
     */
    execute() {
        const editor = this.editor;
        const editorDoc = editor.sourceElement.ownerDocument;
        const editorWin = editorDoc.defaultView;

        editor.model.change(writer => {
            const browser = editor.config.get('media.browser');

            if (!browser || !browser.length) {
                return;
            }

            const feat = 'alwaysRaised=yes,dependent=yes,height=' + editorWin.screen.height + ',location=no,menubar=no,' +
                'minimizable=no,modal=yes,resizable=yes,scrollbars=yes,toolbar=no,width=' + editorWin.screen.width;
            const win = editorWin.open(browser, 'mediabrowser', feat);
            const a = editorDoc.createElement('a');
            a.href = browser;
            const origin = a.origin;

            editorWin.addEventListener('message', ev => {
                if (ev.origin === origin && ev.source === win && !!ev.data.src) {
                    let type = ev.data.type || null;

                    if (!type && (type = getTypeFromUrl(ev.data.src))) {
                        type = type.id;
                    }

                    editor.model.insertContent(writer.createElement('media', {
                        alt: ev.data.alt || '',
                        src: ev.data.src,
                        type: type
                    }), editor.model.document.selection);
                    win.close();
                }
            }, false);
        });
    }
}
