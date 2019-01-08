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
Ensure you have [created and configured](https://console.bluemix.net/docs/services/mobilepush/push_step_prereq.html) your Push Notifications service on IBM Cloud.

Bind your Push Notifications service instance to the `push-notifications` package. This gives actions in the package access to the Push Notifications service credentials.
```
ibmcloud fn service bind imfpush push-notifications
```

## Try the package
Send a push notification message using the send-message function.

```
ibmcloud fn action invoke push-notifications/send-message -b -p messageText "This is a push notification"
```

You can also include a URL with the push notification.

```
ibmcloud fn action invoke push-notifications/send-message -b -p messageText "Let's code something" -p messageUrl "http://developer.ibm.com"
```

If successful, you should see a successful response status, which includes the message and url sent as a part of the result.

```
"response": {
    "result": {
        "message": {
            "alert": "let's code something",
            "url": "http://developer.ibm.com"
        },
        "messageId": "aNJhg8XX"
    },
    "status": "success",
    "success": true
}
```

# Deploy Push Notifications Package with IBM Cloud Console

## Deploy Package from the UI
In the Cloud Functions console, go to the [Create page](https://console.bluemix.net/openwhisk/create).

Using the Cloud Foundry Org and Cloud Foundry Space lists, select the namespace that you want to install the Push Notifications package into. Namespaces are formed from the combined org and space names.

Click Install Packages.

Click on the IBM Push Notifications Package group, and then click on the IBM Push Notifications Package.

Once the Package has been installed you will be redirected to the Actions page and can search for your new Package, which is named push-notifications. You can use the Actions in this Package as you would any other Actions as well as edit their code to suit any specific behavior you may need from the Push Notifications package.


## Bind Service Credentials

To use the actions in the push-notifications package, you must bind service credentials to the actions.
Note: You must complete the following steps for each action that you want to use.

1. Click on an Action from the push-notifications Package that you want to use. The details page for that Action opens.
2. In the left-hand navigation, click on the Parameters section.
3. Enter a new parameter. For the key, enter `__bx_creds`. For the value, paste in the service credentials JSON object from the service instance that you created earlier.

### License
Apache-2.0
