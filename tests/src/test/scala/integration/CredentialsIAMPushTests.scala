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
package packages

import common.{TestHelpers, WskTestHelpers, _}
import org.junit.runner.RunWith
import org.scalatest.junit.JUnitRunner
import spray.json.DefaultJsonProtocol._
import spray.json._

@RunWith(classOf[JUnitRunner])
class CredentialsIAMPushTests
    extends PushNotificationsPackage
    with TestHelpers
    with WskTestHelpers{
  val credentials = TestUtils.getVCAPcredentials("push-notifications-iam")
  val iam_role_crn = credentials.get("iam_role_crn");
  val url = credentials.get("url");
  val iam_apikey_description = credentials.get("iam_apikey_description");
  val apikey = credentials.get("apikey");
  val appGuid = credentials.get("appGuid");
  val iam_apikey_name = credentials.get("iam_apikey_name");
  val admin_url = credentials.get("admin_url");
  val clientSecret = credentials.get("clientSecret");
  val iam_serviceid_crn = credentials.get("iam_serviceid_crn");


  val messageText = JsString("""This is pushnotifications Testing""");
  val unicodeMessage = JsString("""\ue04a""");
  val accentMessage = JsString("""Máxima de 33 C and Mínima de 26 C""");

  val __bx_creds = JsObject(
   "imfpush" -> JsObject(
     "iam_role_crn" -> JsString(iam_role_crn),
     "url" -> JsString(url),
     "iam_apikey_description" -> JsString(iam_apikey_description),
     "apikey" -> JsString(apikey),
     "appGuid" -> JsString(appGuid),
     "iam_apikey_name" -> JsString(iam_apikey_name),
     "admin_url" -> JsString(admin_url),
     "clientSecret" -> JsString(clientSecret),
     "iam_serviceid_crn" -> JsString(iam_serviceid_crn)
   ))

  behavior of "Push Package with IAM style Credentials"

    it should "Deploy nodejs8 push-notificiations package and actions" in {
      deployNodeJS8
    }

    it should "Send Notification action" in {
           val name = "push-notifications/send-message"
             withActivation(wsk.activation,wsk.action.invoke(name, Map("messageText" -> messageText, "__bx_creds" -> __bx_creds))){
                 _.response.result.get.toString should include (messageText.convertTo[String])
             }
    }

    it should "Send Notification action with unicode message" in {
           val name = "push-notifications/send-message"
             withActivation(wsk.activation,wsk.action.invoke(name, Map("messageText" -> unicodeMessage, "__bx_creds" -> __bx_creds))){
                 _.response.result.get.toString should include (unicodeMessage.convertTo[String])
             }
    }

    it should "Send Notification action with accent message" in {
           val name = "push-notifications/send-message"
             withActivation(wsk.activation,wsk.action.invoke(name, Map("messageText" -> accentMessage,"__bx_creds" -> __bx_creds))){
                 _.response.result.get.toString should include (accentMessage.convertTo[String])
             }
    }

    it should "Delete nodejs8 push-notifications package and actions" in {
      deleteNodeJS8
    }
}
