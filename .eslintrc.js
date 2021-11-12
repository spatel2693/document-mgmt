module.exports = {
	extends: ['airbnb-base', 'prettier'],
	rules: {
		camelcase: ['off', { properties: 'never' }],
		'global-require': 'off',
		'no-param-reassign': 'off',
		'no-console': 'off',
		'no-tabs': ['off', { allowIndentationTabs: true }],
		'no-use-before-define': ['error', { functions: false }],
		'no-underscore-dangle': 'off',
		'prefer-destructuring': 'off',
		'spaced-comment': 'off',
		'import/extensions': 'off',
		'prettier/prettier': 'error',
	},
};
