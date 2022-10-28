# DevFest Adm

- Node: `v18.12.0`
- npm: `v8.19.2`

## Install dependencies

- Run `npm ci`

## Generate keys.ts file

- Run `npm run keys:create`
- A file name `keys.ts` will be generated under `src/environments/`. You need to pass there the `Firebase keys`. For the development project, you can locate them [here](https://console.firebase.google.com/u/0/project/devfest2022dev/settings/general/web:MjhmMmFhMzEtOWQ3MS00YTg5LWE0MTYtMGZkN2IyZTk4ODcy)
- Note that you must not commit the generated file (it's ignored by default in the .gitignore file)

## Run the project in dev mode with JIT compilation

- Run `npm start`

## Generate dist bundles

- Run `npm run build`

## Deploy project

- Run `npm run firebase:deploy`
