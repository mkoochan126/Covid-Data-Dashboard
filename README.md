
# COVID-19 Data Application

Welcome to the COVID-19 Data Application! This web application allows you to fetch and visualize COVID-19 data for different states in the United States. You can view data for a specific week in Arizona or customize the data view for different states within a specified date range.

## Table of Contents
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

These instructions will help you set up and run the application on your local machine.

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Java Development Kit (JDK)
- Maven
- Node.js and npm
- Angular CLI (if you plan to make changes to the frontend)
- Git (optional)

After installing all these, open the code in VSCode and run the application.

### Accessing the Application

Once the application is running, you can access it in your web browser at `http://localhost:8080`.

## Usage

### Data Views

- **Arizona State Covid Week Data**: This view allows you to fetch and visualize COVID-19 data for a specific week in Arizona. Select the "Arizona State Covid Week Data" option from the dropdown, enter the current date, and click "Fetch."

- **Custom Covid Data of Different States**: This view lets you customize the data view by selecting a state, start date, and end date. Choose the "Custom Covid Data of Different States" option from the dropdown, fill in the required fields, and click "Fetch."

### Charts

- The application uses Chart.js to display line charts for visualizing COVID-19 data. Charts are updated dynamically based on the selected data view and parameters.

## Screenshots

![Preview](/ss1.png) 
![Preview](/ss2.png)

## Technologies Used

- Spring Boot (Backend)
- Angular (Frontend)
- Chart.js (Chart Visualization)
- Flatpickr (Date Picker)
- RESTful API
- Maven (Build Tool)
- npm (Package Manager)
