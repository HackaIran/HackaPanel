class Tabs {
    constructor (app) {
        this.app = app;
        const tabs = $$("body > main > section > nav > li");
        for (let tab of tabs) {
            tab.addEventListener("click", e => this.select(e.target.getAttribute("data-page")))
        }
        const submitBtn = document.querySelector('body > main > section > nav > li.submit');
        submitBtn.addEventListener("click", this.runTheCode.bind(this));
        this.select('editor')
        // this.tryToRemember()
    }
    tryToRemember () {
        if (localStorage['tab-selected'] !== undefined) this.select(localStorage['tab-selected']);
        else this.select("challenge")
    }
    storeLastTabSelected (which) {
        localStorage['tab-selected'] = which
    }
    select (which) {
        // show the selected tab and hide the others
        for (let page of $$(".tab-page")) page.style.display = "none"
        $(".tab-page#" + which).style.display = "inherit";
        // deactive all items but the selected item, and make it active
        for (let item of $$(`body > main > section > nav > li`)) item.classList.remove("active")
        $(`body > main > section > nav > li:not(.submit)[data-page="${which}"]`).classList.add("active");
        // Store
        this.storeLastTabSelected(which)
    }
    runTheCode () {
        this.app.socket.runTheCode()
    }
}

module.exports = Tabs;