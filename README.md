# Swimlanes

Swimlanes is an easy to use personal task board. Organize your notes into lanes and use tags to
quickly filter visible notes. Keyboard accessible and mouse friendly, Swimlanes aims to make
managing tasks and notes a breeze.

Try the app out at [swimlanes.motoroco.co](https://swimlanes.motoroco.co)

## Local development

NextJS includes a local development server with hot reloading. To get started,
first install the project's dependencies then run the dev script.

```bash
npm install
npm run dev
```

The app should become available at [localhost:3000](http://localhost:3000/).

## Deploying

Test production images locally with Docker: `docker-compose up --build`.

First time deployments require manually creating certificates with `certbot`
from the host machine:

```
docker run -it --rm --name certbot \
    -v "/$(pwd)/deploy/certbot:/etc/letsencrypt" \
    -v "/$(pwd)/deploy/certbot-lib:/var/lib/letsencrypt" \
    -p "80:80" \
    -p "443:443" \
    certbot/certbot certonly -d calmcact.us
```

Then use `docker-compose up --detach` to start the application server and 
proxy, then `docker-compose down` to stop it.
