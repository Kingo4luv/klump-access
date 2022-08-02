<template>
	<div class="h-screen w-full flex flex-col justify-center items-center space-y-4">
		<h1 class="text-7xl font-bold text-blue-800 tracking-wider">Oops!</h1>
		<h3 class="text-3xl font-semibold uppercase">404 - Page not found</h3>
		<p class="max-w-2xl text-center text-base text-gray-600">
			The page you are looking might have been removed or have it name changed. Kindly confirm with the merchant
			to get a valid link
		</p>
	</div>
</template>

<script>
export default {
	layout: 'error',
	// eslint-disable-next-line vue/require-prop-types
	props: ['error'],
	head() {
		return {
			title: 'Klump Access - 404 - Page not found',
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: 'The page you are looking might have been removed or have it name changed. Kindly confirm with the merchant to get a valid link'
				}
			]
		};
	}
};
</script>
