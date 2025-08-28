# Acme Bank — Login Page (Frontend)

A minimal, responsive, accessible login page for a banking application. Built with plain HTML, CSS, and JavaScript.

## Quick start

```bash
# Serve the folder (choose one)
python3 -m http.server 8080 --directory .
# or
npx serve -p 8080 .
```

Open `http://localhost:8080/index.html`.

## Features

- Semantic structure with `header`, `main`, `section`, `footer`
- Accessible labels, `aria-*` attributes, proper status regions
- Client-side validation (required fields, 8+ char password)
- Password show/hide toggle, remember me
- Loading state with spinner; mock success/failure
- Responsive styling, light/dark modes via `prefers-color-scheme`

## Mock credentials

- Username: `demo`
- Password: `password123`

These trigger a mocked successful sign-in and redirect to `#/dashboard`.

## Security notes

- Never log credentials. This demo does not send data to a server.
- In production, always:
  - Use HTTPS and HSTS
  - Implement CSRF/XSRF protections for state-changing requests
  - Rate-limit and add brute-force protections
  - Use secure cookies, `SameSite=Strict`, and `HttpOnly` for session tokens
  - Do not persist raw passwords; use proper authentication flows (OIDC/OAuth2)
  - Add Content Security Policy, security headers, and input sanitization

## Customize

- Update brand assets in `assets/`
- Adjust colors in `styles.css` root variables
- Replace mock submit in `script.js` with a real API call

## License

MIT
