# Sword health backend challenge

This project is a proposed solution to the Sword Health backend challenge. The full challenge description can be found [here](#full-challenge-description).

## This is the status of the current solution

### About Features

- Create API endpoint to save a new task ✅
- Create API endpoint to list tasks ✅
- Notify manager of each task performed by the tech ✅
- This notification should not block any http request ✅

### About Tech Requirements

- Use any language to develop this HTTP API ✅
- Create a local development environment using dockercontaining this service and a MySQL database ✅
- Use MySQL database to persist data from the application ✅
- Features should have unit tests to ensure they are working properly 🔨

### About Bonus

- Use a message broker to decouple notification logic from the application flow 🗓
- Create Kubernetes object files needed to deploy this application 🗓

---

### Running the containerized app

```
npm run docker:start
```

Seeding the database:

```
npm run docker:migrate
```

### Running the application locally

It's possible to run the main app locally, although an instance of MySQL must be provided as the database for the project. The database URL should then be specified in the `.env.local` file.

```
cd app && dotenv -e ./app/.env.local npm run start
```

If you wish to seed a database with some random data run the following command:

```
cd app && dotenv -e ./app/.env.local npm run migrate:dev
```

- this command assumes you're in the project root directory, if you are already inside the `app` folder please ignore the first part of the command and use this only:
  > `dotenv -e ./app/.env.local npm run migrate:dev`

**About the seeded data**:

The sedded data consists in a small set of 12 taks randomly distributed between users.

Regarding the seeded users:

- all of them are seeded with the DEFAULT_PASSWORD specified in the env file used to run the commands.

- two of the users are not completelly random for test proposes:
  - User with email `manager@sword.com` with the role of `manager`.
  - User with email `tech@sword.com` with the role of `technician`.

### Notes

In the root level of the project there's a file `Insomnia_API_calls.json` that provides the entire collection of api calls exposed by the app that can be imported into Insomnia app

---

---

## Full challenge description

### Requirements

You are developing a software to account for maintenancetasks performed during a working day. This applicationhas two types of users (Manager, Technician).

The technician performs tasks and is only able tosee, create or update his own performed tasks.
The manager can see tasks from all the technicians,delete them, and should be notified when some techperformsa task.

A task has a summary (max: 2500 characters) and adate when it was performed, the summary from the taskcancontain personal information.

#### Notes

- If you don’t have enough time to complete the testyou should prioritize complete features ( with tests) over many features.
- We’ll evaluate security, quality and readability ofyour code
- This test is suitable for all levels of developers,so make sure to prove yours

### Development

#### Features

- Create API endpoint to save a new task
- Create API endpoint to list tasks
- Notify manager of each task performed by the tech(This notification can be just a print saying “The tech X performed the task Y on date Z”)
- This notification should not block any http request

#### Tech Requirements

- Use any language to develop this HTTP API (we useGo, Node and PHP)
- Create a local development environment using docker containing this service and a MySQL database
- Use MySQL database to persist data from the application
- Features should have unit tests to ensure they are working properly

#### Bonus

- Use a message broker to decouple notification logic from the application flow
- Create Kubernetes object files needed to deploy thisapplication
