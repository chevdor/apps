FROM ubuntu:18.04 as builder

# Install any needed packages
RUN apt-get update && apt-get install -y curl git gnupg

# install nodejs
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install -y nodejs

WORKDIR /apps
COPY . .

RUN npm install yarn -g
RUN yarn
RUN NODE_ENV=production yarn build:www
CMD ["ls", "-al", "build"]

# ===========================================================

FROM nginx:stable-alpine

ENV WS_URL=ws://localhost:9944

WORKDIR /usr/share/nginx/html

COPY env.sh .
COPY .env-example .env

# Add bash, useful for troubleshooting
RUN apk add --no-cache bash

# Run script which initializes env vars to fs
RUN chmod +x env.sh
RUN ./env.sh

COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /apps/packages/apps/build /usr/share/nginx/html

EXPOSE 80

CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]
