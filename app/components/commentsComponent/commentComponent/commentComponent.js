/**
 * Created by eli.l on 02/07/2016.
 */
(function () {
    'use strict';

    var pwComment =  angular.module('pwComment', []);
    
    pwComment.directive('pwComment', function () {
        var directive = {
            require: '^^pwComments',
            restrict: 'E',
            templateUrl: 'components/commentsComponent/commentComponent/commentTemplate.html',
            scope: {
                comment: '=',
                availableTags: '='
            },
            link: function(scope, element, attrs, commentsController) {

                function getDefaultComment(){
                    return {
                        title: "",
                        text: "",
                        tags: []
                    }
                }
                function setMode(){
                    if(!(scope.comment && scope.comment.title)){ //new comment
                        scope.newMode = true;
                        scope.displayMode = false;
                        scope.tempComment = getDefaultComment();
                    } else {
                        scope.newMode = false;
                        scope.displayMode = true;
                    }
                }

                function init() {
                    setMode();
                }

                scope.editComment = function () {
                    scope.tempComment = angular.copy(scope.comment);
                    scope.editMode = true;
                    scope.displayMode = false;
                };

                scope.submit = function () {
                    commentsController.updateComment(scope.tempComment);
                    if(scope.newMode){
                        scope.tempComment = getDefaultComment();
                    }
                };

                scope.deleteComment = function () {
                    commentsController.deleteComment(scope.comment.id);
                };

                scope.cancel = function(){
                    scope.editMode = false;
                    scope.displayMode = true;
                };

                scope.$watch('comment', function (newValue, oldValue) {
                    if(newValue && newValue !== oldValue){
                        setMode();
                    }
                });

                init();
            }
        };
        return directive;
    });
    
})();