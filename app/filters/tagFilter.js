/**
 * Created by eli.l on 02/07/2016.
 */

(function() {
    "use strict";
    angular.module('pwFilters', [])
        .filter('pwTags', tagFilter);

    function tagFilter() {
        function filterByTag(comments, tagsToFilter) {
            if(tagsToFilter && tagsToFilter.length === 0){ //nothing to filter
                comments.forEach(function (comment) {
                    comment.show = true;
                });
            } else {
                comments.forEach(function (comment) {
                    comment.show = true;
                    //check if all selected tags are in comment's tags
                    for(var i = 0; i < tagsToFilter.length; i++){
                        if(comment.tags.indexOf(tagsToFilter[i]) === -1){
                            comment.show = false;
                            break;
                        }
                    }
                });
            }

            return comments;
        }

        return filterByTag;
    }
})();