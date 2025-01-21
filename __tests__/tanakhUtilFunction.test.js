const { getRandomSection } = require('../util/tanakhUtilFunction')

test('It should return a random line from the Tanakh', ()=>{
    const result = getRandomSection()
    expect(result).not.toBeNull();
});