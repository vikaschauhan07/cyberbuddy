"use strict";

const { loadSecrets } = require("./services/secrets");
require('dotenv').config();

async function bootstrap() {
  await loadSecrets();           // 🔐 secrets first
  require("./server");           // 🚀 then app
}

bootstrap().catch((err) => {
  console.error("🔥 Failed to start application");
  process.exit(1);
});
