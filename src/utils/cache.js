//create a node

class Node{
  constructor(key,value){
    this.key = key;
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class LRUCache{
  constructor(limit = 100){ //set limit of the cache to 100 terms or items
    this.limit = limit;
    this.map = new Map()
    this.head = null;
    this.tail = null;
  }

  //move most recently used node to head
  moveToHead(node){ 
    if(node === this.head) return;

    //remove node
    if(node.prev) node.prev.next = node.next;
    if(node.next) node.next.prev = node.prev;
    if(node === this.tail) this.tail = node.prev;

    //place node at head
    node.prev = null;
    node.next = this.head;
    if(this.head) this.head.prev = node;
    this.head = node;

    //if there is no tail make the current node a tail
    if(!this.tail) this.tail = node

  }

  get(key){
    const node = this.map.get(key);
    if(!node) return null;

    this.moveToHead(node);
    return node.value
  }

  set(key,value){
    if(this.map.has(key)) {
      const node = this.map.get(key);
      node.value = value;
      this.moveToHead(node);
      return;
    }
    const newNode = new Node(key,value);
    this.map.set(key,newNode);
    newNode.next = this.head;
    if(this.head) this.head.prev = newNode;
    this.head = newNode;
    if(!this.tail) this.tail = newNode;

    if(this.map.size > this.limit){
      //remove least recently used node from tail
      const lruKey = this.tail.key;
      this.map.delete(lruKey);
      
      if(this.tail.prev){
        this.tail = this.tail.prev;
        this.tail.next = null;
      }
      else{
        //cache is empty now
        this.head = null;
        this.tail = null;
      }

    }

  }

  has(key){
    return this.map.has(key);
  }

  delete(key){
    const node = this.map.get(key);

    if(!node) return false;

    if(node.prev) node.prev.next=node.next;
    if(node.next) node.next.prev=node.prev;
    if(node === this.head) this.head = node.next;
    if(node === this.tail) this.tail = node.prev;

    this.map.delete(key);
    return true;
  }

  clear() {
    this.map.clear()
    this.head = null;
    this.tail = null;
  }

  size() {
    return this.map.size;
  }
  


}


//create instance of LRU cache with limit 100
const lruCache = new LRUCache(100);

const getCacheKey = (query, page = 1, limit = 10) => {
  return `search:${query}:${page}:${limit}`;
};

const getFromCache = (key) => {
  return lruCache.get(key);
}

const setInCache = (key,data) => {
  lruCache.set(key,data);
};

module.exports = {
  getCacheKey,
  getFromCache,
  setInCache,

};
