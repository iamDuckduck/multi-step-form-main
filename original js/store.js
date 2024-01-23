const initialState = {
  steps: 1, // current page
  Duration: "Month",
  user_info: [],
};

export default class Store extends EventTarget {
  #state = initialState;

  constructor(template) {
    super();
    this.template = template;
  }

  // get current page //
  get page() {
    return this.#getState().steps;
  }

  // getter current duration
  get Duration() {
    return this.#getState().Duration;
  }

  changeDuration() {
    const state = this.#getState();
    const stateClone = structuredClone(state);
    stateClone.Duration = stateClone.Duration == "Month" ? "Year" : "Month";
    this.#saveState(stateClone);
  }

  // get user_info only at page 4
  get user_info() {
    if (this.#getState().steps == 4) {
      return {
        Duration: this.#getState().Duration,
        Plan: this.#getState().user_info[1].Plan,
        adsOn: this.#getState().user_info[2],
      };
    } else if (this.#getState().steps == 2) {
      return this.#getState().Duration;
    }
    return;
  }

  // add 1 and get the page //
  nextPage() {
    const state = this.#getState();
    const stateClone = structuredClone(state);
    stateClone.steps++;
    this.#saveState(stateClone);
    console.log(this.#getState());
  }

  // minus 1 and get the page //
  backPage() {
    const state = this.#getState();
    const stateClone = structuredClone(state);
    stateClone.steps--;
    this.#saveState(stateClone);
  }

  // change state when form is filled and vaild //
  formFilled(info) {
    const state = this.#getState();
    const stateClone = structuredClone(state);

    if (stateClone.user_info[stateClone.steps - 1] == undefined) {
      stateClone.user_info.push(info);
    } else {
      stateClone.user_info[stateClone.steps - 1] = info;
    }

    this.#saveState(stateClone);
  }

  // common method for saving and getting state //
  #saveState(stateOrFn) {
    const prevState = this.#getState();

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

    this.#state = newState;
    this.dispatchEvent(new Event("statechange"));
  }

  #getState() {
    return this.#state;
  }
}
