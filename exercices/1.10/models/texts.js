const path = require('node:path');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '../data/texts.json');

const defaultTexts = [
    {
        id: 1,
        content: 'je m appelle arnaud',
        level: 'easy'
    },
    {
        id: 2,
        content: 'je m appelle arnaud et mon nom de famille est Flisch',
        level: 'medium'
    },
];



function readAllTexts(orderBy){
    const order = orderBy;
    const texts = parse(jsonDbPath, defaultTexts);
    let orderByLevel;
    if(order){
        orderByLevel = [...texts].filter(text => 
            text.level === order
       );
    }
    const allTextsPotentiallyOrderd = orderByLevel ?? texts;
    return allTextsPotentiallyOrderd;
}

function readOneText(id) {
    const idNumber = parseInt(id, 10);
    const texts = parse(jsonDbPath, defaultTexts);
    const indexOfTextFound = texts.findIndex((text) => text.id === idNumber);
    if (indexOfTextFound < 0) return undefined;
  
    return texts[indexOfTextFound];
}

function createOneText(content, level) {
    const texts = parse(jsonDbPath, defaultTexts);

    const createdText = {
        id: getNextId(),
        content,
        level,
    }

    texts.push(createdText);
    serialize(jsonDbPath, texts);

    return createdText;
}

function getNextId() {
    const texts = parse(jsonDbPath, defaultTexts);
    const lastItemIndex = texts?.length !== 0 ? texts.length - 1 : undefined;
    if (lastItemIndex === undefined) return 1;
    const lastId = texts[lastItemIndex]?.id;
    const nextId = lastId + 1;
    return nextId;
}

function deleteOneText(id) {
    const idNumber = parseInt(id, 10);
    const texts = parse(jsonDbPath, defaultTexts);
    const indexOfTextFound = texts.findIndex((text) => text.id === idNumber);
    if (indexOfTextFound < 0) return undefined;
    const deletedTexts = texts.splice(indexOfTextFound, 1);
    const deletedText = deletedTexts[0];
    serialize(jsonDbPath, texts);

    return deletedText;
}

function updateOneText(id, propertiesToUpdate) {
    const idNumber = parseInt(id, 10);
    const texts = parse(jsonDbPath, defaultTexts);
    const foundIndex = texts.findIndex((text) => text.id === idNumber);
    if (foundIndex < 0) return undefined;
  
    const updatedText = { ...texts[foundIndex], ...propertiesToUpdate };
  
    texts[foundIndex] = updatedText;
  
    serialize(jsonDbPath, texts);
  
    return updatedText;
}

module.exports = {
    readAllTexts,
    readOneText,
    createOneText,
    deleteOneText,
    updateOneText
};