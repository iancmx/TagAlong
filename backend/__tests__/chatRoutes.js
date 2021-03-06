const supertest = require('supertest')
const app = require("../index.js");
const mongoose = require('mongoose');
const request = supertest(app);
const User = require("../User/models/user");
const Chat = require("../Chat/models/Chat");

const databaseName = 'chatroutestest';

beforeAll(async () => {
	const url = `mongodb://127.0.0.1/${databaseName}`;
  	await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

})

async function removeAllCollections () {
	const collections = Object.keys(mongoose.connection.collections);
	for (const collectionName of collections) {
    	const collection = mongoose.connection.collections[collectionName];
    	await collection.deleteMany();
  	}
}

afterEach(async () => {
	await removeAllCollections();
})


async function dropAllCollections() {
    const collections = Object.keys(mongoose.connection.collections)
    for (const collectionName of collections) {
        const collection = mongoose.connection.collections[collectionName]
        try {
            await collection.drop();
        } catch (error) {
            // This error happens when you try to drop a collection that's already dropped. Happens infrequently. 
            // Safe to ignore. 
            if (error.message === 'ns not found') return

            // This error happens when you use it.todo.
            // Safe to ignore. 
            if (error.message.includes('a background operation is currently running')) return

            console.log(error.message);
        }
    }
}

// Disconnect Mongoose
afterAll(async () => {
    await dropAllCollections();
    await mongoose.connection.close();
})


