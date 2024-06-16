export default function isWithinCapacity(index, capacity) {
    if (index < 0 || index >= capacity) {
        throw new Error("Trying to access index out of bound");
    }
}