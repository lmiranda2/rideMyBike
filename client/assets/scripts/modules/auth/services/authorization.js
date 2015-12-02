(function (angular, rmb) {
    'use strict';

angular.module(rmb.modules.auth.name).factory(rmb.modules.auth.services.authorization, [
'authentication',
function (authentication) {
 var authorize = function (loginRequired, requiredPermissions, permissionCheckType) {
    var result = rmb.modules.auth.enums.authorised.authorised,
        user = authentication.getCurrentLoginUser(),
        loweredPermissions = [],
        hasPermission = true,
        permission, i;

    permissionCheckType = permissionCheckType || rmb.modules.auth.enums.permissionCheckType.atLeastOne;
	
    if (loginRequired === true && user === undefined) {
        result = rmb.modules.auth.enums.authorised.loginRequired;
    } else if ((loginRequired === true && user !== undefined) &&
        (requiredPermissions === undefined || requiredPermissions.length === 0)) {
        // Login is required but no specific permissions are specified.
        result = rmb.modules.auth.enums.authorised.authorised;
    } else if (requiredPermissions) {
        loweredPermissions = [];
        angular.forEach(user.permissions, function (permission) {
            loweredPermissions.push(permission.toLowerCase());
        });

        for (i = 0; i < requiredPermissions.length; i += 1) {
            permission = requiredPermissions[i].toLowerCase();

            if (permissionCheckType === rmb.modules.auth.enums.permissionCheckType.combinationRequired) {
                hasPermission = hasPermission && loweredPermissions.indexOf(permission) > -1;
                // if all the permissions are required and hasPermission is false there is no point carrying on
                if (hasPermission === false) {
                    break;
                }
            } else if (permissionCheckType === rmb.modules.auth.enums.permissionCheckType.atLeastOne) {
                hasPermission = loweredPermissions.indexOf(permission) > -1;
                // if we only need one of the permissions and we have it there is no point carrying on
                if (hasPermission) {
                    break;
                }
            }
        }

        result = hasPermission ? rmb.modules.auth.enums.authorised.authorised : rmb.modules.auth.enums.authorised.notAuthorised;
    }

    return result;
};

    return {
     authorize: authorize
    };
}]);
}(angular, rmb));