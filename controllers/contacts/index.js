const getAll = require('./getAll');
const getById = require('./getById');
const add = require('./add');
const remove = require('./delete');
const updateById = require('./updateById');
const updateByFavorite = require('./updateByFavorite');


module.exports = {
    getAll,
    getById,
    add,
    remove,
    updateById,
    updateByFavorite
}