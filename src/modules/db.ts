export let id = 3;
export let usersDb = [
    {
        id: 0,
        username: 'user one',
    },
    {
        id: 1,
        username: 'User two',
    },
    {
        id: 2,
        username: 'User three',
    },
];
export const db = () => {
    console.log('Modules compiled');
};
export const add = (item) => {
    usersDb.push(item);
    id++;
};

export const contains = (item) => usersDb.includes(item);
export const popLastItem = () => usersDb.pop();
export const remove = (userIndex) =>
    (usersDb = usersDb.filter((data) => data.id != userIndex));
