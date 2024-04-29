# PHOTO PORTFOLIO WEBPAGE
#### Video Demo:  <[https://youtu.be/LJGeUmB_FXk]>
#### Description:

Welcome to the Photography Portfolio Webpage project! This sleek and user-friendly interface is designed to showcase dynamic photography portfolios. Developed using Python with the Flask framework and incorporating Bootstrap for styling, this project offers an engaging experience for both photographers and viewers. The webpage features a responsive navbar for intuitive navigation, a header section for impactful visuals, and a gallery with Bootstrap's modal functionality for seamless image browsing. SCSS ensures a polished appearance across different devices, complemented by a dark mode feature for enhanced viewing experience. Additionally, JavaScript enhances interactivity, and pictures are stored on a database for streamlined content management.

### File Structure

- **app.py**: This file contains the main Flask application code, including route definitions and database interactions.
- **instance/**: This directory contains sensitive configuration files, such as the database file.
  - **db.sqlite3**: The SQLite database file used for storing user information and picture data.
- **templates/**: This directory holds the HTML templates used to render different pages of the website.
  - **layout.html**: The base template used for all other HTML templates, incorporating common elements such as navigation and footer. Other templates extend this layout to maintain consistency across the website.
  - **index.html**: The homepage template, featuring the header section and gallery.
  - **login.html**: The login page template for admin authentication.
  - **admin.html**: The admin dashboard template, providing picture management functionalities.
- **static/**: This directory contains static assets such as CSS, JavaScript, and image files.
  - **styles.scss**: The main SCSS file, where styles for the entire website are defined.
  - **login.js**: JavaScript file handling client-side validation and authentication for the login page.
  - **upload.js**: JavaScript file for managing picture upload functionality in the admin dashboard.
  - **script.js**: JavaScript file containing general-purpose functions for enhancing user experience.

### Design Choices

#### Flask Framework
The Flask framework was chosen for its simplicity and flexibility in building web applications. Its lightweight nature allows for quick development and easy integration with other libraries and frameworks.

#### Bootstrap
Bootstrap was utilized for its responsive grid system and pre-designed components, enabling rapid prototyping and ensuring cross-device compatibility. The modal functionality provided by Bootstrap enhances the user experience by allowing seamless image browsing within the gallery.

#### SCSS
SCSS was chosen for styling to maintain code readability, organization and dark mode feature. Its features such as variables, nesting, and mixins facilitate the creation of modular and maintainable stylesheets, resulting in a polished appearance for the webpage.

#### JavaScript
JavaScript was employed to enhance interactivity and user experience. Smooth scrolling effects were implemented to improve navigation, while dynamic content loading enhances the responsiveness of the webpage. Additionally, JavaScript was used for client-side validation, to facilitate admin functionalities such as picture management and to set up the darkmode feature.

### Admin Capabilities

Admin capabilities are facilitated by a login/logout mechanism, allowing authenticated users to access the admin dashboard. From the admin dashboard, users can manage pictures by uploading new images and deleting existing ones. This streamlined content control ensures that photographers can easily update and maintain their portfolios.

### Conclusion

The Photography Portfolio Webpage offers photographers a powerful platform to showcase their work while providing viewers with an engaging and visually appealing experience. With its responsive design, intuitive navigation, and admin capabilities, this project demonstrates the potential of web development tools and frameworks to create dynamic and impactful websites.

Thank you for exploring my project! I hope you enjoy browsing through the photography portfolios showcased on this webpage. If you have any feedback or questions, please feel free to reach out.
