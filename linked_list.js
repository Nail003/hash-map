import Node from "./node.js";

export default class LinkedList {
    // Singly linked list
    constructor(head = null) {
        this.head = head;
    }

    append(value) {
        // Create Node
        const node = new Node(value);

        // If there is no head make this node the current head
        if (this.head === null) {
            this.head = node;
            return node;
        }

        // Get lastNode
        const lastNode = this.getLastNode(this.head);

        // Make last node point to the new node
        lastNode.nextNode = node;
        return node;
    }

    prepend(value) {
        // Create Node
        const node = new Node(value);

        // If there is no head than make the new node the current head
        if (this.head === null) {
            this.head = node;
            return node;
        }

        // Else make the new node point to current head
        // And make new node the current head
        node.nextNode = this.head;
        this.head = node;
        return node;
    }

    size() {
        let length = 0;
        // Traverse through each node till reached the finale-node/tail of list
        // Also increase length by one for each visited node
        this.traverseList((_node) => {
            length++;
        });

        // Return the length
        return length;
    }

    at(index) {
        let length = 0;
        // Traverse through each node till reached the indexed node
        const node = this.traverseList((node) => {
            if (length === index) return node;
            // Increase length by one for each visited node
            length++;
        });

        // Returns null if the index is larger than the size of the list
        return node ? node : null;
    }

    tail() {
        // If list is empty there is no last node
        if (this.head === null) return null;

        // Get the last node in the list
        return this.getLastNode(this.head);
    }

    pop() {
        let lastNode = null;
        let prevNode = null;

        // Removes the last node
        // No need to remove node if list is empty
        if (this.head === null) return null;

        // If there is only one node in the list than just empty the head
        if (this.head.nextNode === null) {
            lastNode = this.head;
            this.head = null;
            return lastNode;
        }

        // Traverse through each node until reached the last node
        // Save reference of previous node so the last node can be removed
        lastNode = this.traverseList((node) => {
            // If there is no next node we have reached the last node
            if (node.nextNode === null) return node;

            // Set this node as previous node
            prevNode = node;
        });

        // Remove the last node
        prevNode.nextNode = null;

        // Return the last node
        return lastNode;
    }

    contains(value) {
        // Traverse through each element and check if the provided value is in the list
        const containsValue = this.traverseList((node) => {
            if (node.value === value) return true;
        });

        // Return true if the value was found else return false
        return containsValue ? true : false;
    }

    find(value) {
        let index = 0;

        // Check whether the value exists for current index
        const containsValue = this.traverseList((node) => {
            if (node.value === value) return true;
            // Increment index to match next node
            index++;
        });

        // Return index if the value was found else return null
        return containsValue ? index : null;
    }

    toString() {
        let relationString = "";

        // Add the value of each node in the string
        this.traverseList((node) => {
            relationString += `( ${node.value} ) -> `;
        });

        // Add null at the end to signify the tail
        relationString += "( null )";

        // Return string
        return relationString;
    }

    insertAt(index, value) {
        // Create node
        const node = new Node(value);
        // Get size of the list
        const size = this.size();

        // If index is greater than the size of the list or smaller than 0 than return
        if (index + 1 > size || index < 0) return;

        // For first element
        if (index === 0) {
            // If the list is empty
            if (this.head === null) {
                // Set the new node as the current head
                this.head = node;
                return;
            }
            // Set head as nextNode
            node.nextNode = this.head;
            // Set new node as the new head
            this.head = node;
            return;
        }

        // Get previous node and next node
        const prevNode = this.at(index - 1);
        const nextNode = prevNode.nextNode;

        // Set the new node on current index
        prevNode.nextNode = node;
        // Move all the other nodes to the next index
        node.nextNode = nextNode;
    }

    removeAt(index) {
        const size = this.size();

        // If index is greater than the size of the list or smaller than 0 than return
        if (index + 1 > size || index < 0) return null;

        // For first element
        if (index === 0) {
            // If the list is empty just return null
            if (this.head === null) return null;

            // If the list has only one node than remove the head and return the removed node
            if (this.head.nextNode === null) {
                const removedNode = this.head;
                this.head = null;
                return removedNode;
            }

            const removedNode = this.head;
            // Set the next node as the current head
            this.head = removedNode.nextNode;
            // Return the removed node
            return removedNode;
        }

        // For last element just call the built-in pop method
        if (index + 1 === size) return this.pop();

        // For everything else
        // Get the node just before the index
        const prevNode = this.at(index - 1);
        // Get the indexed node
        const removedNode = prevNode.nextNode;
        // Remove the indexed node
        prevNode.nextNode = removedNode.nextNode;

        // Return the removed node
        return removedNode;
    }

    // Helper Functions
    getLastNode(node) {
        // If the node does not point to any node we have reached the last node
        // Return the last node
        if (node.nextNode === null) return node;

        // Recursive calling until last node is reached
        // Return the last node
        return this.getLastNode(node.nextNode);
    }

    traverseList(callBack) {
        // Will pass the current node to the callback function
        // Traverses through each element in the list while calling the provided callback function
        // If list is empty callback is not called
        // If callback returns any value the execution is stopped
        let node = this.head;
        let value = undefined;

        // Traverse through each node in the list
        // Also call the provided callback on each node
        while (node != null && value === undefined) {
            value = callBack(node);
            node = node.nextNode;
        }

        // Return value of callback if any
        return value;
    }
}
