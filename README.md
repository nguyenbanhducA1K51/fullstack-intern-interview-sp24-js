# Spring 2024 FSE Intern Interview Assignment

To begin, please load the project's dependencies by running `npm install` or `yarn`

To start the development server, run the following command

```
npm run start
```

or

```
yarn start
```

## Submission Instructions

To submit the assignment, create a fork of this repository and commit your solutions. You may respond to the original email you received with the assignment instructions, or directly to [careers@swent-consulting.com](mailto:careers@swent-consulting.com).

## Assignment Instructions

You may use any resources you wish to assist you in completing this project, that being StackOverflow, Google, ChatGPT, etc. I will warn you in advance of using GPT-3.5 solutions as they are often erroneous and will point you in the wrong direction.

Instead, I would highly recommend using the [MDN Web Docs](https://developer.mozilla.org/en-US/). The HTML, JS, and HTTP references have all proven invaluable in many a web developer's career, so leverage them as much as you can.

## Assignment Tasks

### 1. Render Information from DB (data.json) on Client

**Task**: Emulate a connection to a database by loading the contents of `data/data.json` into the `data` array in the `server/index.js` file. Your server currently has a GET endpoint (`/api/users`) that sends back a dummy list of users. Your goal is to modify the logic of the endpoint to return the contents of the `data` array and render it on the client.

**Key Points**:

- Load the contents of the `data/data.json` file into the local `data` array.
- Implement the GET `/api/users` endpoint to return the contents of the `data` array
- Implement the client-side logic in `app.js` to fetch the data from the endpoint and load it into the table. HINT: You can get the table element from `Document` in JS by using the id "users"

### 2. Implement Form to Register with DB (JSON file)

**Task**: Implement the logic for the `/api/register` POST endpoint in your Express server. This logic should handle incoming user registration data, add it to your 'database' (in this case, add it to the `data` array and write to file), and send an appropriate response back to the client. Then, create a function to hijack the `registerForm` form submission (HINT: onSubmit) and send the data as a JSON body to your server's POST endpoint.

**Key Points**:

- Implement the POST `/api/register` endpoint to parse the request and register the user with the 'database' (first append the user to the array, then overwrite the file with the array's contents)
- Implement the logic for the form by creating a function that hijacks the form submission event and makes a POST request to the server containing the form data as JSON body.
- Send a success response back to the client upon successful registration, or an error response if there are issues with the data.

### 3. Update when DB changes

**Task**: Implement a feature in your client-side application to automatically update the displayed user data after your POST request is successfully completed.

#### Above and Beyond (completely optional)

Come up with a solution to implement real-time updates to the client when the database is updated on the server. For example, if a client checks out your front-end and then another client registers a user with the server, the server would then send a signal to the checked-out client that their data is stale and the client revalidates the data.

HINT: This would be achieved by using WebSockets which requires using the `ws` Node.js library. To work with WebSockets you must set up a WebSocket server in your `server/index.js` file, read the documentation on `ws` [here](https://github.com/websockets/ws/blob/master/doc/ws.md).
