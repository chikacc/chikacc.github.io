function getColorMode() {
    const colorMode = localStorage.getItem('data-color-mode');
    if (colorMode) return colorMode;
    if (window.matchMedia) return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    return 'light';
}

function setColorMode(colorMode) {
    document.documentElement.setAttribute('data-color-mode', colorMode);
    localStorage.setItem('data-color-mode', colorMode);
}

function toggleColorMode() {
    if (getColorMode() === 'dark') {
        setColorMode('light');
    } else {
        setColorMode('dark');
    }
}

!async function () {
    setColorMode(getColorMode())
}();

const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
            if (node.classList && node.classList.contains('theme-color-mode-toggle'))
                node.addEventListener('click', () => toggleColorMode());
        })
    })
})

observer.observe(document, {childList: true, subtree: true});
