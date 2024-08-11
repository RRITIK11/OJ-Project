export enum Language {
  Java = "java",
  Cpp = "c++",
  Python = "python",
  JavaScript = "javascript",
}

export enum Success {
  Accepted = "accepted",
  Rejected = "rejected",
}

export enum Difficulty {
  Easy = "easy",
  Medium = "medium",
  Hard = "hard",
}

export enum Verification {
  Pending = "pending",
  Verified = "verified",
  Rejected = "rejected",
  Deleted = "deleted",
}

export type SampleCode = {
  [key: string]: string;
};

export const sampleCode: SampleCode = {
  "c++": `//Enter your code here
#include <iostream>
using namespace std;
int main(){
   cout<<"Hello World"<<endl;
}`,
  java: `public class Main {

    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}`,
  python: "print('Hello World')",
  javascript: "console.log('Hello World')",
};
