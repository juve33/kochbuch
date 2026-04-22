# Testing

## Logging in

´´´bash
curl -X POST http://localhost:5000/auth/login -H "Content-Type: application/json" -d "{\"username\":\"test\",\"password\":\"1234\"}" -c cookies.txt
´´´

## Doing anything else

Example 1: logging out

´´´bash
curl -X POST http://localhost:5000/auth/logout -b cookies.txt
´´´

Example 2: creating user

´´´bash
curl -X POST http://localhost:5000/user/new -H "Content-Type: application/json" -d "{\"username\":\"test\",\"password\":\"1234\"}" -b cookies.txt
´´´