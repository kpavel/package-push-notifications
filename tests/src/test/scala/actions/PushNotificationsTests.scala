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

import org.junit.runner.RunWith
import org.scalatest.BeforeAndAfterAll
import org.scalatest.junit.JUnitRunner
import common.{WskTestHelpers}
import common.TestUtils.RunResult
import spray.json._

@RunWith(classOf[JUnitRunner])
class PushNotificationTests
    extends PushNotificationsPackage
    with WskTestHelpers
    with BeforeAndAfterAll {

  behavior of "Push Notifications Package"

  // test to create the nodejs 8 Push Notifications package from github url.  Will use preinstalled folder.
  it should "create the nodejs 8 Push Notifications package from github url" in {
    deployNodeJS8
    // create unique asset names

    // ensure actions exist and are of expected kind
    val testActionSendMessage =
      wsk.action.get(actionSendMessage)
    verifyAction(testActionSendMessage, actionSendMessage, JsString(nodejs8kind))

    // ensure actions exist and are of expected kind
    val testActionWebhook =
      wsk.action.get(actionWebhook)
    verifyAction(testActionWebhook, actionWebhook, JsString(nodejs8kind))

    // clean up after test
    deleteNodeJS8
  }

  private def verifyAction(action: RunResult,
                           name: String,
                           kindValue: JsString): Unit = {
    val stdout = action.stdout
    assert(stdout.startsWith(s"ok: got action $name\n"))
    wsk
      .parseJsonString(stdout)
      .fields("exec")
      .asJsObject
      .fields("kind") shouldBe kindValue
  }
}
