module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    reporters: [
        'default',
        [
            'jest-allure',
            {
                resultsDir: 'allure-results',
            },
        ],
    ],
};
