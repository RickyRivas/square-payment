<script lang="ts">
	// Components
	import SubNav from '$lib/components/SubNav.svelte';
	let pageTitle = 'Checkout';

	// styles
	import '$styles/checkout/main.css';
	import { onMount } from 'svelte';

	// CREDENTIALS
	export let data;
	const { SQUARE_APPLICATION_ID, LOCATION_ID } = data;

	// User Data
	let given_name: string | undefined;
	let family_name: string | undefined;
	let company_name: string | undefined;
	let email_address: string | undefined;
	let phone_number: string | undefined;
	let address = {
		addressLine1: '',
		administrativeDistrictLevel1: '',
		administrativeDistrictLevel2: '',
		postalCode: '',
		country: 'US'
	};
	let receipt_url: string | undefined;

	async function handlePaymentMethodSubmission(paymentMethod) {
		showModal = true;
		loading = true;

		/*                          STEP 1. TOKENIZE                                             */
		let token: any;
		try {
			console.log('Tokenizing.');
			token = await tokenize(paymentMethod);
		} catch (error) {
			/* End flow before call to backend. */
			msg = 'Please check your payment information and try again.';
			showModal = true;
			loading = false;
			return;
		}

		/*                    STEP 2. Create payment with token                       */
		let paymentResults;
		try {
			console.log('About to create payment!');
			paymentResults = await createPayment(token);
		} catch (error) {
			console.log('payment results error:', error);
			msg = `${error.message.replaceAll('_', ' ').toLowerCase()}.`;
			loading = false;
			return;
		}

		/*                         Handle Successful payment                              */
		loading = false;
		successModal = true;
		const successfulPaymentDetails = JSON.parse(paymentResults);
		console.debug('Payment Success', successfulPaymentDetails);
		receipt_url = successfulPaymentDetails.receiptUrl;
	}

	let card: any;

	onMount(async () => {
		if (!window.Square) {
			// TODO: instead of throwing error in console, init modal with error
			showModal = true;
			msg = 'Something went wrong with loading the app. Please try again later.';
			throw new Error('Square.js failed to load properly');
		}

		const payments = window.Square.payments(SQUARE_APPLICATION_ID, LOCATION_ID);

		// INIT CARD
		try {
			card = await payments.card({
				style: {
					input: {
						backgroundColor: '#ffffff'
					},
					'.input-container': {
						borderColor: 'transparent',
						borderRadius: '0'
					}
				}
			});
			await card.attach('#card-container');
		} catch (e) {
			// TODO: error handling
			console.error('Initializing Card failed:');
			return;
		}
	});

	/*                   Create Payment                    */
	async function createPayment(token: string) {
		console.log('Creating payment.');
		// Send payment token to APi
		const response = await fetch('/api/square', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				locationId: LOCATION_ID,
				sourceId: token,
				amount: 100,
				email_address,
				given_name,
				family_name,
				address,
				phone_number
			})
		});

		const data = await response.json();

		if (response.ok) {
			return data;
		}

		throw new Error(data.code);
	}

	/*                         Tokenize                           */
	async function tokenize(paymentMethod) {
		if (paymentMethod.methodType === 'Card') {
			const tokenResult = await paymentMethod.tokenize();
			// two different routes
			if (tokenResult.status === 'OK') {
				console.log('Succesfully created a token.');
				return tokenResult.token;
			} else {
				/* Square will handle UI for this kind of error */
				throw new Error('Tokenization failed!');
			}
		}
	}
	// TODO: apple/google pay

	// MODAL
	let msg = '';
	let loading = false;
	let showModal = false;
	let successModal = false;
	function closeModal() {
		loading = false;
		msg = '';
		showModal = false;
	}
</script>

{#if showModal}
	<div class="modal">
		<div class="container">
			{#if !successModal}
				{#if loading}
					<div class="lds-roller">
						{#each { length: 8 } as _}
							<div />
						{/each}
					</div>
					<h3>Please wait.</h3>
				{:else}
					<h2>{msg}</h2>
					<div class="btns">
						<button class="modal-btn" on:click={closeModal}>Close</button>
					</div>
				{/if}
			{:else}
				<h2>Payment Successful</h2>
				<p>You will be sent an email. Thank you!</p>
				<div class="btns">
					<a href={receipt_url} class="modal-btn">View Receipt.</a>
					<a href="/" class="modal-btn">Go Home</a>
				</div>
			{/if}
		</div>
	</div>
{/if}

<SubNav {pageTitle} />
<main id="checkout">
	<div class="container">
		<h2 class="section-title">Square Checkout Demo</h2>
		<div class="card-container-wrap">
			<form
				on:submit|preventDefault={() => {
					handlePaymentMethodSubmission(card);
				}}
				id="payment-form"
				method="POST"
			>
				<div class="form-control">
					<label for="fname-input">First Name</label>
					<input
						id="fname-input"
						name="First Name"
						type="text"
						placeholder="First Name"
						bind:value={given_name}
						required
					/><!-- First Name -->
				</div>
				<div class="form-control">
					<label for="lname-input">Last Name</label>
					<input
						id="lname-input"
						name="Last Name"
						type="text"
						placeholder="Last Name"
						bind:value={family_name}
						required
					/><!-- Last Name -->
				</div>
				<div class="form-control">
					<label for="email-input">Email Address</label>
					<input
						id="email-input"
						name="Email Address"
						type="email"
						placeholder="Email Address"
						bind:value={email_address}
						required
					/><!-- Email Address -->
				</div>
				<div class="form-control">
					<label for="phone-input">Phone Number</label>
					<input
						id="phone-input"
						name="Phone Number"
						type="tel"
						placeholder="Phone Number"
						bind:value={phone_number}
						required
					/><!-- Phone Number -->
				</div>
				<div class="form-control no-margin">
					<label for="card-container">Card Details</label>
					<div id="card-container" />
				</div>
				<button id="card-btn">Pay $1.00</button><!-- /button -->
			</form>
		</div>
	</div>
</main>
