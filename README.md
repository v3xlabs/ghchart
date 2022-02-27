# GHChart Docker

This docker container aims to allow you to easily and safely access the github contribution-graph api without having to create your own backend.
Usage is relatively easy, simply run the following command

```sh
docker run --env GH_TOKEN=xxxx --env GH_USERNAME=xxxx .env -p 1234:1234 lvkdotsh/ghchart
```

| Variable | Description |
| :---: | :--: |
| GH_TOKEN | Github PAT |
| GH_USERNAME | Username you want to fetch |
