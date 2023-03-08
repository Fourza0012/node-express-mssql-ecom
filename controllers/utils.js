'use strict';

const createErrorMessage = (fieldDatas, requireFields, word = '') => {
    let status = false
    let errMessage = ''
    for (const requireField of requireFields) {
        if (!fieldDatas[requireField]) {
            status = true
            errMessage += `${requireField} `
        }
    }
    return { status, message: errMessage + word }
}

module.exports = {
    createErrorMessage
}