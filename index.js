import express from "express";
import { connectionDB } from "./DB/connections.js";
import * as allRouters from "./modules/index.routes.js";
const port = 3000
const app = express();
const baseUrl = '/api/v1'
app.use(express.json());

connectionDB();
app.use(`${baseUrl}/user`, allRouters.userrouter);
app.use(`${baseUrl}/blog`, allRouters.blogrouter);

app.use("*", (req, res) => {
  res.json({ message: "In-valid Routing" });
});
app.listen(port, () => console.log(`Example app listening on port ${port}!!!!!!!!!!!`));
