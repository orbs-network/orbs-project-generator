# Orbs project generator

Generates basic project. Result consists of several parts:

* contract in `src/contract/contract.go`
* JS interface in `src/app.js`
* Deployment script in `src/deploy.js`
* End to end test in `test/app_test.js`
* `package.json` with all required dependencies

## Installation

```
npm install -g @orbs-network/orbs-project-generator
```

## Run

Plase note that app name should be camel case: `AppName`.

```
orbs-project-generator create <AppName> <path>
```

```
orbs-project-generator create Hello .
```

## Testing the project

```
npm test
```