describe('testing chat', () => {

	it('demo1 should send a message to the chat', async (done) => {

		// Registration of 3 new users
		user1 = new User({
			username: "chatdemouser4",
			email: "chatdemouser4@demo.com",
			password: "demodemodemo",
			fbToken: "eB2TuLLk7YA:APA91bH8JpAXQuzS8VEZlq2gGDVrbVtZS8vmU26A1wA6CUiclwylIuwwdnJeSIyi4a8PGOBfkXiBjKtRpM66lMkY_mr2a84XrnkgvSL8JEvS7ZjEgMRL0bPOKiAMf0vLFyWJBzbrMakS"
		});

		let newuser;

		await user1.save()
			.then((user) => {
				newuser = user;
			});

		user2 = new User({
			username: "chatdemouser5",
			email: "chatdemouser5@demo.com",
			password: "demodemodemo",
			fbToken: "eB2TuLLk7YA:APA91bH8JpAXQuzS8VEZlq2gGDVrbVtZS8vmU26A1wA6CUiclwylIuwwdnJeSIyi4a8PGOBfkXiBjKtRpM66lMkY_mr2a84XrnkgvSL8JEvS7ZjEgMRL0bPOKiAMf0vLFyWJBzbrMakS"
		});

		await user2.save();

		user3 = new User({
			username: "chatdemouser6",
			email: "chatdemouser6@demo.com",
			password: "demodemodemo",
		});

		await user3.save();

		const users = [user1.username, user2.username, user3.username];

		// Create a new Chat Room

		const chat = new Chat({
			users: users,
			messages: []
		})

		let chatroom;
		await chat.save()
			.then((chat) => {
				chatroom = chat;
			});


		const roomID = chatroom._id;

		const res2 = await request.post("/chat/sendMessage")
			.send({
				userID: newuser._id,
				roomID: roomID,
				message: "hello"
			})
			.expect(200); 
		
		expect(res2.body).toBeTruthy();
		expect(res2.body.users).toEqual(expect.arrayContaining(users));
		expect(res2.body.messages[0].username).toBe(user1.username);
		expect(res2.body.messages[0].message).toBe("hello");


		done();
	})

	it('sending a message to a invalid roomID', async (done) => {
		// Registration of 3 new users
		user1 = new User({
			username: "chatdemouser7",
			email: "chatdemouser7@demo.com",
			password: "demodemodemo",
			fbToken: "eB2TuLLk7YA:APA91bH8JpAXQuzS8VEZlq2gGDVrbVtZS8vmU26A1wA6CUiclwylIuwwdnJeSIyi4a8PGOBfkXiBjKtRpM66lMkY_mr2a84XrnkgvSL8JEvS7ZjEgMRL0bPOKiAMf0vLFyWJBzbrMakS"
		});

		let newuser;

		await user1.save()
			.then((user) => {
				newuser = user;
			});

		const res = await request.post("/chat/sendMessage")
			.send({
				userID: newuser._id,
				roomID: "0",
				message: "hello"
			})
			.expect(400); 
		
		expect(res.text).toBe("Invalid userID or roomID");

		done();
	})

	it('sending a message from a invalid userID', async (done) => {
		const res = await(request.post("/chat/sendMessage"))
			.send({
				userID: "0",
				roomID: "",
				message: "home"
			})
			.expect(400);

		expect(res.text).toBe("Invalid userID or roomID");

		done();

	})

	it('sending a message from a missing user, but valid userID', async (done) => {
		const res = await(request.post("/chat/sendMessage"))
			.send({
				userID: "5dd334aa82dbf7805559b74a",
				roomID: "5dd334aa82dbf7805559b74a",
				message: "home"
			})
			.expect(400);

		expect(res.text).toBe("Unable to find user");
		
		done();

	})

	it('sending a message to to a valid roomID but unfound room', async (done) => {
		
		user1 = new User({
			username: "chatdemouser10",
			email: "chatdemouser10@demo.com",
			password: "demodemodemo",
			fbToken: ""
		});

		let newuser;

		await user1.save()
			.then((user) => {
				newuser = user;
			});

		const res = await(request.post("/chat/sendMessage"))
			.send({
				userID: newuser._id,
				roomID: "5dd334aa82dbf7805559b74a",
				message: "home"
			})
			.expect(400);

		expect(res.text).toBe("chat room not found");
		
		done();

	})



	it('gets message for proper user and room', async (done) => {
		user1 = new User({
			username: "chatdemouser12",
			email: "chatdemouser12@demo.com",
			password: "demodemodemo",
			fbToken: ""
		});

		let newuser;

		await user1.save()
			.then((user) => {
				newuser = user;
			});

		const chat = new Chat({
			users: [user1.username],
			messages: [{
				username: user1.username,
				message: "home"
			}]
		})

		let chatroom;

		await chat.save()
			.then((chat) => {
				chatroom = chat;
			})

		const roomID = chatroom._id;

		const res = await(request.get("/chat/getMessages"))
			.set({
				userID: user1._id,
				roomID: roomID
			})
			.expect(200);

		expect(res.body).toBeTruthy();
		expect(res.body.users).toEqual(expect.arrayContaining([user1.username]));
		expect(res.body.messages[0].message).toBe("home");
		expect(res.body.messages[0].username).toBe(user1.username);

			
		done();
	})

	it('gets messages for valid userID with missing user', async (done) => {
		const res = await(request.get("/chat/getMessages"))
			.set({
				userID: "5dd334aa82dbf7805559b74a",
				roomID: "5dd334aa82dbf7805559b74a"
			})
			.expect(400);

		expect(res.text).toBe("Unable to find user");
		done();

	})

	it('attempt to get message from invalid userID', async (done) => {
		const res = await(request.get("/chat/getMessages"))
			.set({
				userID: "a"
			})
			.expect(400);

		expect(res.text).toBe("Invalid userID or roomID");
		done();
	})

	it('attempt to send message to a user that no longer exists', async (done) => {
		user1 = new User({
			username: "chatdemouser4",
			email: "chatdemouser4@demo.com",
			password: "demodemodemo",
			fbToken: "eB2TuLLk7YA:APA91bH8JpAXQuzS8VEZlq2gGDVrbVtZS8vmU26A1wA6CUiclwylIuwwdnJeSIyi4a8PGOBfkXiBjKtRpM66lMkY_mr2a84XrnkgvSL8JEvS7ZjEgMRL0bPOKiAMf0vLFyWJBzbrMakS"
		});

		let newuser;

		await user1.save()
			.then((user) => {
				newuser = user;
			});

		const users = [user1.username, "demouser1" , "demouser2"];

		// Create a new Chat Room

		const chat = new Chat({
			users: users,
			messages: []
		})

		let chatroom;
		await chat.save()
			.then((chat) => {
				chatroom = chat;
			});


		const roomID = chatroom._id;

		const res2 = await request.post("/chat/sendMessage")
			.send({
				userID: newuser._id,
				roomID: roomID,
				message: "hello"
			})
			.expect(200); 
		
		expect(res2.body).toBeTruthy();
		expect(res2.body.users).toEqual(expect.arrayContaining(users));
		expect(res2.body.messages[0].username).toBe(user1.username);
		expect(res2.body.messages[0].message).toBe("hello");


		done();
	})


})

