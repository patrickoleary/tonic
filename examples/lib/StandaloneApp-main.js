/**
 * The StandaloneApp-main.js file is imported last.
 */

/**
 * Waits for the DOM content to be loaded, and then creates and initializes the standalone application.
 *
 * @event DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', function () {
    var app = new StandaloneApp({
        el: 'body',
        dataRoot: qwery('#t-data-root')[0].innerHTML,
        staticRoot: qwery('#t-static-root')[0].innerHTML
    });
    app.initialize();
}, false);
