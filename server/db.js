const knex = require('knex')(require('../db/knexfile')['development']);
const bcrypt = require('bcryptjs');
const {hashPassword} = require('./../lib/helpers');

class DBConnection {
    constructor(connection) {
        this.connection = connection;
    }

    _getUserBy(by) {
        return this.connection
            .select([
                'users.id',
                'users.username',
                'users.first_name',
                'users.last_name',
                'users.password',
                { roleName: 'roles.name' }
            ])
            .from('users')
            .where({ [by.key]: by.value })
            .leftJoin('user_roles', 'users.id', 'user_roles.user_id')
            .leftJoin('roles', 'user_roles.role_id', 'roles.id')
            .first();
    }
    getUserById(id) {
        return this._getUserBy({key: 'users.id', value: id});
    }

    getUserByAuth({ username, password }) {
        return new Promise((resolve, reject) => {
            this._getUserBy({key: 'username', value: username})
                .then((user) => {
                    if (!user) {
                        return resolve(false);
                    }
                    return resolve(bcrypt.compareSync(password, user.password) ? user : false);
                }).catch(reject);
        });
    }

    disconnect() {
        this.connection.end();
    }
}

module.exports.connect = () => {
    return Promise.resolve(new DBConnection(knex));
};
