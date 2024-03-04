import { app } from "./api/app.js";
import { ipAddress, appPort, dbHost, apiRoot } from "./config/env-constants.js";

app.listen(appPort, () => {
  console.log(
    `Server listening on: 
  Local:            http://${dbHost}:${appPort}/${apiRoot}    
  On Your Network:  http://${ipAddress}:${appPort}/${apiRoot}`
  );
});
