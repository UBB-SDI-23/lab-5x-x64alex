# Payroll App Documentation

## Introduction
Welcome to the documentation for the Payroll App. This document provides information on how to run, use, and navigate the Payroll App website. The Payroll App is a web-based application designed to manage payroll information. We have exemplified how to use the client section the products, categories, transactions are similar. 


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
6. [Chat](#6-chat)
   - 6.1 [Generating Images from Messages](#61-generating-images-from-messages)
7. [Register and Login](#7-register-and-login)
   - 7.1 [Registering a New Account](#71-registering-a-new-account)
   - 7.2 [Logging in to the Payroll App](#72-logging-in-to-the-payroll-app)

## 1. Accessing the Payroll App
To access the Payroll App, open a web browser and enter the following URL: [https://main--payrollapp1.netlify.app/](https://main--payrollapp1.netlify.app/). You will be directed to the home page of the Payroll App.

## 2. Installation
To install and run the Payroll App you must first (in that order!):
- change the permission of the backend to the url where frontend will be deployed
- make sure you have docker installed on backend server and npm or yarn installed on frontend server
- deploy backend
- change url of proxy freedns to the url of backend
- deploy frontend

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

## 6. Chat
The Payroll App features a chat functionality that allows users to communicate with each other. To acces it tap the chat button. You must first choose an username and connect. 

### 6.1 Generating Images from Messages
The Payroll App provides a feature to generate images from chat messages. This feature allows users to convert text-based messages into image format, which can be useful if an user doesn’t know what oher user has typed.

To generate an image from a message, follow these steps:

1. Open the Payroll App and navigate to the chat section.
2. Toggle generate images from message
3. Enter the word to generate images for and press send
4. The Payroll App will process the message and generate an 4 image.
5. You can now download or save the generated images for further use or sharing.

## 7. Register and Login
The Payroll App provides a user authentication system that allows users to register for a new account and log in to access the app's features.

### 7.1 Registering a New Account
To register for a new account, follow these steps:

1. Open the Payroll App using the URL mentioned in Section 1.
2. Click on the "login" button.
3. Click on the "Register now" button.
4. Fill out the registration form with the required information, such as username, email, and password.
5. Optionally, provide any additional information requested in the form.
6. Click the "Register" button to submit the registration form.
7. Enter confirmation code
8. Upon successful registration, you will be redirected to the login page.

### 7.2 Logging in to the Payroll App
To log in to the Payroll App, follow these steps:

1. Open the Payroll App using the URL mentioned in Section 1.
2. Click on the "Login" link/button located on the homepage or the login page.
3. Enter your registered username or email and password in the login form.
4. Click the "Login" or "Sign In" button to submit the login form.
5. If the provided credentials are valid, you will be logged in and redirected to the app's dashboard or main page.

# Observations:
- frontend is currently deployed on netifly
