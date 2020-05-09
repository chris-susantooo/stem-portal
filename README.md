# STEM Portal Frontend
![build](https://github.com/sca1998/stem-portal/workflows/Deploy%20to%20github%20pages/badge.svg)

An interactive online platform which focuses on STEM education, powered by [Vue](https://vuejs.org).

Demo here: https://sca1998.github.io/stem-portal/ (NOTE: In development)
## Demo Limitations
New account registrations may be rejected since only 5 user accounts may exist in the current build. Here are some accounts for logging in to try out the restricted features:
- Teacher account:

   Username: `teacher1`
   
   Password: `TeacherDemo1`
- Student account:

   Username: `student1`
   
   Password: `StudentDemo1`
- Parent account:

   Username: `parent1`
   
   Password: `ParentDemo1`
 
If you wish to create your instance of STEM Portal, which overcomes these limitations, see [Installation](https://github.com/sca1998/stem-portal/blob/master/README.md/#installation).
## Prerequisites for Installation
You will need the latest [Node.js](https://nodejs.org/en/) LTS installed on your system.

[Yarn](https://classic.yarnpkg.com/en/) is recommended as the package manager.
## Installation
1. Clone this repo to your system. In terminal, run:
```
git clone https://github.com/sca1998/stem-portal.git
```
   ... Or download the zipped source code [here](https://github.com/sca1998/stem-portal/archive/master.zip).

   If you are using [Visual Studio Code](https://code.visualstudio.com/download), select `Git: clone` in the command palette by `Ctrl+Shift+P` (Windows) or `Command+Shift+P` (MacOS). Paste in this repo's URL and choose a local folder of your choice.
2. Navigate to the project root and run in terminal:
```
yarn install
```
This will install all neccesary dependencies to run STEM Portal.
## Project setup
5. In your project root folder, create a file named `.env` and put the following code in the file and save the file.
```
VUE_APP_API_BASE=http://localhost:8000/api
```
This tells that all the API requests from the frontend will then be directed to the `8000` port.

6. You now should be ready to serve the project. Type in:
```
yarn serve
```
The server will be started listening at port `8080`. Open up your browser and visit `localhost:8080` to visit the portal!

## Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
