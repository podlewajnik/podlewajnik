#Test Cases for Registration Page

1. Check Registration Form Fields
Test Case ID: TC01
Description: Verify that all required fields are present on the registration form.
Steps:
Navigate to the registration page.
Check for the presence of the following fields:
Name
Email
Login
Password
Confirm Password
Check for the presence of the 'Confirm' button.
Expected Result: All fields and the 'Confirm' button should be present.

2. Check Successful Registration
Test Case ID: TC02
Description: Verify that a user can successfully register with valid data.
Steps:
Navigate to the registration page.
Enter valid data in all fields.
Click the 'Confirm' button.
Expected Result: The user should be successfully registered, redirected to the main page and receive a welcome message with own name.

3. Check Empty Form Submission
Test Case ID: TC03
Description: Verify that an appropriate error message is displayed when the form is submitted without any data.
Steps:
Navigate to the registration page.
Click the 'Confirm' button without entering any data.
Expected Result: Error messages should be displayed indicating that all fields are required.

4. Check Some Empty Required Fields
Test Case ID: TC04
Description: Verify that an appropriate error message is displayed when the form is submitted without all required data
Steps:
Navigate to the registration page.
Enter valid data in Name and Email fields
Click the 'Confirm' button without entering any data.
Expected Result: Error messages should be displayed indicating that all fields are required.

5. Check Invalid Email Format
Test Case ID: TC05
Description: Verify that an appropriate error message is displayed for an invalid email format.
Steps:
Navigate to the registration page.
Enter an invalid email (e.g., user1user.com) in the Email field.
Enter valid data in other fields.
Click the 'Confirm' button.
Expected Result: An error message should be displayed indicating that the email format is invalid.

6. Check Password and Confirm Password Match
Test Case ID: TC06
Description: Verify that an appropriate error message is displayed when the password and confirm password fields do not match.
Steps:
Navigate to the registration page.
Enter valid data in all fields, but enter different values in the Password and Confirm Password fields.
Click the 'Confirm' button.
Expected Result: An error message should be displayed indicating that the passwords do not match.

7. Check Already Registered Login
Test Case ID: TC07
Description: Verify that an appropriate error message is displayed when the email is already registered.
Steps:
Navigate to the registration page.
Enter a login that is already registered.
Enter valid data in other fields.
Click the 'Confirm’' button.
Expected Result: An error message should be displayed indicating that the login is already registered.

8. Check Minimum Password Length
Test Case ID: TC06
Description: Verify that an appropriate error message is displayed when the password is shorter than the minimum length requirement.
Steps:
Navigate to the registration page.
Enter a password shorter than the minimum length (e.g., 5 characters) in the Password field.
Enter the same short password in the Confirm Password field.
Enter valid data in other fields.
Click the 'Confirm' button.
Expected Result: An error message should be displayed indicating that the password is too short.

9. Check Maximum Length Validation
Test Case ID: TC8
Description: Verify that appropriate error messages are displayed when input exceeds the maximum allowed length.
Steps:
Navigate to the registration page.
Enter data exceeding the maximum length for each field.
Click the 'Confirm' button.
Expected Result: Error messages should be displayed indicating that the inputs exceed the maximum length.

10. Check Space As A Character
Test Case ID: TC9
Description: Verify that appropriate error messages are displayed when when a space is entered in the forms
Steps:
Navigate to the registration page.
Enter spaces as a characters in each field
Click the 'Confirm' button.
Expected Result: Error messages should be displayed indicating that the inputs exceed the maximum length.

11. Check The Navigation
Test Case ID: TC10
Description: Check if after clicking the Back arrow you are redirected to  the Landing Page
Steps:
Navigate to the registration page.
Click Back arrow button in the  top left corner
Expected Result: You should be redirected to the landing page


