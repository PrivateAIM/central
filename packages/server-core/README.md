# Hub - Server Core 🌴

[![npm version](https://badge.fury.io/js/@personalhealthtrain%2Fcentral-api.svg)](https://badge.fury.io/js/@personalhealthtrain%2Fcentral-api)

This repository contains the server core service of the HUB ecosystem.
It communicates with some services of FLAME and need therefore to be configured properly, like described 
in the following sections.

## Configuration
The following settings need to be added to the environment file `.env` in the root directory.
```
PORT=<port>
NODE_ENV=<development|production>

API_URL=http://localhost:<port>/

AUTHUP_API_URL=http://localhost:<port>/
VAULT_CONNECTION_STRING=<token>@<api url>
RABBITMQ_CONNECTION_STRING=amqp://<username>:<password>@<host>
HARBOR_CONNECTION_STRING=<user>:<password>@<api url>

```

## Setup

```shell
$ npm run cli -- setup
```

## Credits
If you have any questions, feel free to contact the author [Peter Placzek](https://github.com/tada5hi) of the project.
The project was initially developed during his bachelor thesis, and he worked after that as employee
on the project.
