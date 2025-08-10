---
layout: post
title:
description: ''
date: '2022-09-02'
categories: test
note:
mathjax:
mermaid:
p5:
threeJS:
anchor:
publish: true
---

## Introduction

Quality assurance aims to ensure a positive and satisfactory user experience by implementing measures to enhance the overall quality of a product or service. This involves various testing processes, such as functional testing, unit testing, feature testing, integration testing, system testing, acceptance testing, and more, which are conducted to validate the software's compliance with user requirements and ensure its proper functionality, security, performance, usability, and compatibility.

## Why?

Quality assurance aims to ensure a positive and satisfactory user experience by implementing measures to enhance the overall quality of a product or service.

## How?

All the purpose are the same as in the why section. The priorities is ordered as follow and usually we complete the tests until Acceptance Testing is quite enough.

* Functional Testing
  * Concept: Test whether a system or software application functions correctly and delivers the expected results.
  * Example
    * Pen: Verify that the pen writes smoothly and consistently. Test different writing angles (horizontal, vertical) to ensure ink flow remains consistent. Check that the pen produces clear and legible lines.
    * E-commerce: Validate that users can successfully search for products, view product details, add items to the cart, proceed to checkout, and complete the purchase without encountering any functional issues or errors.
* Unit Testing
  * Concept: Testing individual units or components of the software in isolation to ensure they function correctly.
  * Example
    * Pen: In the case of a pen, a possible unit testing scenario could be testing the functionality of the "click" mechanism. This mechanism is responsible for retracting and extending the pen tip when the user presses the button on top of the pen.
    * E-commerce: Testing the "calculateTotalPrice" function to ensure that it correctly calculates the total price of items in the shopping cart.
* Feature Testing
  * Concept: Feature testing focuses on thoroughly testing individual features or functionalities of a software application to ensure they meet the specified requirements and provide the desired functionality to users.
  * Example
    * Pen: Testing the ink flow and smoothness of writing. This involves verifying that the pen consistently provides a steady ink flow and produces smooth and legible writing on different surfaces.
    * E-commerce: In an e-commerce application, an example of feature testing could be testing the "Add to Cart" functionality to ensure that products are successfully added to the cart, the cart total is calculated accurately, and the inventory is updated accordingly.
* Integration Testing
  * Concept: Verifying the interaction and communication between different components or modules to ensure they work together as intended.
  * Example
    * Pen: Testing the interaction between different pen components, such as the pen body, ink cartridge, and pen cap. The goal is to ensure that these components fit together seamlessly, allowing the pen to function properly and provide a comfortable writing experience.
    * E-commerce: Testing the integration between the payment gateway and the e-commerce website to ensure that the payment process is smooth and transactions are processed accurately.
* System Testing
  * Concept: Testing the entire system as a whole to ensure it meets the specified requirements and functions correctly in its intended environment.
  * Example
    * Pen: Testing the pen's overall performance and functionality in real-life usage scenarios. This includes assessing factors such as ink durability, grip comfort, overall durability, and reliability of the pen under different writing conditions.
    * E-commerce: Testing the end-to-end functionality of the e-commerce website, including user registration, product browsing, adding items to the cart, and completing the checkout process.
* Acceptance Testing
  * Concept: Testing the software's compliance with user requirements and validating that it meets the acceptance criteria defined by stakeholders.
  * Example
    * Pen: During acceptance testing for a pen, the team ensures compliance with user requirements by evaluating factors such as writing performance, durability, comfort, and overall functionality.
    * E-commerce: Conducting user acceptance testing on the e-commerce website to ensure that it meets the specified requirements, such as validating user registration, testing different types of product searches, and making test purchases.
* Regression Testing
  * Concept: Repeating previously executed tests to ensure that previously working functionality still works after changes or updates have been made to the software.
  * Example
    * Pen: Regression testing for the pen tool in a word processing software involves verifying that the basic functionalities like selecting, highlighting, and formatting text still work as expected after introducing a new feature such as spell-check.
    * E-commerce: After introducing a new feature on the e-commerce website, rerunning tests to ensure that existing functionality, such as product browsing, cart management, and order placement, still works as expected.
