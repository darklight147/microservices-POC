# WORK IN PROGRESS

## AUTH service [![CI for Auth Service](https://github.com/darklight147/microservices-POC/actions/workflows/auth-ci.yml/badge.svg)](https://github.com/darklight147/microservices-POC/actions/workflows/auth-ci.yml)

- Get CurrentUser

```bash
curl -X GET /api/auth/me
```

- Login

```bash
curl -X POST -d {"username": "test@test.com", "password": "123456"} /api/auth/login
```

- Signup

```bash
curl -X POST -d {"username": "test@test.com", "password": "123456"} /api/auth/signup
```

- Logout

```bash
curl -X GET /api/auth/logout
```

## Expiration Service [![CI for Expiration Service](https://github.com/darklight147/microservices-POC/actions/workflows/expiration-ci.yml/badge.svg)](https://github.com/darklight147/microservices-POC/actions/workflows/expiration-ci.yml)

this service handles the time tracking and expiration of certain entities and objects, You can send an event to this service to expire an object after a certain amount of time.

Eg:

- expire a user's account after 24 hours
- expire a biding listing or an order after 30 minutes
- unban a user after a certain amount of time

Any event that you want to receive in X amount of time really

### dependencies

- Redis
- bull.js
- RabbitMQ
