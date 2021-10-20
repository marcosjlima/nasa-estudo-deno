import { Application, send, log } from "./deps.ts";

import setupLog from "./log.ts";
import api from "./api.ts";

const app = new Application();
const PORT = 8000;

app.addEventListener("error", (event) => {
    log.error(event.error);
});

app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.response.body = "Internal server error";
        throw err;
    }
});

app.use(async (ctx, next) => {
    await next();
    log.info(`${ctx.request.method} - ${ctx.request.url}: ${ctx.request.headers.get("X-Response-Time")}  `);
});

app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const delta = Date.now() - start;
    ctx.request.headers.set("X-Response-Time", `${delta}`);
    //ctx.response.headers.set("X-Response-Time", `${delta}`);
});

app.use(api.routes());
app.use(api.allowedMethods());

app.use(async (ctx) => {
    const filePath = ctx.request.url.pathname;
    const eligibleFiles = [
        "/index.html",
        "/images/favicon.png",
        "/javascripts/script.js",
        "/stylesheets/style.css",
    ];
    if (eligibleFiles.includes(filePath)) {
        await send(ctx, filePath, {
            root: `${Deno.cwd()}/public`,
        });
    }
});

if (import.meta.main) {
    log.info(`Starting server on port ${PORT}`);
    await app.listen({
        port: PORT,
    });
}