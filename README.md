### WIP: DO NOT USE IN PRODUCTION ###
# package-push-notifications
[![Build Status](https://travis-ci.org/ibm-functions/package-push-notifications.svg?branch=master)](https://travis-ci.org/ibm-functions/package-push-notifications)

### Overview
This repository allows you to deploy a Push Notifications package for IBM Cloud Functions.
The package contains a set of simple functions to get you started composing Cloud Functions applications.

### Available languages
This package is available in Node.js 8.

# Deploy Push Notifications Package with IBM Cloud Command Line Interface (CLI)

## Configure CLI
- Make sure to execute `ibmcloud login` if not already logged in
1. Install the Cloud Functions CLI plugin.
```
ibmcloud plugin install cloud-functions
```
2. Make sure you are authenticated with Cloud Functions and can list entities without errors.
```
ibmcloud fn list
```
3. Download the [wskdeploy](https://github.com/apache/incubator-openwhisk-wskdeploy/releases) utility and add `wskdeploy` to your PATH.

## Deploy

Use `wskdeploy` to deploy the package using [`manifest.yml`](./manifest.yml).
```
pushd runtimes/nodejs/
wskdeploy
popd
```

This creates a new package `push-notifications` with the following actions:
- push-notifications/send-message
- push-notifications/webhooks

**Future**
</br>The utility `wskdeploy` will be integrated into a new Cloud Functions CLI plugin command `ibmcloud fn deploy`.

## Bind service credentials
Bind your Push Notifications service instance to the `push-notifications` package. This gives actions in the package access to the Push Notifications service credentials.
```
ibmcloud fn service bind imfpush push-notifications
```

## Test
TODO

## CI/CD
TODO

# Deploy Push Notifications Package with IBM Cloud Console
TODO

### License
Apache-2.0
