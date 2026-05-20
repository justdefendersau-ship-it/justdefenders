/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\shared\logger.js
===================================================== */

const fs =
require("fs")

const path =
require("path")

const config =
require("../config/platform-config")

const LOGDIR =
path.join(
  process.cwd(),
  "server",
  "logs"
)

if(!fs.existsSync(LOGDIR)){

  fs.mkdirSync(
    LOGDIR,
    {
      recursive:true
    }
  )
}

function writeLog(
  level,
  message
){

  const timestamp =
  new Date().toISOString()

  const line =
  `[${timestamp}] [${level}] ${message}`

  console.log(line)

  const logfile =
  path.join(
    LOGDIR,
    "platform.log"
  )

  fs.appendFileSync(
    logfile,
    line + "\n"
  )
}

module.exports = {

  info:(msg) =>
  writeLog("INFO", msg),

  warn:(msg) =>
  writeLog("WARN", msg),

  error:(msg) =>
  writeLog("ERROR", msg)
}