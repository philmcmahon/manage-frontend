import bunyan from "bunyan";
import cookieParser from "cookie-parser";
import express from "express";
import helmet from "helmet";
import fetch from "node-fetch";
import { renderToString } from "react-dom/server";
import { ServerUser } from "../client/components/user";
import Config from "./config";
import { renderStylesToString } from "./emotion-server";
import html from "./html";
import { IdentityUser, withIdentity } from "./identity/identityMiddleware";

const port = 9233;

const server = express();
const log = bunyan.createLogger({ name: "af" });

server.use(helmet());

server.get("/_healthcheck", (req: express.Request, res: express.Response) => {
  res.send("OK");
});

server.use(cookieParser());
server.use("/api/membership", withIdentity);
server.use("/", withIdentity);

server.use("/static", express.static(__dirname + "/static"));

server.get("/api/membership", (req: express.Request, res: express.Response) => {
  if (res.locals.identity == null) {
    // Check if the identity middleware is loaded for this route.
    // Refactor this.
    log.error("Identity not present in locals.");
    res.status(500).send("Something broke!");
    return;
  }

  const identity: IdentityUser = res.locals.identity;

  fetch(
    `https://members-data-api.${
      Config.DOMAIN
    }/user-attributes/me/mma-membership`,
    {
      headers: {
        Cookie: `GU_U=${identity.GU_U}; SC_GU_U=${identity.SC_GU_U}`
      }
    }
  )
    .then(_ => _.text())
    .then(_ => res.send(_))
    .catch(e => {
      log.info(e);
      res.status(500).send("Something broke!");
    });
});

// ALL OTHER ENDPOINTS CAN BE HANDLED BY CLIENT SIDE REACT ROUTING
server.use((req: express.Request, res: express.Response) => {
  const context = {};
  /**
   * renderToString() will take our React app and turn it into a string
   * to be inserted into our Html template function.
   */
  const body = renderStylesToString(
    renderToString(ServerUser(req.url, context))
  );
  const title = "My Account | The Guardian";
  const src = "static/user.js";

  // TODO check for redirect on the context object

  res.send(
    html({
      body,
      title,
      src
    })
  );
});

server.listen(port);
// tslint:disable-next-line:no-console
log.info(`Serving at http://localhost:${port}`);
