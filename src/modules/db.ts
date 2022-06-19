import { v4 as uuidv4 } from 'uuid';
export let id = 3;

export let usersDb: {
    id: string;
    username: string;
    age: number;
    hobbies: string[];
}[] = [
    {
        id: '56baf70b-02b4-44ac-99b9-764012c61950',
        username: 'demo user one',
        age: 12,
        hobbies: ['fun', 'jokes'],
    },
    {
        id: uuidv4(),
        username: 'User two',
        age: 12,
        hobbies: ['run', 'sport'],
    },
    {
        id: uuidv4(),
        username: 'User three',
        age: 12,
        hobbies: ['gaming', 'sleep'],
    },
];
export const db = () => {
    console.log('Modules compiled');
};
export const add = (item) => {
    let user = item;
    user.id = uuidv4();
    usersDb.push(user);
};
export const update = (item) => {
    const userIndex: any = usersDb.findIndex((x) => x.id === item.id);
    console.log('PUT2');
    usersDb[userIndex] = { ...item };
};

export const find = (item) => usersDb.find((x) => x.id === item);
export const popLastItem = () => usersDb.pop();
export const remove = (userIndex) =>
    (usersDb = usersDb.filter((data) => data.id != userIndex));
