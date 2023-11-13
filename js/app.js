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
  const view = new View();
  const store = new Store(price_template);

  // bind next step button
  view.bindNextButton((event) => {
    console.log(store.page);
    // if not vaild not process to other page
    if (view.showVaild(store.page) != true) {
      return;
    }
    // save user info to state
    store.formFilled(view.getPageInfo(store.page));

    // process to next page
    const currentPage = store.nextPage;
    view.renderStep(currentPage);
    view.renderPage(currentPage, store.user_info, store.template);
  });

  view.bindBackButton((event) => {
    const currentPage = store.backPage;
    view.renderStep(currentPage);
    view.renderPage(currentPage);
  });

  view.bindPlanChoiceSwitch((event) => {
    view.renderPrice(store.template, store.Duration);
  });
}

window.addEventListener("load", init);
