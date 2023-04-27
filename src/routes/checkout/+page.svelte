<script lang="ts">
	// Components
	import SubNav from '$lib/components/SubNav.svelte';
	let pageTitle = 'Checkout';
	import currency from '../currency';
	import StateSelect from '$lib/components/StateSelect.svelte';
	import { fade } from 'svelte/transition';

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

	async function ValidateForm(formData) {
		const response = await fetch('/api/zod', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(formData)
		});

		const data = await response.json();
		const { errors } = data;

		/* get form fields and show error in ui */
		for (const name in errors) {
			const selectedItem = document.querySelector(`input#${name}`);
			selectedItem.classList.add('validate-error');
			selectedItem.nextElementSibling.textContent = errors[name][0];
		}

		/* Error msg for modal*/
		if (errors) {
			throw new Error('Please make sure you filled out the correct fields.');
		}
	}

	async function handlePaymentMethodSubmission(paymentMethod) {
		// reset all form handling if any
		const validatedErrors = document.querySelectorAll('.validate-error');
		const validatedSpans = document.querySelectorAll('.validate-message');
		if (validatedErrors) {
			validatedErrors.forEach((e) => e.classList.remove('validate-error'));
		}
		if (validatedSpans) {
			validatedSpans.forEach((s) => (s.textContent = ''));
		}

		/*                                 VALIDATE FORM FIELDS                           */
		const form = document.querySelector('#payment-form');
		const formData = Object.fromEntries(new FormData(form));

		try {
			await ValidateForm(formData);
			console.log('Form was successfully validated.');
		} catch (e) {
			showModal = true;
			msg = e.message;
			return;
		}

		// Define the payment method for checking
		if (paymentMethod.methodType === 'Card') {
			showModal = true;
			loading = true;
		}
		/*                          STEP 1. TOKENIZE                                             */
		let token: any;
		try {
			console.log('Tokenizing.');
			token = await tokenize(paymentMethod);
		} catch (error) {
			/* End flow before call to backend. */
			console.log(error);
			if (paymentMethod.methodType !== 'Card') {
				// Generic error message if digital payment somehow was canceled
				msg = 'Process has been canceled.';
			} else {
				msg = 'Please make sure your card information is correct.';
			}
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
		showModal = true;
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

		// INIT Digital Payments
		try {
			gPay = await initGooglePay(payments);
			attachGooglePay();

			aPay = await initApplePay(payments);
			attachApplePay();
		} catch (e) {
			if (!aPay) {
				document.querySelector('#apple-pay-button').style.display = 'none';
			}
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

	// UPDATE APPLE/GOOGLE PAY Payment Request amount when user changes amount
	async function updatePaymentRequest() {
		if (gPay) {
			const updateGooglePay = gPay.req.update({
				total: { amount: displayInputAmount.replace('$', ''), label: 'Total' }
			});
		}
		if (aPay) {
			const updateApplePay = aPay.req.update({
				total: { amount: displayInputAmount.replace('$', ''), label: 'Total' }
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

	// UPDATE BOTH VALUES TO CHANGE MIN $. TODO: UPDATE ONE VALUE TO UPDATE BOTH
	let minAmount = '$1.00';
	let minAmountConverted = 100;

	function convertAmountForDisplay() {
		displayInputAmount = currency(displayInputAmount)?.format();
		// Making sure value is always above min value
		if (currency(displayInputAmount)?.intValue < minAmountConverted) {
			displayInputAmount = minAmount;
			amount = minAmountConverted;
		}
	}

	$: displayTotalAmount = currency(displayInputAmount)?.format();
	$: amount = currency(displayInputAmount)?.intValue;

	// $: console.log('AMOUNT FOR PAYMENT REQ:', displayInputAmount.replace('$', ''));
</script>

{#if showModal}
	<div class="modal" transition:fade>
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
				<div class="form-control">
					<label for="amount">Payment Amount</label>
					<input
						id="amount"
						name="amount"
						type="text"
						placeholder="$1.00"
						bind:value={displayInputAmount}
						on:blur={() => {
							convertAmountForDisplay();
							updatePaymentRequest();
						}}
						required
					/><!-- Payment Amount -->
					<span class="validate-message" />
				</div>
				<div class="form-control">
					<label for="referenceid">Reference Id</label>
					<input
						id="referenceid"
						name="referenceid"
						type="text"
						placeholder="#"
						bind:value={referenceId}
					/><!-- Reference Id -->
					<span class="validate-message" />
				</div>
				<!-- BILLING DETAILS -->
				<div class="form-flex">
					<div class="form-control">
						<label for="fname">First Name</label>
						<input
							id="fname"
							name="fname"
							type="text"
							placeholder="First Name"
							bind:value={given_name}
						/><!-- First Name -->
						<span class="validate-message" />
					</div>
					<div class="form-control">
						<label for="lname">Last Name</label>
						<input
							id="lname"
							name="lname"
							type="text"
							placeholder="Last Name"
							bind:value={family_name}
						/><!-- Last Name -->
						<span class="validate-message" />
					</div>
				</div>
				<div class="form-control">
					<label for="address1">Address Line 1</label>
					<input
						id="address1"
						name="address1"
						type="text"
						placeholder="Address Line 1"
						bind:value={address.addressLine1}
					/><!-- Address Line 1 -->
					<span class="validate-message" />
				</div>
				<div class="form-control">
					<label for="address2">Address Line 2 (Optional)</label>
					<input
						id="address2"
						name="address2"
						type="text"
						placeholder="Address Line 2"
						bind:value={address.addressLine2}
					/><!-- Address Line 2 (OPTIONAL) -->
					<span class="validate-message" />
				</div>
				<div class="form-flex">
					<div class="form-control">
						<label for="city">City</label>
						<input
							id="city"
							name="city"
							type="text"
							placeholder="City"
							bind:value={address.locality}
						/><!-- City -->
						<span class="validate-message" />
					</div>
					<StateSelect
						on:selectstate={(e) => {
							address.administrativeDistrictLevel1 = e.detail.state;
						}}
					/><!-- State Component-->
				</div>
				<div class="form-flex">
					<div class="form-control">
						<label for="postal">Zip / Postal Code</label>
						<input
							id="postal"
							name="postal"
							type="text"
							placeholder="Zip / Postal Code"
							bind:value={address.postalCode}
						/><!-- Zip/Postal Code  -->
						<span class="validate-message" />
					</div>
					<div class="form-control">
						<label for="country">Country</label>
						<input
							id="country"
							name="country"
							type="text"
							placeholder="Country"
							bind:value={address.country}
							disabled
							required
						/><!-- Country -->
						<span class="validate-message" />
					</div>
				</div>
				<div class="form-control">
					<label for="email">Receipt Email</label>
					<input
						id="email"
						name="email"
						type="email"
						placeholder="Email Address"
						bind:value={email_address}
					/><!-- Email Address -->
					<span class="validate-message" />
				</div>
				<div class="form-control no-margin">
					<label for="card-container">Card Details</label>
					<div id="card-container" />
				</div>
				<button type="submit" name="submit-btn" id="card-btn">Pay {displayTotalAmount}</button
				><!-- /button -->
				<p class="or"><span>or</span></p>
				<div id="apple-pay-button" />
				<div id="google-pay-button" />
			</form>
		</div>
	</div>
</main>

<style lang="less">
	#apple-pay-button {
		height: 41px;
		width: 100%;
		display: inline-block;
		-webkit-appearance: -apple-pay-button;
		-apple-pay-button-type: plain;
		-apple-pay-button-style: black;
		margin-bottom: 1em;
	}
</style>