* Performance Testing
  * Concept: Evaluating the software's performance under specific conditions, such as load testing, stress testing, or endurance testing, to ensure it meets performance requirements.
  * Example
    * Pen: TBC
    * E-commerce: Simulating a high number of concurrent users on the e-commerce website to evaluate its response time, page load speed, and server performance under heavy traffic conditions.
* Security Testing
  * Concept: Identifying vulnerabilities and weaknesses in the software's security measures to ensure it is adequately protected against potential threats.
  * Example
    * Pen: TBC
    * E-commerce: Conducting security testing on the e-commerce website to identify vulnerabilities, such as testing for SQL injection, cross-site scripting (XSS), and ensuring secure transmission of sensitive information like payment details.
* Usability Testing
  * Concept: Assessing the software's user-friendliness and ease of use, including aspects such as navigation, intuitiveness, and overall user experience.
  * Example
    * Pen: TBC
    * E-commerce: Observing users as they interact with the e-commerce website to assess the intuitiveness of the user interface, ease of navigation, and overall user experience in finding and purchasing products.
* Compatibility Testing
  * Concept: Testing the software's compatibility with different platforms, operating systems, browsers, devices, or external dependencies to ensure it functions correctly in various environments.
  * Example
    * Pen: TBC
    * E-commerce: Testing the e-commerce website on different web browsers (Chrome, Firefox, Safari), operating systems (Windows, macOS, Linux), and devices (desktop, mobile, tablet) to ensure consistent functionality and display.
* Exploratory Testing
  * Concept: Informal testing where testers actively explore the software to discover defects, usability issues, or areas of concern that may not be covered by scripted tests.
  * Example
    * Pen: TBC
    * E-commerce: Manually exploring the e-commerce website to discover and report any unexpected behavior, usability issues, or defects that were not covered in scripted test cases, such as testing different payment methods or coupon code functionality.
* Localization and Internationalization Testing
  * Concept: Testing the software's compatibility with different languages, cultures, and regional settings to ensure it can be used globally.
  * Example
    * Pen: TBC
    * E-commerce: Testing the e-commerce website with different languages, currencies, and regional settings to ensure that the user interface, product information, and pricing are appropriately localized for different target markets.
* Accessibility Testing
  * Concept: Evaluating the software's accessibility features to ensure it can be used by individuals with disabilities and meets relevant accessibility guidelines and standards.
  * Example
    * Pen: TBC
    * E-commerce: Testing the e-commerce website using assistive technologies like screen readers to ensure it is accessible to individuals with disabilities, including proper labeling of elements, keyboard navigation, and alternative text for images.

## What?

I am going to give example with order: acceptance testing -> system testing -> integration testing -> feature testing -> unit testing -> functional testing. In a real world case, the testing order is upside down; that is, the order: function testing -> unit testing -> feature testing -> integration testing -> system testing -> acceptance testing. Our goal is to delight the users, so we should make acceptance testing as first priority. But we need to start from smaller, so the real-world scenario will be someone find bug in functional testing and engineers and testers take good care of unit testing -> feature testing -> integration testing -> system testing -> acceptance testing.

If we want to make a social media platform, we need acceptance testing:

* Register a new user account by providing the required information.
* Login with the newly created account and verify successful authentication.
* Explore different sections of the platform, such as the news feed, user profiles, and messaging features.
* Post a new status update or share a media file (photo, video, etc.) on the user's profile.
* Verify that the posted content is displayed correctly on the user's profile and appears in the news feed of connected friends.
* Interact with other users' content by liking, commenting, or sharing posts.
* Test the messaging feature by sending and receiving messages with other users.
* Verify that notifications are properly displayed for relevant activities, such as new friend requests, likes, comments, or messages.
* Explore privacy settings and verify that user preferences for sharing content and controlling visibility are accurately reflected.
* Test the search functionality by searching for users, groups, or specific content.
* Perform these steps using different browsers and devices to ensure compatibility and responsiveness.
* Monitor system performance during heavy usage, such as concurrent interactions, and assess response times and stability.

And we need system testing as follow:

