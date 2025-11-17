function setTheme(theme) {
    const root = document.documentElement;
    const footer = document.querySelector("footer");
    const header = document.querySelector("header");
    const form = document.querySelector("form");
    if(theme === "dark") {
        root.style.setProperty('background', "var(--dark-background-color)");
        root.style.setProperty('color', "white");
        if(footer) {
            footer.style.setProperty('background-color', "lightseagreen");
        }
        if(header){
            header.style.setProperty('background-color', "var(--my-header-color-dark)");
        }
        form.style.setProperty('background-color', "lightgrey");
    }
    else {
        root.style.setProperty('background', "var(--light-background-color)");
        root.style.setProperty('color', "black");
        if(footer) {
            footer.style.setProperty('background-color', "orange");
        }
        if(header){
            header.style.setProperty('background-color', "var(--my-header-color)");
        }
        form.style.setProperty('background-color', "lightblue");
    }
}

function toggleTheme() {
    const currTheme = localStorage.getItem("theme") || "light";
    const newTheme = currTheme === "light" ? "dark": "light";
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
}

function setSavedTheme() {
    const savedTheme = localStorage.getItem("theme");
    if(savedTheme) {
        setTheme(savedTheme);
        document.getElementById("themeToggle").checked = (savedTheme === "dark");
    }
}

document.addEventListener("DOMContentLoaded", setSavedTheme);