const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ0ZvL2xCVnBEK2RQczgyRGptallsMjNsbkJacXhXUjd6TFA0UjVpMjQxST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTWQrNy9kQkZma0I3cWJscEVtWSsyU2d0aVZqVStBVUx5YldsaTJnRWoyRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjQ2hBNDR0eHAvNFhEUWV4UmJvVlRkeXlWZ3NrV0t0b3VDcTZTbm5qSW5FPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3dmJyRVVDVzdxYXpjNWZjR3dORFJ5dy93NEFRK1N4QTBta0dtOElENENRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVLTFNjWCtvZ1UrK1hUWUp0WmlzOS9CUWhJOHFpaU5JeC9ReHVWT0lHV1k9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkZ6NnRNM2V2M2k1NE9XYU5HbjlIRG8zakh1YkMremZXc0ZreFBLWWg0UXc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUw1eE1hZ0diY0lFd3ZuZno1aVFSVUxDUXFKOUlHbGw1RzRaaitBZE5YWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibURQa3BQT09KK3cvV3cyVmhCZnQ2RXdIbXBBZEJqQmR1ZGNKY3RBRURHbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImFQV2pIdXNJMloxWjFyWmJUMGtDbVNld1lVMmpWQ0tRMklacEZFS2M3UzhJSlJTTnp5QnZkbjNZb1o4ejVQcnZQc2cwWlFMcWx3UjFVQU5yVDF3Q0F3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MzgsImFkdlNlY3JldEtleSI6IitHOVAreTlRc2haQ3NYZ0REQjA4MHpKS0V6NFRnK3Q4WWZHMklzd05CL1E9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjU0NzU4NDQzMTExQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkEyNTI3OEY0NzgxNDFFMzk2MTZERTlDMTZENDZGMDU0In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTAxOTU3ODd9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI1NDc1ODQ0MzExMUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIzQjJCREY2ODdBRDYyNTg4REQxREQ1RjIwN0NFQUU3MiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzUwMTk1Nzg3fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJNNldCUEo5USIsIm1lIjp7ImlkIjoiMjU0NzU4NDQzMTExOjk0QHMud2hhdHNhcHAubmV0IiwibGlkIjoiMTE3NDgwODI3NjU4MjUwOjk0QGxpZCIsIm5hbWUiOiLinJ7vuI7imIXhjq/imLzvuI7ihJLimLzvuI7ihJLinKnihLDinKvihJXimavimKDvuI7vuI4ifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ04rNDdkTUVFTE84eDhJR0dDWWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Ii8ybFdCQ3lvQStWZmlmb1M2VDBuYUZuTjBWcDAvTWpNaFV5Uk9ZTFFRbE09IiwiYWNjb3VudFNpZ25hdHVyZSI6IkVKTjI4WlZQcDNjMmNmbm9pdTMzbGVwa3oyL091K0pxRWdoUGV0MDByQnFkSHA4MXpNbllMSG5iUlQ0VjdPdkJ4K0w0WFhBZU9rS3pCb2VML2xWTkRnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJhdTdjMlRTb29EditUTDQ4V00yQ3VTRWlLVW92QnQ5YWN4d0xMdFZPdDdWZFNSQ21XU1FrbHVuRW16RVo0Skc4Tkk0YzhNR1huZlZmQ3c0VjdEOTVEdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDc1ODQ0MzExMTo5NEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJmOXBWZ1FzcUFQbFg0bjZFdWs5SjJoWnpkRmFkUHpJeklWTWtUbUMwRUpUIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQVVJRWc9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NTAxOTU3NzcsImxhc3RQcm9wSGFzaCI6IjJWNzdxVSIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQTZVIn0=',
    PREFIXE: process.env.PREFIX || "¶",
    GITHUB : process.env.GITHUB|| 'https://github.com/toxiclover-tech/TOXIC-LOVER-MD',
    OWNER_NAME : process.env.OWNER_NAME || "✞︎ ΛĪ ❥︎ ŔƐ√ᎾĿƱŦᎾЯ☠︎︎",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254758443111",  
              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT: process.env.AUTO_REACTION || "non",  
     AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
    URL: process.env.URL || "https://files.catbox.moe/39n0nf.jpg",  
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || 'non',              
    CHAT_BOT: process.env.CHAT_BOT || "off",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "no",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_HANDLE || 'no', 
    AUTO_REPLY : process.env.AUTO_REPLY || "no", 
    AUTO_STATUS_TEXT: process.env.AUTO_STATUS_TEXT || 'viewed',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    AUTO_BIO: process.env.AUTO_BIO || 'yes',       
    ANTI_CALL_TEXT : process.env.ANTI_CALL_TEXT || '★Ꭿ☼︎ℒ☼︎ℒ✩ℰ✫ℕ♫ ĪS ΛŦ ßƐΛSŦ MᎾDƐ ŔĪƓĤŦ ИᎾᏯ ƇΛИŦ ŔƐƇĪƐ√Ɛ YᎾƱŔ ƇΛĿĿ 📞📵 ',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VawCel7GOj9ktLjkxQ3g",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VawCel7GOj9ktLjkxQ3g",
    CAPTION : process.env.CAPTION || "✧JEEPERS CREEPER-XMD✧",
    BOT : process.env.BOT_NAME || '✧JEEPERS CREEPER-XMD✧⁠',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "KENYA/NAIROBI", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '1',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTI_DELETE_MESSAGE : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTI_CALL: process.env.ANTI_CALL || 'yes', 
    AUDIO_REPLY : process.env.AUDIO_REPLY || 'no',             
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, 
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
