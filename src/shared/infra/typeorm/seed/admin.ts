import { hash } from "bcrypt";
import { v4 as uuidv4 } from "uuid";

import createConnection from "../index";

async function create() {
  const connection = await createConnection("localhost");

  const id = uuidv4();
  const passwordHash = await hash("admin", 8);

  await connection.query(
    `insert into users(id, name, email, password, "isAdmin", created_at, driver_license)
      values('${id}', 'admin', 'admin@rentx.com.br', '${passwordHash}', 'true','now()', 'ZZZZZ')
    `
  );
  await connection.close();
}
create().then(() => console.log("User admin created"));
