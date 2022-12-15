import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const users = client.db("alumni-qr-project").collection("id-status-capacity");

  const { email, capacity } = req.body;
  // const { email, capacity } = JSON.parse(req.body);

  const response = await users.updateOne(
    { _id: email },
    { $set: { capacity: parseInt(capacity), status: true } },
    { upsert: true }
  );

  res.status(200).json(response);
}
