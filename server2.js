import { createServer} from 'http';
const PORT = process.env.PORT;

const users = [
    {id: 1, name: 'sachin'},
    {id: 2, name: 'sujan'},
    {id: 3, name: 'mohan'},
    {id: 4, name: 'samith'},
    {id: 5, name: 'prashanth'}
];

//Logger middleware
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
};

//JSON middleware
const jsonMiddleware = (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
};

//Route handler for GET /api/users
const getUserHandler = (req, res) =>{
    res.write(JSON.stringify(users));
    res.end();
};

//Route handler for GET /api/users/:id
const getUserByIdHandler = (req, res) => {
    const iud = req.url.split('/')[3];
    const user = users.find((user) => user.if === parseInt(id));

    if (user) {
        res.write(JSON.stringify(user));
    } else {
        res.statusCode = 404;
        res.write(JSON.stringify({ message: 'User not found'}));
    }
    res.end();
}


// Route handler for POST /api/users
const createUserHnadler = (req, res) => {
  let body ='';
  // liste for data
  req.on('data', (chunk)=>{
    body += chunk.toString();
  }); 
  req.on('end', ()=>{
    const newUser = JSON.parse(body);
    users.push(newUser);
    res.statusCode = 201;
    res.write(JSON.stringify(newUser));
  })  
}

//not found handler
const notFoundhandler = (req, res) => {
  res.statusCode = 404;
  res.write(JSON.stringify({ message: 'Route not found'}));
  res.end();
}

const server = createServer((req, res) =>{
    logger(req, res, () => {
   if(req.url ==='/api/users' && req.method === 'GET'){
     getUserHandler(req, res);
   } else if( req.url.match(/\/api\/users\/([0-9]+)/) && req.method === 'GET'){
    getUserByIdHandler(req, res);  
} else{
    notFoundhandler(req, res);
}
});
});

server.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});