/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
*  Action to Send Push Notification using the IBM Push Notifications service
*
*  @param {string} appGuid - appGuid to create webhook
*  @param {string} appSecret - appSecret of the application
*  @param {string} url - An optional URL that can be sent along with the alert. Eg : -p url "https:\\www.mycompany.com".
*  @param {string} apiHost - An optional string that specifies the API host.  The default is 'mobile.ng.bluemix.net'.  Eg : -p apiHost "mobile.eu-gb.bluemix.net".
*  @param {object} text - The notification message to be shown to the user. Eg: -p text "Hi ,OpenWhisk send a notification"
*  @param {string} deviceIds - Send notification to the list of specified devices. Eg: -p deviceIds "["deviceID1"]"
*  @param {object} platforms - Send notification to the devices of the specified platforms. 'A' for apple (iOS) devices and 'G' for google (Android) devices. Eg: -p platforms ["A"]
*  @param {object} userIds - Send notification to the devices of the specified users. Eg: -p userIds ["testUser"]
*  @param {string} tagNames - Send notification to the devices that have subscribed to any of these tags. Eg -p tagNames "["tag1"]"

*  @param {string} gcmCollapseKey - This parameter identifies a group of messages.
*  @param {string} gcmCategory - The category identifier to be used for the interactive push notifications.
*  @param {string} gcmIcon - Specify the name of the icon to be displayed for the notification. Make sure the icon is already packaged with the client application.
*  @param {string} gcmDelayWhileIdle - When this parameter is set to true, it indicates that the message should not be sent until the device becomes active.
*  @param {string} gcmSync - Device group messaging makes it possible for every app instance in a group to reflect the latest messaging state.
*  @param {string} gcmVisibility - private/public - Visibility of this notification, which affects how and when the notifications are revealed on a secure locked screen.
*  @param {string} gcmPayload - Custom JSON payload that will be sent as part of the notification message. Eg: -p gcmPayload "{"hi":"hello"}".
*  @param {string} gcmPriority - Sets the priority of the message.
*  @param {string} gcmSound - The sound file (on device) that will be attempted to play when the notification arrives on the device.
*  @param {string} gcmTimeToLive - This parameter specifies how long (in seconds) the message should be kept in GCM storage if the device is offline.
*  @param {string} gcmStyleType - Specifies the type of expandable notifications. The possible values are bigtext_notification, picture_notification, inbox_notification.
*  @param {string} gcmStyleTitle - Specifies the title of the notification. The title is displayed when the notification is expanded. Title must be specified for all three expandable notification.
*  @param {string} gcmStyleUrl - An URL from which the picture has to be obtained for the notification. Must be specified for picture_notification.
*  @param {string} gcmStyleText - The big text that needs to be displayed on expanding a bigtext_notification. Must be specified for bigtext_notification.
*  @param {string} gcmStyleLines - An array of strings that is to be displayed in inbox style for inbox_notification. Must be specified for inbox_notification.
*  @param {string} gcmLightsLedArgb - The color of the led. The hardware will do its best approximation.
*  @param {string} gcmLightsLedOnMs - The number of milliseconds for the LED to be on while it's flashing. The hardware will do its best approximation.
*  @param {string} gcmLightsLedOffMs - The number of milliseconds for the LED to be off while it's flashing. The hardware will do its best approximation.

*  @param {string} apnsBadge - The number to display as the badge of the application icon.
*  @param {string} apnsCategory -  The category identifier to be used for the interactive push notifications.
*  @param {string} apnsIosActionKey - The title for the Action key.
*  @param {string} apnsPayload - Custom JSON payload that will be sent as part of the notification message.
*  @param {string} apnsType - ['DEFAULT', 'MIXED', 'SILENT'].
*  @param {string} apnsSound - The name of the sound file in the application bundle. The sound of this file is played as an alert.
*  @param {string} apnsTitleLocKey - The key to a title string in the Localizable.strings file for the current localization. The key string can be formatted with %@ and %n$@ specifiers to take the variables specified in the titleLocArgs array.
*  @param {string} apnsLocKey - A key to an alert-message string in a Localizable.strings file for the current localization (which is set by the user’s language preference). The key string can be formatted with %@ and %n$@ specifiers to take the variables specified in the locArgs array.
*  @param {string} apnsLaunchImage - The filename of an image file in the app bundle, with or without the filename extension. The image is used as the launch image when users tap the action button or move the action slider.
*  @param {string} apnsTitleLocArgs - Variable string values to appear in place of the format specifiers in title-loc-key.
*  @param {string} apnsLocArgs - Variable string values to appear in place of the format specifiers in locKey.
*  @param {string} apnstitle - The title of Rich Push notifications (Supported only on iOS 10 and above).
*  @param {string} apnsSubtitle - The subtitle of the Rich Notifications. (Supported only on iOS 10 and above).
*  @param {string} apnsAttachmentUrl - The link to the iOS notifications media (video, audio, GIF, images - Supported only on iOS 10 and above).

