'use strict';

angular.module('checkoffApp')
  .directive('coEnter', function () {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
	       element.bind('keyup', function( e ){
	       		e.preventDefault();
		       	if( e.which === 13 ){
		       		scope.$apply( attrs.coEnter );
		       	}
	       });
      }
    };
  });
