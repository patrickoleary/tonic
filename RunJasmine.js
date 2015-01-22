var system = require('system');

// Check the appropriate amount of arguments given
if (system.args.length !== 2) {
    console.log('Usage: run-jasmine.js URL');
    phantom.exit(1);
}

/**
 * Wait until the test condition is true or a timeout occurs. Useful for waiting
 * on a server response or for a ui change (fadeIn, etc.) to occur.
 *
 * @param testFx javascript condition that evaluates to a boolean,
 * it can be passed in as a string (e.g.: "1 == 1" or "$('#bar').is(':visible')" or
 * as a callback function.
 * @param onReady what to do when testFx condition is fulfilled,
 * it can be passed in as a string (e.g.: "1 == 1" or "$('#bar').is(':visible')" or
 * as a callback function.
 * @param timeOutMillis the max amount of time to wait. If not specified, 3 sec is used.
 */
function waitFor(testFx, onReady, timeOutMillis) {
    var maxtimeOutMillis = timeOutMillis ? timeOutMillis : 3001, //< Default Max Timeout is 3s
        start = new Date().getTime(),
        condition = false,
        interval = setInterval(function() {
            if ((new Date().getTime() - start < maxtimeOutMillis) && !condition) {
                // If not time-out yet and condition not yet fulfilled
                condition = (typeof(testFx) === "string" ? eval(testFx) : testFx()); //< defensive code
            } else {
                if (!condition) {
                    // If condition still not fulfilled (timeout but condition is 'false')
                    console.log("'waitFor()' timeout");
                    phantom.exit(1);
                } else {
                    // Condition fulfilled (timeout and/or condition is 'true')
                    console.log("'waitFor()' finished in " + (new Date().getTime() - start) + "ms.");
                    typeof(onReady) === "string" ? eval(onReady) : onReady(); //< Do what it's supposed to do once the condition is fulfilled
                    clearInterval(interval); //< Stop this interval
                }
            }
        }, 100); //< repeat check every 100ms
}

var page = require('webpage').create();

// Route "console.log()" calls from within the Page context to the main Phantom context (i.e. current "this")
page.onConsoleMessage = function (msg) {
    console.log(msg);
};

page.open(system.args[1], function (status) {
    if (status !== "success") {
        console.log("Unable to access network");
        phantom.exit();
    } else {
        waitFor(function () {
            return page.evaluate(function () {
                var summary = document.body.querySelector('.symbol-summary');
                var pending = summary && summary.querySelector('.pending');
                return summary !== null && pending === null;
            });
        }, function () {
            var exitCode = page.evaluate(function () {
                console.log('');
                var passingList = document.body.querySelectorAll('.symbol-summary .passed');
                if (passingList && passingList.length > 0) {
                    console.log('\033[1;32m' + passingList.length + '\033[39m' + ' test(s) \033[1;32mPASSED\033[39m:');
                    for (var i = 0; i < passingList.length; ++i) {
                        var el = passingList[i],
                            status = el.className,
                            msg = el.title;
                        console.log('');
                        console.log('\033[1;32m' + status + '\033[39m' + ": " + msg);
                    }
                }
                var failingList = document.body.querySelectorAll('.results > .failures > .spec-detail.failed');
                if (failingList && failingList.length > 0) {
                    console.log('');
                    console.log('\033[1;31m' + failingList.length + '\033[39m' + ' test(s) \033[1;31mFAILED\033[39m:');
                    for (var i = 0; i < failingList.length; ++i) {
                        var el = failingList[i],
                            desc = el.querySelector('.description').innerText,
                            res = el.querySelector('.result-message').innerText;
                        console.log('');
                        console.log(desc);
                        console.log('\033[1;31m' + res + '\033[39m');
                    }
                    console.log('');
                    console.log('++++         ++++');
                    console.log('\033[1;31m' + document.body.querySelector('.alert > .failed.bar').innerText + '\033[39m');
                    console.log('');

                    return 1;
                } else {
                    console.log('');
                    console.log('++++         ++++');
                    console.log('\033[1;32m' + document.body.querySelector('.alert > .passed.bar').innerText + '\033[39m');
                    console.log('');

                    return 0;
                }
            });

            phantom.exit(exitCode);
        });
    }
});