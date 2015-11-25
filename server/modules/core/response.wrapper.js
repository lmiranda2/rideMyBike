module.exports = function (success, successMessage, errorMessage, data) {

    success = success || false;

    successMessage = successMessage || '';

    errorMessage = errorMessage || '';

    data = data || {};

    /*
     Response Wrapper

     {
     success: <true | false>,
     successMessage: <string>,
     errorMessage: <string>,
     data: <any object/array>
     }

     */

    return {
        success: success,
        successMessage: successMessage,
        errorMessage: errorMessage,
        data: data
    };
}