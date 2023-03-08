const PouchDB = require('pouchdb');
const db = new PouchDB('database');

const create = async (data) => {
    try {
        return await db.put(data);
    } catch (err) {
        console.error(err);
    }
}

const get = async (id) => {
    try {
        return await db.get(id);
    } catch (err) {
        console.error(err);
    }
}

const getAll = async () => {
    try {
        return await db.allDocs({ include_docs: true });
    } catch (err) {
        console.error(err);
    }
}

const update = async (post) => {
    try {
        return await db.put(post);
    } catch (err) {
        console.error(err);
    }
}

const del = async (id) => {
    try {
        const doc = await db.get(id);
        return await db.remove(doc);
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    create,
    get,
    getAll,
    update,
    del
}
