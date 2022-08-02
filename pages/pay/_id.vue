<template>
	<section class="w-screen md:min-h-screen bg-[#f8f8f8]">
		<div class="max-w-lg font-sans mx-auto px-4 rounded py-12 md:py-20">
			<div class="flex flex-col items-center justify-center">
				<klump-logo />
			</div>
			<div v-if="!showAcknowledgement">
				<div class="mt-6 md:mt-12 text-center space-y-1">
					<h1 class="text-xl md:text-2xl text-[#141414] font-semibold">
						{{ pageData.name }}
					</h1>
					<p class="uppercase text-[#787573] text-sm">By {{ pageData.merchant.business_name }}</p>
				</div>
				<p class="text-center text-sm text-black mt-6">
					{{ pageData.description }}
				</p>
				<div v-if="pageData.image" class="my-6 flex justify-center items-center">
					<img
						:src="pageData.image"
						:alt="pageData.name"
						class="w-60 h-60 object-cover object-center border-4"
					/>
				</div>
				<div class="mt-6 bg-white shadow-md px-4 sm:px-6 py-3 md:py-6">
					<div v-if="!pageData.is_fixed_amount" class="space-y-1 mt-2 mb-4">
						<label for="itemName" class="text-base">What are you paying for?</label>
						<input
							id="itemName"
							v-model="itemName"
							placeholder="Enter Item name"
							type="text"
							class="w-full py-2 bg-gray-100 border text-base md:text-lg leading-7 px-2 text-[#353535] h-[52.08px] placeholder-[#A1A1A1]"
						/>
						<span v-if="formError.itemName !== ''" class="text-xs text-red-500">{{
							formError.itemName
						}}</span>
					</div>
					<div class="space-y-1 mt-2 mb-4">
						<label for="amount" class="text-base">Amount to be charged</label>
						<input
							id="amount"
							v-model="amount"
							type="text"
							:disabled="pageData.is_fixed_amount"
							:placeholder="formatAmount"
							class="w-full py-2 bg-gray-100 border text-base md:text-lg leading-7 px-2 text-[#353535] h-[52.08px] placeholder-[#A1A1A1]"
						/>
						<span v-if="formError.amount !== ''" class="text-xs text-red-500">{{ formError.amount }}</span>
					</div>
					<div id="klump__checkout" tabindex="0" @click="pay"></div>
				</div>
			</div>
			<div v-else class="flex flex-col justify-center items-center">
				<h1 class="text-2xl font-semibold mt-6">Payment is successful</h1>
				<p class="mt-4 text-base text-gray-700">
					Thank you for making payment for
					<span class="font-medium">{{ pageData.name }}</span> by
					<span class="font-medium">{{ pageData.merchant.business_name }}.</span>
					Please
					<a href="#" onClick="window.location.reload();" class="text-blue-600">click here</a>
					if you will like to make another payment
				</p>
			</div>
		</div>
	</section>
