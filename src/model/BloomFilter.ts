import murmurhash from "murmurhash";

export class BloomFilter{
    private filter: Uint8Array
    private size: number
    constructor(size: number){
      /** Initialising array with each element = 8 bit */ 
        this.filter = new Uint8Array(size);
        this.size = size
    }

      /** Generating hash for the key and adding it to the bloom filter */  
     public add(key: string){
      const index = this.hash(key);

      /** Accessing index of the element in array where 
       we want to access our bit */   
      const arrayIndex = Math.floor(index/8);

      /** Accessing the particular bit out of 8 bits */   
      const bitIndex = index % 8;

      /** Performing bitwise OR operation to turn on the bit to 1 */
      this.filter[arrayIndex] = this.filter[arrayIndex] | (1 << bitIndex)
     }
     
     /** Generating hash for the key and checking 
      if it exists in the bloom filter */ 
     public exists(key:string): boolean{
        const index = this.hash(key);
        const arrayIndex = Math.floor(index/8);
        const bitIndex = index % 8;

      /**  Performing bitwise AND operation to check if bit is turned on or not */  
        return (this.filter[arrayIndex] & (1 << bitIndex)) > 0 ? true: false
     }

     /** Generating hash for the key within the range of bloom filter size
      * Hash fn used - Murmur Hash with constant seed of 100
      */
     private hash(key: string): number{
        const hash = murmurhash.v3(key, 100)%this.size;
        return hash
     }

     public printFilter(){
        console.log(this.filter)
     }

}
