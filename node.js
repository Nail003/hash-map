export default class Node {
    constructor(value = null, nextNode = null, key = null) {
        this.key = key;
        this.value = value;
        this.nextNode = nextNode;
    }
}
