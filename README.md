# Projeto de estudo - NASA Mission Control Deno Project

Para executar, deve-se ter o Deno instalado e executar o comando abaixo:

```
deno run --allow-net --allow-read --lock=deps-lock.json mod.ts
```

Docker - Gerando a imagem

```
docker build . -t marcosjlima/nasa-deno
```

Docker - Executando

```
docker run -it -p 8000:8000 marcosjlima/nasa-deno
```