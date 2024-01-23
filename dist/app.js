import View from "./view.js";
import Store from "./store.js";
const price_template = {
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
function init() {
    const view = new View(price_template);
    const store = new Store();
    store.addEventListener("statechange", () => {
        view.renderPage(store.page, store.user_info);
    });
    view.bindNextButton(() => {
        if (view.showVaild(store.page) != true) {
            return;
        }
        store.formFilled(view.getPageInfo(store.page));
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
//# sourceMappingURL=app.js.map