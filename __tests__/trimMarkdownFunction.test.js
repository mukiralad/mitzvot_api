const { trimMarkdown } = require('../util/trimMarkdownFunction');

test('should parse JSON from markdown string', () => {
    const markdown = '```json\n{"key": "value"}\n```';
    const expected = { key: 'value' };
    const result = trimMarkdown(markdown);
    expect(result).toEqual(expected);
});

test('should parse JSON from markdown string without json keyword', () => {
    const markdown = '```\n{"key": "value"}\n```';
    const expected = { key: 'value' };
    const result = trimMarkdown(markdown);
    expect(result).toEqual(expected);
});

test('should trim whitespace around JSON string', () => {
    const markdown = '```json\n  {"key": "value"}  \n```';
    const expected = { key: 'value' };
    const result = trimMarkdown(markdown);
    expect(result).toEqual(expected);
});

test('should throw error for invalid JSON', () => {
    const markdown = '```json\n{key: "value"}\n```';
    expect(() => trimMarkdown(markdown)).toThrow(SyntaxError);
});