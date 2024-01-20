export default class View {
  $ = {};
  $$ = {};

  constructor(template) {
    this.template = template;

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
      planEl.addEventListener("click", (event) => {
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
      divEl.addEventListener("click", (event) => {
        const childEl = divEl.querySelector(".switch input");
        childEl.checked = !childEl.checked;
        divEl.classList.toggle("clicked");
      });
    });
  }

  // -----register the event listeners -----//

  // won't run automatically, somewhere must call it (in app.js) //
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

  //-----utility methods (DOM Helper) to have some methods to change the UI-----

  // render the slide bar view
  #renderStep(nextPage) {
    if (nextPage == 5) return;

    this.$$.stepNumberList.forEach((element) => {
      element.classList.remove("step-color");
    });

    const numberEl = document.querySelector(`.step-${nextPage} .number`);
    numberEl.classList.add("step-color");
  }

  // render the page view
  renderPage(page, user_info) {
    this.#renderStep(page);

    this.$$.pageList.forEach((page) => {
      page.classList.add("hidden");
    });

    const pageEl = document.querySelector(`.step-${page}-page`);
    pageEl.classList.remove("hidden");

    if (page == 4) {
      this.#totalPrice(user_info);
    }
  }

  #totalPrice(user_info) {
    const { Duration, Plan, adsOn } = user_info;

    const priceIndex = this.template.plan_price.Name.indexOf(Plan);
    const planPrice = this.template.plan_price[Duration][priceIndex];

    this.$.planChoice.textContent = `${Plan} (${Duration})`;
    this.$.planPrice.textContent = `${planPrice}`;

    let totalPrice = Number(planPrice.match(/\d+/)[0]);
    this.$.adsOnDiv.innerHTML = "";
    for (let i = 0; i < adsOn.length; i++) {
      const childName = document.createElement("p");
      const childPrice = document.createElement("p");
      childName.innerText = `${adsOn[i]}`;
      childName.classList.add("add-ons-name");
      this.$.adsOnDiv.appendChild(childName);

      const adsOnPriceIndex = this.template.extra.Name.indexOf(adsOn[i]);
      const adsOnPrice = `${this.template.extra[Duration][adsOnPriceIndex]}`;
      childPrice.innerText = `+${adsOnPrice}`;
      childPrice.classList.add("add-ons-price");
      childPrice.classList.add("page-4-price");
      this.$.adsOnDiv.appendChild(childPrice);

      totalPrice += Number(adsOnPrice.match(/\d+/)[0]);
    }

    if (Duration == "Year") {
      this.$.totalTitile.textContent = "Total (per year)";
      this.$.totalPrice.textContent = `$${totalPrice}/yr`;
    } else {
      this.$.totalTitile.textContent = "Total (per month)";
      this.$.totalPrice.textContent = `$${totalPrice}/yr`;
    }
  }

  // render the price
  togglePrice(Duration) {
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
    this.$$.page2_Price.forEach((priceEl, index) => {
      priceEl.textContent = this.template.plan_price[Duration][index];
    });

    this.$$.page3_Price.forEach((priceEl, index) => {
      priceEl.textContent = this.template.extra[Duration][index];
    });
  }

  // logic to show invaild message or not
  showVaild(page) {
    let vaild = true;
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
  getPageInfo(page) {
    let info = {};

    switch (page) {
      case 1:
        info = this.#page1Info(info);
        break;

      case 2:
        info = this.#page2Info(info);
        break;

      case 3:
        info = this.#page3Info(info);
        break;
    }
    return info;
  }

  // ----- check different page vaild method ----- //

  #page1Vaild(vaild) {
    // Loop through each input element
    this.$$.inputList.forEach((inputEl) => {
      const errorElement = inputEl.previousElementSibling;
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
    });

    return vaild;
  }

  #page2Vaild(vaild) {
    vaild = false;
    this.$$.planDiv.forEach((planEl) => {
      if (planEl.classList.contains("clicked")) {
        vaild = true;
      }
    });
    vaild == true
      ? this.$.noPlanSelected.classList.add("hidden")
      : this.$.noPlanSelected.classList.remove("hidden");
    return vaild;
  }

  // ----- get different page info ----- //

  #page1Info(info) {
    // Loop through each input element
    this.$$.inputList.forEach((inputEl) => {
      info[inputEl.dataset.id] = inputEl.value;
    });

    return info;
  }

  #page2Info(info) {
    this.$$.planDiv.forEach((planEl) => {
      if (planEl.classList.contains("clicked")) {
        info["Plan"] = planEl.getAttribute("data-id");
        info["Duration"] = this.$.yearText.classList.contains("selected")
          ? "Year"
          : "Month";
      }
    });

    return info;
  }

  #page3Info(info) {
    info = [];
    this.$$.page3_Div.forEach((El) => {
      if (El.classList.contains("clicked")) {
        const value = El.getAttribute("data-id");
        info.push(El.getAttribute("data-id"));
      }
    });

    return info;
  }

  // ----- common method ----- //

  #qsAll(selector) {
    const elList = document.querySelectorAll(selector);

    if (!elList) throw new Error("Could not find elements");

    return elList;
  }

  #qs(selector, parent) {
    const el = parent
      ? parent.querySelector(selector)
      : document.querySelector(selector);

    //if not element
    if (!el) throw new Error("Could not find elements");
    return el;
  }
}
