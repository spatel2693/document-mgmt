# @document-mgmt

This service aims to resolve document management by storing documents with pre-defined Document Types.


## Repository Content

The Repository contains 2 directory :

- Back End - Support directory (document-mgmt-api)
- Front End - Support directory ([document-mgmt-vue-app](https://github.com/spatel2693/document-mgmt-vue-app))



**document-mgmt-api** microservice task is to provider server support for the Document Management App

**document-mgmt-vue-app** will be support Front End operations.

## Before Starting the App

1. The service will only use local database, please make sure to update the credentials in [`dbConfig.js`](https://github.com/spatel2693/document-mgmt-api/blob/main/documentsDB.sql)  with the local database server of the current machine.
2. In order to get records for testing data, make sure to ***run sql script - document-db.sql*** which is part of microservice and ensure that database is connected.
3. Since we are running this application locally, we will need to connect local db server with the application.
4. Once connected - Start the BE microservice using command `npm start` in termnial.
5. Once BE server has started successfully, Front End can be started by running `npm start` or `npm run serve`


#### Check @document-mgmt-api is running :

In order to **verify sql connection** and microservice running successfully, please fire below request in postman. If the request is successful you will be getting `documents` and `document types` in response.

```bash
  GET http://localhost:8090/api/documents/
```

Once both the microservice and vue app is running successfully you should be good to go.

## Run Locally

Clone the project

```bash
git clone https://github.com/spatel2693/document-mgmt-api.git
  git clone https://github.com/spatel2693/document-mgmt-vue-app.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```

