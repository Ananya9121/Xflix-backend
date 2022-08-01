# Setup file template to upload data to MongoDB Atlas
mongoimport --uri "mongodb+srv://ananya:xflixAnanya12@xflix-node.3zuwiyn.mongodb.net/?retryWrites=true&w=majority" --drop --collection videos --file data/export_xflix.json
