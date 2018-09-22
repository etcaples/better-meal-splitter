# SplitMeal
App for splitting the cost of meals.


How the app works (walkthrough + refactor plans):
-------------------------------------------------

Component: ITEM ENTRY FIELDS
1. user enters all participants, one by one
  - `handleFriendChange` captures the input and stores it temporarily as `friendName`
  - TODO: the input box shoud only allow nrmal strings
  - TODO: need to sanitize inputs
  - TODO: make the character max 20
2. on submit, the name of the current participant (`friendName`) is pushed to the `friends` array, and appears as a checkbox option
  - when submit button is selected, it fires `handleFriendSubmit`, which pushes the current `friendName` to the `friends` array
    - this array is currently an array containing only the names of friends -- the purpose of this array is only to render checkboxes
    - TODO: need the input box to reset to be empty when submit is clicked
3. TODO: *no click functionality yet on the checkboxes, since I switched from select drop*
  - when an eater is selected `handleEaterSelect` is fired and that person's name is currently pushed to the `currentEaters` array, which temporarily stores the eaters for the current item
  - TODO: handle the case where someone inputs the string 'true'
4. when an item is input to the item box, `handleItemChange` is fired
  - it stores the item name as `currentItem`
5. when a price in input in the price box,`handlePriceChange` is fired
  - it converts the price to a number and stores it with 2 decimal places as the `currentPrice`
  - TODO: make sure this input only allows number inputs with no more than 2 decimal places
6. when the submit button is selected for item-price-eaters, the `handleRowSubmit` function is fired
  - this takes the `currentItem`, `currentPrice`, and `currentEaters` from state and puts them into a new row-array
    - TODO: instead, this function should store the `currentEaters` as a value in the item's object
  - then the new row-array is pushed to the array that stores all the rows of items (`allRows`)
    - `allRows` is currently an array or arrays, but I think I want to change this to an array of objects -- I'm pretty sure this will make the lookup time faster (TODO)
  - also, `handleRowSubmit` takes the current `subtotal` and increments it by whatever the `currentPrice` of the item is
  - then it resets the `currentEaters` to an empty array
  - TODO: on row submit, reset the checkboxes to be unchecked

Component: ITEM LIST
7. the item-price-eaters will be rendered on the page, inside a rough html table
  - each row has a "remove" button, with a click handler `removeItemRow`
8. when `removeItemRow` is fired, the target row is removed from the `allRows` array of items
9. when the button is clicked to confirm all the item details are correct, the `setTallySubtotals` method is fired
  - this looks at each eaters array within each of the item arrays from `allRows` (O(n^2))
    - for each unique friend name, a price-per-person is initialized in `priceTallies` object
    - also, a percentage-per-person is initialized in `percentages` object
    - TODO: the above two bullets should be consolidated more efficiently when there's an array of friends objects and an array of item objects instead of nested arrays

Component: SUBTOTAL LIST
9. Now that there's datas in the `priceTallies` object, the key-value pairs for each person and their subtotal will render altogether

Component: TIP TAX INPUTS
10. when a tax amount is entered in the tax input, `getTax` is fired and stores the tax temporarily as number in `tax` in state
11. when a tip amount is entered in the tip input, `getTip` is fired and stores the tip temporarily as number in `tip` in state
12. When the button is clicked to finalize the tax and tip, `combineTaxTip` is fired
  - the `tax` and `tip` are added to the `subtotal`, and saved as the `total`
  - after the `total` is set, `setIndivPercentages` is fired
    - when `setIndivPercentages` is fired, it updated the value of eah participant in the `percentages` object (this amount is the price for that person, divided by the `subtotal`)
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
- items should be represented as objects
- people should be represented as objects
- components should be conditionally rendered, like a checkout page
  - but allow for back-tracking, eventually
- allow users to edit specific datas
- the remove items function needs to not only visually remove the item row, but also decrement the users' subtotals
- sanitize inputs of tax and tip

