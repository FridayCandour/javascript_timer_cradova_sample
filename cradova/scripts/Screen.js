class Screen {
  constructor(name, template) {
    this.name = name;
    this.template = document.createElement("div");
    this.template.style.width = "100%";
    this.template.style.display = "flex";
    this.template.style.flexDirection = "column";
    this.template.id = "cradova-screen-set";
    if (typeof template === "function") {
      let fuc = template();
      if (typeof fuc === "function") {
        this.template.append(fuc());
      } else {
        this.template.append(fuc);
      }
    } else {
      if (!(template instanceof HTMLElement)) {
        throw new Error("Cradova err only parent with descendants is valid");
      } else {
        this.template.append(template);
      }
    }
    this.callBacks = [];
  }
  onActivate(cb) {
    this.callBacks.push(cb);
  }
  addChild(...addOns) {
    for (let i = 0; i < addOns.length; i++) {
      if (addOns[i] && addOns[i] instanceof HTMLElement) {
        this.template.append(addOns[i]);
      }
      if (typeof addOns[i] === "function") {
        this.template.append(addOns[i]());
      }
    }
  }
  detach() {
    const screen = document.querySelector("#cradova-screen-set");
    if (screen) {
      document.querySelector("#app-wrapper").removeChild(screen);
    }
  }
  Activate() {
    if (document.title === this.name) {
      return;
    }
    const screen = document.querySelector("#cradova-screen-set");
    if (screen) {
      this.detach();
    }
    document.title = this.name;
    document.querySelector("#app-wrapper").append(this.template);
    this.callBacks.forEach((cb) => cb(this.template.firstChild));
  }
}

export default Screen;
