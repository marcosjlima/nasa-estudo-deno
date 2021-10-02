import { Application, send } from "./deps.ts";

import api from "./api.ts";

const app = new Application();
const PORT = 8000;

app.use(async (ctx, next) => {
    await next();
    console.log(`${ctx.request.method} - ${ctx.request.url}: ${ctx.request.headers.get("X-Response-Time")}  `);
});

app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const delta = Date.now() - start;
    ctx.request.headers.set("X-Response-Time", `${delta}`);
});

app.use(api.routes());
app.use(api.allowedMethods());

app.use(async (ctx) =>{
    const filePath = ctx.request.url.pathname;
    const eligibleFiles  = [
        "/index.html",
        "/images/favicon.png",
        "/javascripts/script.js",
        "/stylesheets/style.css",
    ];
    if(eligibleFiles.includes(filePath)){
        await send(ctx, filePath, {
            root: `${Deno.cwd()}/public`, 
        });
    }
});

if (import.meta.main) {
    await app.listen({
        port: PORT,
    });
}