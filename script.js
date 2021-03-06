/* jshint esversion: 6 */

$(function () {



	/**
	 * Returns ten unique decimal numbers between 1 and 255 inclusive
	 * @returns {*[]} an array of ten decimal numbers.
	 */
	const tenUniqueDecimals = () => {
		const decimals = [];
		for (let i = 0; i < 10; i++)
		{
			//create a random number between 1 and 255 inclusive
			const decimal = Math.floor(Math.random() * 256 + 1);

			//check if the number is already in the array
			if (decimals.includes(decimal))
			{
				i--; // if it is, try again
			} else
			{
				decimals.push(decimal); // if not, add it to the array
			}
		}
		return decimals;
	};

	/**
	 * Displays ten decimals values on the page
	 */
	const writeDecimals = () => {
		const decimalElements = document.querySelectorAll('.decimal-numbers');
		const decimalNumbers = tenUniqueDecimals();
		for (let i = 0; i < decimalElements.length; i++)
		{
			decimalElements[ i ].textContent = decimalNumbers[ i ];
		}
	};

	/**
	 * Toggle the background color and text content of an element when the
	 * user clicks on the element
	 */
	const toggleBinaryElements = () => {
		const binaryElements = document.querySelectorAll('.binary-digits');
		binaryElements.forEach(element => element.addEventListener('click', () => {
			element.textContent = element.textContent === '0' ? '1' : '0';
			element.classList.toggle('active');
		}));
	};

	/**
	 * Returns the binary values the text contents of selected elements
	 *
	 * @return a string representing the text contents of selected elements
	 */
	const getRowValues = () => {
		let rowValues = '';
		$('.check-button').on('click', function () {
			const binaryDigits = $(this).parent().parent().find('.binary-digits');
			binaryDigits.each(function () {
				rowValues += $(this).text();
			});
		});
		return rowValues;
	};

	console.log(getRowValues());


	/**
	 * Returns binary value of a decimal
	 */
	const toBinary = (dec) => {
		let binaryString = " ";
		let placeValue = 128;
		for (let i = 0; i < 8; i++)
		{
			if (dec >= placeValue)
			{
				binaryString += "1";
				dec -= placeValue;
			} else
			{
				binaryString += "0";
			}
			placeValue /= 2;
		}
		return binaryString;
	};


	//when a button clicked, get its parent first child value
	// const checkButtons = document.querySelectorAll('.check-button');
	// checkButtons.forEach(button => button.addEventListener('click', () => {
	//   const decimalNumber = button.parentElement.firstElementChild.textContent;
	//   const binaryNumber = toBinary(decimalNumber);
	//   let binaryValues = '';
	//
	//   //get the values of all the clicked button parent children with class binary
	//   const binaryDigits = button.parentElement.querySelectorAll('.binary');
	//   // log all the text content of the binary digits
	//   for (const element of binaryDigits) {
	//     binaryValues += element.textContent;
	//   }
	//
	//
	//   //change the background color of the button to green if the binary value is equal to the binary number
	//   if (binaryValues === binaryNumber) {
	//     button.classList.add('correct');
	//     button.style.border = 'none';
	//   } else {
	//     button.classList.add('incorrect');
	//     button.style.border = 'none';
	//   }
	//
	//
	//
	//   console.log(`Selected Values: ${binaryValues}`);
	// }));

	const checkUserSelection = () => {
		const binaryValues = getUserBinaryValues();
		const binaryNumber = toBinary(decimalNumbers[ 0 ]);
		let correct = true;
		for (let i = 0; i < binaryValues.length; i++)
		{
			if (binaryValues[ i ] !== binaryNumber[ i ])
			{
				correct = false;
			}
		}
		return correct;
	};
	const markUserSelection = () => {
		if (checkUserSelection())
		{
			const checkButtons = document.querySelectorAll('.check-button');
			for (const button of checkButtons)
			{
				button.classList.add('correct');
				button.style.border = 'none';
			}
		} else
		{
			const checkButtons = document.querySelectorAll('.check-button');
			for (const button of checkButtons)
			{
				button.classList.add('incorrect');
				button.style.border = 'none';
			}
		}
	};


	//reload the page when the reset-button is clicked
	const resetButton = document.querySelector('.reset-button');
	resetButton.addEventListener('click', () => {
		writeDecimals();
		const binaryElements = document.querySelectorAll('.binary-digits');
		binaryElements.forEach(element => element.classList.remove('active'));
		binaryElements.forEach(element => element.textContent = '0');
	});


	// this is new comments to see how it all does and make things happen right on soft warp enable.


	// Run the initiator functions
	window.onload = () => {
		writeDecimals();
		toggleBinaryElements();
	};

}); // end of document ready
