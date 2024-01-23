import type { UserState, PageInfo } from "./types";

const initialState: UserState = {
  steps: 1, // current page
  duration: "month",
  user_info: [],
};

export default class Store extends EventTarget {
  #state = initialState;

  constructor() {
    super();
  }

  // get current page //
  get page(): number {
    return this.#getState().steps;
  }

  // getter current duration
  get Duration(): string {
    return this.#getState().duration;
  }

  changeDuration(): void {
    const state = this.#getState();
    const stateClone = structuredClone(state);
    stateClone.duration = stateClone.duration == "month" ? "year" : "month";
    this.#saveState(stateClone);
  }

  get user_info(): UserState {
    return this.#getState();
  }

  // add 1 and get the page //
  nextPage(): void {
    const state = this.#getState();
    const stateClone = structuredClone(state);
    stateClone.steps++;
    this.#saveState(stateClone);
    console.log(state);
  }

  // minus 1 and get the page //
  backPage(): void {
    const state = this.#getState();
    const stateClone = structuredClone(state);
    stateClone.steps--;
    this.#saveState(stateClone);
  }

  // change state when form is filled and vaild //
  formFilled(info: PageInfo) {
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
  #saveState(stateOrFn: UserState | ((prevState: UserState) => UserState)) {
    const prevState = this.#getState();

    let newState: UserState;

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

  #getState(): UserState {
    return this.#state;
  }
}
