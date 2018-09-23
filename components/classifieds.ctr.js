(function() {
  "use strict";
  angular
    .module("ngClassifieds")
    .controller("classifiedsCtrl", function(
      $scope,
      $http,
      classifiedsFactory,
      $mdSidenav,
      $mdToast,
      $mdDialog
    ) {
      classifiedsFactory.getClassifieds().then(res => {
        $scope.classifieds = res.data;
        $scope.categories = getCategories($scope.classifieds);
      });

      var contact = {
        name: "Filip Stepien",
        phone: "(416) 123-4567",
        email: "filip@internet.com"
      };

      $scope.openSidebar = function() {
        $mdSidenav("left").open();
      };
      $scope.closeSidebar = function() {
        $mdSidenav("left").close();
      };

      $scope.saveClassified = function(classified) {
        if (classified) {
          classified.contact = contact;
          $scope.classifieds.push(classified);
          $scope.classified = {};
          $scope.closeSidebar();
          showToast("Classified Saved");
        }
      };

      $scope.editClassified = function(classified) {
        $scope.editing = true;
        $scope.openSidebar();
        $scope.classified = classified;
      };

      $scope.saveEdit = function() {
        $scope.editing = false;
        $scope.classified = {};
        $scope.closeSidebar();
        showToast("Edit Saved");
      };

      $scope.deleteClassified = function(event, classified) {
        var confirm = $mdDialog
          .confirm(event)
          .title("Are you sure you want to delete " + " ?")
          .ok("yes")
          .cancel("no")
          .targetEvent(event);
        $mdDialog.show(confirm).then(
          () => {
            var index = $scope.classifieds.indexOf(classified);
            $scope.classifieds.splice(index, 1);
          },
          () => console.log("cancel")
        );
      };

      function showToast(message) {
        $mdToast.show(
          $mdToast
            .simple()
            .content(message)
            .position("top, right")
            .hideDelay(3000)
        );
      }

      function getCategories(classifieds) {
        var categories = [];

        angular.forEach(classifieds, function(item) {
          angular.forEach(item.categories, function(category) {
            categories.push(category);
          });
        });

        return _.uniq(categories);
      }
    });
})();
