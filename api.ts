import { Router, log } from "./deps.ts";
import * as planets from "./models/planets.ts";
import * as launches from "./models/launches.ts";

const router = new Router();

router.get("/", (ctx) => {
    ctx.response.body = `
    {___     {__      {_         {__ __        {_       
    {_ {__   {__     {_ __     {__    {__     {_ __     
    {__ {__  {__    {_  {__     {__          {_  {__    
    {__  {__ {__   {__   {__      {__       {__   {__   
    {__   {_ {__  {______ {__        {__   {______ {__  
    {__    {_ __ {__       {__ {__    {__ {__       {__ 
    {__      {__{__         {__  {__ __  {__         {__
                    Mission Control API`;
});

router.get("/planets", (ctx) => {
    ctx.response.body = planets.getAll();
});

router.get("/launches", (ctx) => {
    ctx.response.body = launches.getAll();
});

router.get("/launches/:id", (ctx) => {
    ctx.response.body = launches.getById(Number(ctx.params?.id));
});

router.post("/launches", async(ctx) => {
    const body = await ctx.request.body().value;

    launches.add(body);

    ctx.response.body = {success: true};
    ctx.response.status = 201
});

router.delete("/launches/:id", (ctx) => {
    const result = launches.deleteById(Number(ctx.params?.id));
    ctx.response.body = { success: result };
});

export default router;