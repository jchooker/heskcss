$(document).ready(function() {
    var correctPageCheck = $('h2').filter(function() {
        console.log(`h2 check outcome: ${$(this).text().trim() === 'Select ticket category'}`);
        return $(this).text().trim() === "Select ticket category";
    }).length > 0;
    if (correctPageCheck) {
        console.log('Found h2');
        $('button').filter(function() {
            console.log('found button area for inserting');
           return $(this).text().trim() === "Click to continue";
        }).after(`<p class='smaller-text'>** <span class='orange-text'>Orange text</span> is used to indicate PRIVATE categories. 
        These categories will have a more limited list of users to whom
        the ticket can be assigned.</p>`);
    }

    console.log("DOM Loaded");

    var strsToMatch = {
                "partial":["(i.e. Enviromental, Greenway, &", "AS-56 Mobile", "(non-359)"],
                "complete":["Other", "359 Request", "DBA"]
    }

    const selText = '#select_category';
    const newColor = '#FF5F1F';
    const checkSelectizeAvailability = function() {
        const selectElement = $(selText);
    
        if (selectElement.length > 0 && selectElement[0].selectize) { //return 'selectElement' here?
            const selectizeControl = selectElement[0].selectize; //...and here?
    
            selectizeControl.on('dropdown_open', function() {
                console.log('Linked up w/ selectize');
                updateOptionStyles(selectizeControl);
            });

            selectizeControl.on('change', function() {
                persistStyleOnSelect(selectizeControl);
            });
    
         } else {
            setTimeout(checkSelectizeAvailability, 100);
         }
     };

    checkSelectizeAvailability();

    function updateOptionStyles(selectizeControl) {
        let options = $(selectizeControl.$dropdown_content).find('.option');
        options.each(function() {
            let optionElement = $(this);
            let text = optionElement.text().trim();
            var currColor = optionElement.css('color'); //check current color & compare to desired color
            if (currColor.includes('rgb')) currColor = rgbToHex(currColor); //there might be no scenario where
            if (shouldApplyOrangeText(text) && !currColor.toUpperCase() === newColor) {//it's rgb but we'll cover 
                                                                            //that edge
                optionElement.css('color', newColor);                       //case anyway
            }
        });
    }

    function persistStyleOnSelect(selectizeControl) {
        selectizeControl.on('item_add', function(value, $item) {
            let optionText = $item.text().trim();
            if (shouldStyleOrange(optionText)) {
                $item.css('color', newColor);
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

    function rgbToHex(rgb) {
        var rgbParts = rgb.match(/\d+/g);
        return "#" + rgbParts.map(function(x) {
            x = parseInt(x).toString(16);
            return (x.length === 1) ? "0" + x : x;
        }).join("");
    }
 });

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
