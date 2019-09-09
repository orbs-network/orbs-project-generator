# Orbs project generator

Generates basic project. Result consists of several parts:

* contract in `src/contract/app/contract.go`
* JS interface in `src/app.js`
* Deployment script in `src/deploy_app.js`
* End to end test in `test/app_test.js`
* `package.json` with all required dependencies
* `.gitignore`

## Installation

```
npm install -g @orbs-network/orbs-project-generator
```

## Run

Plase note that app name should be camel case: `AppName`.

You can safely run the generator multiple times in the same directory to generate scaffolding for different contracts.

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
