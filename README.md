# COSI107a-Final-Project
# COSI107a-Final-Project

## About

## Usage

Each challenge has provided an environment for users and helped them understand how the different types of XSS work in real life, which includes Reflected XSS, Stored XSS, and DOM-based XSS cases.

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
