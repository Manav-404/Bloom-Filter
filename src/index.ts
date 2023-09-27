import { BloomFilter } from "./model/BloomFilter";
import * as crypto from "crypto"

/** Initialising Bloom Filter with size */ 
const FILTER_SIZE = 1000
const bloomFilter = new BloomFilter(FILTER_SIZE);

/** Dataset which contains total keys to be inserted in bloom filter */
const dataset = []

/** Map which contains keys which actually exists in bloom filter */
const dataset_exists:any = {}

/** Map which contains keys which don't exists in bloom filter */
const dataset_not_exists:any = {}

/** Generating UUID string of length 7 
 and marking keys of the dataset as exists */
for(let index=0; index<500; index++){
    const key = crypto.randomUUID().substring(0,8)
    dataset.push(key)    
    dataset_exists[key] = true
}

/** Generating UUID string of length 7 
 and marking keys of the dataset as does not exist */
for(let index=0; index<500; index++){
    const key = crypto.randomUUID().substring(0,8)
    dataset.push(key)
    dataset_not_exists[key] = false
}

/** Adding all keys from map dataset_exists to the bloom filter */
for(const [key, _] of Object.entries(dataset_exists)){
    bloomFilter.add(key)
}


/** For the total dataset, checking if key exists in bloom filter or not
 and calculating the false positive rate */
 let falsePos = 0;
for(const key of dataset){
    const exists = bloomFilter.exists(key);

    if(exists){
        if(!dataset_exists[key]){
            falsePos++
        }
    }
}
console.log((falsePos/dataset.length)*100, "%")




