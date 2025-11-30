<h1 align="center">Image Uploader</h1>

<div align="center">
   Solution for the Image Uploader challenge from  <a href="https://devchallenges.io" target="_blank">devchallenges.io</a>.
</div>

<div align="center">
  <h3>
    <a href="https://image-uploader.ethanjulius.com" target="_blank">Demo</a>
    <span> | </span>
    <a href="https://github.com/500EJ/image-uploader">Solution</a>
    <span> | </span>
    <a href="https://devchallenges.io/challenge/image-upload-app" target="_blank">Challenge</a>
  </h3>
</div>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [Overview](#overview)
  - [Built With](#built-with)
- [Features](#features)
- [How to use](#how-to-use)
- [Acknowledgements](#acknowledgements)

<!-- OVERVIEW -->

## Overview

![screenshot](https://i.imgur.com/cgxttzV.png)

In this project, I built an image-sharing service. I learned how to handle uploads to a server and store them in the cloud. On the frontend, this project improved my understanding of nested routes.

### Built With

- [React](https://reactjs.org)
- [Express](https://expressjs.com)
- [React Router](https://reactrouter.com/en/main)
- [MongoDB](https://mongodb.com)

## Features

<!-- List the features of your application or follow the template. Don't share the figma file here :) -->

This application/site was created as a submission to a [DevChallenges](https://devchallenges.io/challenges) challenge.
The [challenge](https://devchallenges.io/challenges/O2iGT9yBd6xZBrOcVirx) was to build an application that allows users
to upload an image and share the link with others. Here are some features that this app includes:

- Upload image via file picker or drag-and-drop
- Uploading page with animation
- Error message displayed if there is an issue on the server

## How To Use

<!-- Example: -->

To clone and run this application, you'll need [Git](https://git-scm.com)
and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer.
From your command line:

```bash
# In the server folder, create a .env file with the following variables:
# NODE_ENV=development
# PORT=3001
# MONGO_URI=
# CLOUDINARY_NAME=
# CLOUDINARY_KEY=
# CLOUDINARY_SECRET=

# cd into project directory
# cd into backend
$ cd server
# install dependencies
$ npm install
# compile typescript
$ npm run tsc
# start server
$ npm run dev

# cd into frontend
$ cd client
# install dependencies
$ npm install
# start client
$ npm start
```

## Acknowledgements

- Thank you, [@Nicholas Tower](https://stackoverflow.com/users/3794812/nicholas-tower), for helping me out with my first [Stack Overflow question](https://stackoverflow.com/questions/75229477/does-setting-state-work-with-the-usenavigate-hook-in-react-with-react-router)!
