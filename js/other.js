window.addEventListener('hashchange', handleHashChange);

function handleHashChange() {
    console.log('hash', window.location.hash);
    if (window.location.hash === '#about') {
        window.scrollTo(0, 0);
    }
}