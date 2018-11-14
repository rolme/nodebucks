# Nodebucks Web
> The difference is measurable
---

Nodebucks Web is a web React/Redux front end.
- Node 11.0
- NPM 6.4
- Yarn 1.12

---
## Requirements
This section assumes you have MacOS. If not, replicate steps appropriate for your OS.

### Install required pacakges
```
$ brew install node n yarn
```

### Update your node version
```
$ n 11.0.0
```

## Setup
__Initialize Project__

Clone the project if you have not yet
```
$ git clone git@github.com:rolme/nodebucks.git
$ cd nodebucks
```

__Enviroment Setup__
Prior to running, you will need to setup your local environment variable(s)
```
# Make a copy of .env.default
~/nodebucks $ cp .env.default .env
```

After cloning the project and cd'ing into the directory.
```
~/nodebucks $ yarn install
```

__Start Project__
```
~/nodebucks $ yarn start
```

If you want to use a local instance of Nodebucks-API
```
# edit .env.local and replace the value to your local instance
REACT_APP_NODEBUCKS_API=https://localhost:8081
```

The application should automatically start or you can visit it here:
Visit: [https://localhost:8081](https://localhost:8081)

## Running the tests
And run the following command:
```
~/nodebucks $ npm run test
```
