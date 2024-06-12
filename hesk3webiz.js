$(document).ready(function() { //select category page section
    var correctPageCheck = $('h2').filter(function() {
        return $(this).text().trim() === "Select ticket category";
    }).length > 0;
    if (correctPageCheck) {
        $('button').filter(function() {
           return $(this).text().trim() === "Click to continue";
        }).after(`<p class='smaller-text'>** <span class='orange-text'>Orange text</span> is used to indicate PRIVATE categories. 
        These categories will have a more limited list of users to whom
        the ticket can be assigned.</p>`);
    }

    //console.log("DOM Loaded");

    var strsToMatch = {
                "partial":["(i.e. Enviromental, Greenway, &", "AS-56 Mobile", "(non-359)"],
                "complete":["Other", "359 Request", "DBA"]
    }

    const selText = '#select_category';
    const newColor = '#FF5F1F';
    const checkSelectizeAvailability = () => {
        const selectElement = $(selText);
        //console.log((selectElement.length > 0 && selectElement[0].selectize)); //<--test
    
        if (selectElement.length > 0 && selectElement[0].selectize) {
            const selectizeControl = selectElement[0].selectize; //...and here?
    
            selectizeControl.on('dropdown_open', () => {

                updateOptionStyles(selectizeControl);

            });

            selectizeControl.on('change', () => {
                persistStyleOnSelect(selectizeControl);
            });

            selectizeControl.on('item_add', () => {
                persistStyleOnSelect(selectizeControl);
            });

            // var $assignToSel = "#owner-select".selectize(options); //Holli S
            // var selectize = $assignToSel[0].selectize;
    
         } else {
            setTimeout(checkSelectizeAvailability, 100);
         }
     };

    checkSelectizeAvailability();

    function updateOptionStyles(selectizeControl) {
        console.log('updateOptionStyles() function accessed.');
        try {
            let options = $(selectizeControl.$dropdown_content).find('.option');
            if (!options) throw new Error("options not available");
            options.each(function() {
                let optionElement = $(this);
                let text = optionElement.text().trim();
                var currColor = optionElement.css('color'); //check current color & compare to desired color
                if (currColor.includes('rgb')) currColor = rgbToHex(currColor); //there might be no scenario where
                if (shouldApplyOrangeText(text) && currColor.toUpperCase() !== newColor) {//it's rgb but we'll cover 
                                                                                //that edge
                    optionElement.css('color', newColor);                       //case anyway
                }
            });
        } catch (error) {
            console.log("error encountered: ", error);
        }
    }

    function persistStyleOnSelect(selectizeControl) {
        selectizeControl.on('item_add', function(value, $item) {
            let optionText = $item.text().trim();
            try {
                if (shouldApplyOrangeText(optionText)) {
                $item.css('color', newColor);
                }
            } catch (error) {
                console.warn("error encountered: ", error)
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

 $(document).ready(function() { //ticket input page section -- Holli S started here 05/21/2024
    var correctPageCheck = $('h3').filter(function() {
        return $(this).text().trim() === "Insert a new ticket";
    }).length > 0;
    const selText = '#owner-select';
    const checkSelectizeAvailability = () => {
        const selectElement = $(selText);
        console.log((selectElement.length > 0 && selectElement[0].selectize)); //<--test
        
        if (selectElement.length > 0 && selectElement[0].selectize) { //return 'selectElement' here?
            const selectizeControl = selectElement[0].selectize; //...and here?
            
            
            // var $assignToSel = "#owner-select".selectize(options); //Holli S
            // var selectize = $assignToSel[0].selectize;
            
            selectizeControl.on('focus', function() { //Holli S requested portion
                selectizeControl.clear(); //added by J Hooker on 05/21/2024 at 13:15pm cst
            });
            
        } else {
            setTimeout(checkSelectizeAvailability, 100);
        }
    };
    if (correctPageCheck) {
        checkSelectizeAvailability();
    }
    
    });

//format ticket info page so email isn't initially hidden
$(document).ready(function() {
    var articleSel = 'article.original-message';
    var correctPageCheck = $(articleSel).length > 0;
    console.log(correctPageCheck);
    if (correctPageCheck) {
        var searchText = 'mailto:'
        var elem = $(articleSel + ' a[href^="' + searchText + '"]');
        var text = elem.text().trim();
        var toInsert = `<div><span class="custom-field-title">Email: </span><span>${text}</span></div>`;
        $(articleSel + ' .block--head').after(toInsert);
    }
});

//06.12.2024 - auto input asset # with comp name
$(document).ready(function() {
    var inDiv = $('.main__content.ticket-create .form-group label').filter(function() {
        return $(this).text().trim() === "Computer Name:";
    }).next('input');
    const compNameCheck = /210\d+$/;
    var outDiv = $('.main__content.ticket-create .form-group label').filter(function() {
        return $(this).text().trim() === "Asset Tag No.";
    }).next('input');
    $(inDiv).on("input", function() {
        var inputVal = $(this).val();
        var match = inputVal.match(compNameCheck);
        if (match) {
            outDiv.val("");
            var selPart = match[0]; //<--the section that matches
            outDiv.val(selPart);
        }
        else {
            outDiv.val("");
        }
    })
});

function exactTextMatch(element, searchText) {
    for (let item of searchText) {
        if (element.textContent.trim() === item) {
            return element;
        }
    }
    return null;
}

function partialTextMatch(element, searchText) {
    for (let item of searchText) {
        if (element.textContent.includes(item)) {
            return element;
        }
    }
    return null;
}

function privateCategoryFontColor(selPrefix1 = 'form[action="new_ticket.php"] .selectize-dropdown.single .selectize-dropdown-content', 
selPrefix2 = 'form[action="new_ticket.php"] .selectize-control.single .selectize-input.has-options'
) {
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
    }

}
