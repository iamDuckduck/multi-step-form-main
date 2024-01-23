import type { PageInfo, PriceTemplate, UserState } from "./types.js";

export default class View {
  $: Record<string, Element> = {};
  $$: Record<string, NodeListOf<Element>> = {};

  constructor(private readonly template: PriceTemplate) {
    // ----- select esstential element -----//
    this.$.PlanChoiceSwitch = this.#qs(".toggle-wrapper #switch");
    this.$.monthText = this.#qs(".month");
    this.$.yearText = this.#qs(".year");
    this.$.noPlanSelected = this.#qs(".no-plan-selected");
    this.$.planChoice = this.#qs('[data-id="plan-choice"]');
    this.$.planPrice = this.#qs('[data-id="plan-price"]');
    this.$.adsOnDiv = this.#qs(".bottom-grip-container");
    this.$.totalTitile = this.#qs(".total-title");
    this.$.totalPrice = this.#qs(".total-price");

    this.$$.inputList = this.#qsAll(".row input");
    this.$$.stepNumberList = this.#qsAll(".number");
    this.$$.pageList = this.#qsAll(".page-wrapper");
    this.$$.nextButton = this.#qsAll('[data-id="next-step"]');
    this.$$.backButton = this.#qsAll('[data-id="back-step"]');
    this.$$.planDiv = this.#qsAll(
      ".user-info-page-2 .grid-container .grid-item"
    );
    this.$$.page3_Div = this.#qsAll(
      ".user-info-page-3 .grid-container .grid-item"
    );
    this.$$.page2_Price = this.#qsAll(".page2_price");
    this.$$.page3_Price = this.#qsAll(".page3_price");
    this.$$.yearlyBenefit = this.#qsAll(".yearly_benefit");

    // -----UI-only event listeners -----//

    // page 2 plan selection logic //
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

    // Extend page 3 click area to outer div for input //
    this.$$.page3_Div.forEach((divEl) => {
      divEl.addEventListener("click", () => {
        const childEl = this.#qs(".switch input", divEl);
        //Type Narrowing
        if (childEl instanceof HTMLInputElement) {
          childEl.checked = !childEl.checked;
        }
        divEl.classList.toggle("clicked");
      });
    });
  }

  // -----register the event listeners -----//

  // won't run automatically, somewhere must call it (in app.js) //
  bindNextButton(handler: EventListener) {
    this.$$.nextButton.forEach((button) => {
      button.addEventListener("click", handler);
    });
  }

  bindBackButton(handler: EventListener) {
    this.$$.backButton.forEach((button) => {
      button.addEventListener("click", handler);
    });
  }

  bindPlanChoiceSwitch(handler: EventListener) {
    this.$.PlanChoiceSwitch.addEventListener("change", handler);
  }

  //-----utility methods (DOM Helper) to have some methods to change the UI-----

  // render the slide bar view
  #renderStep(nextPage: number) {
    if (nextPage == 5) return;

    this.$$.stepNumberList.forEach((element) => {
      element.classList.remove("step-color");
    });

    const numberEl = this.#qs(`.step-${nextPage} .number`);
    numberEl.classList.add("step-color");
  }

  // render the page view
  renderPage(page: number, UserState: UserState) {
    this.#renderStep(page);

    this.$$.pageList.forEach((page) => {
      page.classList.add("hidden");
    });

    const pageEl = this.#qs(`.step-${page}-page`);
    pageEl.classList.remove("hidden");

    if (page == 4) {
      this.#totalPrice(UserState);
    }
  }

  #totalPrice(UserState: UserState) {
    const { duration } = UserState;
    const { plan } = UserState.user_info[1];
    const { plan_price, extra } = this.template;
    const adsOn = UserState.user_info[2];

    const priceIndex: number = plan_price.plan_type.indexOf(plan);
    const planPrice: string = plan_price[duration][priceIndex];

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

      const adsOnPriceIndex: number = extra.adds_on_type.indexOf(key);
      const adsOnPrice: string = `${extra[duration][adsOnPriceIndex]}`;
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
    } else {
      this.$.totalTitile.textContent = "Total (per month)";
      this.$.totalPrice.textContent = `$${totalPrice}/yr`;
    }
  }

  // render the price
  togglePrice(duration: string): void {
    const { plan_price, extra } = this.template;

    // for clicked logic
    this.$.monthText.classList.toggle("selected");
    this.$.monthText.classList.toggle("not-selected");
    this.$.yearText.classList.toggle("selected");
    this.$.yearText.classList.toggle("not-selected");

    // add month free text in page 2
    this.$$.yearlyBenefit.forEach((el) => {
      el.classList.toggle("hidden");
    });

    // change every price
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

  // logic to show invaild message or not
  showVaild(page: number): boolean {
    let vaild: boolean = true;
    switch (page) {
      case 1:
        vaild = this.#page1Vaild(vaild);
        break;

      case 2:
        vaild = this.#page2Vaild(vaild);
        break;
    }

    return vaild;
  }

  // get info from page to state
  getPageInfo(page: number): PageInfo {
    switch (page) {
      case 1:
        return this.#page1Info();

      case 2:
        return this.#page2Info();

      case 3:
        return this.#page3Info();
      default:
        return { error: "error" };
    }
  }

  // ----- check different page vaild method ----- //

  #page1Vaild(vaild: boolean): boolean {
    // Loop through each input element
    this.$$.inputList.forEach((inputEl) => {
      const errorElement = inputEl.previousElementSibling;

      if (inputEl instanceof HTMLInputElement && errorElement) {
        if (inputEl.value === "") {
          vaild = false;
          errorElement.classList.remove("hidden");
          errorElement.textContent = "This field is required";
        } else {
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
  }

  #page2Vaild(vaild: boolean): boolean {
    let inVaildCount: number = 0;

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
  }

  // ----- get different page info ----- //

  #page1Info() {
    let info: PageInfo = {
      name: "",
      email: "",
      phone: "",
    };
    // Loop through each input element
    this.$$.inputList.forEach((inputEl) => {
      if (inputEl instanceof HTMLInputElement && inputEl.dataset.id) {
        info[inputEl.dataset.id] = inputEl.value;
      }
    });

    return info;
  }

  #page2Info() {
    let info: PageInfo = {
      plan: "",
      duration: "",
    };

    this.$$.planDiv.forEach((planEl) => {
      if (planEl.classList.contains("clicked")) {
        info["plan"] = planEl.getAttribute("data-id") as string;
        info["duration"] = this.$.yearText.classList.contains("selected")
          ? "Year"
          : "Month";
      }
    });

    return info;
  }

  #page3Info() {
    let info: PageInfo = {};
    this.$$.page3_Div.forEach((El) => {
      if (El.classList.contains("clicked")) {
        const value = El.getAttribute("data-id") as string;
        info[value] = El.getAttribute("data-id") as string;
      }
    });

    return info;
  }

  // ----- common method ----- //

  #qsAll(selector: string) {
    const elList = document.querySelectorAll(selector);

    if (!elList) throw new Error("Could not find elements");

    return elList;
  }

  #qs(selector: string, parent?: Element) {
    const el = parent
      ? parent.querySelector(selector)
      : document.querySelector(selector);

    //if not element
    if (!el) throw new Error("Could not find elements");
    return el;
  }
}
