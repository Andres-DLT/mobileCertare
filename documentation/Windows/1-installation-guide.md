# Web App Marketplace

## 🔧 Prerequisites

### Create Accounts

![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white) [Github](http://github.com)  
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black) [Firebase](http://firebase.google.com)  
![ChatGPT](https://img.shields.io/badge/ChatGPT-00A67E?style=for-the-badge&logo=openai&logoColor=white) [ChatGPT](http://chatgpt.com)  
![Canva](https://img.shields.io/badge/Canva-00C4CC?style=for-the-badge&logo=canva&logoColor=white) [Canva](www.canva.com)  
![Discord](https://img.shields.io/badge/Discord) [Discord](https://discord.com/download)  

### Download Tools

![Visual Studio](https://img.shields.io/badge/Visual_Studio-5C2D91?style=for-the-badge&logo=visual-studio&logoColor=white) [Visual Studio Code](https://code.visualstudio.com/Download)  
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) [NodeJS + NPM](https://nodejs.org/en)  
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white) [Git](https://git-scm.com/downloads)  


## Angular Setting Up

### Verify Package Manager

```sh
# Verifies the Node JS and NPM versions
node -v
npm -v
```

## Module Installation

### Angular CLI

```sh
# Install Angular CLI and verify its version
npm install -g @angular/cli 
ng version
```

### If error

#### Angular CLI

```sh
# Install Angular with high compatibility and verify its version
npm install -g @angular/cli --legacy-peer-deps
ng version
``` 


### For Registry errors


```sh
# Set the registry for NPM package repository 
# To the recommended repo by NPM Organization 
npm config set registry https://registry.npmjs.org/
npm config get registry
```
