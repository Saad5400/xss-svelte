# XSS Svelte

This is a simple Svelte app that demonstrates how XSS may occur in a Svelte app. And how we can prevent it!

# Installation

1. Clone the repository.

```bash
git clone https://github.com/Saad5400/xss-svelte
```

2. Open the project directory.
3. Copy .env.example to .env and fill in the required values. (Postgres database connection string)
4. Install the dependencies.

```bash
npm install
```

4. Run the project.

```bash
npm run dev
```

# How XSS occurs?

XSS occurs when a user input is not sanitized and is directly rendered to the DOM. This allows the user to inject
malicious scripts that can steal user data or perform other malicious activities.

For example, consider the following comment:

```html
<script>
	alert('Hello, I am an alert!');
</script>
```

If this comment is rendered directly to the DOM, the script will be executed on the client's browser.

# Why is it dangerous?

XSS is dangerous because it allows an attacker to inject malicious scripts that can steal user data, perform actions on
behalf of the user, or even mine cryptocurrencies using the user's machine!

# How to prevent XSS?

## 1. Sanitize user input

The best way to prevent XSS is to sanitize user input. This means parsing the input and removing any potentially harmful
html tags or scripts.

Sanitizing can be done before rendering the input to the DOM. There are many libraries that can help with this, such as
`DOMPurify`, `sanitize-html`, etc.

## 2. Not rendering user input as HTML

In most cases, user input should not be rendered as HTML. Instead, it should be rendered as text.

This way, even if the
user input contains malicious scripts, they will be rendered as text and not executed.

Which is the better choice in this particular case as user comments might contain scripts that are meant to be
displayed.

# XSS in Popular Frontend Frameworks

This section demonstrates how XSS vulnerabilities may occur in popular frontend frameworks and how to prevent them. Each example shows an improper and proper way of handling user input.

## Comparison Table: Proper vs Improper Rendering

| Framework        | Improper Rendering (Vulnerable to XSS)         | Proper Rendering (Safe) |
|-----------------|-----------------------------------------------|-------------------------|
| **Svelte**      | `{@html userInput}`                            | `{userInput}` |
| **React**       | `<div dangerouslySetInnerHTML={{ __html: userInput }} />` | `<div>{userInput}</div>` |
| **Vue.js**      | `<div v-html="userInput"></div>`               | `<div>{{ userInput }}</div>` |
| **Angular**     | `<div [innerHTML]="userInput"></div>`          | `<div>{{ userInput }}</div>` |
| **SolidJS**     | `<div innerHTML={userInput}></div>`            | `<div>{userInput}</div>` |
| **Express.js**  | `res.send(userInput)`                          | `res.send(escape(userInput))` |
| **Fastify**     | `reply.send(userInput)`                        | `reply.send(escape(userInput))` |
| **NestJS**      | `res.send(userInput)`                          | `res.send(escape(userInput))` or use a validation pipe |
| **Django**      | `return HttpResponse(user_input)`              | `return HttpResponse(escape(user_input))` or use Django templates (auto-escapes) |
| **Flask**       | `return user_input`                            | `return escape(user_input)` or use Jinja templates (auto-escapes) |
| **Laravel Blade** | `{!! $userInput !!}`                          | `{{ $userInput }}` (Blade auto-escapes output) |
| **ASP.NET Razor** | `@Html.Raw(userInput)`                       | `@userInput` (Razor auto-escapes output) |
| **Spring Boot (Thymeleaf)** | `th:utext="${userInput}"`           | `th:text="${userInput}"` (Thymeleaf auto-escapes output) |

### General XSS Prevention in JavaScript
To safely render user input in cases where HTML is necessary, use sanitization libraries like `DOMPurify`:

```js
import DOMPurify from 'dompurify';

const safeInput = DOMPurify.sanitize(userInput);
```

# Credits

This project is aimed for the course Introduction to CyberSecurity at the Umm Al-Qura University.

Developed by Saad Batwa - 444004616.
