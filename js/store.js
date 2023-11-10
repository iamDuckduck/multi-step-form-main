const initialState = {
  steps: 1, // current page
  Duration: "Month",
  user_info: [],
};

export default class Store {
  #state = initialState;

  constructor(template) {
    this.template = template;
  }

  // get current page //
  get page() {
    return this.#getState().steps;
  }

  // getter method ( change current duration before return ) //
  get Duration() {
    const state = this.#getState();
    const stateClone = structuredClone(state);

    stateClone.Duration = stateClone.Duration == "Month" ? "Year" : "Month";
    this.#saveState(stateClone);

    return this.#getState().Duration;
  }

  // add 1 and get the page //
  get nextPage() {
    const state = this.#getState();

    const stateClone = structuredClone(state);
    stateClone.steps++;

    this.#saveState(stateClone);

    return this.#getState().steps;
  }

  // minus 1 and get the page //
  get backPage() {
    const state = this.#getState();

    const stateClone = structuredClone(state);
    stateClone.steps--;

    this.#saveState(stateClone);

    return this.#getState().steps;
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
    console.log(stateClone);
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
  }

  #getState() {
    return this.#state;
  }
}
