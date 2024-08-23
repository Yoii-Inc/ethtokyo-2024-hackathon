import { User } from "../type";
// import { MongoClient, ObjectId } from "mongodb";

// const uri = "mongodb://localhost:27017";
// const client = new MongoClient(uri);

// TODO: replace some decentralized storage.
export async function registerUser(userName: string, walletAddress: string) {
  console.log("User Registered:", { userName, walletAddress });

  //   try {
  //     await client.connect();
  //     const database = client.db("reservationPlatform");
  //     const usersCollection = database.collection("users");
  //     // get the maximum user id
  //     const users = await usersCollection.find().toArray();
  //     const maxId = users.reduce((acc, user) => {
  //       return user.id > acc ? user.id : acc;
  //     }, 0);
  //     // create user data
  //     const newUser: User = {
  //       id: maxId + 1,
  //       name: userName,
  //       walletAddress,
  //     };
  //     // insert user data into the database
  //     const result = await usersCollection.insertOne(newUser);
  //     console.log(`User is registered. ID: ${result.insertedId}`);
  //   } catch (error) {
  //     console.error("Error has occured in registration:", error);
  //   } finally {
  //     // close the database connection
  //     await client.close();
  //   }
}

// TODO: replace some decentralized storage.
export async function getUser(userId: string) {
  //   try {
  //     // connect to the database
  //     await client.connect();
  //     const database = client.db("reservationPlatform");
  //     const usersCollection = database.collection<User>("users");
  //     // get user data from the database
  //     const user = await usersCollection.findOne({
  //       _id: new ObjectId(userId),
  //     });
  //     if (user) {
  //       console.log(`User information has been retrieved.:`, user);
  //       return user;
  //     } else {
  //       console.log(`User not found. ID: ${userId}`);
  //       return null;
  //     }
  //   } catch (error) {
  //     console.error(
  //       "An error occurred while retrieving user information. :",
  //       error
  //     );
  //     return null;
  //   } finally {
  //     // close the database connection
  //     await client.close();
  //   }
}

export function updateUser(
  userId: string,
  newUserName: string,
  newWalletAddress: string
) {
  throw new Error("Not yet implemented");
}

export function deleteUser(userId: string) {
  throw new Error("Not implemented");
}
