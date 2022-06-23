# WORK IN PROGRESS

## AUTH service

- Get CurrentUser

```bash
GET /api/auth/me
```


- Login
```bash
POST -d {"username": "test@test.com", "password": "123456"} /api/auth/login
```

- Signup

```bash
POST -d {"username": "test@test.com", "password": "123456"} /api/auth/signup
```

- Logout

```bash
GET /api/auth/logout
```