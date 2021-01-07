const { encrypt, decrypt } = require("./aes.js");
const fs = require('fs');

// const root_private_key = '-----BEGIN RSA PRIVATE KEY-----\n' +
//     'MIICXAIBAAKBgQDLTCK2za9Q3OUhvhtsb2P7LnSzYEEDduuvf0xw3bpUff6RrZHB\n' +
//     'rjtm8HTzqTYTJ9spEd9B/sIEETsGho964m+SL3vRLoSxzQN1XepMHu/RyFYq0hfY\n' +
//     'VihK1zZgY9HBA5omKr7W6+KVk2SysHCqtWLkEekPb+rFq6V3LBypJDqpUQIDAQAB\n' +
//     'AoGAGRoBf0jOSNG9iPkMMctfMPh/eFZ+MItSdozlR1pZU21rLVmdEakNtJwkFKHk\n' +
//     'B2F4cg2+30sxcYcfHqMmvCmRVOcRiBmpYCtVsaHcbmglIFIZ/2fJ9g9E6IkAYuUp\n' +
//     'FLegmUdMfRWJc52VSTibcJPhbLZRxUO3N+Rme9KyGjsT+bECQQDxwrAVydvO5s7K\n' +
//     'YSZNg6vCaaj8cw+PsSbhXtSclPLDXaTQM7PiltK3YBYlnJrbCUZVnDjJHNnyePtJ\n' +
//     'HMIFKN3rAkEA10V+YrY47ZonCIY6jZv3u3E0dY2Rb7A35NsXsBShr00N0lNRimr7\n' +
//     'M8/A7WLEU8UIrIex6BYQToxFb2dCs9D6swJBAIooRBBvhtm6NLqawhTSBjnXv+Zk\n' +
//     'qqPnDN0GIGJLDGBxB1qj8Uyv/EMm+gEMecJqjnMmD51+i15xnMivUoE4VXkCQCow\n' +
//     'aHCYHdgTGgtFozwVkRufOBTBxfsJoiqr9ZyArp9Yjpjl01k5Vjn1QW5EqQ1x1B1c\n' +
//     'CrXdfRynyQPoTN5I2pkCQBA/rWQQXb1ZRf7zbb8LTEaIiYI0Hd6kvOh/KzG+0ZV1\n' +
//     '+qQGEQqyuGBUhTLw8Tp2l9Y4KnzSGEWJRMJDjop96Lc=\n' +
//     '-----END RSA PRIVATE KEY-----';

const root_private_key = fs.readFileSync('./key.txt').toString();
console.log(root_private_key)

const encrypted = encrypt(root_private_key, 'antispasmodic lest normalcy exploding');
console.log(encrypted);

const decrypted = decrypt(encrypted, 'antispasmodic lest normalcy exploding');
console.log(decrypted);
