import View from "./view.js";
import Store from "./store.js";
import type { PriceTemplate } from "./types.js";

const price_template: PriceTemplate = {
  plan_price: {
    month: ["$9/mo", "$12/mo", "$15/mo"],
    year: ["$90/yr", "$120/yr", "$150/yr"],
    plan_type: ["Arcade", "Advanced", "Pro"],
  },
  extra: {
    month: ["$1/mo", "$2/mo", "$2/mo"],
    year: ["$10/yr", "$20/yr", "$20/yr"],
    adds_on_type: ["Online service", "Larger storage", "Customizable Profile"],
  },
};

// MVC pattern
function init() {
  // create instance of view and store
  const view = new View(price_template);
  const store = new Store();

  store.addEventListener("statechange", () => {
    view.renderPage(store.page, store.user_info);
  });

  // bind next step button
  view.bindNextButton(() => {
    // if not vaild not process to other page
    if (view.showVaild(store.page) != true) {
      return;
    }

    // save user info to state
    store.formFilled(view.getPageInfo(store.page));

    // process to next page
    store.nextPage();
  });

  view.bindBackButton(() => {
    store.backPage();
  });

  view.bindPlanChoiceSwitch(() => {
    store.changeDuration();
    view.togglePrice(store.Duration);
  });
}

window.addEventListener("load", init);
