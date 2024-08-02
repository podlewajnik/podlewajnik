#Plant edition

1. Submit Form with Valid Data
Test Case ID: TC01
Description: Verify that the plant can be edited and saved with valid data.
Steps:
Open the "Edit Plant Modal" with a plant that has existing data.
Fill in the "Name" field with a valid name.
Fill in the "Location" field with a valid location.
Fill in the "Description" field with a valid description.
Fill in the "Watering" field with valid watering information.
Click the "Save" button. Expected Result: The modal should emit the save event with the updated plant data, and the modal should close.

2. Cancel Editing and Close Modal
Test Case ID: TC02
Description: Verify that the modal closes without saving when the "Cancel" button or "x" button is clicked.
Steps:
Open the "Edit Plant Modal" with a plant that has existing data.
Change any field
Click the "Cancel" button.
Click the "x" button. Expected Result: The modal should close without saving any changes, and no save event should be emitted.

3. Edit Plant with Empty Name
Test Case ID: TC03
Description: Verify that the plant is not saved if the "Name" field is left empty.
Steps:
Open the "Edit Plant Modal" with a plant that has existing data.
Clear the "Name" field.
Fill in the other fields with valid data.
Click the "Save" button. Expected Result: The plant should not be saved, and an appropriate error message should be displayed or handled.

4. Edit Plant with Spaces as a Name
Test Case ID: TC04
Description: Verify that the plant is not saved if the "Name" is filled with spaces
Steps:
Open the "Edit Plant Modal" with a plant that has existing data.
Clear the "Name" field and add some spaces
Fill in the other fields with valid data.
Click the "Save" button. Expected Result: The plant should not be saved, and an appropriate error message should be displayed or handled.

5. Edit Plant with Name Exceeding Maximum Length
Test Case ID: TC05
Description: Verify that the plant is not saved if the "Name" field exceeds the maximum length allowed (e.g., 40 characters).
Steps:
Open the "Edit Plant Modal" with a plant that has existing data.
Fill the "Name" field with a string longer than 40 characters.
Click the "Save" button. Expected Result: The plant should not be saved, and an appropriate error message should be displayed or handled.

6. Edit Plant with Location Exceeding Maximum Length
Test Case ID: TC06
Description: Verify that the plant is not saved if the "Location" field exceeds the maximum length allowed (e.g., 1000 characters).
Steps:
Open the "Edit Plant Modal" with a plant that has existing data.
Fill the "Location" field with a string longer than 1000 characters.
Click the "Save" button. Expected Result: The plant should not be saved, and an appropriate error message should be displayed or handled.

7. Edit Plant with Description Exceeding Maximum Length
Test Case ID: TC07
Description: Verify that the plant is not saved if the "Description" field exceeds the maximum length allowed (e.g., 1000 characters).
Steps:
Open the "Edit Plant Modal" with a plant that has existing data.
Fill the "Description" field with a string longer than 1000 characters.
Click the "Save" button. Expected Result: The plant should not be saved, and an appropriate error message should be displayed or handled.

8. Edit Plant with Watering Exceeding Maximum Length
Test Case ID: TC08
Description: Verify that the plant is not saved if the "Watering" field exceeds the maximum length allowed (e.g., 1000 characters).
Steps:
Open the "Edit Plant Modal" with a plant that has existing data.
Fill the "Watering" field with a string longer than 1000 characters.
Click the "Save" button. Expected Result: The plant should not be saved, and an appropriate error message should be displayed or handled.

9. Edit Plant with Name that already exist

Test Case ID: TC09
Description: Verify that an error message is displayed when the plant name is already taken
Steps:
Open the "Add Plant Modal" 
Fill the "Name" field 
Click the "Add" button.
Click on the other plant tile
Click on Edit button
Fill the "Name" field with the same name as in step 2
.Click the "Add" button.
Expected Result: An error message “Name has to be unique”
