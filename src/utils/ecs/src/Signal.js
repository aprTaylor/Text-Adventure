/**
 * The signal can register listeners and invoke the listeners with messages.
 */
class Signal {
    constructor() {
        this._listeners = [];
    }

    /**
     * Add a listener to this signal.
     * @param {Function} listener
     */
    add(listener) {
        this._listeners.push(listener);
    }

    /**
     * Remove a listener from this signal.
     * @param {Function} listener
     */
    remove(listener) {
        let listeners = this._listeners, i, len;

        for (i = 0, len = listeners.length; i < len; ++i) {
            if (listeners[i] === listener) {
                listeners.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    /**
     * Emit a message.
     * @param {...*} messages
     */
    emit(...messages) {
        let listeners = this._listeners, i, len;

        for (i = 0, len = listeners.length; i < len; ++i) {
            listeners[i].apply(null, messages);
        }
    }
}

export default Signal