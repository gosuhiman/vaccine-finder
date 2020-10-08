#!/usr/bin/env bash

rm -rf ./build
npm run build
cp -r ./node_modules ./build

# TODO zip
