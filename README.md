# CrowdEmotion Developer Exercise

This document contains the requirement for the given exercise and the solution.

---

## CrowdEmotion Developer Exercise: Requirements

Here are in exat detail the requirements for this test.

> **Goal**
>
> Design and implement a simple web app with a backend API that calls the Dynata API.

> **References**
>
> See https://developers.dynata.com

> **Explanation**
>
> Dynata provides an API, called Demand API, to choose a panel of people as respondents for surveys.
>
> The web app shows only one page containing a form by which the user can select attributes and quotas, then submits the form and reads back how the corresponding survey has been actually configured in a separate pane.

> **Use Cases**
>
> 1. A user should be able to give a name to a survey
> 2. A user should be able to select a country
> 3. A user should be able to select a few attributes like age, gender, etc
> 4. A user should be able to select the number of respondents in the panel
> 5. A user should be able to submit the selection
> 6. A user should be able to see how it’s survey has been configured

> **Architecture**
>
> The web app is composed of 3 architectural elements:
> 1. FE app: any tech, React preferred
> 2. BE: python-based solution preferred
> 3. Dynata API: RESTful API
>
> The FE element communicates only with the BE API which in turn communicates with the Dynata API.
>
> ![diagram](https://i.imgur.com/p7wFaUF.png)

> **Implementation Details**
>
> Dynata provides a sandbox Test account for development of integrations that actually has no real effect:
> * URL: https://api.researchnow.com/
> * Credentials: (provided separately)
>
> Please keep the above information private.
>
> Since Dynata API is quite complete it can be overwhelming for a simple exercise, so an advice here is to follow what Dynata documentation suggests (link follows) but omitting the parts unrelated to the use cases listed above:
>
> https://developers.dynata.com/demand-api/building
>
> A basic form of authentication must be implemented If the web app is delivered anywhere on the Internet.
>
> Said instance must be destroyed after the exercise has been discussed.

> **Deliverables**
>
> The expected deliverables are:
> * Code for all architecture elements
> * Explanatory documentation
> * Installation instructions

> **Next Steps**
>
> All the deliverables should be sent back to Crowd Emotion for a subsequent discussion session.

---

## CrowdEmotion Developer Exercise: Solution

As a solution for this exercise, I have decided to divide the project in two parts (**back-end** and **front-end**) and run those parts in *Docker* on the same machine.

---

### CrowdEmotion Developer Exercise: Solution: API Dynata Connections

In order to connect to the *Dynata API* the following API end-points will be used (with the assumption that access *username* and *password* is known and at least one *survey* was created in advance).

---

#### Auth - Get Authorization Token

First add your password into your PASSWORD env var.

`export PASSWORD=v.......`

```bash
curl -X POST \
  https://api.uat.pe.researchnow.com/auth/v1/token/password \
  -H 'content-type: application/json' \
  -d '{
  "clientId": "api",
  "password": "'$PASSWORD'",
  "username": "crowd_emotion_sample_api"
}
'
```

CURLstdout:

```json
{ "accessToken": "...", "expiresIn": 7200, "refreshExpiresIn": 43200,"refreshToken": "..." }
```

---

#### Projects - Get All Projects

Use the AUTH env var first.

`export AUTH=............`

```bash
curl -X GET \
  'https://api.uat.pe.researchnow.com/sample/v1/projects?limit=10' \
  -H 'authorization: Bearer '$AUTH'' \
  -H 'content-type: application/json'
```

CURLstdout:

```json
{
  "data": [
    { "author": { "name": "...", "type": "api", "username": "user..." },
      "createdAt": "...",
      "extProjectId": "project001",
      "jobNumber": "PO-1234",
      "state": "PROVISIONED",
      "stateLastUpdatedAt": "...",
      "title": "Test Survey",
      "updatedAt": "..." }
  ],
  "meta": { "links": { "first":"","...": "...","self":"..." }, "pageSize": 1, "total": 1 },
  "status": { "errors": [], "message": "success" }
}
```

Out of the output we will need the the *extProjectId* element from the *data* array.

---

#### Projects - Get Project BasedOn extProjectId

Use the AUTH env var first.

`export AUTH=............`

```bash
curl -X GET \
  https://api.uat.pe.researchnow.com/sample/v1/projects/project001 \
  -H 'authorization: Bearer '$AUTH'' \
  -H 'content-type: application/json'
```

CURLstdout:

```json
{
  "data": {
    "author": { "name": "...", "type": "api", "username": "user.." },
    "category": {
      "surveyTopic": [ "AUTOMOTIVE", "BUSINESS" ]
    },
    "createdAt": "",
    "devices": [ "mobile", "desktop", "tablet" ],
    "exclusions": { "list": null, "type": "PROJECT" },
    "extProjectId": "project001",
    "jobNumber": "PO-1234",
    "lineItems": [
      {
        "countryISOCode": "US", "createdAt": "",
        "daysInField": 20, "deliveryType": "BALANCED",
        "endLinks": { "complete": "..", "overquota": "..", "screenout": "..",
          "securityKey1": "93896", "securityKey2": "42614",
          "securityLevel": "MEDIUM" },
        "extLineItemId": "lineItem001",
        "indicativeIncidence": 20, "languageISOCode": "en",
        "launchedAt": "", "lengthOfInterview": 10,
        "quotaPlan": {
          "filters": [
            {
              "attributeId": "61961", "operator": "INCLUDE",
              "options": [ "3", "4" ]
            }
          ],
          "quotaGroups": [
            {
              "name": "Gender Distribution",
              "quotaCells": [
                { "count": 130,
                  "perc": 65,
                  "quotaCellId": "1",
                  "quotaNodes": [
                    { "attributeId":"11","operator":"INCLUDE","options": ["1"] }
                  ] },
                {
                  "...": "..."
                }
              ],
              "quotaGroupId": "fc70f967-05b3-49e3-9ec2-af793c474e51"
            }
          ]
        },
        "requiredCompletes": 200, "sources": [ { "id": 100 } ],
        "state": "PROVISIONED", "stateLastUpdatedAt": "",
        "surveyTestURL": "", "surveyURL": "",
        "targets": [
          { "count":2, "dailyLimit":0, "softLaunch":0, "type":"COMPLETE" }
        ],
        "title": "US College",
        "updatedAt": ""
      }
    ],
    "notificationEmails": [ "api-test@dynata.com" ],
    "respondentFilters": [ { "list":null, "type":"PROJECT" } ],
    "state": "PROVISIONED", "stateLastUpdatedAt": "",
    "title": "Test Survey", "updatedAt": ""
  },
  "meta": null,
  "status": { "errors": [], "message": "success" }
}
```

From the output json object the focus needs to be on *countryISOCode*, *filters*, *quotaGroups*, *requiredCompletes*.

---

#### Projects - Get All Countries

Use the AUTH env var first.

`export AUTH=............`

```bash
curl -X GET \
  'https://api.uat.pe.researchnow.com/sample/v1/countries?limit=10' \
  -H 'authorization: Bearer '$AUTH'' \
  -H 'content-type: application/json'
```

CURLstdout:

```json
{
  "data": [
    {
      "countryName": "Canada", "id": "CA",
      "isoCode": "CA",
      "supportedLanguages": [
        { "id": "en", "isoCode": "en", "languageName": "English (CA)" },
        { "id": "fr", "isoCode": "fr", "languageName": "French (CA)" }
      ]
    },
  ],
  "meta": {
    "links": { "first": "..","last": "","next": "","prev": "","self": ""},
    "pageSize": 10, "total": 48
  },
  "status": { "errors": [], "message": "success" }
}
```

From the output json object the *isoCode* will need to be used later.

---

#### Projects - Update Project BasedOn extProjectId

Use the AUTH env var first.

`export AUTH=............`

Then to change something like the title one can use the following.

```bash
curl -X POST \
  https://api.uat.pe.researchnow.com/sample/v1/projects/project001 \
  -H 'authorization: Bearer '$AUTH'' \
  -H 'content-type: application/json' \
  -d '{
  "title": "Automotive Study Edit One"
}'
```

CURLstdout:

```json
{
  "data": {
    "author": "...", "category": "...",
    "createdAt": "...", "devices": "...",
    "exclusions": "...", "extProjectId": "...",
    "jobNumber": "...", "lineItems": "...",
    "notificationEmails": "...", "state": "...",
    "stateLastUpdatedAt": "...",
    "title": "Automotive Study Edit One"
  },
  "meta": null, "status": { "errors":[],"message":"success" }
}
```

The output json file should include the change.

---

### CrowdEmotion Developer Exercise: Solution: Prerequisites

To run the **back-end** all you need is a dev machine and here, the preferred OS is Ubuntu and on it make sure you have:

* Docker version `19.03.4`, build 9013bf583a or higher

---

### CrowdEmotion Developer Exercise: Solution: Running The Backend

To run the back-end either from the docker container bash or the host machine terminal first make sure everything is initialized:

`npm i`

Then run:

`npm run start`

to run in normal production mode or for *development* mode:

`npm run startdev`

In dev mode you will see nodemon starting and showing the greeting _[nodemon] 1.19.4_.

---

### CrowdEmotion Developer Exercise: Solution: API Connections

After creating the PASSWORD env, you can run the backend with `npm run start` either in your normal host machine or inside a docker container virtual machine then you can test all the BackendAPI end-points with curl like described below.

* **Login**: <br><br>
`curl -X POST -d '{"username":"admin","password":"password"}' -H "Content-Type: application/json" localhost:3000/login` <br><br>
CURLstdout:
```json
{
    "AuthorizationBasic": "YWRtaW46cGFzc3dvcmQ="
}
```

---
