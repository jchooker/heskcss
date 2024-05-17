$(document).ready(function() {
     
     //const hasTextElement1 = document.querySelector('.has-items'); //<--selector only works for purposes of clicking boundaries
     //console.log('"' + hasTextElement1 + '" was the result of selecting the class has-items');
     //const hasTextElement2 = document.querySelector('#cc-btn');
     //const hasTextElement3 = document.querySelector('#select_category');
     //console.log('"' + hasTextElement3 + '" was the result of selecting the id select_category');
    console.log("DOM Loaded");
     //const targetSel = '.table-wrap';
    var strsToMatch = {
                "partial":["(i.e. Enviromental, Greenway, &", "AS-56 Mobile", "(non-359)"],
                "complete":["Other", "359 Request", "DBA"]
    }
    const selText = '#select_category';
    const newColor = '#FF5F1F';
    const checkSelectizeAvailability = () => {
        const selectElement = document.querySelector(selText);
    
        if (selectElement && selectElement.selectize) {
            const selectizeControl = selectElement.selectize;
    
            selectizeControl.on('dropdown_open', () => {
                console.log('Linked up w/ selectize');
                updateOptionStyles(selectizeControl);
            });
    
            // selectElement.addEventListener('click', applyCustomStyles);
            // selectElement.addEventListener('keyup', applyCustomStyles);
    
            // function applyCustomStyles() {
            //     var strsToMatch = {
            //         "partial":["(i.e. Enviromental, Greenway, &", "AS-56 Mobile", "(non-359)"],
            //         "complete":["Other", "359 Request", "DBA"]
            //     }
            //     const newColor = '#FF5F1F';
            //     setTimeout(() => {
            //         const options = document.querySelectorAll('.selectize-dropdown-content .option');
    
            //         options.forEach((option, index) => {
            //             if (exactTextMatch(option, strsToMatch.complete)) {
            //                 option.style.color = newColor;
            //             } else if (partialTextMatch(option, strsToMatch.partial)) {
            //                 option.style.color = newColor;
            //             }
            //         });
            //     }, 10);
            // }
    
         } else {
            setTimeout(checkSelectizeAvailability, 100);
         }
     };
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
    // if (targetSel) {
    //     longLooker(targetSel, hasTextElement3, element => {
    //         console.log(`New element added: `, element);
    //     });
    // } else {
    //     console.warn(`Element for '${targetSel}' not found!`);
    // }
    checkSelectizeAvailability();
    
    function updateOptionStyles(selectizeControl) {
        let options = $(selectizeControl.$dropdown_content).find('.option');
        options.each(function() {
            let optionElement = $(this);
            let text = optionElement.text().trim();
            if (shouldApplyOrangeText(text)) {
                optionElement.css('color', newColor);
            }
        });
    }

    function shouldApplyOrangeText(text) {
        for (let item of strsToMatch.complete) {
            if (text === item) return true;
        }
        for (let item of strsToMatch.partial) {
            if (text.includes(item)) return true;
        }
        return false;
    }
 });

// var strsToMatch = {
//     "partial":["(i.e. Enviromental, Greenway, &", "AS-56 Mobile", "(non-359)"],
//     "complete":["Other", "359 Request", "DBA"]
// }

// function exactTextMatch(tag, searchText) {
//     const elements = document.getElementsByTagName(tag);
//     for (let element of elements) {
//         if (element.textContent.trim() === searchText) {
//             return element;
//         }
//     }
//     return null;
// }

// function partialTextMatch(tag, searchText) {
//     const elements = document.querySelectorAll(tag);
//     for (let element of elements) {
//         if (element.textContent.includes(searchText)) {
//             return element;
//         }
//     }
//     return null;
// }
function exactTextMatch(element, searchText) {
    //const elements = document.getElementsByTagName(tag);
    // for (let element of elements) {
        for (let item of searchText) {
            if (element.textContent.trim() === item) {
                return element;
            }
        }
    // }
    return null;
}

function partialTextMatch(element, searchText) {
    //const elements = document.querySelectorAll(tag);
    // for (let element of elements) {
        for (let item of searchText) {
            if (element.textContent.includes(item)) {
                return element;
            }
        }
    // }
    return null;
}

function privateCategoryFontColor(selPrefix1 = 'form[action="new_ticket.php"] .selectize-dropdown.single .selectize-dropdown-content', 
selPrefix2 = 'form[action="new_ticket.php"] .selectize-control.single .selectize-input.has-options'
) {
    // const selPrefix1 = 'form[action="new_ticket.php"] .selectize-dropdown.single .selectize-dropdown-content';
    // const selPrefix2 = 'form[action="new_ticket.php"] .selectize-control.single .selectize-input.has-options'
    const orangeClass = '.orange-text';
    for (let item of strsToMatch.partial) {
        var matchingElem = partialTextMatch(selPrefix1, item);
        if (matchingElem && !matchingElem.classList.contains(orangeClass)) {
            matchingElem.classList.add(orangeClass);
        }
        else {
            matchingElem = partialTextMatch(selPrefix2, item);
            if (matchingElem && !matchingElem.classList.contains(orangeClass)) {
                matchingElem.classList.add(orangeClass);
            }
        }
    } 
    
    for (let item of strsToMatch.complete) {
        var matchingElem = exactTextMatch(selPrefix1, item);
        if (matchingElem && !matchingElem.classList.contains(orangeClass)) {
            matchingElem.classList.add(orangeClass);
        }
        else {
            matchingElem = exactTextMatch(selPrefix2, item);
            if (matchingElem && !matchingElem.classList.contains(orangeClass)) {
                matchingElem.classList.add(orangeClass);
            }
        }
    }//div match for selectize dropdown

    //for (let item of strsToMatch.partial) {

    //} //div match for selectize selected item, if private

    //for (phrase in) //'div button' match on next pg for match (label of 'Category:')     <script src="src/script.js"></script>

}

// function longLooker(targetSelector, element, callback) {
//     const target = document.querySelector(targetSelector);
//     if (!target) {
//         console.warn(`The target element ${targetSelector} was not found in the DOM!`)
//         return;
//     }

//     if (!(element instanceof HTMLElement)) {
//         console.error("The provided 'element' is not a valid HTMLElement.");
//         return;
//     }

//     const observer =
//     new MutationObserver((mutations) => {
//         mutations.forEach((mutation) => {
//             mutation.addedNodes.forEach((node) => {
//                 if (node === element) {
//                     //console.log(`Found target item with selector "${element}"!`);
//                     callback(node);
//                     observer.disconnect();
//                 }
//                 //else console.log(`Never found target item with selector "${element}"!`)
//             });
//         });
//     });
    
//     observer.observe(target, {
//         childList: true,
//         subtree: true
//     });

// }
