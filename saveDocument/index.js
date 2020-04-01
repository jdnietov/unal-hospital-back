const Firestore = require('@google-cloud/firestore');
const PROJECTID = 'poc-test-unal-hospital';
const COLLECTION_NAME = 'diagnostics';
const firestore = new Firestore({
  projectId: PROJECTID,
  timestampsInSnapshots: true,
});

exports.saveDocument = (req, res) => {
  if (req.method === 'POST') {
    // store/insert a new document
    const data = (req.body) || {};
    data['created'] = new Date();
    return firestore.collection(COLLECTION_NAME)
      .add({ data })
      .then(doc => {
        return res.status(201).send(data);
      }).catch(err => {
        console.error(err);
        return res.status(404).send({ error: 'unable to store', err });
      });
  }
  return res.status(400).send({ error: 'Bad Request' });
};