node ./app.js & 
curl localhost:3000/cpu_profile & 
ab -n 1000 -c 20 http://localhost:3000/encrypt\?salt\=123\&password\=456
# ab -n 10000 -c 20 http://localhost:3000/encrypt?salt=123&password=456