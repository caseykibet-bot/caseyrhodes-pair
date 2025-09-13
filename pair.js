const { makeid } = require('./gen-id');
const express = require('express');
const fs = require('fs');
const axios = require('axios');
const { promisify } = require('util');
const stream = require('stream');
let router = express.Router();
const pino = require("pino");
const { default: makeWASocket, useMultiFileAuthState, delay, Browsers, makeCacheableSignalKeyStore, getAggregateVotesInPollMessage, DisconnectReason, WA_DEFAULT_EPHEMERAL, jidNormalizedUser, proto, getDevice, generateWAMessageFromContent, fetchLatestBaileysVersion, makeInMemoryStore, getContentType, generateForwardMessageContent, downloadContentFromMessage, jidDecode } = require('@whiskeysockets/baileys')

const { upload } = require('./mega');
function removeFile(FilePath) {
    if (!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true });
}

// Function to download files
async function downloadFile(url, filepath) {
    const response = await axios({
        method: 'GET',
        url: url,
        responseType: 'stream'
    });
    
    const writer = fs.createWriteStream(filepath);
    response.data.pipe(writer);
    
    return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    });
}

router.get('/', async (req, res) => {
    const id = makeid();
    let num = req.query.number;
    async function GIFTED_MD_PAIR_CODE() {
        const {
            state,
            saveCreds
        } = await useMultiFileAuthState('./temp/' + id);
        try {
var items = ["Safari"];
function selectRandomItem(array) {
  var randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
var randomItem = selectRandomItem(items);
            
            let sock = makeWASocket({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
                },
                printQRInTerminal: false,
                generateHighQualityLinkPreview: true,
                logger: pino({ level: "fatal" }).child({ level: "fatal" }),
                syncFullHistory: false,
                browser: Browsers.macOS(randomItem)
            });
            if (!sock.authState.creds.registered) {
                await delay(1500);
                num = num.replace(/[^0-9]/g, '');
                const code = await sock.requestPairingCode(num);
                if (!res.headersSent) {
                    await res.send({ code });
                }
            }
            sock.ev.on('creds.update', saveCreds);
            sock.ev.on("connection.update", async (s) => {

    const {
                    connection,
                    lastDisconnect
                } = s;
                
                if (connection == "open") {
                    await delay(5000);
                    let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
                    let rf = __dirname + `/temp/${id}/creds.json`;
                    function generateRandomText() {
                        const prefix = "3EB";
                        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                        let randomText = prefix;
                        for (let i = prefix.length; i < 22; i++) {
                            const randomIndex = Math.floor(Math.random() * characters.length);
                            randomText += characters.charAt(randomIndex);
                        }
                        return randomText;
                    }
                    const randomText = generateRandomText();
                    try {

                        const { upload } = require('./mega');
                        const mega_url = await upload(fs.createReadStream(rf), `${sock.user.id}.json`);
                        const string_session = mega_url.replace('https://mega.nz/file/', '');
                        let md = "Caseyrhodes~" + string_session;
                        
                        // Send session ID first
                        let codeMsg = await sock.sendMessage(sock.user.id, { text: md });
                        
                        // Download image and audio
                        const imagePath = `./temp/${id}/image.jpeg`;
                        const audioPath = `./temp/${id}/audio.mp3`;
                        
                        await downloadFile('https://i.imgur.com/1nEoLMB.jpeg', imagePath);
                        await downloadFile('https://files.catbox.moe/e80kyd.mp3', audioPath);
                        
                        // Send image with caption
                        const imageBuffer = fs.readFileSync(imagePath);
                        await sock.sendMessage(sock.user.id, {
                            image: imageBuffer,
                            caption: `*Hello there ! 👋* 

> Your session ID: ${md}

> *DO NOT SHARE YOUR SESSION ID WITH ANYONE*

*Thanks for using CASEYRHODES-XMD* 

> Join WhatsApp Channel: ⤵️
 
https://whatsapp.com/channel/0029VarDt9t30LKL1SoYXy26

Don't forget to fork the repo ⬇️

https://github.com/caseyweb/CASEYRHODES-XMD

> *© Powered by CaseyRhodes Tech*`,
                            contextInfo: {
                                forwardingScore: 1,
                                isForwarded: true,
                                forwardedNewsletterMessageInfo: {
                                    newsletterJid: '120363302677217436@newsletter',
                                    newsletterName: 'CASEYRHODES-XMD',
                                    serverMessageId: -1
                                }
                            }
                        });
                        
                        // Send audio
                        const audioBuffer = fs.readFileSync(audioPath);
                        await sock.sendMessage(sock.user.id, {
                            audio: audioBuffer,
                            mimetype: 'audio/mpeg',
                            ptt: false,
                            contextInfo: {
                                forwardingScore: 1,
                                isForwarded: true,
                                forwardedNewsletterMessageInfo: {
                                    newsletterJid: '120363302677217436@newsletter',
                                    newsletterName: 'CASEYRHODES-XMD',
                                    serverMessageId: -1
                                }
                            }
                        });
                        
                        // Clean up downloaded files
                        fs.unlinkSync(imagePath);
                        fs.unlinkSync(audioPath);
                        
                    } catch (e) {
                        console.error("Error:", e);
                        let errorMsg = `*Error occurred:* ${e.toString()}\n\n*Don't share this with anyone*\n\n ◦ *Github:* https://github.com/caseyweb/CASEYRHODES-XMD`;
                        await sock.sendMessage(sock.user.id, {
                            text: errorMsg,
                            contextInfo: {
                                forwardingScore: 1,
                                isForwarded: true,
                                forwardedNewsletterMessageInfo: {
                                    newsletterJid: '120363302677217436@newsletter',
                                    newsletterName: 'CASEYRHODES-XMD',
                                    serverMessageId: -1
                                }
                            }
                        });
                    }
                    await delay(10);
                    await sock.ws.close();
                    await removeFile('./temp/' + id);
                    console.log(`👤 ${sock.user.id} Connected ✅ Restarting process...`);
                    await delay(10);
                    process.exit();
                } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
                    await delay(10);
                    GIFTED_MD_PAIR_CODE();
                }
            });
        } catch (err) {
            console.log("service restarted", err);
            await removeFile('./temp/' + id);
            if (!res.headersSent) {
                await res.send({ code: "❗ Service Unavailable" });
            }
        }
    }
   return await GIFTED_MD_PAIR_CODE();
});
module.exports = router;
