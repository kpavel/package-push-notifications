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
 *  Feed to create a webhook for IBM Push Notifications service
 *
 *  @param {string} appGuid - appGuid to create webhook
 *  @param {string} appSecret - appSecret of the application
 *  @param {string} events - list of the events the webhook should fire on
 *  @param {string} triggerName - the fully qualified name of the trigger to fire on callback
 *  @return {object} whisk async
 */
const iam = require('@ibm-functions/iam-token-manager');
const url = require('url');
const { promisify } = require('util');
const request = promisify(require('request'));


async function main(params) {
  const theParams = getParams(params);

  // check for IAM authentication
  let isIamAuth = false;
  if (theParams.apikey) {
    isIamAuth = true;
  }
  const parsedName = parseQualifiedName(theParams.triggerName);
  const { trigger, namespace } = parsedName;
  const owEndpoint = process.env.__OW_API_HOST;
  const appId = theParams.appGuid || theParams.appId;
  const { appSecret } = theParams;
  
  // URL of the whisk system. The calls of push service will go here.
  const whiskCallbackUrl = `https://${process.env.__OW_API_KEY}@${owEndpoint}/api/v1/namespaces/${namespace}/triggers/${trigger}`;

  let apiHost = '';
  if (theParams.apiHost) {
    apiHost = theParams.apiHost;
  } else if (theParams.url) {
    apiHost = url.parse(theParams.url).host;
  } else if (theParams.admin_url) {
    const adminURL = url.parse(theParams.admin_url).protocol === null ? `https:${theParams.admin_url}` : theParams.admin_url;
    apiHost = url.parse(adminURL).host;
  } else {
    apiHost = 'mobile.ng.bluemix.net';
  }
  const lifecycleEvent = (theParams.lifecycleEvent || 'CREATE').trim().toUpperCase();

  let header;
  let pushHeaders = {};
  if (isIamAuth) {
    try {
      header = await handleAuth(theParams.apikey)
    } catch (err) {
      return Promise.reject({
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: { message: 'Error getting IAM token from apikey' },
      });
    }
    pushHeaders = {
      Authorization: header,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
  } else {
    pushHeaders = {
      appSecret,
      'Content-Type': 'application/json',
    };
  }
  if (lifecycleEvent === 'CREATE' || lifecycleEvent === 'UPDATE') {
    const { events } = theParams;
    const body = {
      name: trigger,
      url: whiskCallbackUrl,
      eventTypes: events,
    };
    let postResult;
    try {
      postResult = await (request({
        method: 'POST',
        uri: `https://${apiHost}/imfpush/v1/apps/${appId}/webhooks`,
        body: JSON.stringify(body),
        headers: pushHeaders,
      }));
    } catch (err) {
      return Promise.reject({
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: { message: err },
      })
    }
    return { response: postResult.body };
  } if (lifecycleEvent === 'DELETE') {
    let deleteResult;
    try {
      deleteResult = await (request({
        method: 'DELETE',
        uri: `https://${apiHost}/imfpush/v1/apps/${appId}/webhooks/${trigger}`,
        headers: pushHeaders,
      }));
    } catch (err) {
      return Promise.reject({
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: { message: err },
      })
    }
    return { response: deleteResult.body };
  }
  return Promise.reject(new Error('lifecycleEvent must be CREATE, UPDATE, or DELETE'));
}

/**
* Helper function used to authenticate credentials bound to package using wsk service bind
*
* @param {Object} theParams - parameters sent to service
*/
function getParams(theParams) {
  const service = 'imfpush';
  if (Object.keys(theParams).length === 0) {
    return theParams;
  }
  let bxCreds = {};
  // Code that checks parameters bound using service bind
  if (theParams.__bx_creds && theParams.__bx_creds[service]) {
    bxCreds = theParams.__bx_creds[service];
  }
  const allParams = Object.assign({}, bxCreds, theParams);
  delete allParams.__bx_creds;
  return allParams;
}

function handleAuth(theApiKey) {
  return new Promise(((resolve, reject) => {
    getAuthHeader(theApiKey)
      .then((header) => {
        resolve(header);
      })
      .catch((err) => {
        reject(err);
      });
  }));
}

function getAuthHeader(iamApiKey) {
  const tm = new iam({
    iamApikey: iamApiKey,
    iamUrl: process.env.__OW_IAM_API_URL || 'https://iam.bluemix.net/identity/token',
  });
  return tm.getAuthHeader();
}

function parseQualifiedName(qname) {
  const parsed = {};
  const delimiter = '/';
  const defaultNamespace = '_';
  if (qname && qname.charAt(0) === delimiter) {
    const parts = qname.split(delimiter);
    parsed.namespace = parts[1];
    parsed.trigger = parts.length > 2 ? parts.slice(2).join(delimiter) : '';
  } else {
    parsed.namespace = defaultNamespace;
    parsed.trigger = qname;
  }
  return parsed;
}
