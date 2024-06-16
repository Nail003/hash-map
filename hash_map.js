import Bucket from "./bucket.js";
import hash from "./hash_function.js";

export default class HashMap {
    #capacity;
    #loadFactor;
    #totalKeys;
    #globalStorage;

    constructor() {
        this.clear();
    }

    set(key, value) {
        // Get the generated index of key
        const index = this.generateKeyIndex(key);

        // Get the bucket
        let bucket = this.getBucket(index);
        // If the bucket is empty
        if (bucket === null) {
            // Create a new bucket at the index
            bucket = new Bucket();
            this.addBucket(index, bucket);

            // Add the new value in the bucket
            bucket.append(key, value);

            // Increment total keys
            this.incrementTotalKeys();
            return;
        }

        // If the key already exists in the bucket
        if (bucket.containsKey(key)) {
            // Overide the existing value
            const keyIndex = bucket.findKey(key);
            bucket.at(keyIndex).value = value;

            // Increment total keys
            this.incrementTotalKeys();
            return;
        }

        // If the key is not in bucket
        bucket.append(key, value);
        // Increment total keys
        this.incrementTotalKeys();
    }

    get(key) {
        const value = this.traveseBuckets((bucket) => {
            // Check the index of key
            const index = bucket.findKey(key);
            // If the index exist return the value of node
            if (index !== false) return bucket.at(index).value;
        });

        // Return null if key did not match
        return value ? value : null;
    }

    has(key) {
        const hasKey = this.traveseBuckets((bucket) => {
            if (bucket.containsKey(key)) return true;
        });

        return hasKey ? true : false;
    }

    remove(key) {
        const keyRemoved = this.traveseBuckets((bucket) => {
            // Check the index of key
            const index = bucket.findKey(key);
            // If the index exist remove the node
            if (index !== false) {
                bucket.removeAt(index);

                this.decrementTotalKeys();
                return true;
            }
        });

        return keyRemoved ? true : false;
    }

    length() {
        return this.#totalKeys;
    }

    clear(capacity = 16) {
        this.#capacity = capacity;
        this.#loadFactor = 1;
        this.#totalKeys = 0;
        this.#globalStorage = new Array(this.#capacity).fill(null);
    }

    keys() {
        let keys = [];

        // Get keys of all the buckets and add them into the keys array
        this.traveseBuckets((bucket) => {
            keys = [...keys, ...bucket.keys()];
        });

        return keys;
    }

    values() {
        let values = [];

        // Get values of all the buckets and add them into the values array
        this.traveseBuckets((bucket) => {
            values = [...values, ...bucket.values()];
        });

        return values;
    }

    entries() {
        let entries = [];

        // Get entries of all the buckets and add them into the entries array
        this.traveseBuckets((bucket) => {
            entries = [...entries, ...bucket.entries()];
        });

        return entries;
    }

    // Helpers
    generateKeyIndex(key) {
        return hash(key) % this.#capacity;
    }

    getBucket(index) {
        return this.#globalStorage[index];
    }

    addBucket(index, bucket) {
        this.#globalStorage[index] = bucket;
    }

    incrementTotalKeys() {
        this.#totalKeys++;
        if (this.isCapacityOverload()) {
            this.doubleCapacity();
        }
    }

    decrementTotalKeys() {
        this.#totalKeys--;
    }

    isCapacityOverload() {
        return this.#capacity * this.#loadFactor < this.#totalKeys;
    }

    doubleCapacity() {
        // Get the current data
        const entries = this.entries();

        // Reset the data but with double capacity
        this.clear(this.#capacity * 2);

        // Insert back the data
        for (const entry of entries) {
            this.set(entry[0], entry[1]);
        }
    }

    traveseBuckets(callback) {
        let returnValue = undefined;
        for (const bucket of this.#globalStorage) {
            // For null buckets call the next cycle
            if (bucket === null) continue;

            // Call callback on each bucket
            returnValue = callback(bucket);

            // If callback ever returns a value than end the loop
            if (returnValue != undefined) return returnValue;
        }
    }
}
