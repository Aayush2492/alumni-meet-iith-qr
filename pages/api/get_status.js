import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const users = client.db("alumni-qr-project").collection("id-status-capacity");

  const email = JSON.parse(req.body);

  const response = await users.findOne({ _id: email });
  // console.log("Mongo response", response);

  if (!response) {
    res.status(404).json({ message: "User not found" });
  } else {
    // TODO: invert the status
    res
      .status(200)
      .json({ capacity: response.capacity, status: response.status });
  }
}
