import "dotenv/config";

import express from "express";
import cors from "cors";
import * as fs from "fs";
import rateLimit from "express-rate-limit";

import { shortCommit } from "./modules/sub/currentCommit.js";
import { appName, genericUserAgent, version, internetExplorerRedirect } from "./modules/config.js";
import { getJSON } from "./modules/api.js";
import renderPage from "./modules/pageRenderer.js";
import { apiJSON } from "./modules/sub/utils.js";
import loc from "./modules/sub/i18n.js";
import { Bright, Cyan } from "./modules/sub/consoleText.js";
import stream from "./modules/stream/stream.js";

const commitHash = shortCommit();
const app = express();

app.disable('x-powered-by');

if (fs.existsSync('./.env')) {
    const apiLimiter = rateLimit({
        windowMs: 20 * 60 * 1000,
        max: 100,
        standardHeaders: true,
        legacyHeaders: false,

        handler: (req, res, next, opt) => {
            res.status(429).json({
                "status": "error",
                "text": loc('en', 'apiError', 'rateLimit')
            });
        }
    })

    const apiLimiterStream = rateLimit({
        windowMs: 6 * 60 * 1000,
        max: 24,
        standardHeaders: true,
        legacyHeaders: false,

        handler: (req, res, next, opt) => {
            res.status(429).json({
                "status": "error",
                "text": loc('en', 'apiError', 'rateLimit')
            });
        }
    })

    app.use('/api/', apiLimiter);
    app.use('/api/stream', apiLimiterStream);
    app.use('/', express.static('./src/static'));

    app.use((req, res, next) => {
        try {
            decodeURIComponent(req.path)
        } catch (e) {
            return res.redirect(process.env.selfURL);
        }

        next();
    });

    app.get('/api/:type', cors({ origin: process.env.selfURL, optionsSuccessStatus: 200 }), async (req, res) => {
        try {
            switch (req.params.type) {
                case 'json':
                    if (req.query.url && req.query.url.length < 150) {
                        let j = await getJSON(
                            req.query.url.trim(),

                            req.header('x-forwarded-for') ? req.header('x-forwarded-for') : req.ip,
                            req.header('Accept-Language') ? req.header('Accept-Language').slice(0, 2) : "en",
                            
                            req.query.format ? req.query.format.slice(0, 5) : "mp4",
                            req.query.quality ? req.query.quality.slice(0, 3) : "max"
                        )

                        res.status(j.status).json(j.body);
                    } else {
                        let j = apiJSON(3, {
                            t: loc('en', 'apiError', 'noURL', process.env.selfURL)
                        })

                        res.status(j.status).json(j.body);
                    }

                    break;

                case 'stream':
                    if (req.query.p) {
                        res.status(200).json({ "status": "continue" });
                    } else if (req.query.t) {
                        let ip = req.header('x-forwarded-for') ? req.header('x-forwarded-for') : req.ip

                        stream(res, ip, req.query.t, req.query.h, req.query.e);
                    } else {
                        let j = apiJSON(0, { t: loc('en', 'apiError', 'noStreamID') })

                        res.status(j.status).json(j.body);
                    }

                    break;

                default:
                    let j = apiJSON(0, {
                        t: loc('en', 'apiError', 'noType')
                    })

                    res.status(j.status).json(j.body);

                    break;
            }
        } catch (e) {
            res.status(500).json({
                'status': 'error',
                'text': 'algo deu errado.'
            })
        }
    });
    
    app.get("/api", async (req, res) => {
        res.redirect('/api/json')
    });

    app.get("/", async (req, res) => {
        // redirecionar para uma página onde eles podem instalar um navegador apropriado
        if (req.header("user-agent") && req.header("user-agent").includes("Trident")) {
            if (internetExplorerRedirect.newNT.includes(req.header("user-agent").split('NT ')[1].split(';')[0])) {
                res.redirect(internetExplorerRedirect.new)

                return
            } else {
                res.redirect(internetExplorerRedirect.old)

                return
            }
        } else {
            res.send(renderPage({
                "hash": commitHash,
                "type": "default",

                "lang": req.header('Accept-Language') ? req.header('Accept-Language').slice(0, 2) : "en",
                "useragent": req.header('user-agent') ? req.header('user-agent') : genericUserAgent
            }))
        }
    });

    app.get("/favicon.ico", async (req, res) => {
        res.redirect('/icons/favicon.ico');
    });

    app.get("/*", async (req, res) => {
        res.redirect('/')
    });

    app.listen(process.env.port, () => {
        console.log(`\n${Bright(`${appName} (${version})`)}\n\nURL: ${Cyan(`${process.env.selfURL}`)}\nPort: ${process.env.port}\nCurrent commit: ${Bright(`${commitHash}`)}\nStart time: ${Bright(Math.floor(new Date().getTime()))}\n`)
    });
} else {
    console.log('os arquivos de configuração necessários estão faltando. execute "npm run setup" primeiro.')
}