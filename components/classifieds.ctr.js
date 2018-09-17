(function() {
  "use strict";
  angular
    .module("ngClassifieds")
    .controller("classifiedsCtrl", function($scope) {
      $scope.name = {
        first: "Filip",
        last: "Stepien"
      };
      $scope.messsage = "Hello Angular";
    });
})();
