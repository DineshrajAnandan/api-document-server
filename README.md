# API Documentation Server - A Collaborative REST API Client

> The API Documentation Server is a robust and user-friendly program designed to function as a REST API client, specifically tailored for JSON documents created in a standardized format. This tool aims to streamline communication and collaboration among teams and colleagues by providing a centralized platform for documenting, sharing, and testing APIs.

The API Documentation Server is a powerful tool that not only facilitates documentation but also acts as a catalyst for effective teamwork and streamlined development workflows. It empowers teams to create, share, and consume API documentation seamlessly, fostering a collaborative and efficient development environment.

## Table of contents

- [Key Features](#key-features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
  - [Serving the app](#serving-the-app)
  - [Creating JSON documents](#creating-json-documents)
  - [Sample JSON documents](#sample-json-documents)
- [Built With](#built-with)
- [Authors](#authors)
- [License](#license)

## Key Features:

- Intuitive Document Creation:

Create and structure API documentation in JSON format.
Support for common API elements, such as endpoints, methods, parameters, and headers.

- RESTful API Client:

Seamlessly transform the API documentation into a fully functional REST API client.
Execute API requests directly from the web interface for easy testing and validation.

- Interactive Documentation:

Generate interactive and visually appealing documentation that includes examples, code snippets, and response details.
Improve understanding and adoption of APIs by providing an interactive playground for testing.

## Prerequisites

This project requires NodeJS (version 18 or later) and NPM.
[Node](http://nodejs.org/) and [NPM](https://npmjs.org/) are really easy to install.
To make sure you have them available on your machine,
try running the following command.

```sh
$ npm -v && node -v
```

## Getting Started

These instructions will get you a the program up and running on your local machine for testing purposes.

## Installation

**BEFORE YOU INSTALL:** please read the [prerequisites](#prerequisites)

To install and set up the library, run:

```sh
$ npm i -g @bydin/api-document-server
```

Or if you prefer using not globally:

```sh
$ npm i @bydin/api-document-server
```

## Usage

### Serving the app

The command `ads` should be run from the directory where the json documents are present. This command will read the json document and will spin up the server listening in the default port `8001`

```sh
$ ads
```

### Creating JSON documents

There could be multiple json documents in the same folder. Each document name should be in the format `<name>.doc.json`. The `.doc.json` is mandatory.

The JSON documents should be in the strucure as given below.

```json
{
  "title": ...,
  "description": ...,
  "operationId": ...,
  "requests": [
    {
      "operationId": ...,
      "title": ...,
      "description": ...,
      "descriptionMd": ...,
      "url": ...,
      "method": ...,
      "headers": {
        ...
      },
	  "data": {
		...
	  },
      "preRequisite": {
        "placeholder": ...,
        "operationId": ...,
        "valueExpression": ...
      }
    }
  ]
}

```

the properties that are mandatory are

- operationId
- title
- url
- method

A **document** has `title`, `description`, `operationId` and a `requests[]` list of requests. the document operation id's should be unique.

- `operationId` - a string that acts as a identifier and expected to be unique
- `title` - a string that represents a document title
- `description` - a string that represents a document description
- `requests[]` - an array of requests

A **request** has `operationId`, `title`, `description`, `descriptionMd`, `url`, `method`, `headers`, `data` and `preRequisite`. The request id's should be unique inside a document.

- `operationId` - a string that acts as a identifier and expected to be unique
- `title` - a string that represents a request title
- `description` - a string that represents a request description
- `descriptionMd` - request description can also be given in the markdown format. The value should be the file path of the markdown file. `descriptionMd` has priority over `description`. So, when both properties are present, `descriptionMd`will be rendered in web interface.
- `url` - the url of the request
- `method` - the method of the request. Possible values here are `GET`, `PUT`, `POST` and `DELETE`
- `headers` - a key value pair of headers that has to be attached to the request,
- `data` - request body object that has to attached to the request. This is usualy for `PUT` and `POST` requests
- `preRequisite` - preRequisite property defines the request that has to be performed before the request as a preRequisite. It takes the following properties
  - `placeholder` - a place holder value that is in the header value that needs to be replaced
  - `operationId` - operation id of the request that is a preRequisite
  - `valueExpression` - the expression that is used to get value from preRequisite request for the placeholder
    please take a look at example JSON for better understanding [Sample JSON documents](#sample-json-documents).

### Sample JSON documents

example 1

```json
{
  "title": "sample document 1",
  "description": "sample document description",
  "operationId": "1",
  "requests": [
    {
      "operationId": "1",
      "title": "request 1",
      "description": "sample description 1",
      "descriptionMd": "path/desc1.md",
      "url": "https://sampleserver.thatwontwork.com/auth",
      "method": "POST",
      "headers": {
        "userName": "test123",
        "password": "pass123"
      }
    },
    {
      "operationId": "2",
      "title": "request 2",
      "description": "sample description 2",
      "url": "https://sampleserver.thatwontwork.com/todos",
      "method": "GET",
      "headers": {
        "Authorization": "Bearer {{token}}"
      },
      "preRequisite": {
        "placeholder": "token",
        "operationId": "1",
        "valueExpression": "access-token"
      }
    }
  ]
}
```

example 2

```json
{
  "title": "sample document 2",
  "description": "sample document description",
  "operationId": "2",
  "requests": [
    {
      "operationId": "1",
      "title": "request 1",
      "description": "sample description",
      "url": "https://jsonplaceholder.typicode.com/todos",
      "method": "GET"
    },
    {
      "operationId": "2",
      "title": "request 2",
      "description": "sample description",
      "url": "https://jsonplaceholder.typicode.com/posts",
      "method": "POST",
      "data": {
        "userId": 1,
        "title": "test title x",
        "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
      }
    },
    {
      "operationId": "3",
      "title": "request 3",
      "description": "sample description",
      "url": "https://jsonplaceholder.typicode.com/posts/1",
      "method": "PUT",
      "data": {
        "userId": 1,
        "title": "test title x",
        "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
      }
    },
    {
      "operationId": "4",
      "title": "request 4",
      "description": "sample description",
      "url": "https://jsonplaceholder.typicode.com/posts/1",
      "method": "DELETE"
    }
  ]
}
```

## Built With

- React.js
- Express.js
- Material UI React

## Authors

- **Dineshraj Anandan** - _Initial work_

## License

[ISC License](https://www.isc.org/licenses/)
