const PaypackJs = require("paypack-js").default;

const paypack = new PaypackJs({
  client_id: process.env.PAYPACK_CLIENT_ID as string,
  client_secret: process.env.PAYPACK_CLIENT_SECRET as string,
});

export default paypack;
