var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Store_instances, _Store_state, _Store_saveState, _Store_getState;
const initialState = {
    steps: 1,
    duration: "month",
    user_info: [],
};
class Store extends EventTarget {
    constructor() {
        super();
        _Store_instances.add(this);
        _Store_state.set(this, initialState);
    }
    get page() {
        return __classPrivateFieldGet(this, _Store_instances, "m", _Store_getState).call(this).steps;
    }
    get Duration() {
        return __classPrivateFieldGet(this, _Store_instances, "m", _Store_getState).call(this).duration;
    }
    changeDuration() {
        const state = __classPrivateFieldGet(this, _Store_instances, "m", _Store_getState).call(this);
        const stateClone = structuredClone(state);
        stateClone.duration = stateClone.duration == "month" ? "year" : "month";
        __classPrivateFieldGet(this, _Store_instances, "m", _Store_saveState).call(this, stateClone);
    }
    get user_info() {
        return __classPrivateFieldGet(this, _Store_instances, "m", _Store_getState).call(this);
    }
    nextPage() {
        const state = __classPrivateFieldGet(this, _Store_instances, "m", _Store_getState).call(this);
        const stateClone = structuredClone(state);
        stateClone.steps++;
        __classPrivateFieldGet(this, _Store_instances, "m", _Store_saveState).call(this, stateClone);
        console.log(state);
    }
    backPage() {
        const state = __classPrivateFieldGet(this, _Store_instances, "m", _Store_getState).call(this);
        const stateClone = structuredClone(state);
        stateClone.steps--;
        __classPrivateFieldGet(this, _Store_instances, "m", _Store_saveState).call(this, stateClone);
    }
    formFilled(info) {
        const state = __classPrivateFieldGet(this, _Store_instances, "m", _Store_getState).call(this);
        const stateClone = structuredClone(state);
        if (stateClone.user_info[stateClone.steps - 1] == undefined) {
            stateClone.user_info.push(info);
        }
        else {
            stateClone.user_info[stateClone.steps - 1] = info;
        }
        __classPrivateFieldGet(this, _Store_instances, "m", _Store_saveState).call(this, stateClone);
    }
}
_Store_state = new WeakMap(), _Store_instances = new WeakSet(), _Store_saveState = function _Store_saveState(stateOrFn) {
    const prevState = __classPrivateFieldGet(this, _Store_instances, "m", _Store_getState).call(this);
    let newState;
    switch (typeof stateOrFn) {
        case "function":
            newState = stateOrFn(prevState);
            break;
        case "object":
            newState = stateOrFn;
            break;
        default:
            throw new Error("Invalid argument passed to saveState");
    }
    __classPrivateFieldSet(this, _Store_state, newState, "f");
    this.dispatchEvent(new Event("statechange"));
}, _Store_getState = function _Store_getState() {
    return __classPrivateFieldGet(this, _Store_state, "f");
};
export default Store;
//# sourceMappingURL=store.js.map