# COSI107a-Final-Project

## About

Client-side: ejs
Server-side: node.js, express.js
Database: sqlite3
Testing: puppeteers

Each challenge has provided an environment for users and helped them understand how the different types of XSS work in real life, which includes Reflected XSS, Stored XSS, and DOM-based XSS cases.

## Usage

To run this project, following below steps:

1. install the package
   ` npm install`

2. run the entry file with node js
   ` node index.js`

## The Challenges

### #1 DOM based XSS

The form is disabled and can not be used. User need to find a way to make it work.

### #2 Reflected XSS

The website has an input block.

### #3 Stored XSS

We know that the admin will frequently visit this website, which may leave their cookie in your session.

## The Solustions

Note: There are various possible solutions to each challenge.

### #1 DOM based XSS

```html
<input disabled type="text" name="name" id="userName" placeholder="Name" />
<button disabled type="submit"></button>
```

We can notice that the button is disabled, so the user needs to change the value of this attribute. One possible solution is to use Google Chrome and manually modify it.

When we were designing this question, we wanted to demonstrate that even the simplest part of the website can possibly become the target of a tracker. We only applied plain HTML to demonstrate this challenge.

### #2 Reflected XSS

```js
<script>alert("hello")</script>
```

User can put any string inside the alert(). Since the most common way to insert XSS JavaScript code is to use alert() to pop out the information we want from the code, we created this scenario without actually executing the malicious JavaScript code. We obtained the <script> tag with vanilla JavaScript and designed a reaction to it.

The difficulties lie in determining the best way to handle this injection. Should we actually perform an executable JS case, such as using eval() to filter out all the user input text, which lead to too much testing time. When we tried to perform the challenge in this manner, we needed to create extra checking code to ensure that the code would revert to its original state after the user inserted the <script> tag, as it would actually change our DOM structure. Therefore, instead of actually performing the dynamic injection and allowing it to interact with JS code, we used a simpler approach by using tags to sort it out and detect the <script> tag to perform this attack.

### #3 Stored XSS

1. Clicking 'Sign Up' will create a new user.

2. Log in.

3. Insert JavaScript <script>document.cookie</script> which will retrieve the admin's cookie.

4. Use any tool (e.g., EditThisCookie from Google Chrome) to modify the cookie."

We designed a session-cookie-based authorization login system so that we can customize the cookie and provide a better understanding scenario of how we use cookies to perform our challenge. We first set the cookie attribute httpOnly to false, which allows client-side scripts, such as user's JavaScript injection code. We then also set the cookie attribute sameSite to none so that cookies can be sent in all contexts. The most difficulty we encountered was stealing the admin cookie when users try to hack it. This involved using the headless Chrome API control tool Puppeteer. Our original thought was to use it to generate the admin cookie. We were successful in setting two cookies (user and admin) on our website, but we did not have enough time to: 1) update our login system to automatically update when it detects a different cookie from an incoming request; 2) we need more resources such as PhantomJS and an online server to implement the idea of 'when the user has their own cookie when they log in, the document cookie still contains the admin's cookie'.

We ended up using Puppeteer to test our web application and for potential CI/CD processes. Additionally, we used JavaScript to automatically track changes in the cookie to demonstrate the stored XSS attack.

## Future Direction

We still need to work on hiding some of our HTML code from the client side to prevent them from manually switching their URL. For example, in questions one and two, users can actually see the URL to the next question by inspecting the HTML form. Next, we need to smooth out user interaction and allow users to copy the cookie from the alert() message because currently, JavaScript does not allow selecting user interaction on the alert message. Finally, we want to improve our third question to gain better control over manipulating the cookie.