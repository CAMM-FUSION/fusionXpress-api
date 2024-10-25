# Advert API

An Advert API for managing adverts. This API allows vendors to create, view, including deleting and updating any advert in the system.. Users can view adverts.

## Setup

1. Clone the repository https://github.com/fusionXpress-api
2. Run the command below from the terminal to install the required packages and dependencies

npm install

3. Create a `.env` file and set the following variables

PORT=5000
JWT_PRIVATE_KEY
SAVEFILESORG_API_KEY
SMTP_PASSWORD
MONGO_URI

4. Creat a `.gitignore` file and add the following lines:

.env
node_modules
package-lock.json

5. Run the command below in the terminal to start the server:

    npm run dev




## API Endpoints


## VENDOR Endpoints
-**POST** `/vendors/signup` - Vendor to Signup 
-**POST** `/vendors/login` - Vendor to Login
-**GET** `/vendors/me` - Vendor to get profile
-**GET** `/vendors/me/adverts` - Vendor to get personal Adverts
-**POST** `/adverts` -Vendor to Create Advert
-**PATCH** `/adverts/:id` -Vendor to Update Advert
-**DELETE** `/adverts/:id` -Vendor to Delete Advert


## USER Endpoints
-**POST** `/users/signup` - User to Signup 
-**POST** `/users/login` - User to Login
-**GET** `/users/me` - User to get profile
-**GET** `/adverts` - User to get all adverts
-**GET** `/adverts/search` -User to get advert by Search
-**GET** `/adverts/:id` -User to get an advert