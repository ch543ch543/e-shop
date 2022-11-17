import nc from "next-connect";
import bcrypt from "bcrypt";
import axios from "axios";
import { config } from "../../lib/client";
import { signToken } from "../../lib/auth";

const handler = nc(); //create a handler
handler.post(async (req, res) => {
  //get param for posting new user to sanity.io
  const projectId = config.projectId;
  const dataset = config.dataset;
  const tokenWithWriteAccess = process.env.NEXT_PUBLIC_SANITY_AUTH_TOKEN;
  const createMutations = [
    {
      create: {
        _type: "users",
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        isAdmin: false,
      },
    },
  ];
  //post to sanity.io
  const { data } = await axios.post(
    `https://${projectId}.api.sanity.io/v2022-10-10/data/mutate/${dataset}?returnIds=true`,
    { mutations: createMutations },
    {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${tokenWithWriteAccess}`,
      },
    }
  );
  //after posting to sanity.io, get the returned id info to build token
  const userId = data.results[0].id;
  const user = {
    _id: userId,
    name: req.body.name,
    email: req.body.email,
    isAdmin: false,
  };
  const token = signToken(user);
  res.send({ ...user, token });
});
export default handler;
