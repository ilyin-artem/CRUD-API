import * as http from 'http';

import * as db from './modules/db.js';

const PORT = 3000;
const server = http.createServer();
db.db();

db.add({ id: db.id, username: `User ${db.id}` });
db.add({ id: db.id, username: `User ${db.id}` });
db.add({ id: db.id, username: `User ${db.id}` });
db.add({ id: db.id, username: `User ${db.id}` });

// db.usersDb.push(user4);

server.on('request', (req, res) => {
    const reqUrl: string | undefined = req.url;
    const items: any = req.url?.split('/');

    switch (true) {
        case reqUrl === '/api/users' && req.method === 'GET':
            respond(res, 200, 'json');
            res.end(JSON.stringify(db.usersDb));
            break;

        case `/${items[1]}/${items[2]}/` === '/api/users/' &&
            items.length === 4:
            const userIndex: number = Number(items[3]);

            if (!checkUserID(res, items[3])) break;

            if (req.method === 'GET') {
                respond(res, 200, 'json');
                res.end(JSON.stringify(db.usersDb[userIndex]));
            }
            if (req.method === 'POST') {
                respond(res, 201, 'json');

                //todo POST
                res.end();
            }
            if (req.method === 'PUT') {
                respond(res, 201, 'json');

                //todo PUT
                res.end();
            }
            if (req.method === 'DELETE') {
                //todo
                respond(res, 204, 'json');
                db.remove(userIndex);

                console.log(JSON.stringify(db.usersDb));
                res.end(JSON.stringify(db.usersDb));

                // res.end();
            }

        default:
            res.statusCode = 404;
            res.end();
            break;
    }
});

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

const checkUserID: any = (res: any, userID: any) => {
    const userIndex: number = Number(userID);
    if (userID === '' || isNaN(Number(userID))) {
        respond(res, 400, 'html');
        res.write(`<h3>Invalid user ID </h3>`);
        res.end();
        return false;
    }
    if (userIndex >= db.usersDb.length) {
        respond(res, 404, 'html');
        res.write(`<h3>User ${userIndex} doesn't exist</h3>`);
        res.end();
        return false;
    }
    return true;
};

const respond = (res: any, statusCode: number, type: string) => {
    res.statusCode = statusCode;
    switch (type) {
        case 'json':
            res.setHeader('Content-Type', 'application/json');
            break;
        case 'html' || 'text':
            res.setHeader('Content-Type', 'text/html');
            break;
    }
};
