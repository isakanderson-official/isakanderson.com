import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('nextjs-mongodb-demo');
  switch (req.method) {
    case 'POST':
      console.log(req.body);
      let bodyObject = req.body;
      let myPost = await db.collection('posts').insertOne(bodyObject);
      res.json(myPost);
      break;
    case 'GET':
      const allPosts = await db.collection('posts').find({}).toArray();
      res.json({ status: 200, data: allPosts });
      break;
  }
}
