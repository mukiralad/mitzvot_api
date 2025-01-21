const { translateFunction } = require('../util/hebrewToEnglishFunction')

test('It should translate from Hebrew to English', async()=>{
    const hebrewText = 'שלום';
    const expected = 'peace';
    const result = await translateFunction(hebrewText, 'iw', 'en');
    console.log(`result: ${result}`);
    expect(result).toEqual(expected);
})

test('It should respond with null, if no language is provided', async()=>{
    const hebrewText = 'שלום';
    const expected = null;
    const result = await translateFunction(hebrewText, '', '');
    console.log(result)
    expect(result).toEqual(expected);
})