*  @param {string} fireFoxTitle - Specifies the title to be set for the WebPush Notification.
*  @param {string} fireFoxIconUrl -  The URL of the icon to be set for the WebPush Notification.
*  @param {string} fireFoxTimeToLive - This parameter specifies how long (in seconds) the message should be kept in GCM storage if the device is offline.
*  @param {string} fireFoxPayload - Custom JSON payload that will be sent as part of the notification message.

*  @param {string} chromeTitle - Specifies the title to be set for the WebPush Notification.
*  @param {string} chromeIconUrl -  The URL of the icon to be set for the WebPush Notification.
*  @param {string} chromeTimeToLive - This parameter specifies how long (in seconds) the message should be kept in GCM storage if the device is offline.
*  @param {string} chromePayload - Custom JSON payload that will be sent as part of the notification message.

*  @param {string} safariTitle - Specifies the title to be set for the Safari Push Notifications.
*  @param {string} safariUrlArgs - The URL arguments that need to be used with this notification. This has to provided in the form of a JSON Array.
*  @param {string} safariAction - The label of the action button.

*  @param {string} chromeAppExtTitle - Specifies the title to be set for the WebPush Notification.
*  @param {string} chromeAppExtCollapseKey - This parameter identifies a group of messages.
*  @param {string} chromeAppExtDelayWhileIdle - When this parameter is set to true, it indicates that the message should not be sent until the device becomes active.
*  @param {string} chromeAppExtIconUrl - The URL of the icon to be set for the WebPush Notification.
*  @param {string} chromeAppExtTimeToLive - This parameter specifies how long (in seconds) the message should be kept in GCM storage if the device is offline.
*  @param {string} chromeAppExtPayload - Custom JSON payload that will be sent as part of the notification message.
*  @return {object} whisk async.
*/
module.paths.push('/usr/lib/node_modules');
const url = require('url');