</template>
<script>
import KlumpLogo from '@/components/KlumpLogo';
import KlumpImage from '~/assets/images/meta.png';
export default {
	name: 'PaymentPage',
	components: { KlumpLogo },
	// This gets page data on server side before page loads
	async asyncData({ params, $axios, error }) {
		try {
			$axios.setHeader('Client-Id', process.env.VUE_APP_CLIENT_ID);
			$axios.setHeader('Client-Key', process.env.VUE_APP_CLIENT_KEY);
			$axios.setHeader('Client-Secret', process.env.VUE_APP_CLIENT_SECRET);
			const data = await $axios.$get(`/payment-pages/${params.id}`);
			const pageData = data.data;
			return { pageData };
		} catch (e) {
			error({ statusCode: 404, message: 'Page not found' });
		}
	},
	data() {
		return {
			itemName: '',
			formError: {
				amount: '',
				itemName: ''
			},
			pageData: null,
			pageError: null,
			amount: '',
			reference: null,
			paymentStatus: null,
			showAcknowledgement: false
		};
	},
	// Head section for seo
	head() {
		return {
			title: `Klump Access - ${this.pageData.merchant.business_name} - ${this.pageData.name}`,
			meta: [
				{
					hid: this.pageData.name,
					name: this.pageData.name,
					content: this.pageData.description
				},
				{
					hid: 'keywords',
					name: 'keywords',
					content:
						'Klump, BNPL, Buy Now Pay Later, Buy Now, Pay Later,Pay With Klump, Pay Small Small, 4 instalments, Useklump'
				},
				{
					hid: 'og:title',
					name: 'og:title',
					content: this.pageData.name
				},
				{
					hid: 'og:description',
					name: 'og:description',
					content: this.pageData.description
				},
				{
					hid: 'og:type',
					property: 'og:type',
					content: 'article'
				},
				{
					hid: 'og:url',
					property: 'og:url',
					content: `${process.env.APP_BROWSER_URL_DOMAIN}/pay/${this.pageData.id}`
				},
				{
					hid: 'twitter:url',
					name: 'twitter:url',
					content: `${process.env.APP_BROWSER_URL_DOMAIN}/pay/${this.pageData.id}`
				},
				{
					hid: 'twitter:title',
					name: 'twitter:title',
					content: this.pageData.name
				},
				{
					hid: 'twitter:card',
					name: 'twitter:card',
					content: 'summary_large_image'
				},
				{
					hid: 'twitter:description',
					name: 'twitter:description',
					content: this.pageData.description
				},
				{
					hid: 'twitter:image',
					name: 'twitter:image',
					content: this.pageData?.image ?? KlumpImage
				},
				{
					hid: 'og:image',
					property: 'og:image',
					content: this.pageData?.image ?? KlumpImage
				}
			]
		};
	},
	computed: {
		// Format amount to show currency
		formatAmount() {
			const formatter = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'NGN'
			});
			return this.pageData.is_fixed_amount ? `${formatter.format(this.pageData.fixed_amount)}` : 'Enter Amount';
		}
	},
	methods: {
		onSuccess(data) {
			// This checks if success data contains reference and success status
			if (data?.data?.data?.status === 'successful' && data?.data?.data?.reference !== null) {
				this.reference = data?.data?.data?.data?.reference;
				this.paymentStatus = data?.data?.data?.status;
				this.showAcknowledgement = true;
			}
			return data;
		},
		onError(data) {
			return data;
		},
		onLoad(data) {
			return data;
		},
		onOpen(data) {
			return data;
		},
		onClose(data) {
			if (this.paymentStatus !== 'successful') {
				// full page reload so that the button appear
				location.reload();
			}
			return data;
		},
		pay() {
			const amount = this.pageData?.is_fixed_amount ? this.pageData.fixed_amount : this.amount;
			const title = this.pageData?.is_fixed_amount ? this.pageData.title : this.itemName;
			// This checks of title is available
			if (title === '') {
				this.formError.itemName = 'Item name is required';
				setTimeout(() => {
					this.formError = {
						amount: '',
						itemName: ''
					};
				}, 3000);
				return false;
			}
			// This checks of amount is an empty string
			if (amount === '') {
				this.formError.amount = 'Amount to charge is required';
				setTimeout(() => {
					this.formError = {
						amount: '',
						itemName: ''
					};
				}, 3000);
				return false;
			}
			// This checks of amount is a number
			if (isNaN(Number(amount))) {
				this.formError.amount = 'Amount to charge must be a number';
				setTimeout(() => {
					this.formError = {
						amount: '',
						itemName: ''
					};
				}, 3000);
				return false;
			}
			const data = {
				amount,
				currency: this.pageData.currency,
				items: [
					{
						name: title,
						unit_price: amount,
						quantity: 1
					}
				]
			};
			// eslint-disable-next-line no-new
			new Klump({
				publicKey: this.pageData.merchant.credential[0].public_key,
				data,
				onSuccess: this.onSuccess,
				onError: this.onError,
				onClose: this.onClose,
				onLoad: this.onLoad,
				onOpen: this.onOpen
			});
		}
	}
};
</script>