# Reboot01 User Dashboard

A web application that displays Reboot01 user data from a GraphQL API, including profile information, XP progress, skills, and audit ratio.

## Features

- **User Login**: Secure authentication with (username or email)/password
- **Profile Page**: Displays personal information (name, email, campus, etc.)
- **XP Tracking**: Shows XP progression with interactive graphs
- **Skills Radar Chart**: Visualizes different skill levels
- **Audit Ratio**: Displays Audit ratio in a pie chart
- **Responsive Design**: Works on different screen sizes

## How to Use

1. Visit the [live demo](https://husain-alabbad.github.io/Reboot01-Dashboard/)
2. Log in with your credentials
3. View your profile data, XP progress, and skills

## Project Structure

- `index.html` - Main HTML file
- `static/js/` - JavaScript files:
  - `script.js` - Main script and header setup
  - `login.js` - Handles login functionality
  - `query.js` - GraphQL queries and data fetching
  - `profile.js` - Profile page rendering and charts
- `static/css/` - CSS stylesheets

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6)
- GraphQL API
- GitHub Pages (for hosting)

## Setup (for local development)

1. Clone this repository
2. Open `index.html` in a web browser
3. The app will connect to the remote GraphQL API