# Udacity Restaurant Reviews Web Application
#### a Front-end Nanodegree project,
#### by Abdulaziz Alshmasi.

## Project Overview: Stage 1
In this project, I improved a Restaurant Reviews web app to add responsiveness, accessibility, and offline support.

## How to Run
1. Clone or download and unzip this repo.
2. In the project folder, start up a simple HTTP server to serve up the site files on your local computer. Python has some simple tools to do this, and you don't even need to know Python. For most people, it's already installed on your computer.

    * In a terminal, check the version of Python you have: `python -V`. If you have Python 2.x, spin up the server with `python -m SimpleHTTPServer 8000` (or some other port, if port 8000 is already in use.) For Python 3.x, you can use `python3 -m http.server 8000`. If you don't have Python installed, navigate to Python's [website](https://www.python.org/) to download and install the software.
   * Note -  For Mac OSX systems, Python is installed as `python` by default. To start a Python 3.x server, you can simply enter `python -m http.server 8000`.
3. With your server running, visit the site: `http://localhost:8000`.
4. Enjoy!

## Important Notes
* if you're starting the server on a port other than 8000, you need to change the 'port' variable, located in line 11 in `/js/dbhelper.js`.
* This repository uses [leafletjs](https://leafletjs.com/) with [Mapbox](https://www.mapbox.com/) to show restaurants.