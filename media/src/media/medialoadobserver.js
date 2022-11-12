/**
 * @module media/media/medialoadobserver
 */
import Observer from '@ckeditor/ckeditor5-engine/src/view/observer/observer';

/**
 * Observes all new media elements added to the document and not rendered as `complete` and fires `layoutChanged` and
 * `mediaLoaded` events
 *
 * @extends module:engine/view/observer/observer~Observer
 */
export default class MediaLoadObserver extends Observer {
    /**
     * @inheritDoc
     */
    constructor(view) {
        super(view);

        /**
         * List of DOM elements that are observed by this observer.
         *
         * @private
         *
         * @type {Set.<HTMLElement>}
         */
        this._observedElements = new Set();
    }

    /**
     * @inheritDoc
     */
    observe(domRoot, name) {
        this.document.getRoot(name).on('change:children', (evt, node) => {
            this.view.once('render', () => this._updateObservedElements(domRoot, node));
        });
    }

    /**
     * Updates the list of observed elements
     *
     * @private
     *
     * @param {HTMLElement} domRoot DOM root element.
     * @param {module:engine/view/element~Element} viewNode View element where children have changed.
     */
    _updateObservedElements(domRoot, viewNode) {
        if (!viewNode.is('element') || viewNode.is('attributeElement')) {
            return;
        }

        const domNode = this.view.domConverter.mapViewToDom(viewNode);

        if (!domNode) {
            return;
        }

        for (const domElement of domNode.querySelectorAll('audio, iframe, img, video')) {
            if (!this._observedElements.has(domElement)) {
                this.listenTo(domElement, 'load', (evt, domEvt) => this._fireEvents(domEvt));
                this._observedElements.add(domElement);
            }
        }

        for (const domElement of this._observedElements) {
            if (!domRoot.contains(domElement)) {
                this.stopListening(domElement);
                this._observedElements.delete(domElement);
            }
        }
    }

    /**
     * Fires `layoutChanged` and `mediaLoaded` events
     *
     * @protected
     *
     * @param {Event} domEvent The DOM event.
     */
    _fireEvents(domEvent) {
        if (this.isEnabled) {
            this.document.fire('layoutChanged');
            this.document.fire('mediaLoaded', domEvent);
        }
    }

    /**
     * @inheritDoc
     */
    destroy() {
        this._observedElements.clear();
        super.destroy();
    }
}
