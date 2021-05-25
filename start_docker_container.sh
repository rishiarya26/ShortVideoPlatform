#!/bin/sh
nginx
cd /usr/src/app
#! APP_ENV value needs to be dynamic
MOCK_MODE=y npm run start-mock

