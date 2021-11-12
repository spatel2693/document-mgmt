const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Document = require('./order');
const DocumentType = require('./documentType');
const Helper = require('./helper');


const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);


router.use((request,response,next)=>{
   console.log('middleware');
   next();
})

router.route('/documents/').get(async (request,response, next)=>{
   try {
       const getRecordsPromise =[Helper.getDocuments(),Helper.getDocumentTypes()];

       const records = await Promise.allSettled(getRecordsPromise);
       const documents = records[0].status === 'fulfilled'? records[0].value : []
       const documentTypes = records[1].status === 'fulfilled'? records[1].value : []
       const res = {
          documents,
          documentTypes
       }
      return response.json(res);
   } catch (error) {
      console.error(error);
      next(error, 500);
   }
})


router.route('/client/documents/').delete(async (request,response, next)=>{
   try {
      const reqDocument = {...request.body}
      if(reqDocument.documents && reqDocument.documents.length) {
          await Promise.all( reqDocument.documents.map(async (document) => {
               await Helper.deleteDocument(document.id);
          }));
      }
         response.status(200).json({ success: true });
   } catch (error) {
      console.error(error);
      next(error, 500);
   }
})


router.route('/documenttype/:id').put(async(request,response, next)=>{
  try {
     const reqDocument = {...request.body}
     const documenttype = new DocumentType(reqDocument);
     if(!documenttype.id) throw new Error('Document Id Missing.',400)
     const updatedRes =await Helper.editDocumentType(documenttype);
     if(updatedRes && updatedRes.affectedRows) {
        response.status(200).json({ success: true });
     } else throw  updatedRes
  } catch (error) {
     console.error(error);
      next(error)
  }
})
router.route('/document').post(async (request,response, next)=>{
   try {
      const reqDocument = {...request.body}
      const newDoc = new Document(reqDocument);
      const insertRes = await Helper.addDocument(newDoc);
      if(insertRes && insertRes.affectedRows) {
         response.status(200).json({ success: true });
      } else throw  insertRes
   } catch (error) {
      next(error, 500);
   }
})


const port = process.env.PORT || 8090;
app.listen(port);
console.log(`Document API is runnning at ${  port}`);



