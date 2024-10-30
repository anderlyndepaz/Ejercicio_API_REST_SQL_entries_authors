const { deleteAuthorByEmail } = require("../models/authors.model");

const queries = {
    getAllAuthors: `
        SELECT name, surname, image, email
        FROM authors
        ORDER BY name;
    `,
    getAuthorByEmail: `
       SELECT name, surname, image, email
        FROM authors
        WHERE email = $1
        ORDER BY name;`,
    createAuthor: `
        INSERT INTO authors(name, surname, image, email) 
        VALUES ($1, $2, $3, $4)
    `,
    updateAuthorByEmail: `
    UPDATE authors
    SET name = $1, surname = $2, image = $3, email = $4
    WHERE email = $5
   `,
   deleteAuthorByEmail: `
  DELETE FROM authors 
  WHERE id_author = 
  (SELECT id_author 
  FROM authors 
  WHERE email = $1);
   `
};

module.exports = queries;
