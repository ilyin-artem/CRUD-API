import { v4 as uuidv4 } from 'uuid';
export let id = 3;

export let usersDb: {
    id: string;
    username: string;
    age: number;
    hobbies: string[];
}[] = [];
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
