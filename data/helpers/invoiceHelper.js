const db = require('../dbConfig');

module.exports = {
    insert,
    update,
    remove,
    getAll,
    findById,
};

async function getAll() {
    return await db('clients')
    .leftJoin('invoices', 'client_id', 'clients.id')
    .orderBy('invoices.invoice_number', 'desc');   
};

async function insert(invoice) {
    return await db('invoices')
    .insert(invoice)
    .into('invoices')  
};

async function update(id, changes) {
    return db('invoices')
    .where({ id })
    .update(changes);
};

async function findById(id) {
    return await db('invoices')
    .where('id', id)
    .first()
};

async function remove(id) {
    return db('invoices')
    .where('id',id)
    .del(id);
};
