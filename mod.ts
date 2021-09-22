import { Application } from "./deps.ts";

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

app.use(async (ctx, next) => {
    ctx.response.body = `
    {___     {__      {_         {__ __        {_       
    {_ {__   {__     {_ __     {__    {__     {_ __     
    {__ {__  {__    {_  {__     {__          {_  {__    
    {__  {__ {__   {__   {__      {__       {__   {__   
    {__   {_ {__  {______ {__        {__   {______ {__  
    {__    {_ __ {__       {__ {__    {__ {__       {__ 
    {__      {__{__         {__  {__ __  {__         {__
                    Mission Control API`;
    await next();
});


if (import.meta.main) {
    await app.listen({
        port: PORT,
    });
}