const recommender = require("../triprecommender/recommender.js");
const fs = require("fs");

const mongoose = require('mongoose');
const databaseName = 'test';

const TripStore = require("../Trip/models/Trip");
const UserStore = require("../User/models/user");

jest.mock("../triprecommender/directions.js");
jest.mock("../triprecommender/latlng.js");

function addMockUsers(callback) {
    fs.readFile("./__test__/users/driverUser1.json", "utf8", (err, data) => {
        user = JSON.parse(data);
        user = UserStore(user);
        user.save((err, res) => {
            fs.readFile("./__test__/users/riderUser1.json", "utf8", (err, data1) => {
                user = JSON.parse(data1);
                user = UserStore(user);
                user.save((err, res) => {
                    fs.readFile("./__test__/users/riderUser2.json", "utf8", (err, data2) => {
                        user = JSON.parse(data2);
                        user = UserStore(user);
                        user.save((err, res) => {
                            fs.readFile("./__test__/users/riderUser3.json", "utf8", (err, data3) => {
                                user = JSON.parse(data3);
                                user = UserStore(user);
                                user.save((err, res) => {
                                    callback();
                                });
                            });
                        });
                    });
                });
            });
        });
    });
} 


function addMockTrips(callback) {
    let driverTrip;
    let riderTrips = [];
    let trip;
    fs.readFile("./__test__/trips/driverTrip1.json", "utf8", (err, data) => {
        trip = JSON.parse(data);
        driverTrip = trip;
        trip = TripStore(trip);
        trip.save((err, res) => {
            fs.readFile("./__test__/trips/riderTrip1.json", "utf8", (err, data1) => {
                trip = JSON.parse(data1);
                riderTrips.push(trip);
                trip = TripStore(trip);
                trip.save((err, res) => {
                    fs.readFile("./__test__/trips/riderTrip2.json", "utf8", (err, data2) => {
                        trip = JSON.parse(data2);
                        riderTrips.push(trip);
                        trip = TripStore(trip);
                        trip.save((err, res) => {

                            fs.readFile("./__test__/trips/riderTrip3.json", "utf8", (err, data3) => {
                                trip = JSON.parse(data3);
                                riderTrips.push(trip);
                                trip = TripStore(trip);

                                trip.save((err, res) => {
                                    callback(driverTrip, riderTrips);
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}

function addMockTripsBugged(callback) {
    let driverTrip;
    let riderTrips = [];
    let trip;
    fs.readFile("./__test__/trips/driverTrip1.copy.json", "utf8", (err, data) => {
        trip = JSON.parse(data);
        driverTrip = trip;
        trip = TripStore(trip);
        trip.save((err, res) => {
            fs.readFile("./__test__/trips/riderTrip1.json", "utf8", (err, data1) => {
                trip = JSON.parse(data1);
                riderTrips.push(trip);
                trip = TripStore(trip);
                trip.save((err, res) => {
                    fs.readFile("./__test__/trips/riderTrip2.json", "utf8", (err, data2) => {
                        trip = JSON.parse(data2);
                        riderTrips.push(trip);
                        trip = TripStore(trip);
                        trip.save((err, res) => {
                            fs.readFile("./__test__/trips/riderTrip3.json", "utf8", (err, data3) => {
                                trip = JSON.parse(data3);
                                riderTrips.push(trip);
                                trip = TripStore(trip);
                                trip.save((err, res) => {
                                    callback(driverTrip, riderTrips);
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}



describe("cutTripsByBearing", () => {

    it('should return empty on null inputs', () => {
        let driverTrip;
        let riderTrips;
        expect(recommender.cutTripsByBearing(driverTrip, riderTrips)).toHaveLength(0);
    });
    it('should return empty on null inputs for ridertrips', async done => {
        let driverTrip;
        let riderTrips;
        fs.readFile("./triprecommender/__test__/driverTrip1.json", "utf8", (err, data) => {
            driverTrip = data;
            expect(recommender.cutTripsByBearing(driverTrip, riderTrips)).toHaveLength(0);
            done();
        });
    });
    it('should return correct value', async done => {
        let driverTrip;
        let riderTrips = [];
        fs.readFile("./__test__/driverTrip1.json", "utf8", (err, data) => {
            driverTrip = JSON.parse(data);
            fs.readFile("./__test__/riderTrip1.json", "utf8", (err, data1) => {
                riderTrips.push(JSON.parse(data1));
                fs.readFile("./__test__/riderTrip2.json", "utf8", (err, data2) => {
                    riderTrips.push(JSON.parse(data2));
                    fs.readFile("./__test__/riderTrip3.json", "utf8", (err, data3) => {
                        riderTrips.push(JSON.parse(data3));
                        expect(recommender.cutTripsByBearing(driverTrip, riderTrips)).toHaveLength(3);
                        done();
                    });
                });
            });
        });
    });
});

describe("cutTripsByTime", () => {

    it('should return empty on null inputs', () => {
        let driverTrip;
        let riderTrips;
        expect(recommender.cutTripsByTime(driverTrip, riderTrips)).toHaveLength(0);
    });
    it('should return empty on null inputs for ridertrips', async done => {
        let driverTrip;
        let riderTrips;
        fs.readFile("./triprecommender/__test__/driverTrip1.json", "utf8", (err, data) => {
            driverTrip = data;
            expect(recommender.cutTripsByTime(driverTrip, riderTrips)).toHaveLength(0);
            done();
        });
    });
    it('should return correct value', async done => {
        let driverTrip;
        let riderTrips = [];
        fs.readFile("./__test__/driverTrip1.json", "utf8", (err, data) => {
            driverTrip = JSON.parse(data);
            fs.readFile("./__test__/riderTrip1.json", "utf8", (err, data1) => {
                riderTrips.push(JSON.parse(data1));
                fs.readFile("./__test__/riderTrip2.json", "utf8", (err, data2) => {
                    riderTrips.push(JSON.parse(data2));
                    fs.readFile("./__test__/riderTrip3.json", "utf8", (err, data3) => {
                        riderTrips.push(JSON.parse(data3));
                        expect(recommender.cutTripsByTime(driverTrip, riderTrips)).toHaveLength(2);
                        done();
                    });
                });
            });
        });
    });
    it('should ignore on incorrect value value', async done => {
        let driverTrip;
        let riderTrips = [];
        fs.readFile("./__test__/driverTrip1.json", "utf8", (err, data) => {
            driverTrip = JSON.parse(data);
            driverTrip.tripRoute.routes[0].legs[1] = undefined;
            fs.readFile("./__test__/riderTrip1.json", "utf8", (err, data1) => {
                riderTrips.push(JSON.parse(data1));
                fs.readFile("./__test__/riderTrip2.json", "utf8", (err, data2) => {
                    riderTrips.push(JSON.parse(data2));
                    fs.readFile("./__test__/riderTrip3.json", "utf8", (err, data3) => {
                        riderTrips.push(JSON.parse(data3));
                        expect(recommender.cutTripsByTime(driverTrip, riderTrips)).toHaveLength(2);
                        done();
                    });
                });
            });
        });
    });
});

describe("cutTripsByDistance", () => {

    it('should return empty on null inputs', () => {
        let driverTrip;
        let riderTrips;
        expect(recommender.cutTripsByDistance(driverTrip, riderTrips)).toHaveLength(0);
    });
    it('should return empty on null inputs for ridertrips', async done => {
        let driverTrip;
        let riderTrips;
        fs.readFile("./triprecommender/__test__/driverTrip1.json", "utf8", (err, data) => {
            driverTrip = data;
            expect(recommender.cutTripsByDistance(driverTrip, riderTrips)).toHaveLength(0);
            done();
        });
    });
    it('should return correct value', async done => {
        let driverTrip;
        let riderTrips = [];
        fs.readFile("./__test__/driverTrip1.json", "utf8", (err, data) => {
            driverTrip = JSON.parse(data);
            fs.readFile("./__test__/riderTrip1.json", "utf8", (err, data1) => {
                riderTrips.push(JSON.parse(data1));
                fs.readFile("./__test__/riderTrip2.json", "utf8", (err, data2) => {
                    riderTrips.push(JSON.parse(data2));
                    fs.readFile("./__test__/riderTrip3.json", "utf8", (err, data3) => {
                        riderTrips.push(JSON.parse(data3));
                        expect(recommender.cutTripsByDistance(driverTrip, riderTrips)).toHaveLength(3);
                        done();
                    });
                });
            });
        });
    });
    it('should return correct value, edgier case', async done => {
        let driverTrip;
        let riderTrips = [];
        fs.readFile("./__test__/driverTrip1.json", "utf8", (err, data) => {
            driverTrip = JSON.parse(data);
            fs.readFile("./__test__/riderTrip1.json", "utf8", (err, data1) => {
                riderTrips.push(JSON.parse(data1));
                fs.readFile("./__test__/riderTrip2.json", "utf8", (err, data2) => {
                    riderTrips.push(JSON.parse(data2));
                    fs.readFile("./__test__/riderTrip3.json", "utf8", (err, data3) => {
                        riderTrips.push(JSON.parse(data3));
                        fs.readFile("./__test__/riderTrip4.json", "utf8", (err, data4) => {
                            riderTrips.push(JSON.parse(data4));
                            expect(recommender.cutTripsByDistance(driverTrip, riderTrips)).toHaveLength(3);
                            done();
                        });
                    });
                });
            });
        });
    });
});

describe("modifyTrip", () => {
    beforeAll(async () => {
        const url = `mongodb://127.0.0.1/${databaseName}`;
        await mongoose.connect(url, { useNewUrlParser: true });
    });

    async function removeAllCollections () {
        const collections = Object.keys(mongoose.connection.collections);
        for (const collectionName of collections) {
            const collection = mongoose.connection.collections[collectionName];
            await collection.deleteMany();
        }
    }
    
    afterEach(async () => {
        await removeAllCollections();
    });

    async function dropAllCollections () {
        const collections = Object.keys(mongoose.connection.collections);
        for (const collectionName of collections) {
            const collection = mongoose.connection.collections[collectionName];
            try {
            await collection.drop();
            } catch (error) {
            // This error happens when you try to drop a collection that's already dropped. Happens infrequently. 
            // Safe to ignore. 
            if (error.message === 'ns not found') return;
        
            // This error happens when you use it.todo.
            // Safe to ignore. 
            if (error.message.includes('a background operation is currently running')) return;
        
            console.log(error.message);
            }
        }
    }
    
    // Disconnect Mongoose
    afterAll(async () => {
        await dropAllCollections();
        // Closes the Mongoose connection
        await mongoose.connection.close();
    });

    it('should return json with one riderTrip', async done => {
        let driverTrip;
        let riderTrips = [];
        fs.readFile("./__test__/driverTrip1.json", "utf8", (err, data) => {
            driverTrip = JSON.parse(data);
            fs.readFile("./__test__/riderTrip1.json", "utf8", async (err, data1) => {
                riderTrips.push(JSON.parse(data1));
                recommender.modifyTrip(driverTrip, riderTrips, res => {
                    expect(typeof res).toBe("object");
                    done();
                });
                
            });
        });
    });
    it('should return driverTrip if no riderTrips', async done => {
        let driverTrip;
        let riderTrips = [];
        fs.readFile("./__test__/driverTrip1.json", "utf8", async (err, data) => {
            driverTrip = JSON.parse(data);
            recommender.modifyTrip(driverTrip, riderTrips, res => {
                expect(res).toBe(driverTrip.tripRoute);
                done();
            });
        });
    });
    it('should return json with routes with one riderTrip', async done => {
        let driverTrip;
        let riderTrips = [];
        fs.readFile("./__test__/driverTrip1.json", "utf8", (err, data) => {
            driverTrip = JSON.parse(data);
            fs.readFile("./__test__/riderTrip1.json", "utf8", async (err, data1) => {
                riderTrips.push(JSON.parse(data1));
                recommender.modifyTrip(driverTrip, riderTrips, res => {
                    expect(res.routes).toBeDefined();
                    done();
                });
                
            });
        });
    });
    it('should return json with 3 riderTrips', async done => {
        let driverTrip;
        let riderTrips = [];
        fs.readFile("./__test__/driverTrip1.json", "utf8", (err, data) => {
            driverTrip = JSON.parse(data);
            fs.readFile("./__test__/riderTrip1.json", "utf8", (err, data1) => {
                riderTrips.push(JSON.parse(data1));
                fs.readFile("./__test__/riderTrip2.json", "utf8", (err, data2) => {
                    riderTrips.push(JSON.parse(data2));
                    fs.readFile("./__test__/riderTrip3.json", "utf8", async (err, data3) => {
                        riderTrips.push(JSON.parse(data3));
                        recommender.modifyTrip(driverTrip, riderTrips, res => {
                            expect(typeof res).toBe("object");
                            done();
                        });
                    });
                });
            });
        });
    });
    it('should return proper json with routes with 3 riderTrips', async done => {
        let driverTrip;
        let riderTrips = [];
        fs.readFile("./__test__/driverTrip1.json", "utf8", (err, data) => {
            driverTrip = JSON.parse(data);
            fs.readFile("./__test__/riderTrip1.json", "utf8", (err, data1) => {
                riderTrips.push(JSON.parse(data1));
                fs.readFile("./__test__/riderTrip2.json", "utf8", (err, data2) => {
                    riderTrips.push(JSON.parse(data2));
                    fs.readFile("./__test__/riderTrip3.json", "utf8", (err, data3) => {
                        riderTrips.push(JSON.parse(data3));
                        fs.readFile("./__test__/outputTrip1.json", "utf8", async (err, out) => {
                            recommender.modifyTrip(driverTrip, riderTrips, res => {
                                expect(res).toStrictEqual(JSON.parse(out));
                                done();
                            });
                        });
                    });
                });
            });
        });
    });
    it('should return proper json with routes with 3 riderTrips, edge case where trip tagged', async done => {
        
        addMockTrips(async (driverTrip, riderTrips) => {
            driverTrip.taggedTrips = [];
            driverTrip.taggedTrips.push(mongoose.Types.ObjectId(riderTrips[2]._id));
            recommender.modifyTrip(driverTrip, riderTrips, (res) => {
                fs.readFile("./__test__/outputTrip1.json", "utf8", async (err, out) => {
                    recommender.modifyTrip(driverTrip, riderTrips, res => {
                        expect(res).toStrictEqual(JSON.parse(out));
                        done();
                    });
                });
            });
        })
    });
    it('should return proper json with routes with 3 riderTrips, edge case where trip null', async done => {
        
        addMockTrips(async (driverTrip, riderTrips) => {
            driverTrip.taggedTrips = [];
            driverTrip.taggedTrips.push(undefined);
            recommender.modifyTrip(driverTrip, riderTrips, (res) => {
                fs.readFile("./__test__/outputTrip1.json", "utf8", async (err, out) => {
                    recommender.modifyTrip(driverTrip, riderTrips, res => {
                        expect(res).toStrictEqual(JSON.parse(out));
                        done();
                    });
                });
            });
        })
    });
});


describe("getInterestSimilarity", () => {

    it('should fail on invalid interests', () => {
        let user1 = {
            interests: [1, 2, 3, 4, 5]
        }
        let user2 = {
            interests: [5, 4, 3, 2]
        }
        expect(() => recommender.getInterestSimilarity(user1, user2)).toThrow("Error");
    });
    it('should fail on empty interests', () => {
        let user1 = {
            interests: []
        }
        let user2 = {
            interests: []
        }
        expect(() => recommender.getInterestSimilarity(user1, user2)).toThrow("Error");
    });
    it('should fail on no interests', () => {
        let user1 = {
        }
        let user2 = {
        }
        expect(() => recommender.getInterestSimilarity(user1, user2)).toThrow("Error");
    });
    it('should return number on valid input', () => {
        let user1 = {
            interests: [1, 2, 3, 4, 5]
        }
        let user2 = {
            interests: [5, 4, 3, 2, 1]
        }
        expect(typeof recommender.getInterestSimilarity(user1, user2)).toBe("number");
    });
    it('should return correct output on valid input', () => {
        let user1 = {
            interests: [1, 2, 3, 4, 5]
        }
        let user2 = {
            interests: [5, 4, 3, 2, 1]
        }
        expect(recommender.getInterestSimilarity(user1, user2)).toBeGreaterThan(0.65);
        expect(recommender.getInterestSimilarity(user1, user2)).toBeLessThan(0.66);
    });
    it('should return correct output on valid input', () => {
        let user1 = {
            interests: [1, 2, 3, 4, 5]
        }
        let user2 = {
            interests: [1, 2, 3, 4, 5]
        }
        expect(recommender.getInterestSimilarity(user1, user2)).toBeGreaterThan(1.0);
        expect(recommender.getInterestSimilarity(user1, user2)).toBeLessThan(1.02);
    });
});

describe("getRiderTripSimilarity", () => {
    beforeAll(async () => {
        const url = `mongodb://127.0.0.1/${databaseName}`;
        await mongoose.connect(url, { useNewUrlParser: true });
    });

    async function removeAllCollections () {
        const collections = Object.keys(mongoose.connection.collections);
        for (const collectionName of collections) {
            const collection = mongoose.connection.collections[collectionName];
            await collection.deleteMany();
        }
    }
    
    afterEach(async () => {
        await removeAllCollections();
    });

    async function dropAllCollections () {
        const collections = Object.keys(mongoose.connection.collections);
        for (const collectionName of collections) {
            const collection = mongoose.connection.collections[collectionName];
            try {
            await collection.drop();
            } catch (error) {
            // This error happens when you try to drop a collection that's already dropped. Happens infrequently. 
            // Safe to ignore. 
            if (error.message === 'ns not found') return;
        
            // This error happens when you use it.todo.
            // Safe to ignore. 
            if (error.message.includes('a background operation is currently running')) return;
        
            console.log(error.message);
            }
        }
    }
    
    // Disconnect Mongoose
    afterAll(async () => {
        await dropAllCollections();
        // Closes the Mongoose connection
        await mongoose.connection.close();
    });

    it('should return empty array on bad input', async done => {
        let driverTrip;
        let riderTrips;
        let res = await recommender.getRiderTripSimilarity(driverTrip, riderTrips);
        expect(res).toHaveLength(0);
        done();
    });
    it('should return empty array on incorrect driver input', async done => {
        addMockTrips((driverTrip, riderTrips) => {
            addMockUsers(async () => {
                let dt;
                let res = await recommender.getRiderTripSimilarity(dt, riderTrips);
                expect(res).toHaveLength(0);
                done();
            });
        });
    });
    it('should ignore bad user-trip relationship on bad userID in trip', async done => {
        addMockTrips((driverTrip, riderTrips) => {
            addMockUsers(async () => {
                let userId = riderTrips[0].userID;
                riderTrips[0].userID = mongoose.Types.ObjectId(1);
                TripStore.findByIdAndUpdate({userID: userId}, riderTrips[0], async () => {
                    let res = await recommender.getRiderTripSimilarity(driverTrip, riderTrips);
                    expect(res).toHaveLength(2);
                    done();
                });
            });
        });
    });
    it('should return something on correct input', async done => {
        addMockTrips((driverTrip, riderTrips) => {
            addMockUsers(async () => {
                let res = await recommender.getRiderTripSimilarity(driverTrip, riderTrips);
                expect(res).toHaveLength(3);
                done();
            });
        });
    });
    it('should return something with similarity measure on correct input', async done => {
        addMockTrips((driverTrip, riderTrips) => {
            addMockUsers(async () => {
                let res = await recommender.getRiderTripSimilarity(driverTrip, riderTrips);
                expect(res[0].similarityWithDriver).toBeDefined();
                done();
            });
        });
    });
    it('should return correctly ordered result on correct input', async done => {
        addMockTrips((driverTrip, riderTrips) => {
            addMockUsers(async () => {
                let res = await recommender.getRiderTripSimilarity(driverTrip, riderTrips);
                expect(res[0].similarityWithDriver).toBeGreaterThanOrEqual(res[1].similarityWithDriver);
                expect(res[1].similarityWithDriver).toBeGreaterThanOrEqual(res[2].similarityWithDriver);
                done();
            });
        });
    });
    it('should return correctly similarity on correct input', async done => {
        addMockTrips((driverTrip, riderTrips) => {
            addMockUsers(async () => {
                let res = await recommender.getRiderTripSimilarity(driverTrip, riderTrips);
                expect(res[0].similarityWithDriver).toBeGreaterThan(1.0);
                expect(res[0].similarityWithDriver).toBeLessThan(1.05);
                done();
            });
        });
    });
});

describe("getRiderTrips", () => {
    beforeAll(async () => {
        const url = `mongodb://127.0.0.1/${databaseName}`;
        await mongoose.connect(url, { useNewUrlParser: true });
    });

    async function removeAllCollections () {
        const collections = Object.keys(mongoose.connection.collections);
        for (const collectionName of collections) {
            const collection = mongoose.connection.collections[collectionName];
            await collection.deleteMany();
        }
    }
    
    afterEach(async () => {
        await removeAllCollections();
    });

    async function dropAllCollections () {
        const collections = Object.keys(mongoose.connection.collections);
        for (const collectionName of collections) {
            const collection = mongoose.connection.collections[collectionName];
            try {
            await collection.drop();
            } catch (error) {
            // This error happens when you try to drop a collection that's already dropped. Happens infrequently. 
            // Safe to ignore. 
            if (error.message === 'ns not found') return;
        
            // This error happens when you use it.todo.
            // Safe to ignore. 
            if (error.message.includes('a background operation is currently running')) return;
        
            console.log(error.message);
            }
        }
    }
    
    // Disconnect Mongoose
    afterAll(async () => {
        await dropAllCollections();
        // Closes the Mongoose connection
        await mongoose.connection.close();
    });

    it('should return empty array on incorrect input', async done => {
        addMockTrips((driverTrip, riderTrips) => {
            addMockUsers(async () => {
                let dt;
                let res = await recommender.getRiderTrips(dt);
                expect(res).toHaveLength(0);
                expect(res).toStrictEqual([]);
                done();
            });
        });
    });
    it('should return something of correct length on correct input', async done => {
        addMockTrips((driverTrip, riderTrips) => {
            addMockUsers(async () => {
                let res = await recommender.getRiderTrips(driverTrip);
                expect(res).toHaveLength(2);
                done();
            });
        });
    });
    it('should return something correct on correct input', async done => {
        addMockTrips((driverTrip, riderTrips) => {
            addMockUsers(async () => {
                let res = await recommender.getRiderTrips(driverTrip);
                expect(JSON.stringify(res[1]._id)).toBe(JSON.stringify(riderTrips[2]._id));
                expect(JSON.stringify(res[0]._id)).toBe(JSON.stringify(riderTrips[0]._id));
                done();
            });
        });
    });
    it('should return something correct on correct input', async done => {
        addMockTripsBugged((driverTrip, riderTrips) => {
            addMockUsers(async () => {
                let res = await recommender.getRiderTrips(driverTrip);
                expect(res).toHaveLength(1);
                done();
            });
        });
    });
});

describe("driverTripHandler", () => {
    beforeAll(async () => {
        const url = `mongodb://127.0.0.1/${databaseName}`;
        await mongoose.connect(url, { useNewUrlParser: true });
    });

    async function removeAllCollections () {
        const collections = Object.keys(mongoose.connection.collections);
        for (const collectionName of collections) {
            const collection = mongoose.connection.collections[collectionName];
            await collection.deleteMany();
        }
    }
    
    afterEach(async () => {
        await removeAllCollections();
    });

    async function dropAllCollections () {
        const collections = Object.keys(mongoose.connection.collections);
        for (const collectionName of collections) {
            const collection = mongoose.connection.collections[collectionName];
            try {
            await collection.drop();
            } catch (error) {
            // This error happens when you try to drop a collection that's already dropped. Happens infrequently. 
            // Safe to ignore. 
            if (error.message === 'ns not found') return;
        
            // This error happens when you use it.todo.
            // Safe to ignore. 
            if (error.message.includes('a background operation is currently running')) return;
        
            console.log(error.message);
            }
        }
    }
    
    // Disconnect Mongoose
    afterAll(async () => {
        await dropAllCollections();
        // Closes the Mongoose connection
        await mongoose.connection.close();
    });

    it('should return empty array when driverTrips is empty', async done => {
        let driverTrip;
        let res = await recommender.driverTripHandler(driverTrip);
        expect(res).toStrictEqual([]);
        done();
    })
    it('should return object on correct input', async done => {
        addMockTrips((driverTrip, riderTrips) => {
            addMockUsers(async () => {
                let res = await recommender.driverTripHandler(driverTrip);
                expect(typeof res).toBe("object");
                done();
            });
        });
    });
    it('should return json routes object on correct input', async done => {
        addMockTrips((driverTrip, riderTrips) => {
            addMockUsers(async () => {
                let res = await recommender.driverTripHandler(driverTrip);
                expect(res[0].tripRoute.routes).toBeDefined();
                done();
            });
        });
    });
});


describe("tripHandler", () => {

    it('should return on valid input', async done => {
        let trip = {
            origin: 'Indigo, 2505 Granville St, Vancouver, BC V6H 3G7',
            destination: 'AMS Student Nest, 6133 University Blvd, Vancouver, BC V6T 1Z1'
        };
        expect(recommender.tripHandler(trip, (res) => {
            done();
        }));
    });
    it('should throw error on invalid input', async done => {
        let trip = {};
        try {
            recommender.tripHandler(trip, (res) => {

            });
        } catch (e) {
            done();
        }
    });
    it('should return a valid object on valid input', async done => {
        let trip = {
            origin: 'Indigo, 2505 Granville St, Vancouver, BC V6H 3G7',
            destination: 'AMS Student Nest, 6133 University Blvd, Vancouver, BC V6T 1Z1'
        };
        expect(recommender.tripHandler(trip, (res) => {
            expect(res.routes).toBeDefined();
            done();
        }));
    });
});