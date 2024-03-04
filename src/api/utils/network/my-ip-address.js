import os from "os";

export function getIp() {
  const ipAddress = Object.values(os.networkInterfaces())
    .flat()
    .filter((details) => details.family === "IPv4" && !details.internal)
    .map((details) => details.address)
    .pop();

  return ipAddress;
}
