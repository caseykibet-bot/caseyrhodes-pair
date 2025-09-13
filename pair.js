const giftedid = require('./id');
const express = require('express');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
let router = express.Router();
const pino = require("pino");
const { Storage } = require("megajs");

const {
    default: makeWASocket,
    useMultiFileAuthState,
    delay,
    makeCacheableSignalKeyStore,
    Browsers
} = require("@whiskeysockets/baileys");

function randomMegaId(length = 6, numberLength = 4) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    const number = Math.floor(Math.random() * Math.pow(10, numberLength));
    return `${result}${number}`;
}

// Function to download media from URL
async function downloadMedia(url, filePath) {
    try {
        const response = await axios({
            method: 'GET',
            url: url,
            responseType: 'stream'
        });

        const writer = fs.createWriteStream(filePath);
        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });
    } catch (error) {
        console.error('Error downloading media:', error);
        throw error;
    }
}

async function uploadCredsToMega(credsPath) {
    try {
        const storage = await new Storage({
            email: process.env.MEGA_EMAIL || 'techobed4@gmail.com',
            password: process.env.MEGA_PASSWORD || 'Trippleo1802obed'
        }).ready;
        
        console.log('Mega storage initialized.');
        
        if (!fs.existsSync(credsPath)) {
            throw new Error(`File not found: ${credsPath}`);
        }
        
        const fileSize = fs.statSync(credsPath).size;
        const fileName = `${randomMegaId()}.json`;
        
        const uploadStream = storage.upload(fileName, fs.createReadStream(credsPath));
        const uploadResult = await uploadStream.complete;
        
        console.log('Session successfully uploaded to Mega.');
        const fileNode = storage.files.find(file => file.name === fileName);
        const megaUrl = await fileNode.link();
        
        console.log(`Session Url: ${megaUrl}`);
        return megaUrl;
    } catch (error) {
        console.error('Error uploading to Mega:', error);
        throw error;
    }
}

function removeFile(FilePath) {
    if (!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true });
}

