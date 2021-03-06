# Shopify Challenge Backend & Data Developer Submission

### Links

View the Image repository here: https://young-cove-79509.herokuapp.com/ \
Swagger: https://young-cove-79509.herokuapp.com/api-docs/

### Goal

The goal of this challenge was to create an image repository. To accomplish this I've built both frontend and backend components. The frontend is simply used to display pubic images uploaded via the JWT secured endpoints, you can also search by both text and similar image and view the results of the search. The backend component is leveraged by the frontend with a few additional features that is not supported in the frontend.

To upload images, you must use the backend route directly via an HTTP request. I've made it easy to do this by both including swagger documentation and a postman library json file, which developer can download and import into their local postman environment to have full access to the image repository. 

### Usages

The online swagger documentation is deployed [here](https://young-cove-79509.herokuapp.com/api-docs/) and can be used simply through the browser to register/login users and search/add images to the image repository. You can view the full collection public images [here](https://young-cove-79509.herokuapp.com/) as well as search within the public images as well.

The frontend also has a link to download the postman library of requests located in the navbar, so please download and import the json file from there if you would wish to test the service using postman. 

### Tech Stack

I used **ReactJS** for the frontend to dispaly the images. **ExpressJS** as my backend framework with **MongoDB** for my main storage. The images are stored on an **AWS S3 bucket** and I leveraged the **google vision API** to tag images by characteristics to be used when users search by characteristics. 

### Testing

As stated above, you can easily test the image repo simply by either using the online swagger and "trying out" each route, or download the postman request library to easily test as well.
