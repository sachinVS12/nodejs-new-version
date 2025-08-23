import http from 'http';
import fs from 'fs/promises';
import url from 'url';
import path from 'path';

const PORT = process.env.PORT;

// Get current path
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const server = http.createServer((req, res) =>{
   try{
    //check if GET request
    if (req.method === 'GET') {
      if(req.url === '/') {
       let filepath = path.join(__dirname, 'public', 'index.html');  
    } else if (req.url === '/about'){
      filepath = path.join(__dirname, 'public', 'about.html');
    } else {
        throw new Error('Not Found');
    }
    //const data = await fs.readFile(filepath);
    res.setHeader('Content-Type', 'text/html');
    res.write(data);
    res.end();
    } else{
        throw new Error('Method not allowed');
    }
   } catch (error) {
     res.writeHead(500, {'Content-Type': 'tex/plain'});
    res.end('<h1>server Error</h1>');
   }
});


server.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});