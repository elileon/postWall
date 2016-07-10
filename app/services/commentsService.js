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
            var existComment;
            comments.some(function (comment, index) {
                if(comment.id === newComment.id){
                    comments[index] = newComment;
                    existComment = true;
                }
                return existComment;
            });

            // add new comment
            if(!existComment){
                newComment.id = maxCommentId;
                comments.push(newComment);
                updateMaxCommentId();
            }
            updateTagsList();
        }

        function deleteComment(commentId){
            var index = -1;
            comments.some(function (comment, commentIndex) {
                if(comment.id === commentId){
                    index = commentIndex;
                }
                return index !== -1;
            });
            
            if(index !== -1){
                comments.splice(index, 1);
                updateTagsList();
            }
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