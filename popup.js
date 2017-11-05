document.addEventListener('DOMContentLoaded', () => {    
    var query = document.getElementById('query');
    var searchButton = document.getElementById('searchButton');
    var socialMediaSearchButton = document.getElementById('socialMediaSearch');
    var priceSearchButton = document.getElementById('priceSearch');
    var exactSearchButton = document.getElementById('exactSearch');
    var websiteSearchButton = document.getElementById('websiteSearch');
    var excludeFromSearchButton = document.getElementById('excludeFromSearch');
    
    searchButton.addEventListener('click', () => {
        googleIt(query.value);  
    });
    
    socialMediaSearchButton.addEventListener('click', () => {
        var what = document.getElementById('socialMediaEntity').value;
        var where = document.getElementById('site').value;
        socialMediaSearch(what, where);
    });
    
    priceSearchButton.addEventListener('click', () => {
        var item = document.getElementById('item').value;
        var minPrice = document.getElementById('minPrice').value;
        var maxPrice = document.getElementById('maxPrice').value;
        priceSearch(item, minPrice, maxPrice);
    });
    
    exactSearchButton.addEventListener('click', () => {
        var phrase = document.getElementById('phrase').value;
        exactSearch(phrase);
    });
    
    websiteSearchButton.addEventListener('click', () => {
        var entity = document.getElementById('entity').value;
        var website = document.getElementById('website').value;
        websiteSearch(entity, website);
    });
    
    excludeFromSearchButton.addEventListener('click', () => {
        var keywords = document.getElementById('keywords').value;
        excludeFromSearch(keywords);
    });
});

function googleIt(query) {
    chrome.tabs.create({'url' : 'http://www.google.com/search?q='+encodeURI(query)});
}

function socialMediaSearch(what, where) {
    var isInvalid = false; 
    if(what==null || what.length==0) {
        textBoxValidation('socialMediaEntity', true);
        isInvalid = true;
    }
    else {
        textBoxValidation('socialMediaEntity', false);
    }
    
    if(where==null || where.length==0) {
        textBoxValidation('site', true);
        isInvalid = true;
    }
    else {
        textBoxValidation('site', false);
    }
    
    if(isInvalid) {
        return;
    }
    
    var query = document.getElementById('query');
    query.value += what+' @'+where;
}

function priceSearch(item, minPrice, maxPrice) {
    var isInvalid = false; 
    if(item==null || item.length==0) {
        textBoxValidation('item', true);
        isInvalid = true;
    }
    else {
        textBoxValidation('item', false);
    }
    
    if(minPrice==null || minPrice.length==0) {
        textBoxValidation('minPrice', true);
        isInvalid = true;
    }
    else {
        textBoxValidation('minPrice', false);
    }
    
    if(maxPrice==null || maxPrice.length==0) {
        textBoxValidation('maxPrice', true);
        isInvalid = true;
    }
    else {
        textBoxValidation('maxPrice', false);
    }
    
    if(isInvalid) {
        return;
    }
    
    var query = document.getElementById('query');
    query.value += item+' $'+minPrice+'..$'+maxPrice;
}

function textBoxValidation(id, isInvalid) {
    if(isInvalid) {
        document.getElementById(id).className = 'emptyTextBox'+((id=='minPrice'||id=='maxPrice')?' priceTextBox':'');
    }
    else {
        document.getElementById(id).className = (id=='minPrice'||id=='maxPrice')?'priceTextBox':'';
    }
}

function exactSearch(phrase) {
    var isInvalid = false; 
    if(phrase==null || phrase.length==0) {
        textBoxValidation('phrase', true);
        isInvalid = true;
    }
    else {
        textBoxValidation('phrase', false);
    }
    
    if(isInvalid) {
        return;
    }
    
    var query = document.getElementById('query');
    query.value += '"'+phrase+'"';
}

function websiteSearch(entity, website) {
    var isInvalid = false; 
    if(entity==null || entity.length==0) {
        textBoxValidation('entity', true);
        isInvalid = true;
    }
    else {
        textBoxValidation('entity', false);
    }
    
    if(website==null || website.length==0) {
        textBoxValidation('website', true);
        isInvalid = true;
    }
    else {
        textBoxValidation('website', false);
    }
    
    if(isInvalid) {
        return;
    }
    
    var query = document.getElementById('query');
    query.value += entity+' site:'+website;
}

function excludeFromSearch(keywords) {
    var isInvalid = false; 
    if(keywords==null || keywords.length==0) {
        textBoxValidation('keywords', true);
        isInvalid = true;
    }
    else {
        textBoxValidation('keywords', false);
    }
    
    if(isInvalid) {
        return;
    }
    
    var query = document.getElementById('query');
    var keywords = keywords.split(' ');
    for(var i=0; i<keywords.length; i++) {
        query.value += '-'+keywords[i]+' ';
    }
}



