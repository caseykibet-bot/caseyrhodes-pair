const { makeid } = require('./gen-id');
const express = require('express');
const fs = require('fs');
let router = express.Router();
const pino = require("pino");
const more = String.fromCharCode(8206);
const readmore = more.repeat(4001);
const { default: makeWASocket, useMultiFileAuthState, delay, Browsers, makeCacheableSignalKeyStore, getAggregateVotesInPollMessage, DisconnectReason, WA_DEFAULT_EPHEMERAL, jidNormalizedUser, proto, getDevice, generateWAMessageFromContent, fetchLatestBaileysVersion, makeInMemoryStore, getContentType, generateForwardMessageContent, downloadContentFromMessage, jidDecode } = require('@whiskeysockets/baileys')

const { upload } = require('./mega');
function removeFile(FilePath) {
    if (!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true });
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
                        
                        // Enable disappearing messages for the entire chat (24 hours)
                        await sock.sendMessage(sock.user.id, {
                            protocolMessage: {
                                type: proto.ProtocolMessage.ProtocolMessageType.EPHEMERAL_SETTING,
                                ephemeralExpiration: WA_DEFAULT_EPHEMERAL // 24 hours
                            }
                        });
                        
                        // Create comprehensive newsletter message with session ID and all information
                        let desc = `✨ *HELLO THERE! WELCOME TO CASEYRHODES-XMD!* ✨\n` +
                                   `▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔\n\n` +
                                   
                                   `🎉 *Congratulations! Your session has been successfully created!* 🎉\n\n` +
                                   `🔐 *Your Session ID:*\n` +
                                   `▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔\n` +
                                   readmore + `${md}\n` +
                                   `▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁\n\n` +
                                   `🚫 *DO NOT SHARE YOUR SESSION ID WITH ANYONE* 🚫\n\n` +
                                   `⭐ *Thanks for using CRYPTIX MD* ⭐\n\n` +
                                   `📢 *Join Our WhatsApp Channel:*\n` +
                                   `> https://whatsapp.com/channel/0029Vb6DmcwE50Ugs1acGO2s\n\n` +
                                   `💻 *Don't forget to fork the repo:*\n` +
                                   `> https://github.com/caseyweb/CASEYRHODES-XMD\n\n` +
                                   `🤖 Your bot is ready to use!\n\n` +
                                   `💡 *Tip:* All messages in this chat will disappear after 24 hours for security.\n\n` +
                                   `🌟 Have fun exploring CASEYRHODES-XMD features! 🌟\n\n` +
                                   `⚡ *Powered by Caseyrhodes Tech* ⚡`;
                        
                        // Send image with caption as disappearing newsletter message
                        await sock.sendMessage(sock.user.id, {
                            image: { url: 'https://files.catbox.moe/qqi4ns.jpg' },
                            caption: desc,
                            disappearingMessageInChat: WA_DEFAULT_EPHEMERAL,
                            contextInfo: {
                                forwardingScore: 1,
                                isForwarded: true,
                                forwardedNewsletterMessageInfo: {
                                    newsletterJid: '120363302677217436@newsletter',
                                    newsletterName: 'CASEYRHODES-XMD ✨',
                                    serverMessageId: -1
                                }
                            }
                        });
                    } catch (e) {
                        console.error("Error:", e);
                        let errorMsg = `❌ *ERROR OCCURRED* ❌\n` +
                                       `▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔\n\n` +
                                       `*Details:* ${e.toString()}\n\n` +
                                       `🚨 *DON'T SHARE THIS WITH ANYONE* 🚨\n\n` +
                                       `🔧 *GitHub:* https://github.com/caseyweb/CASEYRHODES-XMD\n\n` +
                                       `📞 *Contact support if this persists*\n\n` +
                                       `▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁`;
                        await sock.sendMessage(sock.user.id, {
                            text: errorMsg,
                            disappearingMessageInChat: WA_DEFAULT_EPHEMERAL,
                            contextInfo: {
                                forwardingScore: 1,
                                isForwarded: true,
                                forwardedNewsletterMessageInfo: {
                                    newsletterJid: '120363405400048680@newsletter',
                                    newsletterName: 'CASEYRHODES-XMD Support 🛠️',
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
