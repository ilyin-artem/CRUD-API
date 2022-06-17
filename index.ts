import * as http from 'http';
import * as url from 'url';
const PORT = 3000;
const server = http.createServer();

const users = [
    {
        id: 0,
        name: 'user one',
    },
    {
        id: 1,
        name: 'User two',
    },
    {
        id: 2,
        name: 'User three',
    },
];

server.on('request', (req, res) => {
    const reqUrl = req.url;
    const items: any = req.url?.split('/');
    // /users/2 => ['', 'user', '2']

    console.log(reqUrl);

    switch (true) {
        case reqUrl === '/api/users':
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(users));

            break;

        default:
            res.statusCode = 404;
            res.end();
            break;
    }
});

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
