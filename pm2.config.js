module.exports = {
	apps: [
		{
			name: 'Klump Access',
			script: 'npm',
			args: 'start',
			env_production: {
				PORT: 3001,
				NODE_ENV: process.env.VUE_APP_NODE_ENV
			}
		}
	]
};
