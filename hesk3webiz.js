 document.addEventListener('DOMContentLoaded', function() {
     
     const hasTextElement1 = document.querySelector('.has-items'); //<--selector only works for purposes of clicking boundaries
     console.log('"' + hasTextElement1 + '" was the result of selecting the class has-items');
     const hasTextElement2 = document.querySelector('#cc-btn');
     const hasTextElement3 = document.querySelector('#select_category');
     console.log('"' + hasTextElement3 + '" was the result of selecting the id select_category');
     console.log("DOM Loaded");
     const targetSel = '.table-wrap';
    //  if (hasTextElement1) {
    //      hasTextElement1.addEventListener('click', function() {
    //         console.log('scenario 1 click');
    //          privateCategoryFontColor();
    //      })
         
    //      hasTextElement1.addEventListener('change', function() {
    //         console.log('scenario 2 change');
    //          privateCategoryFontColor();
    //      })
    //  }
    //  if (hasTextElement3) {
    //     hasTextElement3.addEventListener('change', function() {
    //         console.log('scenario 3 change');
    //         privateCategoryFontColor();
    //     })
    //  }
    longLooker(targetSel, '.has-items', privateCategoryFontColor());
 });

var strsToMatch = {
    "partial":["(i.e. Enviromental, Greenway, &", "AS-56 Mobile", "(non-359)"],
    "complete":["Other", "359 Request", "DBA"]
}

function exactTextMatch(tag, searchText) {
    const elements = document.getElementsByTagName(tag);
    for (let element of elements) {
        if (element.textContent.trim() === searchText) {
            return element;
        }
    }
    return null;
}

function partialTextMatch(tag, searchText) {
    const elements = document.querySelectorAll(tag);
    for (let element of elements) {
        if (element.textContent.includes(searchText)) {
            return element;
        }
    }
    return null;
}

function privateCategoryFontColor() {
    const selPrefix1 = 'form[action="new_ticket.php"] .selectize-dropdown.single .selectize-dropdown-content';
    const selPrefix2 = 'form[action="new_ticket.php"] .selectize-control.single .selectize-input.has-options'
    const newColor = '#FF5F1F';
    for (let item of strsToMatch.partial) {
        var matchingElem = partialTextMatch(selPrefix1, item);
        if (matchingElem && matchingElem.style.color != newColor) {
            matchingElem.style.color = newColor;
        }
        else {
            matchingElem = partialTextMatch(selPrefix2, item);
            if (matchingElem && matchingElem.style.color != newColor) {
                matchingElem.style.color = newColor;
            }
        }
    } 
    
    for (let item of strsToMatch.complete) {
        var matchingElem = exactTextMatch(selPrefix1, item);
        if (matchingElem && matchingElem.style.color != newColor) {
            matchingElem.style.color = newColor;
        }
        else {
            matchingElem = exactTextMatch(selPrefix2, item);
            if (matchingElem && matchingElem.style.color != newColor) {
                matchingElem.stle.color = newColor;
            }
        }
    }//div match for selectize dropdown

    //for (let item of strsToMatch.partial) {

    //} //div match for selectize selected item, if private

    //for (phrase in) //'div button' match on next pg for match (label of 'Category:')     <script src="src/script.js"></script>

}

function longLooker(targetSelector, selector, callback) {
    const target = document.querySelector(targetSelector);
    if (!target) {
        console.warn(`The target element ${targetSelector} was not found in the DOM!`)
        return;
    }
    const observer =
    new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1 && node.matches(selector)) {
                    console.log(`Found target item in selector "${selector}"!`);
                    callback(node);
                    observer.disconnect();
                }
            });
        });
    });
    
    observer.observe(target, {
        childList: true,
        subtree: true
    });

}
