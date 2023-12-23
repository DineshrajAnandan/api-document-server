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

## Built With

- React.js
- Express.js
- Material UI React

## Authors

- **Dineshraj Anandan** - _Initial work_

## License

[ISC License](https://www.isc.org/licenses/)
