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
 *  @return {object} whisk async
 */
const request = require('request');

function main(params) {
  console.log("push trigger feed params: ", params);
  const parsedName = parseQName(params.triggerName);
  const trigger = parsedName.name;
  const namespace = parsedName.namespace;
  const endpoint = 'openwhisk.ng.bluemix.net';
  // URL of the whisk system. The calls of push service will go here.
  const whiskCallbackUrl = `https://${process.env.__OW_API_KEY}@${endpoint}/api/v1/namespaces/${namespace}/triggers/${trigger}`;
  const appId = params.appGuid || params.appId;
  const { appSecret } = params;
  // The URL to create the webhook on push service
  const registrationEndpoint = `https://mobile.ng.bluemix.net/imfpush/v1/apps/${appId}/webhooks`;
  const lifecycleEvent = (params.lifecycleEvent || 'CREATE').trim().toUpperCase();
  if (lifecycleEvent === 'CREATE' || lifecycleEvent === 'UPDATE') {
    const { events } = params;
    const body = {
      name: trigger,
      url: whiskCallbackUrl,
      eventTypes: events,
    };
    const options = {
      method: 'POST',
      url: registrationEndpoint,
      body: JSON.stringify(body),
      headers: {
        appSecret,
        'Content-Type': 'application/json',
      },
    };
    const promise = new Promise(((resolve, reject) => {
      request(options, (error, response, body) => {
        if (error) {
          reject(error);
        }
        resolve({ response: body });
      });
    }));
    return promise;
  } if (lifecycleEvent === 'DELETE') {
    const options = {
      method: 'DELETE',
      url: registrationEndpoint,
      headers: {
        appSecret,
      },
    };
    const promise = new Promise(((resolve, reject) => {
      request(options, (error, response, body) => {
        if (error) {
          reject(error);
        }
        resolve({ response: body });
      });
    }));
    return promise;
  }
}

function parseQName(qname) {
  const parsed = {};
  const delimiter = '/';
  const defaultNamespace = '_';
  if (qname && qname.charAt(0) === delimiter) {
    const parts = qname.split(delimiter);
    parsed.namespace = parts[1];
    parsed.name = parts.length > 2 ? parts.slice(2).join(delimiter) : '';
  } else {
    parsed.namespace = defaultNamespace;
    parsed.name = qname;
  }
  return parsed;
}
