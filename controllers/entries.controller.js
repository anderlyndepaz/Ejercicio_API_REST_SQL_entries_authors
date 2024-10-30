const entry = require('../models/entries.model'); // Importar el modelo de la BBDD

//getEntries
// if(hay email)
//     busca por mail
// else
//     busca todo


// GET http://localhost:3000/entries --> ALL
// GET http://localhost:3000/entries?email=hola@gmail.com --> por email
const getEntries = async (req, res) => {
    let entries;
    if (req.query.email) {
        entries = await entry.getEntriesByEmail(req.query.email);
    }
    else {
        entries = await entry.getAllEntries();
    }
    res.status(200).json(entries); // [] con las entries encontradas
}

//createEntry
// POST http://localhost:3000/api/entries
// let newEntry = {
//     title:"noticia desde Node",
//     content:"va a triunfar esto2",
//     email:"alejandru@thebridgeschool.es",
//     category:"sucesos"}

// Crear entry por email
const createEntry = async (req, res) => {
    const newEntry = req.body; // {title,content,email,category}
    const response = await entry.createEntry(newEntry);
    res.status(201).json({
        "items_created": response,
        data: newEntry
    });
}

 // UPDATE
 const updateEntry = async (req, res) => {
    const updatedEntry = req.body; // {title, content, email, category}
    const originalTitle = req.body.originalTitle; // Título original a buscar
    try {
        const response = await entry.updateEntry(updatedEntry, originalTitle);
        if (response) {
            res.status(200).json({
                message: 'Entry updated successfully',
                data: response
            });
        } else {
            res.status(404).json({ error: 'Entry not found' });
        }
    } catch (error) {
        console.error('Error updating entry:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

 // DELETE

 const deleteEntry = async (req, res) => {
    const entryToDelete = req.body.title; // {title, content, email, category}
    try {
        const response = await entry.deleteEntry(entryToDelete);
        if (response) {
            res.status(200).json({
                message: `Se ha borrado la entry ${entryToDelete} `,
                data: response
            });
        } else {
            res.status(404).json({ error: 'Entry no encontrada' });
        }
    } catch (error) {
        console.error('Error al eliminar entry:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports = {
    getEntries,
    createEntry,
    deleteEntry, //--> DELETE
    updateEntry, //--> PUT
}