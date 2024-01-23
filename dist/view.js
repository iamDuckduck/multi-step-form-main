var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _View_instances, _View_renderStep, _View_totalPrice, _View_page1Vaild, _View_page2Vaild, _View_page1Info, _View_page2Info, _View_page3Info, _View_qsAll, _View_qs;
class View {
    constructor(template) {
        _View_instances.add(this);
        this.template = template;
        this.$ = {};
        this.$$ = {};
        this.$.PlanChoiceSwitch = __classPrivateFieldGet(this, _View_instances, "m", _View_qs).call(this, ".toggle-wrapper #switch");
        this.$.monthText = __classPrivateFieldGet(this, _View_instances, "m", _View_qs).call(this, ".month");
        this.$.yearText = __classPrivateFieldGet(this, _View_instances, "m", _View_qs).call(this, ".year");
        this.$.noPlanSelected = __classPrivateFieldGet(this, _View_instances, "m", _View_qs).call(this, ".no-plan-selected");
        this.$.planChoice = __classPrivateFieldGet(this, _View_instances, "m", _View_qs).call(this, '[data-id="plan-choice"]');
        this.$.planPrice = __classPrivateFieldGet(this, _View_instances, "m", _View_qs).call(this, '[data-id="plan-price"]');
        this.$.adsOnDiv = __classPrivateFieldGet(this, _View_instances, "m", _View_qs).call(this, ".bottom-grip-container");
        this.$.totalTitile = __classPrivateFieldGet(this, _View_instances, "m", _View_qs).call(this, ".total-title");
        this.$.totalPrice = __classPrivateFieldGet(this, _View_instances, "m", _View_qs).call(this, ".total-price");
        this.$$.inputList = __classPrivateFieldGet(this, _View_instances, "m", _View_qsAll).call(this, ".row input");
        this.$$.stepNumberList = __classPrivateFieldGet(this, _View_instances, "m", _View_qsAll).call(this, ".number");
        this.$$.pageList = __classPrivateFieldGet(this, _View_instances, "m", _View_qsAll).call(this, ".page-wrapper");
        this.$$.nextButton = __classPrivateFieldGet(this, _View_instances, "m", _View_qsAll).call(this, '[data-id="next-step"]');
        this.$$.backButton = __classPrivateFieldGet(this, _View_instances, "m", _View_qsAll).call(this, '[data-id="back-step"]');
        this.$$.planDiv = __classPrivateFieldGet(this, _View_instances, "m", _View_qsAll).call(this, ".user-info-page-2 .grid-container .grid-item");
        this.$$.page3_Div = __classPrivateFieldGet(this, _View_instances, "m", _View_qsAll).call(this, ".user-info-page-3 .grid-container .grid-item");
        this.$$.page2_Price = __classPrivateFieldGet(this, _View_instances, "m", _View_qsAll).call(this, ".page2_price");
        this.$$.page3_Price = __classPrivateFieldGet(this, _View_instances, "m", _View_qsAll).call(this, ".page3_price");
        this.$$.yearlyBenefit = __classPrivateFieldGet(this, _View_instances, "m", _View_qsAll).call(this, ".yearly_benefit");
        this.$$.planDiv.forEach((planEl) => {
            planEl.addEventListener("click", () => {
                const selectedPlan = planEl.getAttribute("data-id");
                planEl.classList.toggle("clicked");
                this.$$.planDiv.forEach((planEl) => {
                    if (planEl.getAttribute("data-id") != selectedPlan) {
                        planEl.classList.remove("clicked");
                    }
                });
            });
        });
        this.$$.page3_Div.forEach((divEl) => {
            divEl.addEventListener("click", () => {
                const childEl = __classPrivateFieldGet(this, _View_instances, "m", _View_qs).call(this, ".switch input", divEl);
                if (childEl instanceof HTMLInputElement) {
                    childEl.checked = !childEl.checked;
                }
                divEl.classList.toggle("clicked");
            });
        });
    }
    bindNextButton(handler) {
        this.$$.nextButton.forEach((button) => {
            button.addEventListener("click", handler);
        });
    }
    bindBackButton(handler) {
        this.$$.backButton.forEach((button) => {
            button.addEventListener("click", handler);
        });
    }
    bindPlanChoiceSwitch(handler) {
        this.$.PlanChoiceSwitch.addEventListener("change", handler);
    }
    renderPage(page, UserState) {
        __classPrivateFieldGet(this, _View_instances, "m", _View_renderStep).call(this, page);
        this.$$.pageList.forEach((page) => {
            page.classList.add("hidden");
        });
        const pageEl = __classPrivateFieldGet(this, _View_instances, "m", _View_qs).call(this, `.step-${page}-page`);
        pageEl.classList.remove("hidden");
        if (page == 4) {
            __classPrivateFieldGet(this, _View_instances, "m", _View_totalPrice).call(this, UserState);
        }
    }
    togglePrice(duration) {
        const { plan_price, extra } = this.template;
        this.$.monthText.classList.toggle("selected");
        this.$.monthText.classList.toggle("not-selected");
        this.$.yearText.classList.toggle("selected");
        this.$.yearText.classList.toggle("not-selected");
        this.$$.yearlyBenefit.forEach((el) => {
            el.classList.toggle("hidden");
        });
        if (plan_price[duration]) {
            this.$$.page2_Price.forEach((priceEl, index) => {
                priceEl.textContent = plan_price[duration][index];
            });
        }
        if (extra[duration]) {
            this.$$.page3_Price.forEach((priceEl, index) => {
                priceEl.textContent = extra[duration][index];
            });
        }
    }
    showVaild(page) {
        let vaild = true;
        switch (page) {
            case 1:
                vaild = __classPrivateFieldGet(this, _View_instances, "m", _View_page1Vaild).call(this, vaild);
                break;
            case 2:
                vaild = __classPrivateFieldGet(this, _View_instances, "m", _View_page2Vaild).call(this, vaild);
                break;
        }
        return vaild;
    }
    getPageInfo(page) {
        switch (page) {
            case 1:
                return __classPrivateFieldGet(this, _View_instances, "m", _View_page1Info).call(this);
            case 2:
                return __classPrivateFieldGet(this, _View_instances, "m", _View_page2Info).call(this);
            case 3:
                return __classPrivateFieldGet(this, _View_instances, "m", _View_page3Info).call(this);
            default:
                return { error: "error" };
        }
    }
}
_View_instances = new WeakSet(), _View_renderStep = function _View_renderStep(nextPage) {
    if (nextPage == 5)
        return;
    this.$$.stepNumberList.forEach((element) => {
        element.classList.remove("step-color");
    });
    const numberEl = __classPrivateFieldGet(this, _View_instances, "m", _View_qs).call(this, `.step-${nextPage} .number`);
    numberEl.classList.add("step-color");
}, _View_totalPrice = function _View_totalPrice(UserState) {
    const { duration } = UserState;
    const { plan } = UserState.user_info[1];
    const { plan_price, extra } = this.template;
    const adsOn = UserState.user_info[2];
    const priceIndex = plan_price.plan_type.indexOf(plan);
    const planPrice = plan_price[duration][priceIndex];
    this.$.planChoice.textContent = `${plan} (${duration})`;
    this.$.planPrice.textContent = `${planPrice}`;
    let totalPrice = -1;
    if (planPrice) {
        totalPrice = Number(planPrice.match(/\d+/));
    }
    this.$.adsOnDiv.innerHTML = "";
    for (const key in adsOn) {
        const childName = document.createElement("p");
        const childPrice = document.createElement("p");
        childName.innerText = `${key}`;
        childName.classList.add("add-ons-name");
        this.$.adsOnDiv.appendChild(childName);
        const adsOnPriceIndex = extra.adds_on_type.indexOf(key);
        const adsOnPrice = `${extra[duration][adsOnPriceIndex]}`;
        childPrice.textContent = `+${adsOnPrice}`;
        childPrice.classList.add("add-ons-price");
        childPrice.classList.add("page-4-price");
        this.$.adsOnDiv.appendChild(childPrice);
        if (adsOnPrice) {
            const matchResult = adsOnPrice.match(/\d+/);
            if (matchResult) {
                totalPrice += Number(matchResult[0]);
            }
        }
    }
    if (duration == "Year") {
        this.$.totalTitile.textContent = "Total (per year)";
        this.$.totalPrice.textContent = `$${totalPrice}/yr`;
    }
    else {
        this.$.totalTitile.textContent = "Total (per month)";
        this.$.totalPrice.textContent = `$${totalPrice}/yr`;
    }
}, _View_page1Vaild = function _View_page1Vaild(vaild) {
    this.$$.inputList.forEach((inputEl) => {
        const errorElement = inputEl.previousElementSibling;
        if (inputEl instanceof HTMLInputElement && errorElement) {
            if (inputEl.value === "") {
                vaild = false;
                errorElement.classList.remove("hidden");
                errorElement.textContent = "This field is required";
            }
            else {
                errorElement.classList.add("hidden");
            }
            if (vaild == true && inputEl.dataset.id == "email") {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(inputEl.value)) {
                    vaild = false;
                    errorElement.classList.remove("hidden");
                    errorElement.textContent = "Wrong email format";
                }
            }
        }
    });
    return vaild;
}, _View_page2Vaild = function _View_page2Vaild(vaild) {
    let inVaildCount = 0;
    this.$$.planDiv.forEach((planEl) => {
        if (!planEl.classList.contains("clicked")) {
            inVaildCount++;
        }
    });
    vaild = inVaildCount == 3 ? false : true;
    vaild == true
        ? this.$.noPlanSelected.classList.add("hidden")
        : this.$.noPlanSelected.classList.remove("hidden");
    return vaild;
}, _View_page1Info = function _View_page1Info() {
    let info = {
        name: "",
        email: "",
        phone: "",
    };
    this.$$.inputList.forEach((inputEl) => {
        if (inputEl instanceof HTMLInputElement && inputEl.dataset.id) {
            info[inputEl.dataset.id] = inputEl.value;
        }
    });
    return info;
}, _View_page2Info = function _View_page2Info() {
    let info = {
        plan: "",
        duration: "",
    };
    this.$$.planDiv.forEach((planEl) => {
        if (planEl.classList.contains("clicked")) {
            info["plan"] = planEl.getAttribute("data-id");
            info["duration"] = this.$.yearText.classList.contains("selected")
                ? "Year"
                : "Month";
        }
    });
    return info;
}, _View_page3Info = function _View_page3Info() {
    let info = {};
    this.$$.page3_Div.forEach((El) => {
        if (El.classList.contains("clicked")) {
            const value = El.getAttribute("data-id");
            info[value] = El.getAttribute("data-id");
        }
    });
    return info;
}, _View_qsAll = function _View_qsAll(selector) {
    const elList = document.querySelectorAll(selector);
    if (!elList)
        throw new Error("Could not find elements");
    return elList;
}, _View_qs = function _View_qs(selector, parent) {
    const el = parent
        ? parent.querySelector(selector)
        : document.querySelector(selector);
    if (!el)
        throw new Error("Could not find elements");
    return el;
};
export default View;
//# sourceMappingURL=view.js.map