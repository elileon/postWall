/**
 * Created by eli.l on 02/07/2016.
 */

(function() {
    "use strict";
    angular.module('pwServices', [])
        .factory('pwCommentsService', commentsService);

    function commentsService($http, $q) {
        var comments,
        tags = [],
        maxCommentId = 0;

        function getComments(){
            var deferred = $q.defer();

            if(comments){
                deferred.resolve(comments);
            } else {
                $http.get('comments.json')
                    .then(function(response){
                        comments = response.data;
                        updateMaxCommentId();
                        updateTagsList();
                        deferred.resolve(comments);
                    }, function(){
                        comments = [];
                        deferred.resolve(comments);
                    });
            }

            return deferred.promise;
        }

        function updateMaxCommentId() {
            comments.forEach(function (comment) {
                if(comment.id >= maxCommentId){
                    maxCommentId = comment.id + 1;
                }
            })
        }

        function updateComment(newComment) {
            if(!newComment){
                return;
            }

            var index = getCommentIndexById(newComment.id);
            if(index !== -1){
                comments[index] = newComment;
            } else { // add new comment
                newComment.id = maxCommentId;
                comments.push(newComment);
                updateMaxCommentId();
            }
            updateTagsList();
        }

        function deleteComment(commentId){
            var index = getCommentIndexById(commentId);
            if(index !== -1){
                comments.splice(index, 1);
                updateTagsList();
            }
        }

        function getCommentIndexById(commentId) {
            var index = -1;
            for(var i = 0; i < comments.length; i++){
                if(comments[i].id === commentId){
                    index = i;
                    break;
                }
            }
            return index;
        }

        function updateTagsList() {
            var tagsName = [];
            comments.forEach(function(comment, index){
                if(comment && comment.tags){
                    comment.tags.forEach(function (tag) {
                        if(tagsName.indexOf(tag) === -1){
                            tagsName.push(tag);
                        }
                    })
                }
            });

            tags = tagsName;
        }

        function getTagsList() {
            return tags;
        }

        return {
            getComments: getComments,
            updateComment: updateComment,
            deleteComment: deleteComment,
            getTagsList: getTagsList
        };
    }
})();