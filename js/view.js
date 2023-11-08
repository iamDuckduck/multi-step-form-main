export default class View {
  $ = {};
  $$ = {};

  constructor() {
    this.$$.inputList = this.#qsAll(".row input");
    this.$$.stepNumberList = this.#qsAll(".number");
    this.$$.pageList = this.#qsAll(".page-wrapper");
    this.$$.nextButton = this.#qsAll('[data-id="next-step"]');
    this.$$.backButton = this.#qsAll('[data-id="back-step"]');
    //UI-only event listeners
  }

  //register all the event listeners

  //won't run automatically, somewhere must call it (in app.js)
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

  //-----utility methods (DOM Helper) to have some methods to change the UI-----

  // render the step view
  renderStep(nextPage) {
    // Loop through each number element
    this.$$.stepNumberList.forEach((element) => {
      // Remove the 'step-color' class from the element
      element.classList.remove("step-color");
    });

    const numberEl = document.querySelector(`.step-${nextPage} .number`);

    numberEl.classList.add("step-color");
  }

  // render the page
  renderPage(nextPage) {
    // Loop through each number element
    this.$$.pageList.forEach((page) => {
      // Remove the 'step-color' class from the element
      page.classList.add("hidden");
    });

    const pageEl = document.querySelector(`.step-${nextPage}-page`);
    pageEl.classList.remove("hidden");
  }

  // logic to show invaild message or not
  showVaild(page) {
    let vaild = true;
    switch (page) {
      case 1:
        vaild = this.#page1Vaild(vaild);
        break;
    }

    return vaild;
  }

  getPageInfo(page) {
    let info = {};

    switch (page) {
      case 1:
        info = this.#page1Info();
        break;
    }
    return info;
  }

  // ----- check different page vaild method ----- //

  #page1Vaild(vaild) {
    console.log(vaild);
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

  // ----- get different page info ----- //

  #page1Info() {
    let info = {};
    // Loop through each input element
    this.$$.inputList.forEach((inputEl) => {
      info[inputEl.dataset.id] = inputEl.value;
    });

    return info;
  }

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
