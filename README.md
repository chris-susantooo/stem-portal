# STEM Portal Frontend
An interactive online platform which focuses on STEM education, powered by [Vue](https://vuejs.org).

Demo here: https://sca1998.github.io/stem-portal/
## Demo Limitations
New account registrations may be rejected since only 5 user accounts may exist in the current build. Here are some accounts for logging in to try out the restricted features:
- Teacher account

 Username: `teacher1`, Password: `TeacherDemo1`
- Student account

 Username: `student1`, Password: `StudentDemo1`
- Parent account

 Username: `parent1`, Password: `ParentDemo1`
 
If you wish to create your instance of STEM Portal, which overcomes these limitations, see [Installation](https://github.com/sca1998/stem-portal/blob/master/README.md/#installation).
## Installation
1. Clone this repository to your computer. If you are using [Visual Studio Code](https://code.visualstudio.com/download), press `Ctrl+Shift+P` for Windows or `Command+Shift+P` for MacOS to open the Command Palette.
2. Type in `Git: clone` and press enter, then copy and paste in this repo's url, and choose a local folder of your choice.
3. If you haven't install [Yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable), please download Yarn (version 1.X) instead of version 2.X.
4. After downloading Yarn, open a Terminal by pressing `Ctrl+~` or `Ctrl+~` for MacOS, navigate to your local folder and type:
```
yarn install
```
This will install the neccesary dependencies and modules into the root folder so that you can run the project.
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