router.get('/', async (req, res) => {
    // Validate input
    if (!req.query.number) {
        return res.status(400).send({ error: "Number parameter is required" });
    }
    
    const id = giftedid();
    let num = req.query.number.toString().replace(/[^0-9]/g, '');
    
    // Create temp directory if it doesn't exist
    const tempDir = path.join(__dirname, 'temp', id);
    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
    }
    
    // Use a flag to prevent multiple responses
    let responseSent = false;
    
    async function GIFTED_PAIR_CODE() {
        const { state, saveCreds } = await useMultiFileAuthState(tempDir);
        
        try {
            let Gifted = makeWASocket({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
                },
                printQRInTerminal: false,
                logger: pino({ level: "fatal" }).child({ level: "fatal" }),
                browser: Browsers.macOS("Safari")
            });

            if (!Gifted.authState.creds.registered) {
                await delay(1500);
                const code = await Gifted.requestPairingCode(num);
                console.log(`Your Code: ${code}`);
                
                if (!responseSent) {
                    responseSent = true;
                    return res.send({ code });
                }
            }

            Gifted.ev.on('creds.update', saveCreds);

            Gifted.ev.on("connection.update", async (s) => {
                const { connection, lastDisconnect } = s;

                if (connection === "open") {
                    await delay(5000);
                    
                    const filePath = path.join(tempDir, 'creds.json');
                    if (!fs.existsSync(filePath)) {
                        console.error("File not found:", filePath);
                        return;
                    }

                    try {
                        const megaUrl = await uploadCredsToMega(filePath);
                        let sid = 'Error: Invalid URL';
                        
                        if (megaUrl.includes("https://mega.nz/file/")) {
                            sid = 'Caseyrhodes~' + megaUrl.split("https://mega.nz/file/")[1].split('#')[0];
                        }

                        console.log(`Session ID: ${sid}`);

                        // Join group if needed
                        try {
                            await Gifted.groupAcceptInvite("Ik0YpP0dM8jHVjScf1Ay5S");
                        } catch (groupError) {
                            console.error("Failed to join group:", groupError);
                        }

                        const sidMsg = await Gifted.sendMessage(
                            Gifted.user.id,
                            {
                                text: sid,
                                contextInfo: {
                                    mentionedJid: [Gifted.user.id],
                                    forwardingScore: 999,
                                    isForwarded: true
                                }
                            }
                        );

                        // Download media files
                        const imagePath = path.join(tempDir, 'welcome.jpg');
                        const audioPath = path.join(tempDir, 'welcome.mp3');
                        
                        try {
                            await downloadMedia('https://i.imgur.com/1nEoLMB.jpeg', imagePath);
                            await downloadMedia('https://files.catbox.moe/e80kyd.mp3', audioPath);
                            
                            // Read the downloaded files
                            const imageData = fs.readFileSync(imagePath);
                            const audioData = fs.readFileSync(audioPath);
                            
                            // Create the welcome message with combined media
                            const welcomeMessage = {
                                text: `
*✅sᴇssɪᴏɴ ɪᴅ ɢᴇɴᴇʀᴀᴛᴇᴅ✅*
______________________________
*🎉 SESSION GENERATED SUCCESSFULLY! ✅*

*💪 Empowering Your Experience with Caseyrhodes Bot*

*🌟 Show your support by giving our repo a star! 🌟*
🔗 https://github.com/GURUH-TECH/CRYPTIX-XMD

*💭 Need help? Join our support groups:*
📢 💬
https://whatsapp.com/channel/0029VbAaqOjLCoX3uQD1Ns3y

*📚 Learn & Explore More with Tutorials:*
🪄 YouTube Channel https://youtube.com/@1stguru454?si=amx9I7H7RiNWwn8X

> 
*Together, we build the future of automation! 🚀*
______________________________

Use your Session ID Above to Deploy your Bot.
Check on YouTube Channel for Deployment Procedure(Ensure you have Github Account and Billed Heroku Account First.)
Don't Forget To Give Star⭐ To My Repo`,
                                image: imageData,
                                caption: "🎉 Welcome to Caseyrhodes Bot! 🎉",
                                audio: audioData,
                                mimetype: 'audio/mp4',
                                ptt: true,
                                contextInfo: {
                                    mentionedJid: [Gifted.user.id],
                                    forwardingScore: 999,
                                    isForwarded: true
                                }
                            };
                            
                            // Send the combined message
                            await Gifted.sendMessage(
                                Gifted.user.id,
                                welcomeMessage,
                                {
                                    quoted: sidMsg
                                }
                            );
                            
                            console.log("Welcome message with media sent successfully");
                        } catch (mediaError) {
                            console.error("Failed to process media:", mediaError);
                            
                            // Fallback: send text only if media fails
                            await Gifted.sendMessage(
                                Gifted.user.id,
                                {
                                    text: `
*✅sᴇssɪᴏɴ ɪᴅ ɢᴇɴᴇʀᴀᴛᴇᴅ✅*
______________________________
*🎉 SESSION GENERATED SUCCESSFULLY! ✅*

*💪 Empowering Your Experience with Caseyrhodes Bot*

*🌟 Show your support by giving our repo a star! 🌟*
🔗 https://github.com/GURUH-TECH/CRYPTIX-XMD

*💭 Need help? Join our support groups:*
📢 💬
https://whatsapp.com/channel/0029VbAaqOjLCoX3uQD1Ns3y

*📚 Learn & Explore More with Tutorials:*
🪄 YouTube Channel https://youtube.com/@1stguru454?si=amx9I7H7RiNWwn8X

> 
*Together, we build the future of automation! 🚀*
______________________________

Use your Session ID Above to Deploy your Bot.
Check on YouTube Channel for Deployment Procedure(Ensure you have Github Account and Billed Heroku Account First.)
Don't Forget To Give Star⭐ To My Repo`,
                                    contextInfo: {
                                        mentionedJid: [Gifted.user.id],
                                        forwardingScore: 999,
                                        isForwarded: true
                                    }
                                },
                                {
                                    quoted: sidMsg
                                }
                            );
                        }

                        await delay(100);
                        await Gifted.ws.close();
                        removeFile(tempDir);
                    } catch (uploadError) {
                        console.error("Upload error:", uploadError);
                        if (!responseSent) {
                            responseSent = true;
                            res.status(500).send({ error: "Failed to upload session" });
                        }
                    }
                } else if (
                    connection === "close" &&
                    lastDisconnect &&
                    lastDisconnect.error &&
                    lastDisconnect.error.output &&
                    lastDisconnect.error.output.statusCode !== 401
                ) {
                    console.log("Connection closed, reconnecting...");
                    await delay(10000);
                    if (!responseSent) {
                        GIFTED_PAIR_CODE();
                    }
                }
            });
        } catch (err) {
            console.error("Service Error:", err);
            removeFile(tempDir);
            if (!responseSent) {
                responseSent = true;
                res.status(500).send({ error: "Service is Currently Unavailable" });
            }
        }
    }

    try {
        await GIFTED_PAIR_CODE();
    } catch (error) {
        if (!responseSent) {
            responseSent = true;
            res.status(500).send({ error: "Internal server error" });
        }
    }
});

module.exports = router;
