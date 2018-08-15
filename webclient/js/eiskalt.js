define(
    ['config.js'],

    function ($, eiskalt, config) {
        'use strict';

        var my = {
requestSearchResults: function () {
    $.jsonRPC.request('search.getresults', {
        success : my.updateSearchResults,
        error : eiskalt.debug.onError
    });
},

updateSearchResults: function (data) {
    if (data.result === null) {
        eiskalt.debug.print(eiskalt.debug.levels.INFO, 'search results: ' + data.result);
    } else {
        data.result.forEach(function (result) {
            var resultId = result.CID + result.TTH;
            if (!my.searchResults.hasOwnProperty(resultId)) {
                my.searchResults[resultId] = result;
                my.addSearchResult(result);
            }
        });
        $('table#searchresults').trigger('update');
    }
},
        };
    }
);