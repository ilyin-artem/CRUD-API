import * as http from 'http';

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
    const reqUrl: string | undefined = req.url;
    const items: any = req.url?.split('/');

    switch (true) {
        case reqUrl === '/api/users':
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(users));
            break;

        case `/${items[1]}/${items[2]}/` === '/api/users/' &&
            items.length === 4:
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');

            const userIndex: number = Number(items[3]);
            //todo error
            if (userIndex >= users.length) console.log('error');

            res.end(JSON.stringify(users[userIndex]));

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

//     if (items[1] === 'users') {
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         if (items.length === 3) {
//             const userIndex: number = Number(items[2]);
//             res.end(JSON.stringify(users[userIndex]));
//         } else {
//             res.end(JSON.stringify(users));
//         }
//     } else if (items[1] === '/messages') {
//         res.setHeader('Content-Type', 'text/html');
//         res.write('<html>');
//         res.write('<body>');
//         res.write('<ul>');
//         res.write('<li>test</li>');
//         res.write('<li>test2</li>');
//         res.write('</ul>');
//         res.write('</body>');
//         res.write('</html>');
//         res.end();
//     } else {
//         res.statusCode = 404;
//         res.end();
//     }
