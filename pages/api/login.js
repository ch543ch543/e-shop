import nc from "next-connect";
import bcrypt from "bcrypt";
import { client } from "../../lib/client";
import { signToken } from "../../lib/auth";

const handler = nc(); //create a handler
handler.post(async (req, res) => {
  const user = await client.fetch(
    `*[_type == "users" && email == '${req.body.email}'][0]`
  );
  const userInfo = {
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.Admin,
  };
  if (user && bcrypt.compare(req.body.password, user.password)) {
    const token = signToken(userInfo);
    res.send({ ...userInfo, token });
  } else {
    res.status(401).send({ message: "Invalid email or password" });
  }
});
export default handler;
