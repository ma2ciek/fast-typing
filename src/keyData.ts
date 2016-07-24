export const keyboard = [
    ['TAB', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],
    ['CAPSLOCK', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'ENTER'],
    ['SHIFT', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'SHIFT'],
    ['FN', 'CTRL', 'SYS', 'ALT', 'SPACE', 'ALT_GR', 'CTRL', 'UP', 'DOWN'],
];

interface IDict<T> {
    [x: string]: T;
}

export const specialKeys: IDict<{ width: number, charCode: number }> = {
    "'": { charCode: 222, width: 1 },
    ',': { charCode: 188, width: 1 },
    '.': { charCode: 190, width: 1 },
    '/': { charCode: 191, width: 1 },
    ';': { charCode: 186, width: 1 },
    'ALT': { charCode: 18, width: 1.5 },
    'ALT_GR': { charCode: 225, width: 2 },
    'CAPSLOCK': { charCode: 20, width: 3.4 },
    'CTRL': { charCode: 17, width: 1.5 },
    'DELETE': { charCode: 46, width: 1 },
    'ENTER': { charCode: 13, width: 3 },
    'FN': { charCode: 0, width: 1 },
    'SHIFT': { charCode: 16, width: 3.9 },
    'SPACE': { charCode: 32, width: 6 },
    'SYS': { charCode: 91, width: 1.5 },
    'TAB': { charCode: 9, width: 3 },
    '[': { charCode: 219, width: 1 },
    '\\': { charCode: 220, width: 2 },
    ']': { charCode: 221, width: 1 },
    'UP': { charCode: 33, width: 1 },
    'DOWN': { charCode: 34, width: 1 },
};
