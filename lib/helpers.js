const bcrypt = require('bcryptjs');
const moment = require('moment');

const serializeErrors = (errors) => {
    const serialized = {};

    errors.forEach(error => {
        serialized[error.param] = {
            message: error.msg
        };
    });

    return serialized;
};

const hashPassword = (password) => bcrypt.hashSync(password, 8);

const formatDate = (date) => {
    return moment(date).format('YYYY-MM-DD');
};

module.exports = {
    serializeErrors,
    hashPassword,
    formatDate,
};

