# Fu's Blog

## Overview

Fu's Blog is a web application that allows users to view blog posts, navigate through different sections such as Home, About, and Contact, and provides an admin interface for managing blog posts. This project aims to improve web coding skills using technologies like JavaScript, HTML, CSS, EJS, NodeJS, and ExpressJS.

## Features

### User Interface

1. **Home Page**
    - Displays a list of blog posts with titles, subtitles, authors, and timestamps.
    - Pagination support for navigating through multiple pages of blog posts.

2. **View Blog Post**
    - Users can click on a blog post to view its full content on a separate page.

3. **About Page**
    - Provides information about the blog and its author.

4. **Contact Page**
    - Allows users to send messages to the blog's admin with fields for name, email, phone number, and message.
      
5. **Responsive Supported**
   - Allows use on all platforms.

### Admin Interface

1. **Admin Dashboard**
    - Accessible to the blog's admin for managing blog posts.
    - Features for adding, editing, and deleting blog posts.

## Technologies Used

- **Front-end**: HTML, CSS, JavaScript, EJS, Bootstrap
- **Back-end**: NodeJS, ExpressJS
- **Database**: MySQL 

## Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/phu3112004/fus-blog.git
    cd fus-blog
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Set up the database:**
    - Create a MySQL database.
    - Run the SQL scripts provided in the `mysql` folder to set up the necessary tables.

4. **Configure the application:**
    - Update the database configuration in `config/default.json` and add:

      ```bash
       {
        "server":{
            "host": "0.0.0.0",
            "port": 3000
        },
        "mysql":{
            "host": "localhost",
            "port": 3306,
            "database": your_database,
            "user": your_username,
            "password": your_password
        },
        "salt": 10,
        "secret_key": "secret_key"
        }
         
        ```

5. **Run the application:**
    ```bash
    node app.js
    ```

6. **Access the application:**
    - Open a web browser and go to `http://localhost:3000/blog`.

## Usage

### Viewing Blog Posts

- Visit the Home page to see a list of blog posts.
- Click on a post title to view the full content of the post.

### Admin Operations

- Log in to the admin interface.
- Use the dashboard to add new blog posts, edit existing ones, or delete posts.

### Contacting the Admin

- Fill out the contact form on the Contact page with your name, email, phone number, and message.
- Submit the form to send your message to the blog's admin.

## Contributing
Welcome contributions to enhance the functionality and features of this travel website. Please fork the repository and submit pull requests for review.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

## Contact

For any inquiries or feedback, please contact us through the Contact page on the blog.

## Video Demo
[Link to video](https://drive.google.com/file/d/1TR1v5ILfFtP8AN4xpY6wTwggxdjIg5B3/view?usp=drive_link)

---

Enjoy using Fu's Blog!
