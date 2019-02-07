const validator = require('validator');
const isEmpty = require('./is-empty');


module.exports = function validateProfileInput(data) {
    let errors = {};

    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.about = !isEmpty(data.about) ? data.about : '';
    data.location = !isEmpty(data.location) ? data.location : '';

    if(!validator.isLength(data.about, {min: 2, max: 250})) {
        errors.about = 'About section must be less than 250 characters'
    }

    if(!validator.isLength(data.handle, {min: 2, max: 40})) {
        errors.about = 'Handle must be between 2 and 40 characters'
    }

    if (validator.isEmpty(data.about)) {
        errors.about = 'About is required';
    }
    if (validator.isEmpty(data.handle)) {
        errors.handle = 'Handle is required';
    }
    if (validator.isEmpty(data.location)) {
        errors.location = 'Location is required';
    }

    if(!isEmpty(data.facebook)) {
        if(!validator.isURL(data.facebook)) {
            errors.facebook = 'Not a valid URL'
        }
    }
    if (isEmpty(data.facebook)) {
        errors.facebook = 'Facebook is required';
    }
    if(!isEmpty(data.instagram)) {
        if(!validator.isURL(data.instagram)) {
            errors.instagram = 'Not a valid URL'
        }
    }
    if(!isEmpty(data.linkedin)) {
        if(!validator.isURL(data.linkedin)) {
            errors.linkedin = 'Not a valid URL'
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}