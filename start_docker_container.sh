#!/bin/sh
nginx
cd /usr/src/app
#! APP_ENV value needs to be dynamic
APP_ENV=development MOCK_MODE=y npm run start

