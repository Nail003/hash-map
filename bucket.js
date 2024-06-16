import LinkedList from "./linked_list.js";

export default class Bucket extends LinkedList {
    constructor(head) {
        super(head);
    }

    append(key, value) {
        const node = super.append(value);
        node.key = key;
        return node;
    }

    prepend(key, value) {
        const node = super.prepend(value);
        node.key = key;
        return node;
    }

    containsValue(value) {
        // Same as contains but with more intuitive name
        return this.contains(value);
    }

    containsKey(key) {
        // Check if any of the node has the key
        const node = this.traverseList((node) => {
            if (node.key === key) return node;
        });

        // Return true if key exist else false
        return node ? true : false;
    }

    findValue(value) {
        // Same as find but with more intuitive name
        return this.find(value);
    }

    findKey(key) {
        let index = 0;
        // Check if any node has the key
        const node = this.traverseList((node) => {
            if (node.key === key) return node;
            // Increment index to match the next node
            index++;
        });

        // If node has key return the index else return false
        return node ? index : false;
    }

    keys() {
        const keys = [];

        // Get key of each and every node
        this.traverseList((node) => {
            keys.push(node.key);
        });

        return keys;
    }

    values() {
        const values = [];

        // Get value of each and every node
        this.traverseList((node) => {
            values.push(node.value);
        });

        return values;
    }

    entries() {
        const entries = [];

        // Get key value pair of each node
        this.traverseList((node) => {
            entries.push([node.key, node.value]);
        });

        return entries;
    }
}
