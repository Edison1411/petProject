# Petstore
This is a pet store demo using react, pòstgress and nodejs.
## Step-by-step guide: how to create and update a pet on the petstore
### 1. UML Diagrams
The pets updates and creations flow will integrate as shown below:
- Sequence diagram
  ![Sequence diagram](images/uml.png)
- Class diagram
-  ![Class diagram](images/umlModeldata.png)

### 2. Quick Api description to update and to create a pet
- **Endpoint to create a Pet (POST /pet)**  
  This creates a new pet on the Database.  
  **Expected JSON**:
  ```json
  {
    "category": { "id": 1, "name": "Dogs" },
    "name": "Buddy",
    "photoUrls": ["url1.jpg", "url2.png"],
    "status": "available"
  }

- **Endpoint to update a Pet (Put /pet)**
  This updates an existing pet.
  **Expected JSON**:
   ```json
  {
  "id": 101,
  "name": "BuddyUpdated",
  "status": "pending",
  "photoUrls": ["url1.jpg", "url2.png"] 
  }

