export default class EventEmitter {
    
    constructor() {
        this.listeners = {};
    }
    
    addListener(label, callback) {
        if (!this.listeners.hasOwnProperty(label)) {
            this.listeners[label] = [];
        }
        this.listeners[label].push(callback);
    }
    removeListener(label, callback) {
        const listeners = this.listeners[label];
        let i = -1;
        for (let index = 0; index < listeners.length; index++) {
            const listener = listeners[index];
            if (typeof listener == "function" && listener === callback) {
                i = index;
                break;
            }
        }
        if (i > -1) {
            listeners.splice(i, 1);
            this.listeners[label] = listeners;
            return true;
        }
        else {
            return false;
        }
    }
    emit(label, ...arg) {
        const listeners = this.listeners[label];
        if (listeners && listeners.length > 0) {
            for (let index = 0; index < listeners.length; index++) {
                const listener = listeners[index];
                listener.call(this, ...arg);
            }
        }
    }
}