import forge from "node-forge";

const root_public_key =
  "-----BEGIN PUBLIC KEY-----\n" +
  "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDLTCK2za9Q3OUhvhtsb2P7LnSz\n" +
  "YEEDduuvf0xw3bpUff6RrZHBrjtm8HTzqTYTJ9spEd9B/sIEETsGho964m+SL3vR\n" +
  "LoSxzQN1XepMHu/RyFYq0hfYVihK1zZgY9HBA5omKr7W6+KVk2SysHCqtWLkEekP\n" +
  "b+rFq6V3LBypJDqpUQIDAQAB\n" +
  "----- END PUBLIC KEY----- ";

const root_private_key =
  "-----BEGIN RSA PRIVATE KEY-----\n" +
  "MIICXAIBAAKBgQDLTCK2za9Q3OUhvhtsb2P7LnSzYEEDduuvf0xw3bpUff6RrZHB\n" +
  "rjtm8HTzqTYTJ9spEd9B/sIEETsGho964m+SL3vRLoSxzQN1XepMHu/RyFYq0hfY\n" +
  "VihK1zZgY9HBA5omKr7W6+KVk2SysHCqtWLkEekPb+rFq6V3LBypJDqpUQIDAQAB\n" +
  "AoGAGRoBf0jOSNG9iPkMMctfMPh/eFZ+MItSdozlR1pZU21rLVmdEakNtJwkFKHk\n" +
  "B2F4cg2+30sxcYcfHqMmvCmRVOcRiBmpYCtVsaHcbmglIFIZ/2fJ9g9E6IkAYuUp\n" +
  "FLegmUdMfRWJc52VSTibcJPhbLZRxUO3N+Rme9KyGjsT+bECQQDxwrAVydvO5s7K\n" +
  "YSZNg6vCaaj8cw+PsSbhXtSclPLDXaTQM7PiltK3YBYlnJrbCUZVnDjJHNnyePtJ\n" +
  "HMIFKN3rAkEA10V+YrY47ZonCIY6jZv3u3E0dY2Rb7A35NsXsBShr00N0lNRimr7\n" +
  "M8/A7WLEU8UIrIex6BYQToxFb2dCs9D6swJBAIooRBBvhtm6NLqawhTSBjnXv+Zk\n" +
  "qqPnDN0GIGJLDGBxB1qj8Uyv/EMm+gEMecJqjnMmD51+i15xnMivUoE4VXkCQCow\n" +
  "aHCYHdgTGgtFozwVkRufOBTBxfsJoiqr9ZyArp9Yjpjl01k5Vjn1QW5EqQ1x1B1c\n" +
  "CrXdfRynyQPoTN5I2pkCQBA/rWQQXb1ZRf7zbb8LTEaIiYI0Hd6kvOh/KzG+0ZV1\n" +
  "+qQGEQqyuGBUhTLw8Tp2l9Y4KnzSGEWJRMJDjop96Lc=\n" +
  "-----END RSA PRIVATE KEY-----";

const root_certificate =
  "-----BEGIN CERTIFICATE-----\n" +
  "MIIB5jCCAU+gAwIBAgIBATANBgkqhkiG9w0BAQUFADA5MQswCQYDVQQDEwJDQTEd\n" +
  "MBsGA1UEChMUQ2VydGlmaWNhdGVBdXRob3JpdHkxCzAJBgNVBAYTAkNOMB4XDTIw\n" +
  "MTEzMDEyMTEwN1oXDTIxMTEzMDEyMTEwN1owOTELMAkGA1UEAxMCQ0ExHTAbBgNV\n" +
  "BAoTFENlcnRpZmljYXRlQXV0aG9yaXR5MQswCQYDVQQGEwJDTjCBnzANBgkqhkiG\n" +
  "9w0BAQEFAAOBjQAwgYkCgYEAy0wits2vUNzlIb4bbG9j+y50s2BBA3brr39McN26\n" +
  "VH3+ka2Rwa47ZvB086k2EyfbKRHfQf7CBBE7BoaPeuJvki970S6Esc0DdV3qTB7v\n" +
  "0chWKtIX2FYoStc2YGPRwQOaJiq+1uvilZNksrBwqrVi5BHpD2/qxauldywcqSQ6\n" +
  "qVECAwEAATANBgkqhkiG9w0BAQUFAAOBgQBEKD4bE1FtgQ7mNy66DyDjR0Ku8+Do\n" +
  "QycnexAVD8aabaKWEw1H8JFMLWj0Q+ew4qNcmcPTbuCgL7FsVUsZePbBWfBs/PDp/\n" +
  "MUPPm+zKohLt5DM/G6YfX2+490hKHBQmE1aFy6S/xkGr9nfTuBob4PguhotmXPtM\n" +
  "yLrcvgG4xZzB4w==\n" +
  "-----END CERTIFICATE-----";

export default function handler(commonName, countryName, stateName, localityName, organizationName, ou, year) {
  const keys = forge.pki.rsa.generateKeyPair(1024);
  const publicKey = keys.publicKey;
  const privateKey = keys.privateKey;
  var cert = forge.pki.createCertificate();

  cert.publicKey = publicKey;
  cert.privateKey = privateKey;
  cert.serialNumber = new Date().getTime().toString();

  cert.validity.notBefore = new Date();
  cert.validity.notAfter = new Date();
  cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1);

  cert.setSubject([
    {
      name: "commonName",
      value: commonName,
    },
    {
      name: "countryName",
      value: countryName,
    },
    {
      shortName: "ST",
      value: stateName,
    },
    {
      name: "localityName",
      value: localityName,
    },
    {
      name: "organizationName",
      value: organizationName,
    },
    {
      shortName: "OU",
      value: ou,
    },
  ]);

  cert.setIssuer([
    {
      name: "commonName",
      value: "CA",
    },
    {
      name: "organizationName",
      value: "CertificateAuthority",
    },
    {
      shortName: "C",
      value: "CN",
    },
  ]);

  const private_key = forge.pki.privateKeyFromPem(root_private_key);
  cert.sign(private_key);
  return cert;
}