function main(params) {

  if (!params.appId && !params.appGuid) {
    return Promise.reject('appId / appGUID of the application is required.');
  }
  if (!params.appSecret) {
    return Promise.reject('appSecret of the application is required.');
  }

  const appId = params.appGuid || params.appId;
  const appSecret = params.appSecret;

  // message section settings
  const messageUrl = params.url;
  const messageText = params.text;

  // target section settings -- each param should be an array of string
  const targetDeviceIds = params.deviceIds;
  const targetPlatforms = params.platforms;
  const targetTagNames = params.tagNames;
  const targetUserIds = params.userIds;

  // apns settings
  const apnsBadge = params.apnsBadge; // should be an int
  const apnsCategory = params.apnsCategory;
  const apnsActionKeyTitle = params.apnsIosActionKey;
  const apnsSound = params.apnsSound;
  const apnsPayload = params.apnsPayload;
  const apnsType = params.apnsType;
  const apnsTitleLocKey = params.apnsTitleLocKey;
  const apnsLocKey = params.apnsLocKey;
  const apnsLaunchImage = params.apnsLaunchImage;
  const apnsTitleLocArgs = params.apnsTitleLocArgs;
  const apnsLocArgs = params.apnsLocArgs;
  const apnstitle = params.apnstitle;
  const apnsSubtitle = params.apnsSubtitle;
  const apnsAttachmentUrl = params.apnsAttachmentUrl;

  // gcm settings
  const gcmCollapseKey = params.gcmCollapseKey;
  const gcmDelayWhileIdle = params.gcmDelayWhileIdle;
  const gcmPayload = params.gcmPayload;
  const gcmPriority = params.gcmPriority;
  const gcmSound = params.gcmSound;
  const gcmTimeToLive = params.gcmTimeToLive;
  const gcmSync = params.gcmSync;
  const gcmVisibility = params.gcmVisibility;
  const gcmCategory = params.gcmCategory;
  const gcmIcon = params.gcmIcon;

  //GCM Style settings
  const gcmStyleType = params.gcmStyleType;
  const gcmStyleTitle = params.gcmStyleTitle;
  const gcmStyleUrl = params.gcmStyleUrl;
  const gcmStyleText = params.gcmStyleText;
  const gcmStyleLines = params.gcmStyleLines;

  //GCM Light settings
  const gcmLightsLedArgb = params.gcmLightsLedArgb;
  const gcmLightsLedOnMs = params.gcmLightsLedOnMs;
  const gcmLightsLedOffMs = params.gcmLightsLedOffMs;

  //Firefox web settings
  const fireFoxTitle = params.fireFoxTitle;
  const fireFoxIconUrl = params.fireFoxIconUrl;
  const fireFoxTimeToLive = params.fireFoxTimeToLive;
  const fireFoxPayload = params.fireFoxPayload;

  //Chrome web settings
  const chromeTitle = params.chromeTitle;
  const chromeIconUrl = params.chromeIconUrl;
  const chromeTimeToLive = params.chromeTimeToLive;
  const chromePayload = params.chromePayload;

  //Safari web settings
  const safariTitle = params.safariTitle;
  const safariUrlArgs = params.safariUrlArgs;
  const safariAction = params.safariAction;

  //Chrome Apps & Extensions web settings
  const chromeAppExtTitle = params.chromeAppExtTitle;
  const chromeAppExtCollapseKey = params.chromeAppExtCollapseKey;
  const chromeAppExtDelayWhileIdle = params.chromeAppExtDelayWhileIdle;
  const chromeAppExtIconUrl = params.chromeAppExtIconUrl;
  const chromeAppExtTimeToLive = params.chromeAppExtTimeToLive;
  const chromeAppExtPayload = params.chromeAppExtPayload;

  const sendMessage = {};

  // create message section
  const message = {};
  if (messageText) {
    message.alert = messageText;
  }
  if (messageUrl) {
    message.url = messageUrl;
  }

  if (isEmpty(message)) {
    return Promise.reject("No message to send");
  }
  sendMessage.message = message;


  // create target section
  const target = {};
  if (targetDeviceIds) {
    target.deviceIds = targetDeviceIds;
  }
  if (targetPlatforms) {
    target.platforms = targetPlatforms;
  }
  if (targetTagNames) {
    target.tagNames = targetTagNames;
  }
  if (targetUserIds) {
    target.userIds = targetUserIds;
  }

  if (isEmpty(target)) {
    console.log("No target set, broadcasting message to all registered devices");
  } else {
    sendMessage.target = target;
  }

  // create apns settings section
  var apns = {};
  if (apnsBadge) {
    apns.badge = apnsBadge;
  }
  if (apnsCategory) {
    apns.category = apnsCategory;
  }
  if (apnsActionKeyTitle) {
    apns.iosActionKey = apnsActionKeyTitle;
  }
  if (apnsSound) {
    apns.sound = apnsSound;
  }
  if (apnsType) {
    apns.type = apnsType;
  }
  if (apnsPayload) {
    apns.payload = apnsPayload;
  }
  if (apnsTitleLocKey) {
    apns.titleLocKey = apnsTitleLocKey;
  }
  if (apnsLocKey) {
    apns.locKey = apnsLocKey;
  }
  if (apnsLaunchImage) {
    apns.launchImage = apnsLaunchImage;
  }
  if (apnsTitleLocArgs) {
    apns.titleLocArgs = apnsTitleLocArgs;
  }
  if (apnsLocArgs) {
    apns.locArgs = apnsLocArgs;
  }
  if (apnstitle) {
    apns.title = apnstitle;
  }
  if (apnsSubtitle) {
    apns.subtitle = apnsSubtitle;
  }
  if (apnsAttachmentUrl) {
    apns.attachmentUrl = apnsAttachmentUrl;
  }

  if (!isEmpty(apns)) {
    sendMessage.settings = {};
    sendMessage.settings.apns = apns;
  }

  // create gcm settings section
  const gcm = {};
  if (gcmCollapseKey) {
    gcm.collapseKey = gcmCollapseKey;
  }
  if (gcmDelayWhileIdle) {
    gcm.delayWhileIdle = gcmDelayWhileIdle;
  }
  if (gcmPayload) {
    gcm.payload = gcmPayload;
  }
  if (gcmPriority) {
    gcm.priority = gcmPriority;
  }
  if (gcmSound) {
    gcm.sound = gcmSound;
  }
  if (gcmTimeToLive) {
    gcm.timeToLive = gcmTimeToLive;
  }
  if (gcmVisibility) {
    gcm.visibility = gcmVisibility;
  }
  if (gcmSync) {
    gcm.sync = gcmSync;
  }
  if (gcmCategory) {
    gcm.interactiveCategory = gcmCategory;
  }
  if (gcmIcon) {
    gcm.icon = gcmIcon;
  }

  const gcmStyle = {};
  if (gcmStyleType) {
    gcmStyle.type = gcmStyleType;
  }
  if (gcmStyleTitle) {
    gcmStyle.title = gcmStyleTitle;
  }
  if (gcmStyleUrl) {
    gcmStyle.url = gcmStyleUrl;
  }
  if (gcmStyleText) {
    gcmStyle.text = gcmStyleText;
  }
  if (gcmStyleLines) {
    gcmStyle.lines = gcmStyleLines;
  }
  if (!isEmpty(gcmStyle)) {
    gcm.style = gcmStyle;
  }

  const gcmLights = {};
  if (gcmLightsLedArgb) {
    gcmLights.ledArgb = gcmLightsLedArgb;
  }
  if (gcmLightsLedOnMs) {
    gcmLights.ledOnMs = gcmLightsLedOnMs;
  }
  if (gcmLightsLedOffMs) {
    gcmLights.ledOffMs = gcmLightsLedOffMs;
  }
  if (!isEmpty(gcmLights)) {
    gcm.lights = gcmLights;
  }

  if (!isEmpty(gcm)) {
    if (!sendMessage.settings) {
      sendMessage.settings = {};
    }
    sendMessage.settings.gcm = gcm;
  }

  // create FireFox settings section
  const firefoxWeb = {};
  if (fireFoxTitle) {
    firefoxWeb.title = fireFoxTitle;
  }
  if (fireFoxIconUrl) {
    firefoxWeb.iconUrl = fireFoxIconUrl;
  }
  if (fireFoxTimeToLive) {
    firefoxWeb.timeToLive = fireFoxTimeToLive;
  }
  if (fireFoxPayload) {
    firefoxWeb.payload = fireFoxPayload;
  }

  if (!isEmpty(firefoxWeb)) {
    if (!sendMessage.settings) {
      sendMessage.settings = {};
    }
    sendMessage.settings.firefoxWeb = firefoxWeb;
  }

  // create Safari settings section
  const safariWeb = {};
  if (safariTitle) {
    safariWeb.title = safariTitle;
  }
  if (safariUrlArgs) {
    safariWeb.urlArgs = safariUrlArgs;
  }
  if (safariAction) {
    safariWeb.action = safariAction;
  }
  if (!isEmpty(safariWeb)) {
    if (!sendMessage.settings) {
      sendMessage.settings = {};
    }
    sendMessage.settings.safariWeb = safariWeb;
  }

  // create Chrome settings section
  const chromeWeb = {};
  if (chromeTitle) {
    chromeWeb.title = chromeTitle;
  }
  if (chromeIconUrl) {
    chromeWeb.iconUrl = chromeIconUrl;
  }
  if (chromeTimeToLive) {
    chromeWeb.timeToLive = chromeTimeToLive;
  }
  if (chromePayload) {
    chromeWeb.payload = chromePayload;
  }

  if (!isEmpty(chromeWeb)) {
    if (!sendMessage.settings) {
      sendMessage.settings = {};
    }
    sendMessage.settings.chromeWeb = chromeWeb;
  }

  // create Chrome Apps & Extensions settings section
  const chromeAppExt = {};
  if (chromeAppExtTitle) {
    chromeAppExt.title = chromeAppExtTitle;
  }
  if (chromeAppExtCollapseKey) {
    chromeAppExt.collapseKey = chromeAppExtCollapseKey;
  }
  if (chromeAppExtDelayWhileIdle) {
    chromeAppExt.delayWhileIdle = chromeAppExtDelayWhileIdle;
  }
  if (chromeAppExtIconUrl) {
    chromeAppExt.iconUrl = chromeAppExtIconUrl;
  }
  if (chromeAppExtTimeToLive) {
    chromeAppExt.timeToLive = chromeAppExtTimeToLive;
  }
  if (chromeAppExtPayload) {
    chromeAppExt.payload = chromeAppExtPayload;
  }
  if (!isEmpty(chromeAppExt)) {
    if (!sendMessage.settings) {
      sendMessage.settings = {};
    }
    sendMessage.settings.chromeAppExt = chromeAppExt;
  }

  const bodyData = JSON.stringify(sendMessage);
  const request = require('request');
  let apiHost;
  if (params.apiHost) {
    apiHost = params.apiHost;
  }
  else if (params.admin_url) {
    const adminURL = url.parse(params.admin_url).protocol === null ? `https:${params.admin_url}` : params.admin_url;
    apiHost = url.parse(adminURL).host;
  } else {
    apiHost = 'mobile.ng.bluemix.net';
  }

  const promise = new Promise((resolve, reject) => {
    request({
      method: 'post',
      uri: `https://${apiHost}/imfpush/v1/apps/${appId}/messages`,
      headers: {
        appSecret,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: bodyData,
    }, (error, response, body) => {
      if (error) {
        reject(error);
      }
      const j = JSON.parse(body);
      resolve(j);
    });
  });
  return promise;
}

function isEmpty(obj) {
  if (obj === null) return true;
  if (obj.length > 0) return false;
  if (obj.length === 0) return true;
  for (var key in obj) {
    if (hasOwnProperty.call(obj, key)) return false;
  }
  return true;
}
