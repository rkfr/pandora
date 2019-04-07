import './Tabs.css'; 

export default class Tabs {
    constructor(container) {
      this.data = {
        container: container,
        defaultClasses: {
          navItemActive: "",
          elActive: "",
          elDefault: ""
        }
      };
  
      this.lounchOrdeManager();
    }
  
    lounchOrdeManager() {
      this.setClasses();
      this.setDefaultClass();
      this.setDefaultActiveItem();
      this.menuHandler();
    }
  
    setClasses(
      params = {
        elDefault: "el-display-none",
        elActive: "el-active",
        navItemActive: "nav-el-active"
      }
    ) {
      this.data.defaultClasses.navItemActive = params.navItemActive;
      this.data.defaultClasses.elActive = params.elActive;
      this.data.defaultClasses.elDefault = params.elDefault;
    }
  
    getNavBtns() {
      return this.data.container.querySelectorAll(".nav-li");
    }
  
    getInfoSections() {
      return this.data.container.querySelectorAll(".info");
    }
  
    setDefaultClass() {
      const { elDefault: className } = this.data.defaultClasses;
  
      const elements = this.getInfoSections();
  
      for (let el of elements) {
        el.classList.add(className);
      }
    }
  
    setDefaultActiveItem() {
      const {
        elActive: elClassName,
        navItemActive: navClassName
      } = this.data.defaultClasses;
  
      const firstElement = this.getInfoSections()[0];
      firstElement.classList.add(elClassName);
  
      const firstNavItem = this.getNavBtns()[0];
      firstNavItem.classList.add(navClassName);
    }
  
    menuHandler() {
      const menuItems = this.getNavBtns();
  
      for (let item of menuItems) {
        this.changeActiveDataHandler(item);
      }
    }
  
    changeActiveDataHandler(el) {
      const {
          elActive: elClassName,
          navItemActive: navClassName
        } = this.data.defaultClasses,
        elements = this.getInfoSections(),
        menuItems = this.getNavBtns();
  
      el.addEventListener("click", ({ target }) => {
        const { modalNavId: navId } = target.dataset;
  
        for (let menuItem of menuItems) {
          menuItem.classList.remove(navClassName);
        }
  
        target.classList.add(navClassName);
  
        for (let item of elements) {
          item.classList.remove(elClassName);
  
          if (item.dataset.modalInfoId === navId) {
            item.classList.add(elClassName);
          }
        }
      });
    }
  }
  
//   const testContainer = document.getElementById("app");
//   const tUp = new Tabs(testContainer);
  
  // tUp.setClasses({
  //   elDefault: "display-none",
  //   elActive: "display-active",
  //   navItemActive: "menu-active"
  // });