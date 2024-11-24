# Bike Store Server

A brief description of what my project operations, features and how to set up locally

- Operations

- Bike Operations:

Start point:/api/products

1. Create Bike:

   - Endpoint: POST /
   - Description: Create a new bike entry in the database.
   - Controller: bikeControllers.createBike

2. Get All Bikes:

   - Endpoint: GET /
   - Description: Retrieve all bike records from the database.
   - Controller: bikeControllers.getAllBikes

3. Search Bikes by Term:

   - Endpoint: GET /search
   - Description: Search for bikes based on a search term.
   - Controller: bikeControllers.getBikesByTerm

4. Get Bike by ID:

   - Endpoint: GET /:productId
   - Description: Get details of a specific bike by its ID.
   - Controller: bikeControllers.getBikeById

5. Update Bike by ID:

   - Endpoint: PUT /:productId
   - Description: Update a bike's details by its ID.
   - Controller: bikeControllers.updateBikeById

6. Delete Bike by ID:

   - Endpoint: DELETE /:productId
   - Description: Delete a bike by its ID.
   - Controller: bikeControllers.deleteBike

- Order Operations:

  Start point: /api/orders

1. Create Order:

   - Endpoint: POST /
   - Description: Create a new order.
   - Controller: OrderControllers.createOrder

2. Get All Orders:

   - Endpoint: GET /
   - Description: Retrieve all order records from the database.
   - Controller: OrderControllers.getAllOrders

3. Get Revenue:

   - Endpoint: GET /revenue
   - Description: Retrieve the total revenue from all orders.
   - Controller: OrderControllers.getRevenue

- Features

1.  Production Server: Start the application in production mode.
2.  Development Server: Start the application in development mode with automatic restarts on code changes.
3.  Build: Compile TypeScript files into JavaScript.
4.  Linting: Enforce code quality and consistency using ESLint.
5.  Prettier: Format code automatically for better readability and consistency.
6.  Testing: Placeholder for test command (if any tests are to be added).

- Technologies Used

1.  Node.js: Server-side JavaScript runtime.
2.  TypeScript: For type safety and modern JavaScript features.
3.  ESLint: Linting tool to enforce code style.
4.  Prettier: Code formatter for maintaining consistency.

- Setup Instructions
  Follow these steps to set up the project locally:

1. Clone the repository
   git clone <repository-url>
   cd <project-directory>
2. Install Dependencies
   Run the following command to install all necessary dependencies:
   npm install
