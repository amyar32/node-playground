why?
1- tidak setiap front-end pakai html pages
    - mobile apps 
    - single page web apps
    - service apis

frontend (UI) is decoupled from the backend (server)
REST = transfer data instead of user interfaces 
data is a king rest api

API Endpoint = combination of http verb and path


1. install dependency
- express
- nodemon
- body parser
    - config bodyparser untuk menerima json 
    - app.use(bodyparser.json())

2. create route
    - include route in app.js

3. create controller
    - include controller in route
    
=> CORS ERROR
by default not allowed by browser, served in same server?
fix nya di server-side nya dengan meng set header 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
});

=> POST method tidak menerima data
- cek content-type
- bisa difront end atau backendenya

4. fetch api di front-end

5. post api di front-end
- pakai JSON.stringfy ketika akan post karena servernya menerima json

6. server-side validation

// cors setting
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  // set header ketika client memodifikasi header seperti content-type
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});