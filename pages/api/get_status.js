import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("alumni-qr-project");
  const users = db.collection("id-status-capacity");

  // console.log("db", db);
  // console.log("users", users);

  console.log("Req", req.method);
  console.log("Req", req.body);

  res.status(200).json({ name: "John Doe" });
}
