# Textbook Anarchy
A simple web application for facilitating the resale of textbooks. This was created at Bucknell University to be used by the student body.


## Deploying

1. Create an EC2 Instance (NOTE: Instance must have 6 GB of RAM available) with port 8080 exposed to http traffic through its security groups (you can use a load balancer to route traffic from a standard http/https port).
2. Install [nodejs](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-up-node-on-ec2-instance.html), [docker](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/docker-basics.html), and [docker-compose](https://docs.docker.com/compose/install/) on the instance.
3. Clone the textbook anarchy repository.
4. Standing in the root of the repository, run `npm install` to install all javascript dependencies.
5. Copy your `cfg.js` into the `src` directory of the repo.
6. Run `npm run build` to build the server and frontend code.
7. Run `docker-compose up` to create the docker containers and start them.
8. Connect to your instance by going to `instance.public.ip.address:8080` (or the load balancer's dns name)

## Data Models
Books are the primary data model for our application. Through books, users are able to post new books up for sale that others can purchase.
* Book
    * ID 
    * Title 
    * Course Number
    * Price 
    * Owner 
    * Sold

## Frontend Architecture
The frontend is written in React.js with material ui as a design library. This application has three pages:

1. Login Page
    The login page allows the user to login to our application using Google Login.
2. Search Page
    The search page is designed to allow the user to search for specifics textbooks listed by other users.
3. User Page
    This page displays all of the textbooks that the user is selling or has sold. It also allows the user to edit and       books that they have uploaded or remove them. Adding a new book is also possible from this page.

We use a protected router to ensure that a user is logged in before routing to either of the other pages.
