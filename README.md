# Node Bucks
> Master of your own nodes.
---

Node Bucks is a web application with a Rails API only backend and React/Redux front end.
- Ruby 2.5.1
- Node 10.2.1
- Rails 5.2
- PostgreSQL 10.1

---
## Requirements
This section assumes you have MacOS. If not, replicate steps appropriate for your OS.

### Install required packages
```
$ brew tap homebrew/cask
$ brew install rbenv ruby-build node postgresql watchman
$ brew cask install chromedriver
```

### Update your ruby version
```
$ rbenv build 2.5.1
```
### Start required services
```
$ brew services start postgresql
```

## Setup
__Initialize Project__

Clone the project if you have not yet
```
$ cd ~/code
~/code $ git clone git@github.com:rolme/nodebucks.git
~/code $ cd nodebucks
```

After cloning the project and cd'ing into the directory.
```
~/code/nodebucks $ bundle
~/code/nodebucks $ rails db:reload
~/code/nodebucks/client $ yarn install
~/code/nodebucks/client $ cd ..
```

__Start Project__

```
~/project/nodebucks $ rake start
```
The application should automatically start or you can visit it here:
Visit: [https://localhost:3000](https://localhost:3000)

## Running the tests
To run the tests you need to enter to the ___client___ folder:
```
$ cd client
```
And run the following command:
```
$ npm run test
```


## Installing chromedriver on Windows

1. [Download chromedriver_win32.zip](http://chromedriver.chromium.org/downloads)
2. Create a folder and move there **chromedriver.exe** file from downloaded .zip
3. In order to put ChromeDriver location in your PATH environment variable do as follows:
    
    **Right click computer > properties > system properties > Advanced > System properties > select Path below > edit > add the path of the folder, where you put chromedriver.exe**
