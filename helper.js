const mysql = require('mysql2/promise');
const bluebird = require('bluebird');
const dbConfig = require('./dbconfig')

const DOC_TABLE= dbConfig.DOC_TABLE;
const DOCUMENT_TYPE_TABLE = dbConfig.DOCUMENT_TYPE_TABLE;


let sqlConnection = null;



module.exports = {
    getDocuments,
    getDocument,
    addDocument,
    editDocumentType,
    deleteDocument,
    getDocumentTypes,
    connect,
}


async function connect() {
    sqlConnection = await mysql.createPool({
    host:dbConfig.HOST,
    user: dbConfig.USER,
    password:dbConfig.PASSWORD,
    database: dbConfig.DB,
    Promise: bluebird,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

}

async function getDocuments() {
    try {
        if(!sqlConnection) // check if connection already exits, if yes no need to connect
        await connect();

        const [rows] = await sqlConnection.query(`SELECT ${DOC_TABLE}.id,
        ${DOC_TABLE}.name,
        ${DOCUMENT_TYPE_TABLE}.NAME AS documentType,
        ${DOCUMENT_TYPE_TABLE}.description AS description,
        ${DOCUMENT_TYPE_TABLE}.id AS typeId
        FROM   documents
        LEFT JOIN documenttype
               ON ${DOC_TABLE}.type = ${DOCUMENT_TYPE_TABLE}.id `);
        return rows;
    }
    catch (error) {
        console.log(error);
        throw new Error('Failed to get the documents', 500);
    }
}

async function getDocumentTypes() {
    try {
        if(!sqlConnection)
        await connect();
        const [rows]= await sqlConnection.query(`SELECT * from documentType`);
        return rows;
    }
    catch (error) {
        console.log(error);
        throw new Error('Failed to get the documents', 500);
    }
}


async function editDocumentType(documentType) {
    try {
        if(!sqlConnection)
        await connect();
        const [rows]= await sqlConnection.execute(`UPDATE ${DOCUMENT_TYPE_TABLE} SET NAME = ?, description = ? where id =?`,[documentType.name, documentType.description, documentType.id]
        );
        return rows;
    }
    catch (error) {
        console.log(error);
        throw new Error('Failed to get the documents', 500);
    }
}

async function deleteDocument(documentId) {
    try {
        if(!sqlConnection)
        await connect();
        const id = !Number.isNaN(documentId) ? documentId : null;
        if(!id) {
            throw new Error('Invalid Document Id, Please check the value.', 500);
        }
        const [row] = await sqlConnection.execute(
            'DELETE FROM documents WHERE `id` = ?',
            [id])
        return row;
    }
    catch (error) {
        console.log(error);
        throw new Error('Failed to get the document, please make sure document exits.', 500);
    }
}

async function getDocument(documentId) {
    try {
        if(!sqlConnection)
        await connect();
        const id = !Number.isNaN(documentId) ? documentId : null;
        if(!id) {
            throw new Error('Invalid Document Id, Please check the value.', 500);
        }
        const [row] = await sqlConnection.execute(
            'SELECT * FROM documents WHERE `id` = ?',
            [id])
        if(row && row.length){
            return row[0];
        } return []
    }
    catch (error) {
        console.log(error);
        throw new Error('Failed to get the document, please make sure document exits.', 500);
    }
}


async function addDocument(document) {

    try {
        if(!sqlConnection)
        await connect();
        const [row] = await sqlConnection.query('INSERT INTO documents (name, type ) VALUES(?,?)', [
        document.name,
        document.type,
        ]);
        return row;
    }
    catch (err) {
        console.log(err);
        throw new Error('Failed to add the document, please make sure document attributes are correct.', 500);
    }

}


