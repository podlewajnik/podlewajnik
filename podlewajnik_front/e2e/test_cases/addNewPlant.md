#Test Scenarios for "New Plant Modal"

Open and Close Modal
Test Case ID: TC01
Description: Verify that the "New Plant Modal" opens and closes correctly.
Steps:
Navigate to the main page.
Click the "New Plant" button.
Click the close (X) button.
Expected Result: The "New Plant Modal" should open and then close without any issues.

Submit Empty Form
Test Case ID: TC02
Description: Verify that an error message is displayed when attempting to submit an empty form.
Steps:
Open the "New Plant Modal".
Click the "Add" button without filling any fields.
Expected Result: An error message "Name is required" should be displayed.

Submit Form with Only Name Filled
Test Case ID: TC03
Description: Verify that a plant can be added successfully with only the name field filled.
Steps:
Open the "New Plant Modal".
Fill the "Name" field with a valid name.
Click the "Add" button.
Expected Result: The plant should be added successfully, the modal should close, and the tile with a new plant should be visible on the main page. 

Submit Form with Valid Data
Test Case ID: TC04
Description: Verify that a plant can be added successfully with all fields filled with valid data.
Steps:
Open the "New Plant Modal".
Fill in all fields with valid data.
Click the "Add" button.
Expected Result: The plant should be added successfully, the modal should close, and the tile with a new plant should be visible on the main page. 
Submit Form with Name Exceeding Maximum Length
Test Case ID: TC05
Description: Verify that an error message is displayed when the name field exceeds the maximum length.
Steps:
Open the "New Plant Modal".
Fill the "Name" field with a string longer than 40 characters.
Click the "Add" button.
Expected Result: An error message "Name exceeds maximum length of 40 characters" should be displayed.

Submit Form with Duplicate Name
Test Case ID: TC06
Description: Verify that an error message is displayed when the plant name is already taken
Steps:
Open the "New Plant Modal".
Fill the "Name" field with a string longer than 40 characters.
Click the "Add" button.
Open the "New Plant Modal".
Fill the "Name" field with the same name as in step 2
.Click the "Add" button.
Expected Result: An error message “Name has to be unique” 

Submit Form with Name Field Containing Only Spaces
Test Case ID: TC07
Description: Verify that an error message is displayed when the name field contains only spaces.
Steps:
Open the "New Plant Modal".
Fill the "Name" field with spaces.
Click the "Add" button.
Expected Result: An error message "Name is required" should be displayed.


Submit Form with Location Exceeding Maximum Length
Test Case ID: TC08
Description: Verify that the plant is not added when the location field exceeds the maximum length.
Steps:
Open the "New Plant Modal".
Fill the "Location" field with a string longer than 1000 characters.
Click the "Add" button.
Expected Result: The plant should not be added, and an appropriate error message should be displayed or handled.

Submit Form with Description Exceeding Maximum Length
Test Case ID: TC09
Description: Verify that the plant is not added when the description field exceeds the maximum length.
Steps:
Open the "New Plant Modal".
Fill the "Description" field with a string longer than 1000 characters.
Click the "Add" button.
Expected Result: The plant should not be added, and an appropriate error message should be displayed or handled.

Submit Form with Watering Exceeding Maximum Length
Test Case ID: TC10
Description: Verify that the plant is not added when the watering field exceeds the maximum length.
Steps:
Open the "New Plant Modal".
Fill the "Watering" field with a string longer than 1000 characters.
Click the "Add" button.
Expected Result: The plant should not be added, and an appropriate error message should be displayed or handled.

Check if Form Resets After Closing Modal
Test Case ID: TC11
Description: Verify that the form resets after closing the modal.
Steps:
Open the "New Plant Modal".
Fill in all fields with valid data.
Close the modal using the close (X) button.
Reopen the "New Plant Modal".
Expected Result: All fields should be empty when the modal is reopened.

Test Case ID: TC12
Description: Verify that the plant tile displays correctly with all fields filled after initially filling all inputs, clearing the "Name" field, and then re-filling it before submitting.
Steps:
Open the "Add Plant Modal".
Fill all input fields with valid data
Delete the text in the "Name" field.
Click the "Add" button (to check if it handles missing name correctly).
Refill the "Name" field with correct name
Click the "Add" button again.
Verify that a plant tile is created and all fields are correctly filled.
Expected Result: The plant tile should be created with all fields filled correctly after re-filling the "Name" and submitting the form.

Check Error Message Display Logic
Test Case ID: TC13
Description: Verify that the error message is correctly displayed and cleared.
Steps:
Open the "New Plant Modal".
Submit invalid data to trigger an error message.
Fix the error and submit valid data.
Expected Result: The error message should disappear, and a success message should be displayed.


Simulate Backend Failure
Test Case ID: TC14
Description: Verify that an error message is displayed when there is a backend failure.
Steps:
Open the "New Plant Modal".
Simulate a backend failure when submitting the form.
Click the "Add" button.
Expected Result: An error message "Failed to add plant. Please try again." should be displayed.
