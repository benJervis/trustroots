(function () {
  'use strict';

  angular
    .module('users')
    .controller('ProfileEditTagsController', ProfileEditTagsController);

  /* @ngInject */
  function ProfileEditTagsController($scope, Users, Authentication, messageCenterService) {

    // ViewModel
    var vm = this;

    // Copy user to make a temporary buffer for changes.
    // Prevents changes remaining here when cancelling profile editing.
    vm.user = new Users(Authentication.user);

    // Exposed
    vm.updateUserProfile = updateUserProfile;

    /**
     * Update a user profile
     */
    function updateUserProfile(isValid) {
      if (isValid) {
        vm.user.$update(function (response) {
          Authentication.user = response;
          $scope.$emit('userUpdated');
          messageCenterService.add('success', 'Hospitality networks updated.');
        }, function (response) {
          messageCenterService.add('danger', response.data.message || 'Something went wrong. Please try again!', { timeout: 10000 });
        });
      } else {
        messageCenterService.add('danger', 'Please fix errors from your profile and try again.', { timeout: 10000 });
      }
    }

  }

}());
