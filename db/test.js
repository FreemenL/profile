/*
 Navicat MongoDB Data Transfer

 Source Server         : remoteLight
 Source Server Type    : MongoDB
 Source Server Version : 40009 (4.0.9)
 Source Host           : localhost:27017
 Source Schema         : test

 Target Server Type    : MongoDB
 Target Server Version : 40009 (4.0.9)
 File Encoding         : 65001

 Date: 19/04/2024 23:03:06
*/


// ----------------------------
// Collection structure for users
// ----------------------------
db.getCollection("users").drop();
db.createCollection("users");

// ----------------------------
// Documents of users
// ----------------------------
db.getCollection("users").insert([ {
    _id: "637edcf17c264b35b5817781b2b3f24d",
    email: "liuxiajiang818@163.com",
    username: "freemenL",
    hash_stamp: "MTcxMzM3MTc1MDQ3MA==",
    password: "a6119319dee4e2b3ce8ef809797ef928e232f5f557c72c67908011a6ef9673b2",
    bkgImg: "",
    userImg: "https://avatars.githubusercontent.com/u/23741346?v=4",
    address: {
        state: "Alabama",
        city: "Birmingham"
    },
    personal: {
        firstname: "Liu",
        lastname: "Xiajiang",
        phone: "13623558852"
    },
    followers: [ ],
    followings: [ ],
    hashTag: [ ],
    employed: false,
    employedActivated: false,
    activationToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImZyZWVtZW5MIiwiaWF0IjoxNzEzMzcxNzUwLCJleHAiOjE3MTM0NTgxNTB9.Er5WXcy2LpQ5eLJlpy3gqQK5gdmpH6TuCr8u-WGS8Z0",
    isAdmin: false,
    lang: "ZH",
    userRole: [ ],
    createdAt: ISODate("2024-04-17T16:35:50.483Z"),
    updatedAt: ISODate("2024-04-19T13:45:45.543Z"),
    __v: NumberInt("0"),
    nickName: "vinko"
} ]);
