<template>
	<section class="md:h-screen w-screen md:min-h-screen bg-[#f8f8f8]">
		<div class="max-w-lg font-sans mx-auto px-4 rounded py-12 md:py-20">
			<div class="flex flex-col items-center justify-center">
				<klump-logo />
			</div>
			<div v-if="!showAcknowledgement">
				<div class="mt-6 md:mt-12 text-center space-y-1">
					<h1 class="text-xl md:text-2xl text-[#141414] font-semibold">
						{{ pageData.name }}
					</h1>
					<p class="uppercase text-[#787573] text-sm">
						By {{ pageData.merchant.business_name }}
					</p>
				</div>
				<p class="text-center text-sm text-black mt-6">
					{{ pageData.description }}
				</p>
				<div class="mt-6 bg-white shadow-md px-4 sm:px-6 py-3 md:py-6">
					<label for="amount" class="text-base">Amount to be charged</label>
					<div class="space-y-1 mt-2 mb-4">
						<input
							v-model="amount"
							type="text"
							id="amount"
							:disabled="pageData.is_fixed_amount"
							:placeholder="formatAmount"
							class="w-full py-2 bg-gray-100 border text-base md:text-lg leading-7 px-2 text-[#353535] h-[52.08px] placeholder-[#A1A1A1]"
						/>
						<span v-if="formError !== ''" class="text-xs text-red-500">{{
							formError
						}}</span>
					</div>
					<div id="klump__checkout" tabindex="0" @click="pay"></div>
				</div>
			</div>
			<div v-else class="flex flex-col justify-center items-center">
				<h1 class="text-2xl font-semibold mt-6">Payment is successful</h1>
				<p class="mt-4 text-base text-gray-700">
					Thank you for making payment for
					<span class="font-medium">{{ pageData.name }}</span> by
					<span class="font-medium"
						>{{ pageData.merchant.business_name }}.</span
					>
					Please
					<a href="#" onClick="window.location.reload();" class="text-blue-600"
						>click here</a
					>
					if you will like to make another payment
				</p>
			</div>
		</div>
	</section>
</template>

<script>
import KlumpLogo from '@/components/KlumpLogo'
export default {
	name: 'PaymentPage',
	components: { KlumpLogo },

	//Head section for seo
	head() {
		return {
			title: `Klump Access | ${this.pageData.merchant.business_name}`,
			meta: [
				{
					hid: this.pageData.name,
					name: this.pageData.name,
					content: this.pageData.description,
				},
			],
		}
	},
	data() {
		return {
			formError: '',
			pageData: null,
			amount: '',
			reference: null,
			paymentStatus: null,
			showAcknowledgement: false,
		}
	},
	computed: {
		//Format amount to show currency
		formatAmount() {
			let formatter = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'NGN',
			})
			return this.pageData.is_fixed_amount
				? `${formatter.format(this.pageData.fixed_amount)}`
				: 'Enter Amount'
		},
	},

	//This gets page data on server side before page loads
	async asyncData({ params, $axios }) {
		try {
			$axios.setHeader('Client-Id', process.env.APP_CLIENT_ID)
			$axios.setHeader('Client-Key', process.env.APP_CLIENT_KEY)
			$axios.setHeader('Client-Secret', process.env.APP_CLIENT_SECRET)
			const data = await $axios.$get(`/payment-pages/${params.id}`)
			const pageData = data.data
			return { pageData }
		} catch (error) {
			//do nothing
		}
	},
	methods: {
		onSuccess(data) {
			//This checks if success data contains reference and success status
			if (
				data?.data?.data?.status === 'successful' &&
				data?.data?.data?.reference !== null
			) {
				this.reference = data?.data?.data?.data?.reference
				this.paymentStatus = data?.data?.data?.status
				this.showAcknowledgement = true
			}
			console.log(data)
			return data
		},
		onError(data){
			return data
		},
		onLoad(data){
			return data
		},
		onOpen(data){
			return data
		},
		onClose(data){
			if (this.paymentStatus !== 'successful') {
				// full page reload so that the button appear
				location.reload()
			}
			return data
		},

		pay() {
			const amount = this.pageData?.is_fixed_amount
				? this.pageData.fixed_amount
				: this.amount

			//This checks of amount is an empty string
			if (amount === '') {
				this.formError = 'Amount to charge is required'
				setTimeout(() => {
					this.formError = ''
				}, 3000)
				return false
			}

			//This checks of amount is a number
			if (isNaN(Number(amount))) {
				this.formError = 'Amount to charge must be a number'
				setTimeout(() => {
					this.formError = ''
				}, 3000)
				return false
			}
			const data = {
				amount,
				currency: 'NGN',
				items: [
					{
						name: this.pageData.name,
						unit_price: amount,
						quantity: 1,
					},
				],
			}

			new Klump({
				publicKey: this.pageData.merchant.credential[0].public_key,
				data,
				onSuccess: this.onSuccess,
				onError: this.onError,
				onClose: this.onClose,
				onLoad: this.onLoad,
				onOpen: this.onOpen,
			})
		},
	},
}
</script>
