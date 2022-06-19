import * as http from 'http';
import * as querystring from 'querystring';

import * as db from './modules/db.js';

const PORT = 3000;
const server = http.createServer();

console
    .log
    // JSON.parse('{ "name": 'Test user', age: 22, hobbies: ['TEST1', 'hobbie2'] }')
    ();

server.on('request', (req, res) => {
    // const reqUrl: string | undefined = req.url;
    const reqUrl = new URL(req.url, `http://${req.headers.host}`);

    const items: any = req.url?.split('/');

    switch (true) {
        case req.method === 'POST':
            let rawData = '';

            req.on('data', (chunk) => {
                rawData += chunk.toString();
            });
            req.on('end', async () => {
                try {
                    const { username, age, hobbies } = JSON.parse(rawData);
                    console.log(username, age, hobbies);
                    if (!username || !age || !Array.isArray(hobbies)) {
                        respond(res, 400, 'html');

                        if (!username)
                            res.write(`<h3>userName is required </h3>`);
                        if (!age)
                            res.write(
                                `<h3>Age is required and must be a number </h3>`
                            );
                        if (!Array.isArray(hobbies))
                            res.write(
                                `<h3>Hobbies must be an Array or empty array</h3>`
                            );
                    } else {
                        respond(res, 201, 'html');

                        db.add({
                            id: db.id,
                            username: username,
                            age: age,
                            hobbies: hobbies,
                        });
                        res.write(
                            `<h3>${username} id №${db.id - 1} added</h3>`
                        );
                    }
                } catch (error) {
                    respond(res, 400, 'html');
                    res.write(`<h3>JSON Error</h3>`);
                }
                res.end();
            });

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
