# Mini Project - Student Management

This is just a mini project using Redux Toolkit and Redux Saga.
This project is aimed to use for testing and learning only.

react-router-dom
@types/react-router-dom

Prod start:

```sh
npm start
```

CLICK LOGIN
- Call API to login
- Success --> redirect ADMIN
- FAILED --> show ERROR

LOGIN 
LOGOUT

authSaga

LOOP
- if logged in, watch LOGOUT
- else watch LOGIN


LOGIN
- call login API to get token + user info
- set token to local storage
- redirect to admin page

LOGOUT
- clear token from local storage
- redirect to login page

authSlice
authSaga

