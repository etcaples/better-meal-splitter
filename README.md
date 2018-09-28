# SplitMeal
App for splitting the cost of meals.


How the app works (walkthrough + refactor plans):
-------------------------------------------------

Component: ITEM ENTRY FIELDS
1. user enters all participants, one by one
  - `handleFriendChange` captures the input and stores it temporarily as `friendName`
  - TODO: make the character max 20
2. on submit, the `handleFriendSubmit` method is fired
  - TODO: need the input box to reset to be empty when submit is clicked
  - the name of the current participant (`friendName`), if unique, is saved as the name property of a new friend object in the array of `friends` and renders as a checkbox option
  - the state of the checked property (`isChecked`) is updated for that person
3. when an eater's checkbox is selected, `handleEaterSelect` is fired 
  - that person's name is currently pushed to the `currentEaters` array, which temporarily stores the eaters for the current item
  - TODO: handle the case where someone inputs the string 'true'
4. when an item is input to the item box, `handleItemChange` is fired
  - it stores the item name as `currentItem`
5. when a price is input to the price box,`handlePriceChange` is fired
  - it converts the price to a number and stores it with 2 decimal places as the `currentPrice`
  - TODO: make sure this input only allows number inputs with no more than 2 decimal places
6. when the submit button is selected for item-price-eaters, the `handleItemSubmit` function is fired
  - this takes the `currentItem`, `currentPrice`, and `currentEaters` from state and puts them into a new item object
  - then the new item object is pushed to the array that stores all the rows of items (`items`)
  - also, `handleItemSubmit` takes the current `subtotal` and increments it by whatever the `currentPrice` of the item is
  - then it resets the `currentEaters` to an empty array
  - finally, it resets the checkboxes to be unchecked

Component: ITEM LIST
<!-- 7. the item-price-eaters will be rendered on the page, inside a rough html table
  - each row has a "remove" button, with a click handler `removeItemRow`
8. when `removeItemRow` is fired, the target row is removed from the `allRows` array of items -->
9. when the button is clicked to confirm all the item details are correct, the `setTallySubtotals` method is fired
  - this looks at each eaters array within each of the item objects from `items` (poor time complexity)
    - for each eater, their corresponding friend-object is found
    - then that friend's `priceTally` is incrememted the cost of their share of the item's `price`
  - it only increments indiv `priceTally` if it's a new item addition

Component: SUBTOTAL LIST


Component: TIP TAX INPUTS
10. when a tax amount is entered in the tax input, `getTax` is fired and stores the tax temporarily as number in `tax` in state
11. when a tip amount is entered in the tip input, `getTip` is fired and stores the tip temporarily as number in `tip` in state
12. When the button is clicked to finalize the tax and tip, `combineTaxTip` is fired
  - the `tax` and `tip` are added to the `subtotal`, and saved as the `total`
  - after the `total` is set, `setIndivPercentages` is fired
    - when `setIndivPercentages` is fired, it updates the value of each participant in the `percentages` object (this amount is the price for that person, divided by the `subtotal`)
    - then `handlePageSubmit` fires and creates a key-value pair in the `totalAmounts` object, which stores the person's name as the key, and the person's `percentage` * the `total`, fixed to 2 decimals
      - TODO: also render any leftover change remaining (probably whoever is the unlucky penny pays the unlucky penny)
        - TODO: this can probably be assigned randomly
13. With `totalAmounts` updated to have datas, this component will render a list of the people and their final totals to pay


Feature Plan:
--------------
- allow *custom* tip flat rates and percentages
- allow reading the tip from the final receipt, for standard 18% or 20&
- build this in redux
- api to read text from pictures (OCR)
- CSS Modules, or SASS
- React Native
- maybe deploy on docker and/or aws without db
- add authentication
- add db


CH-CH-CHANGES (tech debt/refactor):
-----------------------------------
- table rendering looks gross
- components should be conditionally rendered, like a checkout page
  - but allow for back-tracking, eventually
- allow users to edit specific datas
- the remove items function needs to not only visually remove the item row, but also decrement the users' subtotals
- sanitize inputs of tax and tip (only allow certain types of numbers)
  - make sure only numbers are added for tax/tip -- maybe an npm module for input?
- prevent item submission if there's no eaters selected
- don't allow empty string inputs for username
- don't allow empty strings for tax/tip (unless you handle that case and default it to 0)