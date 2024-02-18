#! /usr/bin/env node

console.log(
    'This script populates some test images, uploader and category to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
  );
  
  // Get arguments passed on command line
  const userArgs = process.argv.slice(2);
  
  const Image = require("./models/image");
  const Uploader = require("./models/uploader");
  const Category = require("./models/category");
  
  const images = [];
  const uploaders = [];
  const categories = [];
  
  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false);
  
  const mongoDB = userArgs[0];
  
  main().catch((err) => console.log(err));
  
  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createCategories();
    await createUploaders();
    await createImages();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }
  
  // We pass the index to the ...Create functions so that, for example,
  // categories[0] will always be the Anime category, regardless of the order
  // in which the elements of promise.all's argument complete.
  async function categoryCreate(index, name) {
    const category = new Category({ name: name });
    await category.save();
    categories[index] = category;
    console.log(`Added category: ${name}`);
  }
  
  async function uploaderCreate(index, email, username, password) {
    const uploaderdetail = { email: email, username: username, password:password};
  
    const uploader = new Uploader(uploaderdetail);
  
    await uploader.save();
    uploaders[index] = uploader;
    console.log(`Added uploader: ${username}`);
  }
  
  async function imageCreate(index, caption, prompt, category, uploader, source) {
    const imagedetail = {
      caption: caption,
      prompt: prompt,
      category: category,
      uploader: uploader,
      source: source,
    };
  
    const image = new Image(imagedetail);
    await image.save();
    images[index] = image;
    console.log(`Added image: ${caption}`);
  }
  
  async function createCategories() {
    console.log("Adding categories");
    await Promise.all([
      categoryCreate(0, "Anime"),
      categoryCreate(1, "Realism"),
      categoryCreate(2, "SFW"),
    ]);
  }
  
  async function createUploaders() {
    console.log("Adding uploaders");
    await Promise.all([
      uploaderCreate(0, "patrick@gmail.com", "patrick26", "pass1"),
      uploaderCreate(1, "ben@gmail.com", "bova", "pass2"),
      uploaderCreate(2, "isaac@gmail.com", "asimov", "pass3"),
      uploaderCreate(3, "bob@gmail.com", "Billings", "pass4"),
      uploaderCreate(4, "jim@gmail.com", "Jones", "1971-12-16"),
    ]);
  }
  
  async function createImages() {
    console.log("Adding Images");
    await Promise.all([
      imageCreate(0,
        "The Name of the Wind (The Kingkiller Chronicle, #1)",
        "This is an example 1 prompt.",
        [categories[0]],
        uploaders[0],
        "https://www.images.com/test/url"
      ),
      imageCreate(1,
        "The Wise Man's Fear (The Kingkiller Chronicle, #2)",
        "This is an example 2 prompt.",
        [categories[0]],
        uploaders[0],
        "https://www.images.com/test/url1"
      ),
      imageCreate(2,
        "The Slow Regard of Silent Things (Kingkiller Chronicle)",
        "This is an example 3 prompt.",
        [categories[1]],
        uploaders[1],
        "https://www.images.com/test/url2"
      ),
      imageCreate(3,
        "Apes and Angels",
        "This is an example 4 prompt.",
        [categories[2]],
        uploaders[2],
        "https://www.images.com/test/url3"
      ),
      imageCreate(4,
        "The Land of the Rising Sun",
        "This is an example 5 prompt.",
        [categories[2]],
        uploaders[3],
        "https://www.images.com/test/url4"
      ),
    ]);
}
