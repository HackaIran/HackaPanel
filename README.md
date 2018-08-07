# Hacka{Iran}'s Contest Panel

[![Gitter](https://img.shields.io/badge/license-MIT-ED4A08.svg?style=flat-square)](https://github.com/HackaIran/HackaPanel/blob/master/LICENSE)
[![Gitter](https://img.shields.io/badge/gitter-join--chat-23CD7A.svg?style=flat-square)](https://gitter.im/HackaCommunityIran/Lobby)
[![Tweet](https://img.shields.io/badge/twiter-share-76abec.svg?style=flat-square)](https://ctt.ac/KIO2d)

>Compete with others in style!

![HackaPanelV3](https://user-images.githubusercontent.com/2771377/32375684-c67e4208-c0b7-11e7-8a97-e35fe3b0b072.jpg)

**HackaPanel** is a Node application which provides competition system over **Hacka{Iran}**'s contests with the vast variety of supported languages and features. 


# Table of Contents

* [Features](#features)
* [Getting Started](#getting-started)
	* [Pre-Installation](#pre-installation)
	* [Installation](#installation)
* [Configurations](#configurations)
  * [Database](#database-config)
  * [Time](#time-config)
  * [Questions](#questions-config)
* [License](#license)

# Features

 - **Highly Customizable** questions.
 - Supports **Variety** of languages (Javascipt, C++, PHP, Python, ... ).
 -  **Real-time** competition system.
 - **Multi-Level** test cases generation.

### Pre-Installation

 1. **Download and Install [Node.js](https://nodejs.org/en/download/)**
 2. **Download and Install [MongoDB](https://www.mongodb.com/download-center?_ga=2.56287778.820520607.1533623016-152191401.1531196918#production)**

# Getting Started

### Installation

Lets start by installing npm packages on the same route as 'app,js' issue:

```bash
> npm install
```

Then we need to setup the Database using the following commands:

```bash
> mongo
MongoDB shell version v3.6.3
connecting to: mongodb://localhost
> use hacka
switched to db hacka
```
<p align="center"><img src="https://imgur.com/KDfimgB.gif"/></p>

Moving on to installing the Webpack we issue:

```bash
> npm install -g webpack 
```
⚠️ *Note: You may need root access, use `sudo` if installation failed with the error `npm ERR! Error: EACCES: permission denied`*

Rename and remove "**.sample**" from the files under **_contest/_** like below:

<p align="center"><img src="https://imgur.com/ztLgTOd.gif"/></p>

On HackaPanel/ issue:

```bash
webpack
```

You're Done! Run the server using the following command:
```bash
nodemon app.js
```
<p align="center"><img src="https:///imgur.com/OAVw7Nj.gif"/></p>

# Configurations

TODO: Add it!!!!

# License

Copyright (c) 2017 Alireza Sheikholmolouki All rights reserved.

This work is licensed under the terms of the MIT license. For a copy, see  [https://opensource.org/licenses/MIT](https://opensource.org/licenses/MIT).
