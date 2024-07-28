#Test Cases for Login Page

1. Check Login Form Fields
Test Case ID: TC01
Description: Verify that all required fields are present on the login form.
Steps:
Navigate to the login page.
Check for the presence of the following fields:
Login
Password
Check for the presence of the 'Login' button.
Expected Result: All fields and the 'Login' button should be present.

2. Check Successful Login
Test Case ID: TC02
Description: Verify that a user can successfully log in with valid credentials.
Steps:
Navigate to the login page.
Enter a valid login in the Login field.
Enter a valid password in the Password field.
Click the 'Login' button.
Expected Result: The user should be successfully logged, redirected to main page and see own name in the welcome message

3. Check Empty Form Submission
Test Case ID: TC03
Description: Verify that an appropriate error message is displayed when the form is submitted without any data.
Steps:
Navigate to the login page.
Click the 'Login' button without entering any data.
Expected Result: Error messages should be displayed indicating that all fields are required.

4. Check Empty Login Field
Test Case ID: TC04
Description: Verify that an appropriate error message is displayed when the form is submitted without login
Steps:
Navigate to the login page.
Enter a valid password in the Password field.
Click the 'Login' button without entering anything in Login field
Expected Result: Error messages should be displayed indicating that all fields are required.

5. Check Empty Password Field
Test Case ID: TC05
Description: Verify that an appropriate error message is displayed when the form is submitted without password
Steps:
Navigate to the login page.
Enter a valid login in the Login field.
Click the 'Login' button without entering anything in Password field
Expected Result: Error messages should be displayed indicating that all fields are required.

6. Check Login with Incorrect Login
Test Case ID: TC06
Description: Verify that an appropriate error message is displayed when an incorrect login is used.
Steps:
Navigate to the login page.
Enter an incorrect login in the Login field.
Enter a valid password in the Password field.
Click the 'Login' button.
Expected Result: An error message should be displayed indicating that the email or password is incorrect.

7. Check Login with Incorrect Password
Test Case ID: TC07
Description: Verify that an appropriate error message is displayed when an incorrect password is used.
Steps:
Navigate to the login page.
Enter a valid login in the Login field.
Enter an incorrect password in the Password field.
Click the 'Login' button.
Expected Result: An error message should be displayed indicating that the login or password is incorrect.

8. Check The Navigation
Test Case ID: TC8
Description: Check if after clicking the Back arrow you are redirected to the Landing Page
Steps:
Navigate to the login page.
Click Back arrow button in the  top left corner
Expected Result: You should be redirected to the landing page

