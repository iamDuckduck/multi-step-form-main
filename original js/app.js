import View from "./view.js";
import Store from "./store.js";

const price_template = {
  plan_price: {
    Month: ["$9/mo", "$12/mo", "$15/mo"],
    Year: ["$90/yr", "$120/yr", "$150/yr"],
    Name: ["Arcade", "Advanced", "Pro"],
  },
  extra: {
    Month: ["$1/mo", "$2/mo", "$2/mo"],
    Year: ["$10/yr", "$20/yr", "$20/yr"],
    Name: ["Online service", "Larger storage", "Customizable Profile"],
  },
};

// MVC pattern
function init() {
  // create instance of view and store
  const view = new View(price_template);
  const store = new Store(price_template);

  store.addEventListener("statechange", () => {
    view.renderPage(store.page, store.user_info);
  });

  // bind next step button
  view.bindNextButton((event) => {
    // if not vaild not process to other page
    if (view.showVaild(store.page) != true) {
      return;
    }
    // save user info to state
    store.formFilled(view.getPageInfo(store.page));

    // process to next page
    store.nextPage();
  });

  view.bindBackButton((event) => {
    store.backPage();
  });

  view.bindPlanChoiceSwitch((event) => {
    store.changeDuration();
    view.togglePrice(store.user_info);
  });
}

window.addEventListener("load", init);
