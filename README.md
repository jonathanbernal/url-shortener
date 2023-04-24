# URL Shortener Microservice

## Purpose
The purpose of this project was to implement an API that can be used to save URLs to a mongoDB database, assign IDs to them, and use said IDs to redirect the user to the original webpage. 

## Features
You can make the following API calls, provided the URL is structured properly. All URLs must contain the HTTP or HTTPS protocol.

1. A `POST` request to `/api/shorturl/` to save the URL of choice to a mongoDB cluster. The response from this API call will include the 
shortened URL.
2. A `GET` request to `/api/shorturl/:shorturl` will redirect you to the original URL, provided you or someone else saved the URL first. 

    For instance, saving `https://www.google.com` may generate an integer ID of 1. You can visit `/api/shorturl/1` and the API will redirect you to Google's homepage.

## How to Run

### Part A: Setting Up MongoDB
1. The first thing you need to do is to set up a free MongoDB cluster. [Here](https://www.freecodecamp.org/news/get-started-with-mongodb-atlas/) are the instructions you can follow
to create one. This will allow you to store all your data.
2. On the MongoDB Atlas website, click on `Connect` then on `Connect to Application`. You
will get a string that you will need to populate with some options. It has the following
format:
`mongodb+srv://<username>:<password>@<clusteraddress>/<database_name>?retryWrites=true&w=majority`.
3. Fill it out with your username and password. Atlas gives you the cluster address.
4. After your cluster address and before the question mark `?` (query options), you can specify the name of the database
you want to save your data to. The string
Atlas gives you does not include the database name. If you don't give it a meaningful name, all your entries will be saved to a default `test` database.
5. Once you have filled out the mongoDB string, set `MONGO_URI` on your `.env` file to that address. Your `.env` file should look like this.
`MONGO_URI='mongodb+srv://<username>:<password>@<clusteraddress>/<database_name>?retryWrites=true&w=majority'`. Notice there are no spaces inbetween the equals sign. Adding spaces will cause errors.

### Part B: Setting Up This Application
1. Run `npm install` to install all the necessary dependencies for this project. These dependencies will also install `nodemon`, which you can use to run a server that will reload every time you save a file. 
2. Once all the dependencies are installed, you can run the server with `npm start` or if you want to run it with `nodemon`, you can type in `npm run dev`.

### Part C: Sending Requests
You can use your Web browser to interact with the API once it is running. The application runs on [`localhost:3000`](`localhost:3000`) by default. You can run it on a different port by defining `PORT=<port_number>` in your `.env` file.

You can send requests using the frontend provided, but if this is boring to you, I highly recommend using [Postman](https://www.postman.com/).

## Thought and Takeaways

Through this project, I learned the difference between a database, a collection, and a document. I also learned the definition and implementation of schemas and models as well as the most fundamental methods to save documents to a mongoDB database. Understanding the mongoose documentation was the most difficult part. Having to go back and forth whenever I did not understand a concept taught me that in order to develop a project, memorization of functions and other entities will come naturally once the main concepts are memorized. 

I have developed the exercise tracker ever since. That project involves greater complexity and has taught me a great deal about CRUD operations in general. 

## Future Plans
I am hoping that in the near future, I can polish this project and add additional features to it, such as full CRUD operations as well as an improved frontend. This project accomplishes its basic purpose but it has the potential to grow even more.