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
      var vm = this;

      vm.openSidebar = openSidebar;
      vm.closeSidebar = closeSidebar;
      vm.saveClassified = saveClassified;
      vm.editClassified = editClassified;
      vm.saveClassified = saveClassified;
      vm.deleteClassified = deleteClassified;

      vm.classifieds;
      vm.categories;
      vm.editing;
      vm.classified;

      classifiedsFactory.getClassifieds().then(res => {
        vm.classifieds = res.data;
        vm.categories = getCategories(vm.classifieds);
      });

      var contact = {
        name: "Filip Stepien",
        phone: "(416) 123-4567",
        email: "filip@internet.com"
      };

      function openSidebar() {
        $mdSidenav("left").open();
      }
      function closeSidebar() {
        $mdSidenav("left").close();
      }

      function saveClassified(classified) {
        if (classified) {
          classified.contact = contact;
          vm.classifieds.push(classified);
          vm.classified = {};
          closeSidebar();
          showToast("Classified Saved");
        }
      }

      function editClassified(classified) {
        vm.editing = true;
        openSidebar();
        vm.classified = classified;
      }

      function saveEdit() {
        vm.editing = false;
        vm.classified = {};
        closeSidebar();
        showToast("Edit Saved");
      }

      function deleteClassified(event, classified) {
        var confirm = $mdDialog
          .confirm(event)
          .title("Are you sure you want to delete " + " ?")
          .ok("yes")
          .cancel("no")
          .targetEvent(event);
        $mdDialog.show(confirm).then(
          () => {
            var index = vm.classifieds.indexOf(classified);
            vm.classifieds.splice(index, 1);
          },
          () => console.log("cancel")
        );
      }

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
