## Table of Contents
1. [Accessing the Payroll App](#1-accessing-the-payroll-app)
2. [Installation](#2-installation)
   - 2.1 [Backend](#21-backend)
   - 2.2 [Frontend](#22-frontend)
3. [Tech Stack](#3-tech-stack)
4. [Tradeoffs](#4-tradeoffs)
5. [Clients Section](#5-clients-section)
   - 5.1 [Viewing Clients](#51-viewing-clients)
   - 5.2 [Adding a New Client](#52-adding-a-new-client)
   - 5.3 [Editing Client Information](#53-editing-client-information)
   - 5.4 [Deleting a Client](#54-deleting-a-client)

## 1. Accessing the Payroll App
To access the Payroll App, open a web browser and enter the following URL: [https://main--payrollapp1.netlify.app/](https://main--payrollapp1.netlify.app/). You will be directed to the home page of the Payroll App.

## 2. Installation
To install and run the Payroll App you must first:
- change the permission of the backend to the url where frontend will be deployed
- make sure you have docker installed on backend server and npm or yarn installed on frontend server
- deploy backend
- change url of proxy freedns to the url of backend
- deploy frontend
# Observations:
- frontend is currently deployed on netifly 
### 2.1 Backend
1. Clone the repository from GitHub:
git clone https://github.com/UBB-SDI-23/lab-5x-x64alex.git
2. Enter docker folder
cd docker_jar
3. Run docker
docker-compose up

### 2.1 Frontend
1. Clone the repository from GitHub:
git clone https://github.com/UBB-SDI-23/lab-5x-x64alex.git
2. Enter frontend folder
cd react_fr
3. Install the necessary dependencies using npm or Yarn:
yarn install or npm install
4. Start the app:
yarn start or npm start


## 3. Tech Stack
The Payroll App utilizes the following tech stack:

- Frontend:
  - React.js: A JavaScript library for building user interfaces.
  - Material-UI: A popular React UI framework that provides pre-designed components for faster and easier development.
  - HTML/CSS: Markup and styling languages for structuring and presenting the app's user interface.
- Backend:
  - Java Spring: A powerful and widely-used Java framework for building enterprise-level applications.
  - Spring Boot: A framework that simplifies the setup and configuration of Java Spring applications.
  - PostgreSQL: A robust, open-source relational database management system.

## 4. Tradeoffs
During the development of the Payroll App, the following tradeoffs were made:

- User Interface: The UI design focuses on simplicity and ease of use, which may result in a more minimalistic appearance. Advanced styling features and complex animations are intentionally avoided to maintain a clean and efficient user experience.
- Scalability: The current version of the app is suitable for small to medium-sized businesses. For large-scale enterprises with extensive payroll management requirements, additional features and optimizations may be needed to ensure optimal performance and scalability.

## 5. Clients Section
The Clients section of the Payroll App allows you to manage client information, including viewing, adding, editing, and deleting clients.

### 5.1 Viewing Clients
To view the list of clients, follow these steps:

1. Open the Payroll App using the URL mentioned in Section 1.
2. Once the home page loads, click on the "Clients" tab located in the navigation menu.
3. The page will display a table listing all the existing clients. The table may include columns such as client ID, name, contact information, and other relevant details.

### 5.2 Adding a New Client
To add a new client to the system, follow these steps:

1. Open the Payroll App using the URL mentioned in Section 1.
2. Click on the "Clients" tab located in the navigation menu.
3. On the Clients page, locate and click the "Add Client" button.
4. A form will appear with fields to enter the client's information, such as name, contact details, and any other relevant details.
5. Fill in the required fields and any additional information you want to provide.
6. Click the "Save" button to add the client to the system.
7. The new client will now appear in the clients' table.

### 5.3 Editing Client Information
To edit client information, follow these steps:

1. Open the Payroll App using the URL mentioned in Section 1.
2. Click on the "Clients" tab located in the navigation menu.
3. Locate the client in the clients' table whose information you want to edit.
4. Click on the client's name or an "Edit" button/icon associated with the client.
5. The page will display a form populated with the client's existing information.
6. Make the necessary changes to the client's information.
7. Click the "Save" button to update the client's information.

### 5.4 Deleting a Client
To delete a client from the system, follow these steps:

1. Open the Payroll App using the URL mentioned in Section 1.
2. Click on the "Clients" tab located in the navigation menu.
3. Locate the client in the clients' table that you want to delete.
4. Click on a "Delete" button/icon associated with the client.
5. A confirmation dialog box will appear, asking you to confirm the deletion.
6. If you are certain about deleting the client, click "Confirm".
7. The client will be permanently deleted from the system and will no longer appear in the clients' table.
