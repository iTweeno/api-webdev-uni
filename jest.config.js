export const transformIgnorePatterns = ['node_modules/(?!(sucrase)/)'];
export const transform = {
    '^.+\\.(js|jsx|ts|tsx|mjs)$': 'babel-jest',
};