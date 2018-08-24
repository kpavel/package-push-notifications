### WIP: DO NOT USE IN PRODUCTION ###
# package-push-notifications
[![Build Status](https://travis-ci.org/ibm-functions/package-push-notifications.svg?branch=master)](https://travis-ci.org/ibm-functions/package-push-notifications)

### Overview
This repository allows you to deploy a Push Notifications Package for IBM Functions.
The package contains a set of simple functions to get your started composing IBM Functions Applications.

### Available Languages
This package is available in Node.js 8.

# Deploy Push Notifications Package with IBM Cloud Command Line Interface (CLI)

## Configure CLI
- Make sure to execute `bx login` if not already logged in
- Install IBM Functions CLI plugin
```
bx plugin install cloud-functions
```
Make sure you are authenticated with IBM Functions and can list entities without errors
```
bx wsk list
```
## Deploy

Use `wskdeploy` to deploy using [`manifest.yml`](./manifest.yml).
```
pushd runtimes/nodejs/
wskdeploy
popd
```

This will create a new package `push-notifications` with the following actions:
- push-notifications/send-message
- push-notifications/webhooks

**Future**
 The utility `wskdeploy` will be integrated into a new `wsk` plugin command `bx wsk deploy`.
For now download from here [wskdeploy download](https://github.com/apache/incubator-openwhisk-wskdeploy/releases) and add `wskdeploy` to your PATH

## Bind service credentials
You will need to bind your Push Notifications service to the `push-notifications` package, so that the Actions will have access to the service credentials.
```
bx wsk service bind imfpush push-notifications
```


## Test
TODO

## CI/CD
TODO

# Deploy Push Notifications Package with IBM Cloud Console
TODO

### License
Apache-2.0
