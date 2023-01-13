import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const { slug } = req.query;
  const collection = slug[0];
  console.log(slug);
  const documentId = slug[1] || false;
  const client = await clientPromise;
  const db = client.db('nextjs-mongodb-demo');

  // Switch
  switch (req.method) {
    case 'POST':
      console.log(req.body);
      let bodyObject = req.body;
      let myPost = await db.collection(collection).insertOne(bodyObject);
      res.json(myPost);
      break;
    case 'GET':
      if (!documentId) {
        const allPosts = await db.collection(collection).find({}).toArray();
        res.json({ status: 200, data: allPosts });
      } else {
        const onePost = await db
          .collection(collection)
          .findOne({ _id: ObjectId(documentId) });
        res.json({ status: 200, data: onePost });
      }
      break;
    case 'PATCH':
      if (!documentId) {
        res.json({ message: 'Must specify document id in query path' });
        return;
      }
      const document = await db.collection(collection).findOneAndUpdate(
        { _id: ObjectId(documentId) },
        {
          $set: {
            ...req.body,
          },
        }
      );
      res.json(document);
      break;
    case 'DELETE':
      if (!documentId) {
        res.json({ message: 'Must specify document id in query path' });
        return;
      }
      const result = await db
        .collection(collection)
        .findOneAndDelete({ _id: ObjectId(documentId) });
      console.log(JSON.stringify(result));
      res.status(202).json(result?.value);
      break;
  }
}
