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
    // const reqUrl: string | undefined = req.url;
    const reqUrl = new URL(req.url, `http://${req.headers.host}`);
    console.log(req.url);
    console.log(reqUrl.pathname);
    console.log(reqUrl.search);
    console.log(reqUrl.searchParams);
    console.log(reqUrl.searchParams.get('username'));
    const items: any = req.url?.split('/');

    switch (true) {
        case req.method === 'POST':
            const userName = reqUrl.searchParams.get('username');
            // const body = [];
            respond(res, 201, 'html');
            // req.on('data', (data) => {
            //     body.push(Buffer.from(data));
            // });
            // req.on('end', () => {
            //     console.log(body);
            // });

            db.add({
                id: db.id,
                username: userName,
            });
            res.write(`<h3>${userName} id №${db.id - 1} added</h3>`);
            res.end();
            break;
        case reqUrl.pathname === '/api/users' && req.method === 'GET':
            respond(res, 200, 'json');
            res.end(JSON.stringify(db.usersDb));
            break;

        case `/${items[1]}/${items[2]}` === '/api/users' && items.length === 4:
            const userIndex: number = Number(items[3]);

            if (!checkUserID(res, items[3])) break;

            if (req.method === 'GET') {
                respond(res, 200, 'json');
                res.end(JSON.stringify(db.usersDb[userIndex]));
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
