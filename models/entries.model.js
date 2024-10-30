// const { Pool } = require('pg');
const pool = require('../config/db_pgsql');
const queries = require('../queries/entries.queries') // Queries SQL

// const pool = new Pool({
//     host: 'localhost',
//     user: 'postgres',
//     port: '5432',
//     database: 'postgres',
//     password: '123456'
// });



// GET
const getEntriesByEmail = async (email) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.getEntriesByEmail, [email])
        result = data.rows

    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

// GET
const getAllEntries = async () => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.getAllEntries)
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

// CREATE
const createEntry = async (entry) => {
    const { title, content, email, category } = entry;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.createEntry, [title, content, email, category])
        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

// DELETE
const deleteEntry = async (entryToDelete) => {
    const title = entryToDelete;
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.deleteEntryByTitle, [title]);
        result = data.rowCount; // Devuelve la fila actualizada
    } catch (err) {
        console.log('Error to delete entry:', err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};
//UPDATE
// Función para actualizar una entrada
const updateEntry = async (updatedEntry, originalTitle) => {
    const { title, content, category } = updatedEntry;
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.updateEntryByTitle, [title, content, category, originalTitle]);
        result = data.rowCount; // Devuelve la fila actualizada
    } catch (err) {
        console.log('Error updating entry:', err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};

const entries = {
    getEntriesByEmail,
    getAllEntries,
    createEntry,
    deleteEntry,
    updateEntry
}

module.exports = entries;

 getEntriesByEmail("birja@thebridgeschool.es")
 .then(data=>console.log(data)) 