<script lang="ts">
	// Components
	import SubNav from '$lib/components/SubNav.svelte';
	let pageTitle = 'Checkout';
	import currency from '../currency';
	import StateSelect from '$lib/components/StateSelect.svelte';

	// styles
	import '$styles/checkout/main.css';
	import { onMount } from 'svelte';

	// CREDENTIALS
	export let data;
	const { SQUARE_APPLICATION_ID, LOCATION_ID } = data;

	// User Data
	let given_name: string | undefined;
	let family_name: string | undefined;
	let email_address: string | undefined;
	let address = {
		addressLine1: '',
		addressLine2: '',
		administrativeDistrictLevel1: 'AL',
		locality: '',
		postalCode: '',
		country: 'US'
	};
	let receipt_url: string | undefined;
	let referenceId: string | undefined;

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
			console.log(error);
			msg = error.message;
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
	let gPay: any;
	let aPay: any;

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
						backgroundColor: '#f5f7f9'
					},
					'.input-container': {
						borderColor: 'transparent',
						borderRadius: '.25em'
					}
				}
			});
			await card.attach('#card-container');
		} catch (e) {
			// TODO: error handling
			console.error('Initializing Card failed:');
			return;
		}

		// INIT GOOGLE PAY
		try {
			gPay = await initGooglePay(payments);
			attachGooglePay();

			aPay = await initApplePay(payments);
			attachApplePay();
		} catch (e) {
			throw new Error(e.message);
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
				amount,
				email_address,
				given_name,
				family_name,
				address,
				referenceId
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
		const tokenResult = await paymentMethod.tokenize();
		switch (tokenResult.status) {
			case 'Abort':
				throw new Error('the process was aborted. Please try again later.');
			case 'Cancel':
				throw new Error('The process was canceled by the user.');
			case 'Error':
				throw new Error('There was an error processing your request.');
			case 'Invalid':
				throw new Error('Please make sure your card information is correct.');
			case 'OK':
				console.log('Token was successfully created.');
				return tokenResult.token;
			case 'Unknown':
				throw new Error('Something went wrong. Please try again later.');
			default:
				throw new Error('Something went wrong. Please try again later.');
		}
	}

	// GOOGLE/APPLE PAY
	/*         BUILD PAYMENT REQUEST FOR BOTH GOOGLE/APPLE PAY         */
	function buildPaymentRequest(payments) {
		return payments.paymentRequest({
			countryCode: address.country,
			currencyCode: 'USD',
			total: {
				amount: displayInputAmount.replace('$', ''),
				label: 'Total'
			},
			requestBillingContact: true,
			requestShippingContact: false
		});
	}

	async function initGooglePay(payments) {
		const paymentRequest = buildPaymentRequest(payments);
		const googlePay = await payments.googlePay(paymentRequest);
		await googlePay.attach('#google-pay-button', {
			buttonType: 'long',
			buttonSizeMode: 'fill'
		});
		return googlePay;
	}

	function attachGooglePay() {
		if (gPay !== undefined) {
			const googlePayButton = document.querySelector('#google-pay-button');
			googlePayButton?.addEventListener('click', async () => {
				await handlePaymentMethodSubmission(gPay);
			});
		}
	}

	async function initApplePay(payments) {
		const paymentRequest = buildPaymentRequest(payments);
		const applePay = await payments.applePay(paymentRequest);
		return applePay;
	}

	function attachApplePay() {
		if (aPay !== undefined) {
			const applePayButton = document.querySelector('#apple-pay-button');
			applePayButton?.addEventListener('click', async () => {
				await handlePaymentMethodSubmission(aPay);
			});
		}
	}

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

	// Convert amount to $
	let amount: number | undefined = 1;
	let displayTotalAmount: any;
	let displayInputAmount: any = currency(amount)?.format();

	function convertAmountForDisplay() {
		displayInputAmount = currency(displayInputAmount)?.format();
	}

	$: displayTotalAmount = currency(displayInputAmount)?.format();
	$: amount = currency(displayInputAmount)?.intValue;

	// $: console.log('AMOUNT FOR PAYMENT REQ:', displayInputAmount.replace('$', ''));
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
				<p>Thank you for your payment!</p>
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
		<h2 class="section-title">Payment</h2>
		<div class="card-container-wrap">
			<form
				on:submit|preventDefault={() => {
					handlePaymentMethodSubmission(card);
				}}
				id="payment-form"
				method="POST"
			>
				<h3 class="form-section-title">Payment Details</h3>
				<div class="form-control">
					<label for="amount-input">Payment Amount</label>
					<input
						id="amount-input"
						name="Payment Amount"
						type="text"
						placeholder="$1.00"
						bind:value={displayInputAmount}
						on:blur={convertAmountForDisplay}
						required
					/><!-- Payment Amount -->
				</div>
				<div class="form-control">
					<label for="amount-input">Reference Id</label>
					<input
						id="ref-input"
						name="Reference Id"
						type="text"
						placeholder="#"
						bind:value={referenceId}
						required
					/><!-- Reference Id -->
				</div>

				<h3 class="form-section-title">Billing Details</h3>
				<!-- BILLING DETAILS -->
				<div class="form-flex">
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
				</div>
				<div class="form-control">
					<label for="address1-input">Address Line 1</label>
					<input
						id="address1-input"
						name="Address Line 1"
						type="text"
						placeholder="Address Line 1"
						bind:value={address.addressLine1}
						required
					/><!-- Address Line 1 -->
				</div>
				<div class="form-control">
					<label for="address2-input">Address Line 2 (Optional)</label>
					<input
						id="address2-input"
						name="Address Line 2"
						type="text"
						placeholder="Address Line 2"
						bind:value={address.addressLine2}
					/><!-- Address Line 2 (OPTIONAL) -->
				</div>
				<div class="form-flex">
					<div class="form-control">
						<label for="city-input">City</label>
						<input
							id="city-input"
							name="City"
							type="text"
							placeholder="City"
							bind:value={address.locality}
						/><!-- City -->
					</div>
					<StateSelect
						on:selectstate={(e) => {
							address.administrativeDistrictLevel1 = e.detail.state;
						}}
					/><!-- State Component-->
				</div>
				<div class="form-flex">
					<div class="form-control">
						<label for="postal-input">Zip / Postal Code</label>
						<input
							id="postal-input"
							name="Postal Code"
							type="text"
							placeholder="Zip / Postal Code"
							bind:value={address.postalCode}
						/><!-- Zip/Postal Code  -->
					</div>
					<div class="form-control">
						<label for="country-input">Country</label>
						<input
							id="country-input"
							name="Country"
							type="text"
							placeholder="Country"
							bind:value={address.country}
							disabled
						/><!-- Country -->
					</div>
				</div>
				<div class="form-control">
					<label for="email-input">Receipt Email</label>
					<input
						id="email-input"
						name="Email Address"
						type="email"
						placeholder="Email Address"
						bind:value={email_address}
						required
					/><!-- Email Address -->
				</div>
				<div class="form-control no-margin">
					<label for="card-container">Card Details</label>
					<div id="card-container" />
				</div>
				<button type="submit" name="submit-btn" id="card-btn">Pay {displayTotalAmount}</button
				><!-- /button -->
				<p class="or"><span>or</span></p>
				<div id="google-pay-button" />
				<div id="apple-pay-button" />
			</form>
		</div>
	</div>
</main>

<style>
	#apple-pay-button {
		height: 48px;
		width: 100%;
		display: inline-block;
		-webkit-appearance: -apple-pay-button;
		-apple-pay-button-type: plain;
		-apple-pay-button-style: black;
	}
</style>