* Set up the test environment with the necessary hardware, software, and network configurations to replicate the production environment.
* Deploy the latest version of the social media platform to the test environment.
* Conduct a comprehensive series of tests, including functional, performance, security, and compatibility testing, to verify the system's behavior and performance.
* Test the system's scalability by simulating a high number of concurrent users and monitoring its response time and resource utilization.
* Evaluate the system's stability and resilience by subjecting it to various stress tests, such as heavy loads, sudden surges in traffic, or simulated failures.
* Perform compatibility testing across different browsers, operating systems, and devices to ensure the platform works consistently across various platforms.
* Verify the system's security measures, such as authentication, access controls, and data encryption, to ensure the protection of user data.
* Monitor system logs and performance metrics to identify any bottlenecks, errors, or abnormal behavior that may impact the overall system performance.
* Document and report any issues or defects encountered during testing and work with the development team to address them.
* Once the system has passed all the necessary tests, obtain approval from stakeholders to proceed with deployment to the production environment.

And we need the integration testing as follow:

* Set up the test environment with the necessary hardware, software, and network configurations to replicate the production environment.
* Deploy the latest version of the social media platform, including all integrated components and modules, to the test environment.
* Identify the key integration points between different components, such as user authentication, post creation, comment functionality, and messaging features.
* Test the integration between user authentication and the user profile module to ensure a seamless login and profile access experience.
* Verify that posts created by users are properly displayed in the news feed and user profiles, with correct metadata and appropriate visibility settings.
* Test the integration between the post creation and comment functionality to ensure that comments are correctly associated with the respective posts and displayed accordingly.
* Validate the integration between the messaging feature and user profiles to enable private messaging between users, ensuring messages are sent and received accurately.
* Perform cross-component integration testing to verify the proper data flow and communication between interconnected modules, such as user profiles, news feed, and search functionality.
* Conduct integration testing for third-party integrations, such as social media sharing or external content embedding, to ensure seamless integration and functionality.
* Monitor system logs and track any integration-related errors, inconsistencies, or issues encountered during testing.
* Document and report any integration defects or issues and collaborate with the development team to resolve them.
* Once integration testing is completed successfully, obtain approval from stakeholders to proceed with further testing, such as system testing or acceptance testing, as applicable.

And then we narrow down to the feature test of user authentication (react + node)

* Frontend with Jest and React Testing Library
  ```javascript
  import React from 'react';
  import { render, screen, fireEvent, waitFor } from '@testing-library/react';
  import SignupForm from './SignupForm';
  
  test('User can sign up successfully', async () => {
    render(<SignupForm />);
  
    // Simulate user input
    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'testuser@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
  
    // Simulate form submission
    fireEvent.click(screen.getByRole('button', { name: 'Sign Up' }));
  
    // Assert success message or redirected page
    await waitFor(() => {
      expect(screen.getByText('User signed up successfully')).toBeInTheDocument();
    });
  });
  ```
* Backend with Jest and Supertest
  ```javascript
  const request = require('supertest');
  const app = require('../app'); // Assuming your Node.js app is configured in app.js
  
  describe('User Authentication API', () => {
    it('User can sign up successfully', async () => {
      const response = await request(app)
        .post('/api/signup')
        .send({
          username: 'testuser',
          email: 'testuser@example.com',
          password: 'password123',
        });
  
      expect(response.statusCode).toBe(201);
      expect(response.body.message).toBe('User signed up successfully');
    });
  });
  ```

As you can see the feature test includes test the behavior of frontend UI/UX and the backend API.

And then we can narrow down to test the unit of authentication as follow:

```javascript
const { authenticateUser } = require('../userAuth'); // Assuming the user authentication function is defined in a separate file

describe('User Authentication', () => {
  it('Should return true when user credentials are valid', () => {
    const username = 'testuser';
    const password = 'password123';

    const result = authenticateUser(username, password);

    expect(result).toBe(true);
  });

  it('Should return false when user credentials are invalid', () => {
    const username = 'testuser';
    const password = 'invalidpassword';

    const result = authenticateUser(username, password);

    expect(result).toBe(false);
  });
});
```

## Reference
