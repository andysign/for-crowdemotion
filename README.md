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

### CrowdEmotion Developer Exercise: Solution: Prerequisites

To run the **back-end** all you need is a dev machine and here, the preferred OS is Ubuntu and on it make sure you have:

* Docker version `19.03.4`, build 9013bf583a or higher

---
