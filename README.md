# Medi-App

Medi-App is a web application designed to facilitate medicine delivery and prescription management. It allows users to view available medicines, upload prescriptions, add items to the cart, and proceed to checkout.

## Features

- View available medicines with details such as name, price, and dosage.
- Upload prescriptions securely.
- Add medicines to the cart for easy checkout.
- Secure authentication system for user login.
- Integration with MongoDB for storing medicine and checkout data.

## Installation

To run the Medi-App locally, follow these steps:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/your-username/medi-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd medi-app
   ```

3. Install dependencies using npm:

   ```bash
   npm install
   ```

4. Start the server:

   ```bash
   npm start
   ```

5. Open your web browser and visit [http://localhost:3000](http://localhost:3000) to access the application.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Passport.js for authentication
- Multer for file uploads

## Project Structure

The project follows a standard MVC (Model-View-Controller) architecture:

- **Controllers**: Contains logic for handling HTTP requests and responses.
- **Models**: Defines data models and interacts with the database.
- **Views**: Renders HTML templates and sends them to the client.
- **Public**: Stores static assets such as CSS, JavaScript, and images.

## Contributors

- Adithya Krishnamurthy (s223859001@deakin.edu.au)
- Rohit Radhakrishnan (s223421403@deakin.edu.au)
- lbin Benny Thomas (s224004077@deakin.edu.au)
- Venkata Subramanyam Javvaji (s224103094@deakin.edu.au)
