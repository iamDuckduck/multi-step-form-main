import View from "./view.js";
import Store from "./store.js";

// MVC pattern
function init() {
  // create instance of view and store
  const view = new View();
  const store = new Store();

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
    view.renderPage(currentPage);
  });

  view.bindBackButton((event) => {
    // store state and get currentPage
    const currentPage = store.backPage;

    view.renderStep(currentPage);
    view.renderPage(currentPage);
  });
}

window.addEventListener("load", init);
